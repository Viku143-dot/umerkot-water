import { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { PWAInstallModal } from './components/common/PWAInstallModal';
import { HomePage } from './pages/HomePage';
import { LocationSelectionPage } from './pages/LocationSelectionPage';
import { ResultsPage } from './pages/ResultsPage';
import { SavedReportsPage } from './pages/SavedReportsPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import type { LocationCoordinate, GroundwaterAnalysisResult } from './types';
import { GroundwaterAnalysisService } from './services/groundwaterAnalysisService';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { usePWAInstall } from './hooks/usePWAInstall';
import { UMERKOT_AREAS } from './data/umerkotData';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCoord, setSelectedCoord] = useState<LocationCoordinate | null>(() => {
    // Default to Umerkot City Center
    const defaultCenter = UMERKOT_AREAS[0];
    return {
      lat: defaultCenter.lat,
      lng: defaultCenter.lng,
      label: defaultCenter.name,
      taluka: defaultCenter.taluka
    };
  });
  const [currentAnalysis, setCurrentAnalysis] = useState<GroundwaterAnalysisResult | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);

  const isOnline = useOnlineStatus();
  const {
    isInstallable,
    isInstalled,
    isIOS,
    showInstructions,
    setShowInstructions,
    promptInstall
  } = usePWAInstall();

  // Refresh saved reports count
  useEffect(() => {
    const saved = GroundwaterAnalysisService.getSavedReportsLocally();
    setSavedCount(saved.length);
  }, [currentTab]);

  // Execute Analysis
  const handleProceedToAnalysis = () => {
    if (!selectedCoord) return;
    const result = GroundwaterAnalysisService.analyzeLocation(selectedCoord, !isOnline);
    setCurrentAnalysis(result);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSavedReport = (report: GroundwaterAnalysisResult) => {
    setCurrentAnalysis(report);
    setSelectedCoord(report.coordinate);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Offline Status Warning Banner */}
      <OfflineBanner isOnline={isOnline} />

      {/* Main Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isOnline={isOnline}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        onInstallClick={promptInstall}
        savedReportsCount={savedCount}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onStartAnalysis={() => {
              setCurrentTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreAbout={() => {
              setCurrentTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSavedReports={() => {
              setCurrentTab('saved');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'map' && (
          <LocationSelectionPage
            selectedCoord={selectedCoord}
            onSelectCoordinate={(coord) => setSelectedCoord(coord)}
            onProceedToAnalysis={handleProceedToAnalysis}
          />
        )}

        {currentTab === 'results' && (
          <ResultsPage
            analysis={currentAnalysis}
            onNavigateToMap={() => {
              setCurrentTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isOnline={isOnline}
          />
        )}

        {currentTab === 'saved' && (
          <SavedReportsPage
            onSelectReport={handleSelectSavedReport}
            onNavigateToMap={() => {
              setCurrentTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'admin' && <AdminPage />}
      </main>

      {/* Scientific Footer */}
      <Footer />

      {/* PWA Device Installation Instructions Modal */}
      <PWAInstallModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        isIOS={isIOS}
        onTriggerPrompt={promptInstall}
        isInstallable={isInstallable}
      />
    </div>
  );
}

export default App;

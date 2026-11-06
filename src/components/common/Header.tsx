import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  BarChart3,
  Download,
  Info,
  Menu,
  X,
  Wifi,
  WifiOff,
  ShieldCheck,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  onInstallClick: () => void;
  savedReportsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  isOnline,
  isInstallable,
  isInstalled,
  onInstallClick,
  savedReportsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', shortLabel: 'Home', icon: Compass },
    { id: 'map', label: 'Map & Location', shortLabel: 'Map', icon: MapPin },
    { id: 'results', label: 'Hydro Analysis', shortLabel: 'Analysis', icon: BarChart3 },
    { 
      id: 'saved', 
      label: 'Saved Reports', 
      shortLabel: 'Saved', 
      icon: Bookmark, 
      badge: savedReportsCount > 0 ? savedReportsCount : undefined 
    },
    { id: 'about', label: 'About Umerkot', shortLabel: 'About', icon: Info },
    { id: 'admin', label: 'Admin Portal', shortLabel: 'Admin', icon: ShieldCheck }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center p-1.5">
                <img 
                  src="/icons/icon.svg" 
                  alt="Umerkot Groundwater Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-none group-hover:text-sky-700 transition-colors whitespace-nowrap">
                  Umerkot Groundwater
                </span>
                <span className="hidden sm:inline-flex text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded border border-sky-200/80 whitespace-nowrap">
                  Sindh
                </span>
              </div>
              <p className="hidden xl:block text-[11px] text-slate-500 font-medium tracking-tight mt-0.5 truncate max-w-[210px]">
                Hydrogeology & Aquifer Information
              </p>
            </div>
          </div>

          {/* Desktop Navigation Segmented Bar */}
          <nav className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/70 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-sky-700 shadow-xs font-bold border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.shortLabel}</span>
                  {item.badge !== undefined && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-sky-600 text-white rounded-full leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Status Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Online / Offline Status Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
              }`}
              title={isOnline ? 'System is online and connected' : 'Offline mode: Cached reports accessible'}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="hidden md:inline text-[11px]">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-[11px]">Offline</span>
                </>
              )}
            </div>

            {/* PWA Install Button */}
            {isInstalled ? (
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px]">Installed</span>
              </span>
            ) : (
              <button
                onClick={onInstallClick}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all duration-150 active:scale-95 whitespace-nowrap ${
                  isInstallable
                    ? 'bg-sky-600 hover:bg-sky-700 shadow-sm hover:shadow'
                    : 'bg-sky-600 hover:bg-sky-700'
                }`}
                title="Install Progressive Web App on phone or desktop"
              >
                <Download className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                <span>Install App</span>
              </button>
            )}

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
              <span>Status: {isOnline ? 'Online Sync Active' : 'Offline (Cached Mode)'}</span>
            </div>
            <span>Umerkot, Sindh</span>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Crosshair,
  Search,
  CheckCircle2,
  AlertCircle,
  Compass,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Layers,
  Sparkles
} from 'lucide-react';
import type { LocationCoordinate, UmerkotAreaInfo } from '../types';
import { DistrictMap } from '../components/map/DistrictMap';
import {
  UMERKOT_AREAS,
  isCoordinateInUmerkot
} from '../data/umerkotData';
import { GroundwaterAnalysisService } from '../services/groundwaterAnalysisService';
import { UndergroundCrossSection } from '../components/hydrogeology/UndergroundCrossSection';

interface LocationSelectionPageProps {
  selectedCoord: LocationCoordinate | null;
  onSelectCoordinate: (coord: LocationCoordinate) => void;
  onProceedToAnalysis: () => void;
}

export const LocationSelectionPage: React.FC<LocationSelectionPageProps> = ({
  selectedCoord,
  onSelectCoordinate,
  onProceedToAnalysis
}) => {
  const [manualLat, setManualLat] = useState<string>(selectedCoord ? selectedCoord.lat.toString() : '25.3616');
  const [manualLng, setManualLng] = useState<string>(selectedCoord ? selectedCoord.lng.toString() : '69.7411');
  const [searchQuery, setSearchQuery] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'gps' | 'manual'>('map');

  // Handle GPS location request with high accuracy
  const handleGetGPS = () => {
    setGpsLoading(true);
    setGpsError(null);

    if (!('geolocation' in navigator)) {
      setGpsError('Geolocation is not supported by your browser or device.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Math.round(position.coords.latitude * 10000) / 10000;
        const lng = Math.round(position.coords.longitude * 10000) / 10000;
        const accuracy = Math.round(position.coords.accuracy);

        onSelectCoordinate({
          lat,
          lng,
          accuracy,
          label: `Your Device GPS Location (±${accuracy}m)`
        });
        setManualLat(lat.toString());
        setManualLng(lng.toString());
        setGpsLoading(false);
      },
      (error) => {
        let msg = 'Failed to acquire GPS location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please allow location access in your browser address bar (tap the padlock or tune icon 🔒 next to the URL) to use device GPS.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'GPS satellite signal unavailable. Please select your land directly on the map.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'GPS request timed out. Please try again or tap your field on the map.';
        }
        setGpsError(msg);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    );
  };

  // Handle manual coordinate input
  const handleApplyManual = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (isNaN(lat) || isNaN(lng)) {
      return;
    }

    onSelectCoordinate({
      lat: Math.round(lat * 10000) / 10000,
      lng: Math.round(lng * 10000) / 10000,
      label: 'Manually Entered Coordinate'
    });
  };

  // Filter village search
  const filteredAreas = UMERKOT_AREAS.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.taluka.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectArea = (area: UmerkotAreaInfo) => {
    onSelectCoordinate({
      lat: area.lat,
      lng: area.lng,
      label: area.name,
      taluka: area.taluka
    });
    setManualLat(area.lat.toString());
    setManualLng(area.lng.toString());
  };

  const isWithinUmerkot = selectedCoord ? isCoordinateInUmerkot(selectedCoord.lat, selectedCoord.lng) : false;

  // Real-time live analysis for instant cross-section preview
  const liveAnalysis = useMemo(() => {
    if (selectedCoord) {
      return GroundwaterAnalysisService.analyzeLocation(selectedCoord);
    }
    return null;
  }, [selectedCoord]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Location Selection & Underground Profile
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Your Land Location in Umerkot
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Choose your land on the map or via GPS to automatically reveal the underground strata, static water table depth, and tube-well borehole recommendations.
        </p>
      </div>

      {/* Quick Field Preset Bar (Useful for testing from anywhere) */}
      <div className="bg-slate-100/90 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Quick Test an Agricultural Land in Umerkot:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleSelectArea(UMERKOT_AREAS[1])} // Kunri
            className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-800 border border-slate-200 rounded-lg font-semibold transition-colors"
          >
            🌾 Kunri Chilli Farm (Sweet Water ~14m)
          </button>
          <button
            onClick={() => handleSelectArea(UMERKOT_AREAS[3])} // Samaro
            className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-800 border border-slate-200 rounded-lg font-semibold transition-colors"
          >
            🚜 Samaro Canal Land (~16m)
          </button>
          <button
            onClick={() => handleSelectArea(UMERKOT_AREAS[0])} // Umerkot Fort
            className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-800 border border-slate-200 rounded-lg font-semibold transition-colors"
          >
            🏰 Umerkot Town (~18m)
          </button>
          <button
            onClick={() => handleSelectArea(UMERKOT_AREAS[5])} // Chhor Desert
            className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-800 border border-slate-200 rounded-lg font-semibold transition-colors"
          >
            🏜️ Chhor Desert Margin (~42m)
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls (Selection Methods) & Right Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Methods & Village Search */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Method Selector Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'map'
                  ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Map Tap</span>
            </button>

            <button
              onClick={() => setActiveTab('gps')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'gps'
                  ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crosshair className="w-4 h-4" />
              <span>GPS Current</span>
            </button>

            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'manual'
                  ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Enter Lat/Lng</span>
            </button>
          </div>

          {/* Active Method Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            
            {activeTab === 'map' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-600" />
                  Select Directly on the Interactive Map
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Click or tap any agricultural parcel inside the blue boundary box on the map. The coordinates and underground strata will update automatically.
                </p>
                <div className="p-3 bg-sky-50 rounded-xl text-xs text-sky-900 border border-sky-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Tap anywhere on the right-side map to place your pin marker.</span>
                </div>
              </div>
            )}

            {activeTab === 'gps' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-emerald-600" />
                  Automatic Satellite GPS Detection
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ideal when standing directly on your agricultural field. Your browser will prompt for permission to read your device location.
                </p>

                <button
                  type="button"
                  onClick={handleGetGPS}
                  disabled={gpsLoading}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {gpsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Acquiring High-Precision GPS...
                    </>
                  ) : (
                    <>
                      <Crosshair className="w-4 h-4" />
                      Allow Location Access & Fetch GPS
                    </>
                  )}
                </button>

                {gpsError && (
                  <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{gpsError}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'manual' && (
              <form onSubmit={handleApplyManual} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  Manual Decimal Coordinates
                </h3>
                <p className="text-xs text-slate-500">
                  Enter coordinates from a handheld GPS, land title deed (Khasra/Survey number records), or Google Maps.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Latitude (°N)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={manualLat}
                      onChange={(e) => setManualLat(e.target.value)}
                      placeholder="e.g. 25.3616"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                      required
                    />
                    <span className="text-[10px] text-slate-400">Umerkot: 24.85 to 25.85</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Longitude (°E)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={manualLng}
                      onChange={(e) => setManualLng(e.target.value)}
                      placeholder="e.g. 69.7411"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                      required
                    />
                    <span className="text-[10px] text-slate-400">Umerkot: 69.20 to 70.45</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  Apply & Center on Map
                </button>
              </form>
            )}
          </div>

          {/* Quick Village / Town Search */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-600" />
                Search Umerkot Villages & Mandis
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {filteredAreas.length} found
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search Kunri, Samaro, Pithoro, Chhor, Dhoronaro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 pr-1">
              {filteredAreas.map((area) => (
                <button
                  key={area.name}
                  onClick={() => handleSelectArea(area)}
                  className="w-full text-left py-2.5 px-2 hover:bg-sky-50/70 rounded-lg transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                      {area.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Taluka {area.taluka} • ({area.lat}, {area.lng})
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform">
                    Select &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Coordinate Status Card & Action Button */}
          {selectedCoord && (
            <div className={`p-5 rounded-2xl border transition-all ${
              isWithinUmerkot
                ? 'bg-emerald-50/60 border-emerald-200'
                : 'bg-amber-50/80 border-amber-300'
            }`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Selected Land Coordinates
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5 font-mono">
                    {selectedCoord.lat}° N, {selectedCoord.lng}° E
                  </div>
                  {selectedCoord.label && (
                    <div className="text-xs text-slate-600 mt-0.5 font-medium">
                      Location: {selectedCoord.label}
                    </div>
                  )}
                </div>

                {isWithinUmerkot ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Within Umerkot Study Area
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    Outside District Boundary
                  </span>
                )}
              </div>

              {isWithinUmerkot ? (
                <button
                  onClick={onProceedToAnalysis}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>Open Full Groundwater Report & PDF</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-amber-900 bg-amber-100/70 p-3 rounded-xl border border-amber-200 leading-relaxed">
                    <strong>Notice:</strong> Your location is outside Umerkot District. Our verified borehole monitoring station database is currently active for Umerkot. We have displayed the regional lower Sindh stratigraphy below.
                  </div>
                  <button
                    onClick={() => handleSelectArea(UMERKOT_AREAS[1])}
                    className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Jump to Umerkot Farm (Kunri)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: High Quality Leaflet Map View */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Interactive GIS Cartography
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Tap anywhere to move pin
              </span>
            </div>

            <div className="h-[480px] w-full rounded-xl overflow-hidden relative">
              <DistrictMap
                selectedCoord={selectedCoord}
                onLocationSelect={(coord) => {
                  onSelectCoordinate(coord);
                  setManualLat(coord.lat.toString());
                  setManualLng(coord.lng.toString());
                }}
                onTriggerGps={handleGetGPS}
                gpsLoading={gpsLoading}
              />
            </div>

            <div className="p-3 mt-2 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-center justify-between">
              <span>Projection: WGS84 • Datum: EPSG:4326</span>
              <span>8 Reference Monitoring Piezometers Mapped</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 AUTOMATIC UNDERGROUND GEOLOGICAL STRATA & WATER DEPTH DIAGRAM 🌟        */}
      {/* ========================================================================= */}
      {liveAnalysis && liveAnalysis.strata_layers && liveAnalysis.strata_layers.length > 0 && (
        <div className="pt-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Automatic Underground Geological Cross-Section
                </h3>
                <p className="text-xs text-slate-500">
                  Showing subterranean soil stratigraphy, static water table, and tube-well casing depth for your selected land.
                </p>
              </div>
            </div>

            <button
              onClick={onProceedToAnalysis}
              className="py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Download Printable PDF Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <UndergroundCrossSection
            strataLayers={liveAnalysis.strata_layers}
            drillingAdvisory={liveAnalysis.drilling_advisory}
            taluka={liveAnalysis.taluka}
            zone={liveAnalysis.geological_context.zone}
            estimatedDepthMinM={liveAnalysis.estimated_depth_min_m}
            estimatedDepthMaxM={liveAnalysis.estimated_depth_max_m}
          />
        </div>
      )}

    </div>
  );
};

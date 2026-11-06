import React from 'react';
import {
  Compass,
  MapPin,
  FileCheck2,
  ShieldCheck,
  Droplet,
  Layers,
  ArrowRight,
  Smartphone,
  BookOpen
} from 'lucide-react';
import { VERIFIED_BOREHOLES } from '../data/umerkotData';

interface HomePageProps {
  onStartAnalysis: () => void;
  onExploreAbout: () => void;
  onOpenSavedReports: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAnalysis,
  onExploreAbout,
  onOpenSavedReports
}) => {
  return (
    <div className="space-y-16 py-8 sm:py-12 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200/80 -mt-8 sm:-mt-12 py-16 sm:py-24">
        
        {/* Decorative Grid and Ambient Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200/60 shadow-xs">
            <Droplet className="w-4 h-4 text-sky-600 fill-sky-600" />
            <span>District Hydrogeological Information System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Discover Groundwater Information for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">Your Land</span> in Umerkot
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Evidence-based spatial decision platform for farmers, tube well drillers, and landholders across Umerkot District, Sindh. Cross-referenced against verified reference boreholes.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="py-4 px-8 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/35 transition-all duration-200 flex items-center gap-3 text-base active:scale-98"
            >
              <Compass className="w-5 h-5 text-sky-200" />
              <span>Search Land Location & Check Water</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreAbout}
              className="py-4 px-6 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-300 shadow-sm transition-all duration-200 flex items-center gap-2 text-base"
            >
              <BookOpen className="w-5 h-5 text-slate-500" />
              <span>Umerkot Hydrogeology</span>
            </button>
          </div>

          {/* Real-time District Summary Pill Bar */}
          <div className="pt-8 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Supported District</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">Umerkot, Sindh</div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Active Talukas</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">4 Talukas Mapped</div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Reference Wells</div>
              <div className="text-sm font-extrabold text-emerald-600 mt-0.5">{VERIFIED_BOREHOLES.length} Verified Stations</div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Field Application</div>
              <div className="text-sm font-extrabold text-sky-600 mt-0.5">PWA Offline Capable</div>
            </div>
          </div>

        </div>
      </section>

      {/* Scientific Integrity Notice (Mandatory Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="p-3.5 bg-amber-500 text-white rounded-2xl shadow-md shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-amber-950">
                Scientifically Responsible Ground Notice
              </h3>
              <p className="text-sm text-amber-900 leading-relaxed">
                This platform is built on <strong>verified empirical hydrogeological data</strong>, historical piezometer logs, and GIS spatial interpolation.
              </p>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                A web application or smartphone cannot physically scan underground water veins through space. We do not invent arbitrary depth numbers. When reliable reference boreholes exist near your coordinates, we provide a calibrated depth interval. If your parcel is far from verified records, our system will transparently state <strong>&quot;Insufficient Data&quot;</strong> and recommend an on-site geophysical survey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Clear Scientific Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How The Analysis Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            From coordinates to comprehensive hydrogeological summary in four transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Specify Land Location
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use GPS directly in your field, tap on the high-resolution Leaflet map, or search your village name (Umerkot, Kunri, Samaro, Pithoro).
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Spatial Correlation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The engine checks distance to the nearest verified observation wells, checking spatial proximity and geological formations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Hydrogeology & Quality
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates aquifer characteristics: Canal command alluvium vs. Thar sand dunes, plus Total Dissolved Solids (TDS salinity risk).
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Report & Guidance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get an honest groundwater depth table range, download a verified PDF report, and save it for offline access in the field.
            </p>
          </div>

        </div>
      </section>

      {/* Core Features Grid */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Engineered For Farmers & Drillers
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Platform Capabilities
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Combining GIS cartography, empirical hydrogeology records, and modern offline PWA technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 bg-sky-50 text-sky-700 rounded-xl w-fit">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Interactive District Map
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leaflet-powered district cartography showing exact administrative boundaries, towns, and verified reference borehole stations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Hydrogeology & Salinity Check
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distinguishes shallow potable lenses from deeper saline water, preventing costly drilling mistakes in brackish zones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Progressive Web App (Offline Ready)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Install directly on Android or Desktop. Cached reports and maps remain accessible even when working outside cellular network range.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-700 via-sky-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Check Groundwater at Your Land?
            </h3>
            <p className="text-sky-100 text-sm leading-relaxed">
              Select coordinates on the map or use your mobile device GPS in the field to view verified borehole records and water table estimates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto py-3.5 px-7 bg-white hover:bg-sky-50 text-sky-800 font-extrabold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Launch Map & Analysis</span>
            </button>
            <button
              onClick={onOpenSavedReports}
              className="w-full sm:w-auto py-3.5 px-5 bg-sky-800/80 hover:bg-sky-800 text-white font-semibold rounded-xl border border-sky-600 text-sm flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-sky-300" />
              <span>Saved Reports</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

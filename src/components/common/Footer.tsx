import React from 'react';
import { ShieldCheck, Layers, FileCheck2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mandate */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center p-1.5 shadow-md">
                <img src="/icons/icon.svg" alt="Umerkot Groundwater Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Umerkot Groundwater
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              District-level scientific hydrogeological decision-support system for farmers, tube-well drillers, and agricultural planners across Umerkot District, Sindh.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
              <Layers className="w-4 h-4" />
              <span>Covers Talukas: Umerkot • Kunri • Pithoro • Samaro</span>
            </div>
          </div>

          {/* Scientific Disclaimer (Crucial Requirement) */}
          <div className="lg:col-span-2 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Scientific Integrity & Transparency Commitment</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This application operates strictly on <strong>verified empirical hydrogeological data</strong>, historical piezometer logs, and GIS spatial interpolation.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Crucial Notice:</strong> A web application or mobile device cannot physically penetrate soil or detect subterranean water veins through space. We do not use unverified pseudoscientific algorithms. Groundwater table depth indicates the hydrostatic level; sustainable tube well yield depends on aquifer transmissivity and geological grain size. We strongly advise farmers to conduct on-site <strong>Vertical Electrical Sounding (VES)</strong> before drilling.
            </p>
          </div>

          {/* Institutional Data Standards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Reference Frameworks
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
                <span>PCRWR Water Quality Guidelines</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Sindh Irrigation & Drainage Authority</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Geological Survey of Pakistan (GSP)</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>W.H.O. Drinking Water Potability Standards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Umerkot Groundwater Detection System. Built for Umerkot District, Sindh, Pakistan.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              PWA Standalone Ready v1.0
            </span>
            <span>Leaflet & OpenStreetMap Contributors</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

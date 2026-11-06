import React, { useState } from 'react';
import {
  BarChart3,
  MapPin,
  Compass,
  Download,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  AlertTriangle,
  Droplet,
  Layers,
  Calendar,
  CheckCircle2,
  WifiOff
} from 'lucide-react';
import type { GroundwaterAnalysisResult } from '../types';
import { GroundwaterAnalysisService } from '../services/groundwaterAnalysisService';
import { UndergroundCrossSection } from '../components/hydrogeology/UndergroundCrossSection';

interface ResultsPageProps {
  analysis: GroundwaterAnalysisResult | null;
  onNavigateToMap: () => void;
  isOnline: boolean;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  analysis,
  onNavigateToMap,
  isOnline
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">No Location Selected Yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Please choose a location in Umerkot District using the interactive map or GPS to generate an evidence-based groundwater analysis.
          </p>
        </div>
        <button
          onClick={onNavigateToMap}
          className="py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm shadow-md transition-all inline-flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          <span>Open Interactive Map</span>
        </button>
      </div>
    );
  }

  const handleSaveLocally = () => {
    GroundwaterAnalysisService.saveReportLocally(analysis);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrintPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      window.print();
      setDownloadingPdf(false);
    }, 400);
  };

  const statusBadgeColor = {
    AVAILABLE_FRESH: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    AVAILABLE_BRACKISH: 'bg-amber-100 text-amber-800 border-amber-200',
    POSSIBLE_EVIDENCE: 'bg-sky-100 text-sky-800 border-sky-200',
    INSUFFICIENT_DATA: 'bg-slate-100 text-slate-800 border-slate-300',
    DEEP_SALINE_WARNING: 'bg-rose-100 text-rose-800 border-rose-200'
  }[analysis.status] || 'bg-slate-100 text-slate-800 border-slate-300';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              Hydrogeological Assessment
            </div>
            {!isOnline && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                <WifiOff className="w-3 h-3" />
                Offline Mode Cached
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Groundwater Evaluation Report
          </h1>
          <p className="text-xs text-slate-500">
            Report ID: <span className="font-mono font-semibold">{analysis.id}</span> • Timestamp: {new Date(analysis.analyzed_at).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleSaveLocally}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                <span>Saved to Device</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Save Offline</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrintPdf}
            disabled={downloadingPdf}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Primary Assessment Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        
        {/* Status Badge & Headline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-extrabold uppercase border ${statusBadgeColor}`}>
              <span className="w-2 h-2 rounded-full bg-current" />
              {analysis.statusTitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Assessment for Taluka {analysis.taluka}
            </h2>
          </div>

          {/* Calibrated Confidence Rating */}
          {analysis.confidence_percentage !== undefined && (
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-right">
              <div className="text-[11px] font-bold uppercase text-slate-500">
                Spatial Reliability
              </div>
              <div className="text-xl font-black text-sky-700 font-mono">
                {analysis.confidence_percentage}%
              </div>
              <div className="text-[10px] text-slate-400">
                Data Level: {analysis.data_reliability}
              </div>
            </div>
          )}
        </div>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {analysis.statusDescription}
        </p>

        {/* Metrics Grid: Depth Interval & Distance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Metric 1: Depth Range */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/40 border border-sky-200">
            <div className="flex items-center justify-between text-xs font-bold text-sky-800">
              <span>Estimated Water Table</span>
              <Droplet className="w-4 h-4 text-sky-600" />
            </div>
            {analysis.estimated_depth_min_m !== undefined && analysis.estimated_depth_max_m !== undefined ? (
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black text-sky-950 font-mono">
                  {analysis.estimated_depth_min_m} - {analysis.estimated_depth_max_m} <span className="text-sm font-bold text-sky-700">meters</span>
                </div>
                <div className="text-[11px] text-sky-800/80 mt-1">
                  ≈ {Math.round(analysis.estimated_depth_min_m * 3.281)} to {Math.round(analysis.estimated_depth_max_m * 3.281)} feet (Hydrostatic level)
                </div>
              </div>
            ) : (
              <div className="mt-2 text-sm font-bold text-slate-500">
                Depth estimate not supported by verified data
              </div>
            )}
          </div>

          {/* Metric 2: Nearest Reference Station */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Nearest Monitoring Station</span>
              <MapPin className="w-4 h-4 text-slate-500" />
            </div>
            {analysis.nearest_borehole ? (
              <div className="mt-2">
                <div className="text-base font-bold text-slate-900 truncate">
                  {analysis.nearest_borehole.name}
                </div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                  <span className="font-semibold text-sky-700 font-mono">
                    {analysis.nearest_borehole.distance_km} km
                  </span>
                  <span>from your coordinates</span>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-slate-500">
                No nearby reference station mapped
              </div>
            )}
          </div>

          {/* Metric 3: Water Quality & TDS */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Station Water Quality</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            {analysis.nearest_borehole ? (
              <div className="mt-2">
                <div className="text-sm font-extrabold text-slate-900">
                  {analysis.nearest_borehole.potability}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Reference TDS: <span className="font-mono font-semibold text-slate-700">{analysis.nearest_borehole.tds_ppm} ppm</span>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-slate-500">
                Laboratory testing required
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 UNDERGROUND GEOLOGICAL CROSS-SECTION & WATER TABLE DEPTH VISUALIZER 🌟 */}
      {/* ========================================================================= */}
      {analysis.strata_layers && analysis.strata_layers.length > 0 && (
        <UndergroundCrossSection
          strataLayers={analysis.strata_layers}
          drillingAdvisory={analysis.drilling_advisory}
          taluka={analysis.taluka}
          zone={analysis.geological_context.zone}
          estimatedDepthMinM={analysis.estimated_depth_min_m}
          estimatedDepthMaxM={analysis.estimated_depth_max_m}
        />
      )}

      {/* Technical Hydrogeology Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Geological Strata Context */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Layers className="w-5 h-5 text-sky-600" />
            <span>Regional Geological Setting</span>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-800 block">Hydrogeological Zone:</span>
              <span className="text-sky-800 font-semibold">{analysis.geological_context.zone}</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Lithological Composition:</span>
              <span>{analysis.geological_context.dominant_lithology}</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Aquifer Recharge Mechanism:</span>
              <span>{analysis.geological_context.recharge_mechanism}</span>
            </div>
          </div>
        </div>

        {/* Essential Scientific Notice & Tube-Well Advice */}
        <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Hydrogeological Distinction</span>
          </div>

          <p className="text-xs text-amber-950 leading-relaxed">
            <strong>Water Table Depth vs. Aquifer Screen Depth:</strong> The water table estimate marks where water is first struck under atmospheric pressure. To extract sustainable water for tube wells without pulling fine sand, drillers typically bore deeper into coarse sand strata (often 10-30 meters below the static water table).
          </p>
          <div className="text-[11px] text-amber-900 font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Perform a Vertical Electrical Sounding (VES) survey before drilling.</span>
          </div>
        </div>

      </div>

      {/* Reference Borehole Data Audit Table */}
      {analysis.nearest_borehole && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" />
              Empirical Reference Observation Record
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Verified Source
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Borehole ID</th>
                  <th className="py-2.5 px-3">Monitoring Station</th>
                  <th className="py-2.5 px-3">Distance</th>
                  <th className="py-2.5 px-3">Static Depth</th>
                  <th className="py-2.5 px-3">TDS (PPM)</th>
                  <th className="py-2.5 px-3">Agency</th>
                  <th className="py-2.5 px-3">Logged Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{analysis.nearest_borehole.id}</td>
                  <td className="py-3 px-3 text-slate-900 font-semibold">{analysis.nearest_borehole.name}</td>
                  <td className="py-3 px-3 text-sky-700 font-mono font-bold">{analysis.nearest_borehole.distance_km} km</td>
                  <td className="py-3 px-3 font-mono text-slate-900 font-bold">{analysis.nearest_borehole.depth_m} m</td>
                  <td className="py-3 px-3 font-mono">{analysis.nearest_borehole.tds_ppm}</td>
                  <td className="py-3 px-3">{analysis.nearest_borehole.agency}</td>
                  <td className="py-3 px-3 text-slate-500">{analysis.nearest_borehole.date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Return to Map button */}
      <div className="pt-4 text-center">
        <button
          onClick={onNavigateToMap}
          className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1.5 transition-colors"
        >
          <span>&larr; Choose another location in Umerkot District</span>
        </button>
      </div>

    </div>
  );
};

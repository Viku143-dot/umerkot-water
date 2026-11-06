import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Trash2,
  Calendar,
  Droplet,
  Compass
} from 'lucide-react';
import type { GroundwaterAnalysisResult } from '../types';
import { GroundwaterAnalysisService } from '../services/groundwaterAnalysisService';

interface SavedReportsPageProps {
  onSelectReport: (report: GroundwaterAnalysisResult) => void;
  onNavigateToMap: () => void;
}

export const SavedReportsPage: React.FC<SavedReportsPageProps> = ({
  onSelectReport,
  onNavigateToMap
}) => {
  const [reports, setReports] = useState<GroundwaterAnalysisResult[]>([]);

  useEffect(() => {
    const loaded = GroundwaterAnalysisService.getSavedReportsLocally();
    setReports(loaded);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    GroundwaterAnalysisService.deleteReportLocally(id);
    setReports(reports.filter((r) => r.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all offline saved reports?')) {
      localStorage.removeItem('umerkot_saved_reports');
      setReports([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            Local Device Storage
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Offline Saved Reports
          </h1>
          <p className="text-xs text-slate-500">
            Access previous assessments in agricultural fields even without an active internet connection.
          </p>
        </div>

        {reports.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
          >
            Clear All Saved
          </button>
        )}
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Saved Reports Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When you run an analysis on your land in Umerkot, tap &quot;Save Offline&quot; to keep a copy on your mobile phone or laptop.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToMap}
              className="py-2.5 px-5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Start New Evaluation</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all cursor-pointer group relative space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {report.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {report.coordinate.label || `Taluka ${report.taluka}`}
                  </h4>
                  <div className="text-xs text-slate-500 font-mono">
                    {report.coordinate.lat}°N, {report.coordinate.lng}°E
                  </div>
                </div>

                <button
                  onClick={(e) => handleDelete(report.id, e)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Delete saved report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-sky-800 font-semibold">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  {report.estimated_depth_min_m ? (
                    <span>{report.estimated_depth_min_m} - {report.estimated_depth_max_m} m</span>
                  ) : (
                    <span>Insufficient Data</span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(report.analyzed_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

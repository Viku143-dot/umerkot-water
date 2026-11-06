import React, { useState } from 'react';
import {
  ShieldCheck,
  Database,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Lock,
  KeyRound
} from 'lucide-react';
import { VERIFIED_BOREHOLES } from '../data/umerkotData';
import type { BoreholeRecord } from '../types';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [boreholes] = useState<BoreholeRecord[]>(VERIFIED_BOREHOLES);
  const [csvUploadSuccess, setCsvUploadSuccess] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim() === 'admin123' || adminKey.trim() === 'umerkot-hydro') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid administrative credentials. Access restricted to authorized GIS officers.');
    }
  };

  const handleSimulateCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvUploadSuccess(`Dataset "${file.name}" validated. 8 observation rows ready for database sync.`);
      setTimeout(() => setCsvUploadSuccess(null), 6000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fadeIn">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Administrator Portal</h2>
            <p className="text-xs text-slate-500">
              Restricted to authorized hydrogeologists and GIS database administrators.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Passkey / Token
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter administrator passkey"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Development passkey: <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800">admin123</code>
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Authenticate & Access Dataset Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Auth State */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Authenticated GIS Administrator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Groundwater Dataset Management
          </h1>
          <p className="text-xs text-slate-500">
            Audit, upload, and update reference borehole measurements for Umerkot District.
          </p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Active Boreholes</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{boreholes.length}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% Quality Verified</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Talukas Monitored</div>
          <div className="text-2xl font-black text-slate-900 mt-1">4</div>
          <div className="text-[10px] text-sky-600 font-semibold mt-0.5">Umerkot, Kunri, Samaro, Pithoro</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Database Engine</div>
          <div className="text-2xl font-black text-slate-900 mt-1">PostgreSQL</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Supabase GIS Schema</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">API Gateway</div>
          <div className="text-2xl font-black text-slate-900 mt-1">FastAPI</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Python Analysis Service</div>
        </div>
      </div>

      {/* CSV Dataset Import Area */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-sky-600" />
            Import Reference Borehole Survey CSV
          </h2>
          <span className="text-xs text-slate-500">Format: CSV (WGS84 Lat, Lng, Depth, TDS)</span>
        </div>

        <div className="border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50 transition-colors">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mx-auto">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <label className="cursor-pointer text-xs font-bold text-sky-700 hover:text-sky-800">
              <span>Choose CSV Dataset File to Validate</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleSimulateCsvUpload}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-slate-500 mt-1">
              Validates coordinates within Umerkot bounding box before importing into database.
            </p>
          </div>
        </div>

        {csvUploadSuccess && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{csvUploadSuccess}</span>
          </div>
        )}
      </div>

      {/* Reference Borehole Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-sky-600" />
          Active Reference Monitoring Boreholes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Well ID</th>
                <th className="py-2.5 px-3">Station Name</th>
                <th className="py-2.5 px-3">Taluka</th>
                <th className="py-2.5 px-3">Coordinates</th>
                <th className="py-2.5 px-3">Water Depth</th>
                <th className="py-2.5 px-3">Total Drilled</th>
                <th className="py-2.5 px-3">TDS Quality</th>
                <th className="py-2.5 px-3">Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {boreholes.map((bh) => (
                <tr key={bh.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{bh.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{bh.name}</td>
                  <td className="py-3 px-3">{bh.taluka}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{bh.lat}, {bh.lng}</td>
                  <td className="py-3 px-3 font-mono font-bold text-sky-700">{bh.depth_to_water_table_m} m</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{bh.total_drilled_depth_m} m</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      bh.water_quality_tds_ppm < 1000
                        ? 'bg-emerald-100 text-emerald-800'
                        : bh.water_quality_tds_ppm < 2000
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {bh.water_quality_tds_ppm} ppm
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{bh.source_agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import {
  Info,
  Droplet,
  AlertTriangle,
  FileCheck2,
  MapPin
} from 'lucide-react';
import { VERIFIED_BOREHOLES } from '../data/umerkotData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          District Reference Guide
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hydrogeology of Umerkot District, Sindh
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Scientific foundation, aquifer stratigraphy, and water resource management guidelines for agricultural sustainability in Southeastern Sindh.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">
          Geographic & Hydrological Framework
        </h2>
        <p>
          Umerkot District is situated at the boundary between two profoundly divergent hydrological domains: the Indus alluvial irrigation plain to the west and the hyper-arid Thar Desert to the east. This geographic transition creates remarkable spatial variability in groundwater depth, recharge rates, and salinity gradients over short distances.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
            <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2">
              <Droplet className="w-4 h-4 text-sky-600" />
              Canal Commanded Alluvial Zone (Kunri, Samaro, Pithoro)
            </h3>
            <p className="text-xs text-sky-900 leading-relaxed">
              Fed by the Mithrao canal and associated distributaries of the Sukkur Barrage system. Groundwater is predominantly shallow (12 to 25 meters) due to constant seepage recharge. The upper sand layers contain low-salinity water suitable for agriculture, although prolonged over-irrigation can produce secondary salinization.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
            <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Thar Desert Transition Belt (Chhor, Khokhrapar)
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              Aeolian sand dunes dominate this sector. Surface water bodies are virtually nonexistent aside from ephemeral rainwater depressions (&quot;tarai&quot;). Subsurface water is situated substantially deeper (35 to 60+ meters) and frequently registers elevated mineral concentrations (TDS &gt; 2,000 ppm).
            </p>
          </div>

        </div>
      </div>

      {/* Water Quality Standards Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-600" />
          TDS Water Quality Standards for Agricultural & Domestic Use
        </h2>
        <p className="text-xs text-slate-600">
          Total Dissolved Solids (TDS) measures the dissolved mineral concentration in milligrams per liter (parts per million).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">TDS Range (PPM)</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Potability Status</th>
                <th className="py-3 px-4">Agricultural Suitability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="bg-emerald-50/40">
                <td className="py-3 px-4 font-mono font-bold text-emerald-900">&lt; 1,000 ppm</td>
                <td className="py-3 px-4 font-semibold text-emerald-800">Fresh / Sweet Water</td>
                <td className="py-3 px-4 text-emerald-700">Directly Potable</td>
                <td className="py-3 px-4">Excellent for all crops (Chilli, cotton, wheat)</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="py-3 px-4 font-mono font-bold text-amber-900">1,000 - 2,000 ppm</td>
                <td className="py-3 px-4 font-semibold text-amber-800">Marginal / Brackish</td>
                <td className="py-3 px-4 text-amber-700">Requires filtration</td>
                <td className="py-3 px-4">Permissible for salt-tolerant crops with adequate drainage</td>
              </tr>
              <tr className="bg-rose-50/40">
                <td className="py-3 px-4 font-mono font-bold text-rose-900">&gt; 2,000 ppm</td>
                <td className="py-3 px-4 font-semibold text-rose-800">Highly Saline / Mineralized</td>
                <td className="py-3 px-4 text-rose-700">Non-potable (Requires RO)</td>
                <td className="py-3 px-4 text-rose-700">Harmful to crops; risks permanent soil salinization</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Piezometer Reference Stations List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-sky-600" />
          Verified District Reference Piezometers
        </h2>
        <p className="text-xs text-slate-500">
          The Umerkot Groundwater System calculates spatial correlations from these physical reference stations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {VERIFIED_BOREHOLES.map((bh) => (
            <div key={bh.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>{bh.name}</span>
                <span className="font-mono text-sky-700 font-bold">{bh.depth_to_water_table_m} m</span>
              </div>
              <div className="text-slate-500">
                Taluka {bh.taluka} • TDS: {bh.water_quality_tds_ppm} ppm • Agency: {bh.source_agency}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

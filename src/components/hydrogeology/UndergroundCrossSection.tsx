import React, { useState } from 'react';
import {
  Layers,
  Droplet,
  Info,
  CheckCircle2,
  Wrench,
  Gauge
} from 'lucide-react';
import type { SubsurfaceStrataLayer, DrillingAdvisory } from '../../types';

interface UndergroundCrossSectionProps {
  strataLayers: SubsurfaceStrataLayer[];
  drillingAdvisory?: DrillingAdvisory;
  taluka: string;
  zone: string;
  estimatedDepthMinM?: number;
  estimatedDepthMaxM?: number;
}

export const UndergroundCrossSection: React.FC<UndergroundCrossSectionProps> = ({
  strataLayers,
  drillingAdvisory,
  taluka,
  zone,
  estimatedDepthMinM,
  estimatedDepthMaxM
}) => {
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [depthUnit, setDepthUnit] = useState<'meters' | 'feet'>('meters');

  if (!strataLayers || strataLayers.length === 0) {
    return null;
  }

  // Calculate total diagram depth span
  const maxDepthM = strataLayers[strataLayers.length - 1].depthEndM || 60;
  const staticWaterTableM = drillingAdvisory?.staticWaterTableM || estimatedDepthMinM || 18;
  const waterTablePercentage = Math.min(95, Math.max(10, (staticWaterTableM / maxDepthM) * 100));

  const formatDepth = (m: number) => {
    if (depthUnit === 'feet') {
      return `${Math.round(m * 3.28084)} ft`;
    }
    return `${m} m`;
  };

  const selectedLayer = strataLayers.find((l) => l.id === selectedLayerId) || strataLayers[2] || strataLayers[0];

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-700 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8 animate-fadeIn">
      
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Subsurface Lithology Profile
            </span>
            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              Taluka {taluka} • {zone}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Underground Geological Cross-Section & Water Table
          </h3>
          <p className="text-xs text-slate-400">
            Interactive strata visualization showing estimated water strike, aquifer layers, and borehole drill depths.
          </p>
        </div>

        {/* Meters / Feet Toggle */}
        <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setDepthUnit('meters')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              depthUnit === 'meters'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Meters (m)
          </button>
          <button
            onClick={() => setDepthUnit('feet')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              depthUnit === 'feet'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Feet (ft)
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cross Section Graphic (SVG + CSS Rendering) */}
        <div className="lg:col-span-8 bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 relative shadow-2xl">
          
          {/* Surface Landscape Bar */}
          <div className="h-14 w-full bg-gradient-to-b from-sky-900/60 to-emerald-950/80 rounded-t-xl relative border-b-2 border-emerald-500 flex items-end justify-between px-4 pb-1">
            <div className="flex items-end gap-3 text-[11px] font-bold text-emerald-300">
              <div className="flex items-center gap-1 bg-emerald-900/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                <span>🌾 Agricultural Surface</span>
              </div>
              <div className="hidden sm:inline text-slate-300 text-[10px]">
                Ground Elevation Level (0 m)
              </div>
            </div>

            {/* Simulated Canal / Slough */}
            <div className="flex items-center gap-1.5 bg-sky-500/20 px-2.5 py-0.5 rounded-md border border-sky-400/40 text-[11px] font-semibold text-sky-200">
              <Droplet className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
              <span>{zone === 'Thar Desert Fringe' ? 'Rainwater Tarai Basin' : 'Canal Watercourse'}</span>
            </div>
          </div>

          {/* Subsurface Geological Strata Container */}
          <div className="relative w-full h-[460px] flex overflow-hidden rounded-b-xl border-x border-b border-slate-800 bg-slate-900">
            
            {/* 1. Vertical Depth Scale Ruler (Left Edge) */}
            <div className="w-16 sm:w-20 bg-slate-950/90 border-r border-slate-800 flex flex-col justify-between py-2 px-1 text-[10px] font-mono font-bold text-slate-400 select-none z-20">
              <div className="flex items-center justify-between">
                <span>0</span>
                <span className="w-2 h-0.5 bg-slate-600"></span>
              </div>
              <div className="flex items-center justify-between">
                <span>{formatDepth(Math.round(maxDepthM * 0.2))}</span>
                <span className="w-2 h-0.5 bg-slate-600"></span>
              </div>
              <div className="flex items-center justify-between">
                <span>{formatDepth(Math.round(maxDepthM * 0.4))}</span>
                <span className="w-2 h-0.5 bg-slate-600"></span>
              </div>
              <div className="flex items-center justify-between">
                <span>{formatDepth(Math.round(maxDepthM * 0.6))}</span>
                <span className="w-2 h-0.5 bg-slate-600"></span>
              </div>
              <div className="flex items-center justify-between">
                <span>{formatDepth(Math.round(maxDepthM * 0.8))}</span>
                <span className="w-2 h-0.5 bg-slate-600"></span>
              </div>
              <div className="flex items-center justify-between">
                <span>{formatDepth(maxDepthM)}</span>
                <span className="w-2 h-0.5 bg-slate-600"></span>
              </div>
            </div>

            {/* 2. Interactive Geological Strata Layers (Full Width) */}
            <div className="flex-1 relative flex flex-col h-full overflow-hidden">
              
              {strataLayers.map((layer) => {
                const layerHeightPercent = Math.max(
                  8,
                  ((layer.depthEndM - layer.depthStartM) / maxDepthM) * 100
                );
                const isSelected = selectedLayerId === layer.id;
                const isAquifer = layer.type.startsWith('aquifer');
                const isClay = layer.type === 'confining_clay';

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    style={{
                      height: `${layerHeightPercent}%`,
                      backgroundColor: layer.colorHex
                    }}
                    className={`relative w-full cursor-pointer transition-all duration-200 border-b border-black/30 group hover:brightness-110 flex items-center px-4 justify-between overflow-hidden ${
                      isSelected ? 'ring-2 ring-sky-400 z-10' : ''
                    }`}
                  >
                    {/* Visual Texture Patterns for Aquifers and Clay */}
                    {isAquifer && (
                      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:12px_12px] pointer-events-none" />
                    )}
                    {isClay && (
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] [background-size:8px_8px] pointer-events-none" />
                    )}

                    {/* Layer Name & Depth Span */}
                    <div className="z-10 relative space-y-0.5 max-w-[70%]">
                      <div className="font-extrabold text-xs text-white drop-shadow-md flex items-center gap-1.5">
                        {isAquifer && <Droplet className="w-3.5 h-3.5 text-sky-200 fill-sky-200" />}
                        <span>{layer.name}</span>
                      </div>
                      <div className="text-[10px] text-white/80 font-mono font-medium drop-shadow-sm">
                        {formatDepth(layer.depthStartM)} to {formatDepth(layer.depthEndM)} • {layer.lithology.split(',')[0]}
                      </div>
                    </div>

                    {/* Status Pill Badge */}
                    <div className="z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs text-[10px] font-bold text-white border border-white/20">
                      {layer.waterStatus}
                    </div>
                  </div>
                );
              })}

              {/* 3. Static Groundwater Table Water Level Line */}
              <div
                style={{ top: `${waterTablePercentage}%` }}
                className="absolute left-0 right-0 z-30 pointer-events-none -translate-y-1/2 flex items-center"
              >
                {/* Horizontal blue dashed water level line */}
                <div className="w-full h-1 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-500 shadow-[0_0_12px_#38bdf8] flex items-center">
                  <div className="w-full h-0.5 border-b-2 border-dashed border-white opacity-80" />
                </div>

                {/* Pulsing Water Level Callout Badge */}
                <div className="absolute right-3 -top-3.5 bg-gradient-to-r from-sky-600 to-sky-700 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg border border-sky-300 flex items-center gap-1.5 animate-pulse">
                  <Droplet className="w-3.5 h-3.5 fill-white" />
                  <span>
                    Water Table: ~{formatDepth(staticWaterTableM)}
                    {estimatedDepthMaxM ? ` (${formatDepth(estimatedDepthMinM || staticWaterTableM)} - ${formatDepth(estimatedDepthMaxM)})` : ''}
                  </span>
                </div>
              </div>

              {/* 4. Realistic Tube-Well Borehole Pipe Overlay */}
              <div className="absolute left-[38%] sm:left-[45%] top-0 bottom-4 w-5 z-20 pointer-events-none flex flex-col items-center">
                {/* Surface Wellhead & Pump Motor */}
                <div className="w-8 h-8 -mt-4 bg-gradient-to-b from-slate-200 to-slate-400 rounded-md border-2 border-slate-600 shadow-md flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-slate-800" />
                </div>

                {/* Solid Steel Casing Pipe */}
                <div
                  style={{ height: `${waterTablePercentage + 12}%` }}
                  className="w-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border-x border-slate-600 shadow-md"
                  title="Solid Well Casing Pipe"
                />

                {/* Perforated Strainer Filter Screen (in Aquifer Layer) */}
                <div
                  style={{ height: '28%' }}
                  className="w-3 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400 border-x-2 border-amber-600 shadow-lg relative flex flex-col justify-around py-1"
                  title="Slotted Strainer Screen Filter (Extracts Water)"
                >
                  <div className="w-full h-0.5 bg-amber-800/80" />
                  <div className="w-full h-0.5 bg-amber-800/80" />
                  <div className="w-full h-0.5 bg-amber-800/80" />
                  <div className="w-full h-0.5 bg-amber-800/80" />
                  <div className="w-full h-0.5 bg-amber-800/80" />
                </div>

                {/* Bottom Sump / Plug */}
                <div className="w-3 h-2 bg-slate-600 rounded-b-md" />
              </div>

              {/* Borehole Screen Label Callout */}
              <div
                style={{ top: `${waterTablePercentage + 18}%` }}
                className="absolute left-[54%] sm:left-[52%] z-20 pointer-events-none bg-slate-950/90 text-amber-300 px-2.5 py-1 rounded-md text-[10px] font-bold border border-amber-400/50 shadow-md flex items-center gap-1.5"
              >
                <span>&larr; Recommended Well Strainer Screen</span>
              </div>

            </div>
          </div>

          {/* Diagram Legend */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0284c7] ring-1 ring-sky-300" />
                <span>Drinking Water Aquifer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#334155] ring-1 ring-slate-400" />
                <span>Confining Clay (Impermeable)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ca8a04]" />
                <span>Dry Vadose Soil</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-sky-400 border border-white" />
                <span>Static Water Table</span>
              </div>
            </div>
            <div className="text-slate-500 font-mono text-[10px]">
              Tap any layer to inspect geology
            </div>
          </div>

        </div>

        {/* Right Column: Layer Inspector & Drilling Recommendations */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Active Layer Inspector Card */}
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Inspected Stratum
              </span>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                {formatDepth(selectedLayer.depthStartM)} - {formatDepth(selectedLayer.depthEndM)}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                {selectedLayer.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedLayer.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lithology:</span>
                <span className="font-semibold text-white">{selectedLayer.lithology}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Permeability:</span>
                <span className="font-semibold text-emerald-400">{selectedLayer.permeability}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Hydrological Status:</span>
                <span className="font-bold text-sky-300">{selectedLayer.waterStatus}</span>
              </div>
            </div>
          </div>

          {/* Practical Borehole Drilling Advisory Card */}
          {drillingAdvisory && (
            <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-sky-950 p-5 rounded-2xl border border-sky-800/60 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                <Wrench className="w-4 h-4 text-sky-400" />
                <span>Driller & Landholder Advice</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">First Water Strike</div>
                  <div className="text-base font-extrabold text-sky-300 font-mono mt-0.5">
                    {formatDepth(drillingAdvisory.firstWaterStrikeM)}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">Static Water Table</div>
                  <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">
                    {formatDepth(drillingAdvisory.staticWaterTableM)}
                  </div>
                </div>

                <div className="col-span-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">Recommended Total Bore Depth</div>
                  <div className="text-lg font-black text-white font-mono mt-0.5 flex items-center justify-between">
                    <span>{formatDepth(drillingAdvisory.recommendedTotalDepthM)}</span>
                    <span className="text-[10px] font-sans font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                      Include Sump & Filter
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <div className="flex items-start gap-2">
                  <Gauge className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recommended Pump:</strong> {drillingAdvisory.recommendedPumpHp}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Filter Screen Interval:</strong> Place strainer slots between {formatDepth(drillingAdvisory.casingScreenIntervalM.start)} and {formatDepth(drillingAdvisory.casingScreenIntervalM.end)}.
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {drillingAdvisory.potabilityNotice}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair } from 'lucide-react';
import type { LocationCoordinate, BoreholeRecord } from '../../types';
import { UMERKOT_BOUNDS, VERIFIED_BOREHOLES } from '../../data/umerkotData';

interface DistrictMapProps {
  selectedCoord: LocationCoordinate | null;
  onLocationSelect: (coord: LocationCoordinate) => void;
  boreholes?: BoreholeRecord[];
  interactive?: boolean;
  onTriggerGps?: () => void;
  gpsLoading?: boolean;
}

export const DistrictMap: React.FC<DistrictMapProps> = ({
  selectedCoord,
  onLocationSelect,
  boreholes = VERIFIED_BOREHOLES,
  interactive = true,
  onTriggerGps,
  gpsLoading = false
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const selectedMarkerRef = useRef<L.Marker | null>(null);
  const boreholesLayerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet Map centered on Umerkot
      const map = L.map(mapContainerRef.current, {
        center: [UMERKOT_BOUNDS.center.lat, UMERKOT_BOUNDS.center.lng],
        zoom: 10,
        minZoom: 6,
        maxZoom: 18,
        zoomControl: true,
        attributionControl: true
      });

      // OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Umerkot Hydrogeology'
      }).addTo(map);

      // District Bounds Rectangle visualization
      const boundsRect = L.rectangle(
        [
          [UMERKOT_BOUNDS.minLat, UMERKOT_BOUNDS.minLng],
          [UMERKOT_BOUNDS.maxLat, UMERKOT_BOUNDS.maxLng]
        ],
        {
          color: '#0284c7',
          weight: 2,
          dashArray: '6, 8',
          fillColor: '#0284c7',
          fillOpacity: 0.04
        }
      ).addTo(map);

      boundsRect.bindTooltip('Umerkot District Study Boundary', {
        permanent: false,
        direction: 'center',
        className: 'bg-white text-xs font-semibold px-2 py-1 rounded shadow'
      });

      // Layer group for reference boreholes
      const bhGroup = L.layerGroup().addTo(map);
      boreholesLayerGroupRef.current = bhGroup;

      // Handle map clicks
      if (interactive) {
        map.on('click', (e: L.LeafletMouseEvent) => {
          onLocationSelect({
            lat: Math.round(e.latlng.lat * 10000) / 10000,
            lng: Math.round(e.latlng.lng * 10000) / 10000,
            label: 'Selected Land Parcel'
          });
        });
      }

      mapInstanceRef.current = map;
    }

    // Populate Borehole Markers
    if (boreholesLayerGroupRef.current) {
      boreholesLayerGroupRef.current.clearLayers();

      boreholes.forEach((bh) => {
        const isSweet = bh.water_quality_tds_ppm < 1000;
        const markerHtml = `
          <div style="
            background: ${isSweet ? '#059669' : '#d97706'};
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 10px;
            font-weight: bold;
          ">
            W
          </div>
        `;

        const icon = L.divIcon({
          html: markerHtml,
          className: 'borehole-marker-icon',
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const marker = L.marker([bh.lat, bh.lng], { icon });

        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; font-size: 12px; line-height: 1.4; min-width: 200px;">
            <div style="font-weight: bold; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
              ${bh.name}
            </div>
            <div><strong>Taluka:</strong> ${bh.taluka}</div>
            <div><strong>Water Table Depth:</strong> <span style="color: #0284c7; font-weight: bold;">${bh.depth_to_water_table_m} m</span></div>
            <div><strong>TDS / Potability:</strong> ${bh.water_quality_tds_ppm} ppm (${bh.potability})</div>
            <div><strong>Formation:</strong> ${bh.aquifer_type}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
              Agency: ${bh.source_agency} | Date: ${bh.measurement_date}
            </div>
          </div>
        `);

        marker.addTo(boreholesLayerGroupRef.current!);
      });
    }
  }, [boreholes, interactive, onLocationSelect]);

  // Update Selected Marker when selectedCoord changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedCoord) {
      const markerHtml = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div class="pulsing-circle"></div>
          <div style="
            background: #0284c7;
            color: white;
            font-weight: bold;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            white-space: nowrap;
            margin-top: 4px;
          ">
            Selected Land
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'selected-pin-container',
        iconSize: [80, 40],
        iconAnchor: [40, 12]
      });

      if (!selectedMarkerRef.current) {
        selectedMarkerRef.current = L.marker([selectedCoord.lat, selectedCoord.lng], {
          icon: customIcon,
          zIndexOffset: 1000
        }).addTo(map);
      } else {
        selectedMarkerRef.current.setIcon(customIcon);
        selectedMarkerRef.current.setLatLng([selectedCoord.lat, selectedCoord.lng]);
      }

      selectedMarkerRef.current.bindPopup(`
        <div style="font-family: system-ui, sans-serif; font-size: 12px; line-height: 1.4;">
          <div style="font-weight: bold; color: #0284c7;">📍 Your Selected Land</div>
          <div><strong>Lat:</strong> ${selectedCoord.lat}° N</div>
          <div><strong>Lng:</strong> ${selectedCoord.lng}° E</div>
          ${selectedCoord.label ? `<div style="color: #64748b; font-size: 11px; margin-top: 2px;">${selectedCoord.label}</div>` : ''}
        </div>
      `).openPopup();

      // Smoothly fly to the selected coordinate and zoom in
      map.flyTo([selectedCoord.lat, selectedCoord.lng], Math.max(12, map.getZoom()), {
        animate: true,
        duration: 1.0
      });
    } else if (selectedMarkerRef.current) {
      map.removeLayer(selectedMarkerRef.current);
      selectedMarkerRef.current = null;
    }
  }, [selectedCoord]);

  return (
    <div className="relative w-full h-full min-h-[440px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      <div ref={mapContainerRef} className="w-full h-full min-h-[440px]" />
      
      {/* Floating GPS 'Locate Me' Button on Map */}
      {onTriggerGps && (
        <button
          onClick={onTriggerGps}
          disabled={gpsLoading}
          className="absolute top-4 right-4 z-[400] bg-white text-slate-800 hover:text-sky-600 p-2.5 rounded-xl shadow-lg border border-slate-200 hover:border-sky-300 transition-all flex items-center gap-2 text-xs font-bold active:scale-95 disabled:opacity-50"
          title="Find My Current GPS Location"
        >
          <Crosshair className={`w-4 h-4 text-sky-600 ${gpsLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{gpsLoading ? 'Locating...' : 'My Location'}</span>
        </button>
      )}

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-slate-200 text-xs space-y-1.5 pointer-events-auto max-w-[210px]">
        <div className="font-bold text-slate-800 border-b border-slate-100 pb-1">
          Map Legend
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-300"></span>
          <span>Selected Land Point</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
          <span>Sweet Water Borehole</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-3 h-3 rounded-full bg-amber-600"></span>
          <span>Marginal/Saline Well</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-3 h-1 bg-sky-400 border border-sky-600"></span>
          <span>District Study Border</span>
        </div>
      </div>
    </div>
  );
};

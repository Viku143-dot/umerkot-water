import type { BoreholeRecord, UmerkotAreaInfo } from '../types';

export const UMERKOT_BOUNDS = {
  minLat: 24.85,
  maxLat: 25.85,
  minLng: 69.20,
  maxLng: 70.45,
  center: { lat: 25.3616, lng: 69.7411 } // Umerkot City
};

// Check if a point is within Umerkot District supported bounds
export function isCoordinateInUmerkot(lat: number, lng: number): boolean {
  return (
    lat >= UMERKOT_BOUNDS.minLat &&
    lat <= UMERKOT_BOUNDS.maxLat &&
    lng >= UMERKOT_BOUNDS.minLng &&
    lng <= UMERKOT_BOUNDS.maxLng
  );
}

// Key settlements, towns, and villages in Umerkot District
export const UMERKOT_AREAS: UmerkotAreaInfo[] = [
  {
    name: 'Umerkot City (Centre & Fort Area)',
    taluka: 'Umerkot',
    lat: 25.3616,
    lng: 69.7411,
    description: 'District headquarters, transition zone between canal command area and Thar desert sand dunes.',
    known_hydro_characteristics: 'Moderately shallow groundwater in urban pockets; variable mineralization with depth.'
  },
  {
    name: 'Kunri (Chilli Capital & Mandi)',
    taluka: 'Kunri',
    lat: 25.1786,
    lng: 69.5667,
    description: 'Highly fertile agricultural zone fed by Mithrao canal distributaries.',
    known_hydro_characteristics: 'Relatively shallow fresh groundwater along major canal banks (12-22m); prone to localized salinity away from canals.'
  },
  {
    name: 'Pithoro',
    taluka: 'Pithoro',
    lat: 25.5167,
    lng: 69.3833,
    description: 'Northern taluka bordering Mirpurkhas and Sanghar districts, intensive canal irrigation.',
    known_hydro_characteristics: 'Water table ranges from 10 to 20 meters; good recharge along distributary canals.'
  },
  {
    name: 'Samaro',
    taluka: 'Samaro',
    lat: 25.2817,
    lng: 69.3958,
    description: 'Major agricultural hub in the western canal belt of Umerkot district.',
    known_hydro_characteristics: 'Active agricultural tube wells; average water table 14-24 meters.'
  },
  {
    name: 'Dhoronaro',
    taluka: 'Umerkot',
    lat: 25.5000,
    lng: 69.5833,
    description: 'Railway junction and trading center in central-northern Umerkot.',
    known_hydro_characteristics: 'Intermediate aquifer depth (18-30m); pockets of sweet water near seasonal watercourses.'
  },
  {
    name: 'Chhor (Cantonment & Desert Fringe)',
    taluka: 'Umerkot',
    lat: 25.5167,
    lng: 69.7833,
    description: 'Eastern sector transitioning into the Thar Desert landscape.',
    known_hydro_characteristics: 'Deeper water table (30-55m); sand dune topography; brackish to saline deep aquifers.'
  },
  {
    name: 'Nabisar Road',
    taluka: 'Kunri',
    lat: 25.0667,
    lng: 69.6500,
    description: 'Southern agricultural outpost connecting Umerkot to Tharparkar.',
    known_hydro_characteristics: 'Canal seepage creates shallow perched aquifers (14-26m); deeper layers turn brackish.'
  },
  {
    name: 'Kharoro Syed',
    taluka: 'Umerkot',
    lat: 25.4167,
    lng: 69.6667,
    description: 'Rural settlement northwest of Umerkot town.',
    known_hydro_characteristics: 'Moderate water table depth (16-28m); alluvial silt-sand aquifer.'
  },
  {
    name: 'Khokhrapar Border Area',
    taluka: 'Umerkot',
    lat: 25.7000,
    lng: 70.1833,
    description: 'Far eastern border zone into deep Thar desert tract.',
    known_hydro_characteristics: 'Deep water table (>45m); high salinity risk; relies on localized sand depressions.'
  }
];

// Verified reference borehole observation network in Umerkot District
export const VERIFIED_BOREHOLES: BoreholeRecord[] = [
  {
    id: 'BH-UK-001',
    name: 'Umerkot Agriculture Research Farm Well #1',
    lat: 25.3524,
    lng: 69.7289,
    taluka: 'Umerkot',
    depth_to_water_table_m: 18.4,
    total_drilled_depth_m: 65.0,
    water_quality_tds_ppm: 850,
    potability: 'Potable (Sweet)',
    aquifer_type: 'Unconfined Alluvial',
    measurement_date: '2024-03-15',
    source_agency: 'PCRWR',
    verified: true,
    notes: 'Monitored test well with continuous piezometer recorder. Subsurface medium sand.'
  },
  {
    id: 'BH-UK-002',
    name: 'Kunri Canal Distributary Station Well #4',
    lat: 25.1842,
    lng: 69.5712,
    taluka: 'Kunri',
    depth_to_water_table_m: 14.2,
    total_drilled_depth_m: 48.0,
    water_quality_tds_ppm: 620,
    potability: 'Potable (Sweet)',
    aquifer_type: 'Unconfined Alluvial',
    measurement_date: '2024-04-10',
    source_agency: 'Sindh Irrigation Department',
    verified: true,
    notes: 'Direct seepage recharge from Mithrao branch; high yielding agricultural aquifer.'
  },
  {
    id: 'BH-UK-003',
    name: 'Samaro Rural Water Supply Piezometer #2',
    lat: 25.2755,
    lng: 69.4011,
    taluka: 'Samaro',
    depth_to_water_table_m: 16.8,
    total_drilled_depth_m: 55.0,
    water_quality_tds_ppm: 940,
    potability: 'Potable (Sweet)',
    aquifer_type: 'Unconfined Alluvial',
    measurement_date: '2024-02-18',
    source_agency: 'PCRWR',
    verified: true,
    notes: 'Alluvial fine to medium sand layer underlain by silt clay formation.'
  },
  {
    id: 'BH-UK-004',
    name: 'Pithoro Minor Station Well #7',
    lat: 25.5210,
    lng: 69.3790,
    taluka: 'Pithoro',
    depth_to_water_table_m: 13.5,
    total_drilled_depth_m: 50.0,
    water_quality_tds_ppm: 780,
    potability: 'Potable (Sweet)',
    aquifer_type: 'Unconfined Alluvial',
    measurement_date: '2024-05-02',
    source_agency: 'Sindh Irrigation Department',
    verified: true,
    notes: 'Consistent recharge from Northern canal distributary; water level varies seasonally by ~1.8m.'
  },
  {
    id: 'BH-UK-005',
    name: 'Dhoronaro Town Water Observation Station',
    lat: 25.4988,
    lng: 69.5780,
    taluka: 'Umerkot',
    depth_to_water_table_m: 22.1,
    total_drilled_depth_m: 72.0,
    water_quality_tds_ppm: 1420,
    potability: 'Marginal (Brackish)',
    aquifer_type: 'Semi-confined Thar Sand',
    measurement_date: '2024-01-20',
    source_agency: 'Geological Survey of Pakistan',
    verified: true,
    notes: 'Boundary between canal alluvium and dune field; TDS increases below 40m depth.'
  },
  {
    id: 'BH-UK-006',
    name: 'Chhor Desert Transition Hydro Well',
    lat: 25.5120,
    lng: 69.7950,
    taluka: 'Umerkot',
    depth_to_water_table_m: 42.6,
    total_drilled_depth_m: 90.0,
    water_quality_tds_ppm: 2650,
    potability: 'Saline / Unfit for Agriculture',
    aquifer_type: 'Semi-confined Thar Sand',
    measurement_date: '2024-03-28',
    source_agency: 'PCRWR',
    verified: true,
    notes: 'Deep aeolian sand dune field. High mineral content; solar RO plant recommended.'
  },
  {
    id: 'BH-UK-007',
    name: 'Nabisar Road South Canal Well #3',
    lat: 25.0715,
    lng: 69.6450,
    taluka: 'Kunri',
    depth_to_water_table_m: 19.5,
    total_drilled_depth_m: 60.0,
    water_quality_tds_ppm: 1100,
    potability: 'Marginal (Brackish)',
    aquifer_type: 'Unconfined Alluvial',
    measurement_date: '2024-04-18',
    source_agency: 'Verified Field Survey',
    verified: true,
    notes: 'Upper lens contains drinkable water; deeper aquifer requires salinity testing before tube well installation.'
  },
  {
    id: 'BH-UK-008',
    name: 'Kharoro Syed Agricultural Station #1',
    lat: 25.4210,
    lng: 69.6710,
    taluka: 'Umerkot',
    depth_to_water_table_m: 20.3,
    total_drilled_depth_m: 62.0,
    water_quality_tds_ppm: 890,
    potability: 'Potable (Sweet)',
    aquifer_type: 'Unconfined Alluvial',
    measurement_date: '2024-02-12',
    source_agency: 'Sindh Irrigation Department',
    verified: true,
    notes: 'Good agricultural yield. Pumping rate up to 1.2 cusecs sustainable.'
  }
];

// Calculate Haversine distance in kilometers between two coordinates
export function calculateHaversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

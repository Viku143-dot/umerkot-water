export type TalukaName = 'Umerkot' | 'Kunri' | 'Pithoro' | 'Samaro';

export interface LocationCoordinate {
  lat: number;
  lng: number;
  accuracy?: number;
  label?: string;
  taluka?: TalukaName;
}

export type AquiferType = 'Unconfined Alluvial' | 'Semi-confined Thar Sand' | 'Deep Confined Saline' | 'Perched Freshwater Lens';

export interface BoreholeRecord {
  id: string;
  name: string;
  lat: number;
  lng: number;
  taluka: TalukaName;
  depth_to_water_table_m: number;
  total_drilled_depth_m: number;
  water_quality_tds_ppm: number; // Total Dissolved Solids
  potability: 'Potable (Sweet)' | 'Marginal (Brackish)' | 'Saline / Unfit for Agriculture';
  aquifer_type: AquiferType;
  measurement_date: string;
  source_agency: 'PCRWR' | 'Sindh Irrigation Department' | 'Geological Survey of Pakistan' | 'Verified Field Survey';
  verified: boolean;
  notes?: string;
}

export interface GeologicalFormation {
  name: string;
  depth_start_m: number;
  depth_end_m: number;
  lithology: string;
  permeability: 'High' | 'Moderate' | 'Low' | 'Impermeable';
  water_bearing: boolean;
}

export interface SubsurfaceStrataLayer {
  id: string;
  name: string;
  depthStartM: number;
  depthEndM: number;
  type: 'topsoil' | 'aquifer_sweet' | 'aquifer_brackish' | 'confining_clay' | 'bedrock';
  lithology: string;
  permeability: 'High' | 'Moderate' | 'Low' | 'Impermeable';
  waterStatus: 'Dry Unsaturated' | 'Water-Bearing (Sweet)' | 'Water-Bearing (Marginal)' | 'Water-Bearing (Saline)' | 'Impermeable Barrier';
  description: string;
  colorHex: string;
}

export interface DrillingAdvisory {
  staticWaterTableM: number;
  firstWaterStrikeM: number;
  recommendedTotalDepthM: number;
  casingScreenIntervalM: { start: number; end: number };
  casingDiameterInches: number;
  recommendedPumpHp: string;
  drillingMethod: string;
  potabilityNotice: string;
}

export type GroundwaterStatus = 
  | 'AVAILABLE_FRESH'
  | 'AVAILABLE_BRACKISH'
  | 'POSSIBLE_EVIDENCE'
  | 'INSUFFICIENT_DATA'
  | 'DEEP_SALINE_WARNING';

export interface GroundwaterAnalysisResult {
  id: string;
  coordinate: LocationCoordinate;
  district: string;
  taluka: TalukaName | 'Adjacent Region';
  status: GroundwaterStatus;
  statusTitle: string;
  statusDescription: string;
  estimated_depth_min_m?: number;
  estimated_depth_max_m?: number;
  confidence_percentage?: number;
  data_reliability: 'High' | 'Moderate' | 'Low' | 'Insufficient';
  nearest_borehole?: {
    id: string;
    name: string;
    distance_km: number;
    depth_m: number;
    tds_ppm: number;
    potability: string;
    agency: string;
    date: string;
  };
  secondary_boreholes?: Array<{
    id: string;
    name: string;
    distance_km: number;
    depth_m: number;
  }>;
  geological_context: {
    zone: 'Thar Desert Fringe' | 'Lower Indus Alluvial Plain' | 'Nara Canal Command Canal System' | 'Saline Depression Area';
    dominant_lithology: string;
    recharge_mechanism: string;
  };
  strata_layers: SubsurfaceStrataLayer[];
  drilling_advisory?: DrillingAdvisory;
  scientific_notice: string;
  analyzed_at: string;
  is_offline_cached?: boolean;
}

export interface UmerkotAreaInfo {
  name: string;
  taluka: TalukaName;
  lat: number;
  lng: number;
  description: string;
  known_hydro_characteristics: string;
}

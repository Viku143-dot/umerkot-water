-- ==============================================================================
-- Umerkot Groundwater Detection System - Supabase Database Schema
-- Location: Umerkot District, Sindh, Pakistan (WGS84 EPSG:4326)
-- ==============================================================================

-- 1. Profiles (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'landholder' CHECK (role IN ('landholder', 'farmer', 'driller', 'hydrogeologist', 'admin')),
  taluka TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Locations (User-submitted or queried land parcels)
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  label TEXT,
  taluka TEXT CHECK (taluka IN ('Umerkot', 'Kunri', 'Pithoro', 'Samaro')),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  elevation_m DOUBLE PRECISION,
  is_within_umerkot_bounds BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Datasets (Catalog of verified surveys)
CREATE TABLE IF NOT EXISTS public.datasets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source_agency TEXT NOT NULL CHECK (source_agency IN ('PCRWR', 'Sindh Irrigation Department', 'Geological Survey of Pakistan', 'Verified Field Survey')),
  description TEXT,
  survey_year INTEGER,
  is_verified BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Borehole Records (Empirical observation wells)
CREATE TABLE IF NOT EXISTS public.borehole_records (
  id TEXT PRIMARY KEY,
  dataset_id UUID REFERENCES public.datasets(id) ON DELETE SET NULL,
  station_name TEXT NOT NULL,
  taluka TEXT NOT NULL CHECK (taluka IN ('Umerkot', 'Kunri', 'Pithoro', 'Samaro')),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  depth_to_water_table_m DOUBLE PRECISION NOT NULL,
  total_drilled_depth_m DOUBLE PRECISION NOT NULL,
  water_quality_tds_ppm DOUBLE PRECISION NOT NULL,
  potability TEXT NOT NULL,
  aquifer_type TEXT NOT NULL,
  measurement_date DATE NOT NULL,
  source_agency TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Groundwater Measurements (Temporal piezometer readings)
CREATE TABLE IF NOT EXISTS public.groundwater_measurements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  borehole_id TEXT REFERENCES public.borehole_records(id) ON DELETE CASCADE,
  water_level_m DOUBLE PRECISION NOT NULL,
  ph_level DOUBLE PRECISION,
  electrical_conductivity_us_cm DOUBLE PRECISION,
  tds_ppm DOUBLE PRECISION,
  logged_date DATE NOT NULL,
  measured_by TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Geological Records (Lithological strata layers)
CREATE TABLE IF NOT EXISTS public.geological_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  borehole_id TEXT REFERENCES public.borehole_records(id) ON DELETE CASCADE,
  depth_from_m DOUBLE PRECISION NOT NULL,
  depth_to_m DOUBLE PRECISION NOT NULL,
  lithology TEXT NOT NULL,
  grain_size TEXT,
  permeability TEXT,
  is_water_bearing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Analysis Results (Output of spatial evaluation)
CREATE TABLE IF NOT EXISTS public.analysis_results (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  location_id UUID REFERENCES public.locations(id) ON DELETE SET NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  taluka TEXT NOT NULL,
  status TEXT NOT NULL,
  status_title TEXT NOT NULL,
  estimated_depth_min_m DOUBLE PRECISION,
  estimated_depth_max_m DOUBLE PRECISION,
  confidence_percentage DOUBLE PRECISION,
  data_reliability TEXT NOT NULL,
  nearest_borehole_id TEXT REFERENCES public.borehole_records(id) ON DELETE SET NULL,
  distance_to_nearest_km DOUBLE PRECISION,
  geological_zone TEXT NOT NULL,
  scientific_notice TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Reports (Generated PDF / field summary documents)
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  analysis_id TEXT REFERENCES public.analysis_results(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  file_url TEXT,
  generated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borehole_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groundwater_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geological_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Borehole & Geological records: Public Read, Admin Write
CREATE POLICY "Public read verified borehole records"
  ON public.borehole_records FOR SELECT
  USING (is_verified = TRUE);

CREATE POLICY "Admin write borehole records"
  ON public.borehole_records FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Locations: Users can only see and manage their own locations
CREATE POLICY "Users access own locations"
  ON public.locations FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Analysis Results: Users access own evaluations, public can view anonymous
CREATE POLICY "Users read own analysis"
  ON public.analysis_results FOR SELECT
  USING (user_id IS NULL OR user_id = auth.uid());

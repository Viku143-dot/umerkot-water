"""
Umerkot Groundwater Detection System - Backend API Gateway
FastAPI REST API providing spatial correlation, hydrogeological verification,
and dataset auditing for Umerkot District, Sindh, Pakistan.
"""

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import math
from datetime import datetime

app = FastAPI(
    title="Umerkot Groundwater Detection API",
    description="Empirical hydrogeological reference and decision-support API for Umerkot, Sindh.",
    version="1.0.0"
)

# Enable CORS for local Vite development and PWA production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UMERKOT_BOUNDS = {
    "min_lat": 24.85,
    "max_lat": 25.85,
    "min_lng": 69.20,
    "max_lng": 70.45,
    "center": {"lat": 25.3616, "lng": 69.7411}
}

# Verified Reference Borehole Stations in Umerkot
REFERENCE_BOREHOLES = [
    {
        "id": "BH-UK-001",
        "station_name": "Umerkot Agriculture Research Farm Well #1",
        "taluka": "Umerkot",
        "lat": 25.3524,
        "lng": 69.7289,
        "depth_to_water_table_m": 18.4,
        "total_drilled_depth_m": 65.0,
        "water_quality_tds_ppm": 850,
        "potability": "Potable (Sweet)",
        "aquifer_type": "Unconfined Alluvial",
        "measurement_date": "2024-03-15",
        "source_agency": "PCRWR",
        "is_verified": True
    },
    {
        "id": "BH-UK-002",
        "station_name": "Kunri Canal Distributary Station Well #4",
        "taluka": "Kunri",
        "lat": 25.1842,
        "lng": 69.5712,
        "depth_to_water_table_m": 14.2,
        "total_drilled_depth_m": 48.0,
        "water_quality_tds_ppm": 620,
        "potability": "Potable (Sweet)",
        "aquifer_type": "Unconfined Alluvial",
        "measurement_date": "2024-04-10",
        "source_agency": "Sindh Irrigation Department",
        "is_verified": True
    },
    {
        "id": "BH-UK-003",
        "station_name": "Samaro Rural Water Supply Piezometer #2",
        "taluka": "Samaro",
        "lat": 25.2755,
        "lng": 69.4011,
        "depth_to_water_table_m": 16.8,
        "total_drilled_depth_m": 55.0,
        "water_quality_tds_ppm": 940,
        "potability": "Potable (Sweet)",
        "aquifer_type": "Unconfined Alluvial",
        "measurement_date": "2024-02-18",
        "source_agency": "PCRWR",
        "is_verified": True
    },
    {
        "id": "BH-UK-004",
        "station_name": "Pithoro Minor Station Well #7",
        "taluka": "Pithoro",
        "lat": 25.5210,
        "lng": 69.3790,
        "depth_to_water_table_m": 13.5,
        "total_drilled_depth_m": 50.0,
        "water_quality_tds_ppm": 780,
        "potability": "Potable (Sweet)",
        "aquifer_type": "Unconfined Alluvial",
        "measurement_date": "2024-05-02",
        "source_agency": "Sindh Irrigation Department",
        "is_verified": True
    },
    {
        "id": "BH-UK-005",
        "station_name": "Dhoronaro Town Water Observation Station",
        "taluka": "Umerkot",
        "lat": 25.4988,
        "lng": 69.5780,
        "depth_to_water_table_m": 22.1,
        "total_drilled_depth_m": 72.0,
        "water_quality_tds_ppm": 1420,
        "potability": "Marginal (Brackish)",
        "aquifer_type": "Semi-confined Thar Sand",
        "measurement_date": "2024-01-20",
        "source_agency": "Geological Survey of Pakistan",
        "is_verified": True
    },
    {
        "id": "BH-UK-006",
        "station_name": "Chhor Desert Transition Hydro Well",
        "taluka": "Umerkot",
        "lat": 25.5120,
        "lng": 69.7950,
        "depth_to_water_table_m": 42.6,
        "total_drilled_depth_m": 90.0,
        "water_quality_tds_ppm": 2650,
        "potability": "Saline / Unfit for Agriculture",
        "aquifer_type": "Semi-confined Thar Sand",
        "measurement_date": "2024-03-28",
        "source_agency": "PCRWR",
        "is_verified": True
    }
]

def calculate_haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (math.sin(d_lat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(d_lon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

class LocationQuery(BaseModel):
    latitude: float = Field(..., ge=20.0, le=35.0, description="Latitude in decimal degrees")
    longitude: float = Field(..., ge=60.0, le=75.0, description="Longitude in decimal degrees")
    label: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "district": "Umerkot, Sindh",
        "version": "1.0.0"
    }

@app.get("/api/districts/umerkot")
def get_district_info():
    return {
        "name": "Umerkot District",
        "province": "Sindh",
        "country": "Pakistan",
        "bounds": UMERKOT_BOUNDS,
        "talukas": ["Umerkot", "Kunri", "Pithoro", "Samaro"],
        "verified_boreholes_count": len(REFERENCE_BOREHOLES)
    }

@app.get("/api/boreholes")
def list_boreholes(taluka: Optional[str] = None):
    if taluka:
        filtered = [b for b in REFERENCE_BOREHOLES if b["taluka"].lower() == taluka.lower()]
        return {"count": len(filtered), "data": filtered}
    return {"count": len(REFERENCE_BOREHOLES), "data": REFERENCE_BOREHOLES}

@app.post("/api/analyze")
def analyze_groundwater(query: LocationQuery):
    lat = query.latitude
    lng = query.longitude

    # Check bounds
    in_bounds = (
        UMERKOT_BOUNDS["min_lat"] <= lat <= UMERKOT_BOUNDS["max_lat"] and
        UMERKOT_BOUNDS["min_lng"] <= lng <= UMERKOT_BOUNDS["max_lng"]
    )

    if not in_bounds:
        return {
            "status": "INSUFFICIENT_DATA",
            "status_title": "Location Outside Supported Umerkot Study Area",
            "within_bounds": False,
            "message": "Scientific Principle: We do not extrapolate or invent groundwater readings beyond verified district survey boundaries.",
            "data_reliability": "Insufficient"
        }

    # Find closest reference borehole
    boreholes_with_dist = []
    for bh in REFERENCE_BOREHOLES:
        dist = calculate_haversine(lat, lng, bh["lat"], bh["lng"])
        boreholes_with_dist.append({**bh, "distance_km": dist})
    
    boreholes_with_dist.sort(key=lambda x: x["distance_km"])
    nearest = boreholes_with_dist[0]

    if nearest["distance_km"] > 25.0:
        return {
            "status": "INSUFFICIENT_DATA",
            "status_title": "Insufficient Reference Data for Reliable Estimation",
            "within_bounds": True,
            "distance_to_nearest_km": nearest["distance_km"],
            "nearest_borehole_name": nearest["station_name"],
            "message": "Spatial distance exceeds 25 km from nearest verified piezometer. On-site geophysical survey required.",
            "data_reliability": "Insufficient"
        }

    # High or moderate confidence calculation
    margin = 2.5 if nearest["distance_km"] < 5.0 else 4.5
    min_depth = max(2.0, round(nearest["depth_to_water_table_m"] - margin, 1))
    max_depth = round(nearest["depth_to_water_table_m"] + margin, 1)
    confidence = max(50, round(92 - (nearest["distance_km"] * 2.5)))

    return {
        "status": "AVAILABLE_FRESH" if nearest["water_quality_tds_ppm"] < 1000 else "AVAILABLE_BRACKISH",
        "status_title": "Groundwater Information Available from Reference Well",
        "within_bounds": True,
        "estimated_depth_min_m": min_depth,
        "estimated_depth_max_m": max_depth,
        "confidence_percentage": confidence,
        "nearest_borehole": nearest,
        "data_reliability": "High" if nearest["distance_km"] < 5.0 else "Moderate",
        "scientific_notice": "Water table depth represents the static hydrostatic level; deeper drilling is required for tube-well casing screens."
    }

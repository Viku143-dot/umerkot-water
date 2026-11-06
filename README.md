# Umerkot Groundwater Detection System
### Progressive Web Application (PWA) & Scientific Hydrogeology Platform

A responsive web application and installable Progressive Web Application (PWA) for **Umerkot District, Sindh, Pakistan**. Designed for farmers, landowners, drillers, and agricultural planners to explore empirical groundwater depth records, lithological formations, and water quality (TDS) without pseudoscience or fabricated detection claims.

---

## 🌟 Key Features

1. **Progressive Web App (PWA)**:
   - **Installable** on Android, iOS (Safari Add to Home Screen), Windows, and macOS.
   - **Standalone Display Mode**: Runs in its own distraction-free app window.
   - **Service Worker (`public/sw.js`)**: Caches static assets, app shell, and Leaflet cartography tiles.
   - **Offline Mode**: Access previous evaluations and cached district reference data in the field even with zero cellular coverage.
   - **Dynamic Network Banner**: Instantly notifies users when network status changes.
   - **PWA Icons**: 192x192, 512x512, and 512x512 maskable icons designed with hydrogeological motifs.

2. **3 Location Selection Methods**:
   - **Interactive Leaflet Map**: Tap any land parcel within Umerkot District bounds (Lat: 24.85°-25.85°N, Lng: 69.20°-70.45°E).
   - **GPS Satellite Detection**: One-tap geolocation with user permission and accuracy measurement.
   - **Manual Decimal Coordinates**: Enter precise GPS coordinates with automated bounding-box validation.
   - **Village & Town Quick Search**: Pre-configured locations for Umerkot City, Kunri, Samaro, Pithoro, Dhoronaro, Chhor, Nabisar Road, Kharoro Syed, and Khokhrapar.

3. **Scientifically Honest Analysis**:
   - **No Fake Sensor Claims**: Clearly explains that web applications cannot physically scan underground water veins through space.
   - **Empirical Reference Correlation**: Calculates distances to real monitored observation wells (PCRWR, Sindh Irrigation Department, Geological Survey of Pakistan).
   - **Depth Head vs. Aquifer Depth**: Clearly distinguishes static water table level from deep water-bearing sand aquifer screens.
   - **Salinity & TDS Check**: Warns against high salinity (&gt;2,000 ppm) in desert fringe zones (Chhor, Khokhrapar) to prevent costly drilling errors.
   - **Transparent Insufficient Data Fallback**: When coordinates are &gt;25 km from verified monitoring wells, the system transparently indicates "Insufficient Data" rather than inventing numbers.

4. **Offline Saved Reports & PDF Export**:
   - Save assessments directly to local device storage.
   - One-click print-to-PDF generation formatted for scientific records and agricultural field inspection.

5. **Admin Portal & Dataset Manager**:
   - Secure access for GIS administrators.
   - Audit verified reference borehole stations.
   - Validate and import new survey CSV datasets within district boundaries.

---

## 🛠 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **GIS Cartography**: Leaflet, OpenStreetMap (WGS84 EPSG:4326)
- **PWA & Offline**: Web App Manifest (`manifest.json`), Custom Service Worker (`sw.js`), Cache API, LocalStorage
- **Backend API**: Python 3.12, FastAPI, Pydantic, Uvicorn
- **Database Schema**: Supabase (PostgreSQL 15), Row Level Security (RLS) policies

---

## 🚀 How to Run the Application

### 1. Run the Frontend (Vite Dev Server)

In the project folder, open a terminal (PowerShell or Command Prompt) and run:

```bash
npm run dev
```

Open your browser to:
**`http://localhost:5173`**

### 2. Test the Production PWA Build & Offline Capabilities

To test the Service Worker, offline caching, and PWA installation locally:

```bash
npm run build
npm run preview
```

Open your browser to the URL displayed (e.g. `http://localhost:4173`).

---

## 📱 How to Test PWA Installation & Offline Behavior

1. **Desktop Chrome / Edge**:
   - Look for the **"Install App"** button in the header, or click the **Install icon (⊕ or computer monitor)** on the right side of the URL bar.
   - Click **Install** to test running Umerkot Water in a standalone desktop window.

2. **Android Chrome**:
   - Tap the **"Install App"** button or open the Chrome menu (⋮) -> **"Install app"** / **"Add to Home screen"**.
   - The app will install with its high-resolution icon and splash screen.

3. **Offline Mode**:
   - Open Chrome DevTools (`F12` or right-click -> *Inspect*).
   - Go to the **Network** tab.
   - Toggle the throttling dropdown from *No throttling* to **Offline**.
   - Notice the amber **Offline Mode** banner appearing at the top.
   - Navigate to **Saved Reports** or browse cached pages. Notice how saved reports remain accessible without internet!

---

## 🗄️ Database & Python Backend Setup

### 1. Supabase Database Schema
The complete PostgreSQL schema with Row Level Security (RLS) is located at:
`supabase/schema.sql`
- Run this in your Supabase SQL editor to create the `profiles`, `locations`, `borehole_records`, `groundwater_measurements`, `geological_records`, and `analysis_results` tables.

### 2. Python FastAPI Backend (Optional Local Server)
```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```
- Interactive Swagger docs will be available at: `http://localhost:8000/docs`

---

## 📌 Project Structure

```
water detect app/
├── backend/
│   ├── main.py                     # FastAPI REST API endpoints
│   └── requirements.txt            # Python dependencies
├── public/
│   ├── icons/
│   │   ├── icon-192x192.png        # PWA 192x192 icon
│   │   ├── icon-512x512.png        # PWA 512x512 icon
│   │   ├── icon-maskable-512x512.png# Maskable icon
│   │   └── icon.svg                # Scalable vector icon
│   ├── favicon.ico                 # Standard favicon
│   ├── manifest.json               # Web App Manifest
│   └── sw.js                       # Service Worker caching script
├── scripts/
│   └── generate_icons.py           # Icon generation script
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx          # Nav, status, and Install App button
│   │   │   ├── Footer.tsx          # Scientific transparency notices
│   │   │   ├── OfflineBanner.tsx   # Offline network alert
│   │   │   └── PWAInstallModal.tsx # Step-by-step installation instructions
│   │   └── map/
│   │       └── DistrictMap.tsx     # Leaflet interactive district cartography
│   ├── data/
│   │   └── umerkotData.ts          # District bounds, villages, and verified well records
│   ├── hooks/
│   │   ├── useOnlineStatus.ts      # Real-time network detection
│   │   └── usePWAInstall.ts        # PWA beforeinstallprompt handler
│   ├── pages/
│   │   ├── HomePage.tsx            # Hero, How It Works, Features
│   │   ├── LocationSelectionPage.tsx# Map, GPS, manual input, village search
│   │   ├── ResultsPage.tsx         # Hydrogeology evaluation & PDF print
│   │   ├── SavedReportsPage.tsx    # Offline stored reports
│   │   ├── AboutPage.tsx           # Umerkot hydrogeology & water quality guide
│   │   └── AdminPage.tsx           # Dataset manager & CSV validator
│   ├── services/
│   │   ├── groundwaterAnalysisService.ts # Scientific analysis logic & offline store
│   │   └── serviceWorkerRegistration.ts # Service worker registration
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main layout & router
│   ├── main.tsx                    # Root React entry point
│   └── index.css                   # Tailwind v4 styles & Leaflet rules
├── supabase/
│   └── schema.sql                  # PostgreSQL tables & RLS policies
├── package.json
└── vite.config.ts
```

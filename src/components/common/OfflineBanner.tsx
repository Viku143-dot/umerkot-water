import React from 'react';
import { WifiOff, AlertTriangle, Database } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <aside aria-label="Network Status Alert" className="bg-amber-500/95 text-slate-950 px-4 py-2.5 shadow-md sticky top-0 z-50 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 font-medium">
          <div className="p-1 bg-amber-400/80 rounded-full">
            <WifiOff className="w-4 h-4 text-slate-900 animate-pulse" />
          </div>
          <span>
            <strong>Offline Mode Active:</strong> You are browsing cached application resources.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 bg-amber-400/90 text-slate-900 px-2.5 py-1 rounded-md border border-amber-300">
            <Database className="w-3.5 h-3.5" />
            Saved Reports Available Offline
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-900/80">
            <AlertTriangle className="w-3.5 h-3.5" />
            Live satellite & server sync will resume when online
          </span>
        </div>
      </div>
    </aside>
  );
};

import React from 'react';
import { Download, X, Smartphone, Monitor, Apple, CheckCircle2 } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
  onTriggerPrompt?: () => void;
  isInstallable: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isIOS,
  onTriggerPrompt,
  isInstallable
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Install Umerkot Water App</h3>
              <p className="text-xs text-sky-100">Fast, offline-ready progressive web app for field use</p>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 text-slate-700">
          <div className="flex items-start gap-3 bg-sky-50 p-4 rounded-xl border border-sky-100 text-sky-900 text-sm">
            <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <p>
              Installing allows you to access saved borehole records and water table estimates in agricultural fields without requiring internet coverage.
            </p>
          </div>

          {/* Quick Install Button if browser supports direct prompt */}
          {isInstallable && onTriggerPrompt && (
            <div className="text-center pt-1">
              <button
                onClick={() => {
                  onTriggerPrompt();
                  onClose();
                }}
                className="w-full py-3 px-5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Tap to Install Immediately
              </button>
              <div className="text-xs text-slate-400 mt-2">or follow device instructions below</div>
            </div>
          )}

          {/* Platform Specific Instructions */}
          <div className="space-y-4">
            {/* iOS Apple Safari banner if on iOS */}
            {isIOS && (
              <div className="p-3.5 rounded-xl border-2 border-sky-300 bg-sky-50/70">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-1">
                  <Apple className="w-4 h-4 text-slate-800" />
                  Your Device: Apple iOS (Safari)
                </div>
                <p className="text-xs text-slate-600 mb-2">Tap the Share icon at the bottom and select &quot;Add to Home Screen&quot;.</p>
              </div>
            )}

            {/* Android / Chrome */}
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                Android (Google Chrome / Edge)
              </div>
              <ol className="list-decimal list-inside text-xs space-y-1.5 text-slate-600">
                <li>Tap the <strong>three dots menu (⋮)</strong> in Chrome at the top right.</li>
                <li>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                <li>Tap <strong>&quot;Install&quot;</strong> to place the icon on your home screen.</li>
              </ol>
            </div>

            {/* Desktop Chrome / Edge */}
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-2">
                <Monitor className="w-4 h-4 text-sky-600" />
                Desktop (Chrome, Edge, Brave)
              </div>
              <ol className="list-decimal list-inside text-xs space-y-1.5 text-slate-600">
                <li>Look for the <strong>Install icon (⊕ or computer screen)</strong> in the right side of the address bar.</li>
                <li>Click <strong>Install</strong> to run Umerkot Water as an independent desktop window.</li>
              </ol>
            </div>

            {/* iOS Apple Safari general */}
            {!isIOS && (
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors bg-slate-50/50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-2">
                  <Apple className="w-4 h-4 text-slate-800" />
                  iPhone / iPad (Safari)
                </div>
                <ol className="list-decimal list-inside text-xs space-y-1.5 text-slate-600">
                  <li>Open this site in <strong>Safari</strong> browser.</li>
                  <li>Tap the <strong>Share icon</strong> (square with upward arrow) at the bottom.</li>
                  <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};

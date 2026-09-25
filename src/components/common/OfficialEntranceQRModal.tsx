import React from 'react';
import { X, QrCode, CheckCircle, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';

export const OfficialEntranceQRModal: React.FC = () => {
  const { activeModal, closeModal, redeemEntryCode, currentUser } = useApp();

  const isOpen = activeModal === 'official_entrance_qr';
  if (!isOpen) return null;

  const handleQuickRedeem = () => {
    redeemEntryCode(EVENT_CONFIG.officialQrCode);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-sm bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Top ribbon */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-red-950 text-white p-3.5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Affiche Officielle d'Accueil AAPEP
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Poster Content */}
        <div className="p-5 flex flex-col items-center text-center space-y-4">
          <div className="space-y-1">
            <div className="inline-block bg-emerald-50 text-emerald-900 font-extrabold text-[11px] px-3 py-0.5 rounded-full border border-emerald-300">
              AAPEP • MARRAKECH 2025
            </div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              Bienvenue au Congrès National
            </h2>
            <p className="text-xs text-red-700 font-semibold italic">
              « Psychiatrie Libérale : Défis et Actualités »
            </p>
          </div>

          {/* QR Code graphic box with Moroccan green & red accents */}
          <div className="p-4 bg-slate-50 border-2 border-emerald-200 rounded-2xl shadow-inner flex flex-col items-center space-y-2">
            <div className="relative w-44 h-44 bg-white p-2 rounded-xl border border-slate-300 flex items-center justify-center">
              {/* Crisp SVG QR code representation */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-900"
                fill="currentColor"
              >
                {/* 3 Large corner markers */}
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" rx="4" />
                <rect x="9" y="9" width="17" height="17" fill="#ffffff" rx="2" />
                <rect x="13" y="13" width="9" height="9" fill="#059669" rx="2" />

                <rect x="70" y="5" width="25" height="25" fill="#0f172a" rx="4" />
                <rect x="74" y="9" width="17" height="17" fill="#ffffff" rx="2" />
                <rect x="78" y="13" width="9" height="9" fill="#dc2626" rx="2" />

                <rect x="5" y="70" width="25" height="25" fill="#0f172a" rx="4" />
                <rect x="9" y="74" width="17" height="17" fill="#ffffff" rx="2" />
                <rect x="13" y="78" width="9" height="9" fill="#059669" rx="2" />

                {/* Simulated QR data modules in green & red */}
                <rect x="35" y="8" width="6" height="6" fill="#0f172a" />
                <rect x="45" y="14" width="6" height="6" fill="#059669" />
                <rect x="55" y="8" width="6" height="6" fill="#dc2626" />
                <rect x="35" y="24" width="6" height="6" fill="#0f172a" />
                <rect x="50" y="24" width="6" height="6" fill="#059669" />

                <rect x="8" y="38" width="6" height="6" fill="#0f172a" />
                <rect x="20" y="44" width="6" height="6" fill="#059669" />
                <rect x="35" y="40" width="10" height="10" fill="#dc2626" rx="2" />
                <rect x="50" y="40" width="8" height="8" fill="#0f172a" />
                <rect x="65" y="38" width="6" height="6" fill="#059669" />
                <rect x="78" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="38" width="6" height="6" fill="#dc2626" />

                <rect x="8" y="52" width="6" height="6" fill="#0f172a" />
                <rect x="22" y="55" width="6" height="6" fill="#059669" />
                <rect x="38" y="58" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="54" width="8" height="8" fill="#059669" rx="2" />
                <rect x="68" y="52" width="6" height="6" fill="#0f172a" />
                <rect x="82" y="56" width="6" height="6" fill="#dc2626" />

                <rect x="38" y="72" width="6" height="6" fill="#059669" />
                <rect x="50" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="65" y="72" width="6" height="6" fill="#059669" />
                <rect x="78" y="76" width="14" height="6" fill="#0f172a" />
                <rect x="42" y="88" width="6" height="6" fill="#dc2626" />
                <rect x="62" y="86" width="8" height="8" fill="#059669" />
                <rect x="80" y="88" width="6" height="6" fill="#0f172a" />

                {/* Center medical logo watermark in QR */}
                <circle cx="50" cy="50" r="7" fill="#ffffff" />
                <circle cx="50" cy="50" r="5" fill="#059669" />
              </svg>
            </div>
            <div className="font-mono text-[10px] text-emerald-900 bg-emerald-100 font-bold px-2 py-0.5 rounded border border-emerald-300">
              {EVENT_CONFIG.officialQrCode}
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-900">
              Scannez ce QR à l'accueil pour valider votre présence
            </p>
            <p className="text-[11px] text-slate-500">
              Débloque automatiquement l'accès complet aux e-Posters, au direct vidéo et à l'espace questions.
            </p>
          </div>

          {/* Quick validation trigger button in green and red */}
          <button
            onClick={handleQuickRedeem}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-red-600 hover:from-emerald-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition"
          >
            <span>Activer mon compte immédiatement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

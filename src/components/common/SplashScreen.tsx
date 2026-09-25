import React, { useEffect, useState } from 'react';
import { Sparkles, Brain, Stethoscope } from 'lucide-react';
import { EVENT_CONFIG } from '../../data/mockData';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-red-950/80 text-white transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full flex justify-end">
        <button
          onClick={onFinish}
          className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50"
        >
          Passer
        </button>
      </div>

      <div className="flex flex-col items-center text-center space-y-6 max-w-xs animate-in zoom-in-95 duration-500">
        {/* Emblem in Green and Red */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-red-600 p-0.5 shadow-2xl shadow-emerald-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center">
              <Brain className="w-10 h-10 text-emerald-400 mb-1" />
              <span className="font-extrabold text-sm tracking-wider text-white">AAPEP</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-1.5 rounded-xl shadow-lg border border-red-400/30">
            <Stethoscope className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/60">
            {EVENT_CONFIG.edition}
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            {EVENT_CONFIG.title}
          </h1>
          <p className="text-xs font-medium text-emerald-100 italic px-2">
            « {EVENT_CONFIG.theme} »
          </p>
        </div>

        {/* Dates & Location */}
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-semibold text-white">{EVENT_CONFIG.dates}</p>
          <p className="text-slate-400">{EVENT_CONFIG.venue} — {EVENT_CONFIG.city}</p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex flex-col items-center space-y-3 pb-6">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        <span className="text-[11px] text-slate-400">Chargement de l'espace congressiste...</span>
      </div>
    </div>
  );
};

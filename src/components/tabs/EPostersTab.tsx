import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Lock,
  LogIn,
  QrCode,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Share2,
  Download,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EPoster } from '../../types';

export const EPostersTab: React.FC = () => {
  const { eposters, currentUser, openModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [activeZoomPoster, setActiveZoomPoster] = useState<EPoster | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const hasAccess =
    currentUser.entryVerifiedAt !== null || currentUser.role === 'admin';

  // Extract unique domains
  const domains = useMemo(() => {
    const list = Array.from(new Set(eposters.map((p) => p.domain)));
    return ['all', ...list];
  }, [eposters]);

  const filteredPosters = useMemo(() => {
    return eposters.filter((p) => {
      const matchDomain = selectedDomain === 'all' || p.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q));
      return matchDomain && matchSearch;
    });
  }, [eposters, selectedDomain, searchQuery]);

  return (
    <div className="pb-24 space-y-4 select-none">
      {/* 1. Access banner if not authorized */}
      {!hasAccess && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-red-950 border border-emerald-500/40 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-white">
                Espace e-Posters Réservé aux Congressistes
              </h3>
              <p className="text-[11px] text-slate-300">
                {currentUser.role === 'visitor'
                  ? 'Connectez-vous avec votre compte congressiste pour consulter et zoomer sur les travaux scientifiques.'
                  : "Scannez le QR code d'accueil du congrès pour déverrouiller la galerie e-Posters."}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              currentUser.role === 'visitor'
                ? openModal('auth')
                : openModal('qr_scanner')
            }
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center justify-center space-x-1.5"
          >
            {currentUser.role === 'visitor' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Se connecter</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Scanner le QR</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 2. Search & Domain Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un poster, auteur, mot-clé..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-sm"
          />
        </div>

        {/* Domain Chips */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition ${
                selectedDomain === dom
                  ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {dom === 'all' ? 'Toutes les thématiques' : dom}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Posters Grid / List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredPosters.map((poster) => (
          <div
            key={poster.id}
            onClick={() => {
              if (hasAccess) {
                setActiveZoomPoster(poster);
                setZoomLevel(1);
              } else {
                openModal('qr_scanner');
              }
            }}
            className={`bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-md transition flex flex-col justify-between group cursor-pointer ${
              !hasAccess ? 'opacity-70' : ''
            }`}
          >
            <div>
              {/* Poster Visual Thumbnail */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={poster.thumbnailUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 border border-emerald-800/60">
                  {poster.domain}
                </div>

                {!hasAccess ? (
                  <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center text-red-400">
                    <Lock className="w-6 h-6 mr-1 text-red-500" />
                    <span className="text-xs font-semibold">Verrouillé</span>
                  </div>
                ) : (
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}
              </div>

              {/* Poster metadata */}
              <div className="p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition">
                  {poster.title}
                </h4>

                <p className="text-[11px] text-emerald-400 font-medium truncate">
                  {poster.authors}
                </p>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {poster.abstract}
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="px-3.5 pb-3 pt-1 border-t border-slate-800/80 flex flex-wrap gap-1">
              {poster.keywords.map((k, i) => (
                <span
                  key={i}
                  className="text-[9px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                >
                  #{k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Fullscreen Zoomable Poster Modal */}
      {activeZoomPoster && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white animate-in zoom-in-95 duration-200">
          {/* Top Bar with Zoom & Close controls */}
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0 pr-4">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <h3 className="text-xs font-bold text-white truncate">
                  {activeZoomPoster.title}
                </h3>
                <p className="text-[10px] text-slate-400 truncate">
                  {activeZoomPoster.authors}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.25))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Dézoomer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-bold w-12 text-center text-emerald-400">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Zoomer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveZoomPoster(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Zoomable Viewport */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950 relative">
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              className="transition-transform duration-150 max-w-2xl w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800"
            >
              {/* Scientific Poster Layout Simulation */}
              <div className="p-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
                <div className="border-b border-emerald-500/40 pb-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mb-1">
                    AAPEP 2025 • {activeZoomPoster.domain}
                  </div>
                  <h2 className="text-base font-extrabold text-white leading-tight">
                    {activeZoomPoster.title}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    {activeZoomPoster.authors}
                  </p>
                </div>

                {/* High quality scientific graphic */}
                <div className="rounded-lg overflow-hidden border border-slate-700 aspect-[16/9] bg-slate-950">
                  <img
                    src={activeZoomPoster.thumbnailUrl}
                    alt={activeZoomPoster.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <div>
                    <h5 className="font-bold text-emerald-300 uppercase text-[10px] tracking-wider mb-1">
                      1. Contexte & Objectifs
                    </h5>
                    <p className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      {activeZoomPoster.abstract}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-emerald-300 uppercase text-[10px] tracking-wider mb-1">
                      2. Résultats & Conclusion Pratique
                    </h5>
                    <p className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      Les observations cliniques soulignent l'importance d'une prise en charge standardisée en secteur libéral et de la sensibilisation active des aidants et praticiens aux protocoles thérapeutiques modernes.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">Congrès National AAPEP Marrakech</span>
                  <span className="text-red-400 font-semibold">Poster certifié par le Comité Scientifique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { X, Map, MapPin, ZoomIn, ZoomOut, Store, Info, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PlanExpositionModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    rooms,
    exhibitors,
    highlightedRoomId,
    setHighlightedRoomId
  } = useApp();

  const [activePlanTab, setActivePlanTab] = useState<'plan' | 'stands'>('plan');
  const [zoom, setZoom] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(highlightedRoomId || 'el_mawakif');

  if (activeModal !== 'plan_exposition') return null;

  const currentRoom = rooms.find((r) => r.id === (selectedRoomId || highlightedRoomId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Plan d'Exposition & Salles</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              title="Dézoomer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(2.0, z + 0.2))}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              title="Zoomer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subtabs: Plan SVG vs Stands */}
        <div className="p-2 border-b border-slate-800 bg-slate-950/60 flex">
          <button
            onClick={() => setActivePlanTab('plan')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              activePlanTab === 'plan'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Plan Interactif des Salles
          </button>
          <button
            onClick={() => setActivePlanTab('stands')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              activePlanTab === 'stands'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Liste des Stands Exposants ({exhibitors.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activePlanTab === 'plan' ? (
            <div className="space-y-3">
              {/* Interactive Floor Plan SVG */}
              <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-2">
                <div
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className="w-full h-full relative transition-transform duration-200"
                >
                  <svg
                    viewBox="0 0 500 380"
                    className="w-full h-full text-slate-800"
                  >
                    {/* Outer building walls */}
                    <rect x="15" y="15" width="470" height="350" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="3" />
                    
                    {/* Main Entrance / Reception in Red & Green */}
                    <path d="M210 365 L290 365" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
                    <text x="250" y="355" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                      ACCUEIL & ENTRÉE PRINCIPALE (QR)
                    </text>

                    {/* Central Exhibition & Posters Hall */}
                    <rect
                      x="140"
                      y="180"
                      width="220"
                      height="140"
                      rx="8"
                      fill={selectedRoomId === 'espace_posters' ? '#064e3b' : '#1e293b'}
                      stroke={selectedRoomId === 'espace_posters' ? '#10b981' : '#475569'}
                      strokeWidth={selectedRoomId === 'espace_posters' ? "3.5" : "1.5"}
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedRoomId('espace_posters')}
                    />
                    <text x="250" y="240" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Hall Central
                    </text>
                    <text x="250" y="258" fill="#a7f3d0" fontSize="10" textAnchor="middle">
                      Stands Partenaires & e-Posters
                    </text>

                    {/* Stands grid in hall */}
                    {[0, 1, 2].map((col) => (
                      <g key={col}>
                        <rect x={160 + col * 60} y="275" width="45" height="25" rx="3" fill="#0f172a" stroke="#334155" />
                        <text x={182 + col * 60} y="291" fill="#94a3b8" fontSize="8" textAnchor="middle">Stand 0{col + 1}</text>
                      </g>
                    ))}

                    {/* Room 1: Amphithéâtre EL MAWAKIF (Top Large Room) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedRoomId('el_mawakif')}
                    >
                      <rect
                        x="50"
                        y="35"
                        width="400"
                        height="125"
                        rx="12"
                        fill={selectedRoomId === 'el_mawakif' ? '#064e3b' : '#1e293b'}
                        stroke={selectedRoomId === 'el_mawakif' ? '#10b981' : '#475569'}
                        strokeWidth={selectedRoomId === 'el_mawakif' ? "3.5" : "1.5"}
                      />
                      <text x="250" y="88" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
                        Salle EL MAWAKIF (Plénière 450 pl.)
                      </text>
                      <text x="250" y="110" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Retransmission 4K • Direct LIVE
                      </text>
                    </g>

                    {/* Room 2: Salle Y & W (Left Room) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedRoomId('yw')}
                    >
                      <rect
                        x="30"
                        y="180"
                        width="95"
                        height="140"
                        rx="8"
                        fill={selectedRoomId === 'yw' ? '#064e3b' : '#1e293b'}
                        stroke={selectedRoomId === 'yw' ? '#10b981' : '#475569'}
                        strokeWidth={selectedRoomId === 'yw' ? "3.5" : "1.5"}
                      />
                      <text x="77" y="240" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Salle Y & W
                      </text>
                      <text x="77" y="260" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        Symposia
                      </text>
                    </g>

                    {/* Room 3: Salle IBN ROCHD (Right Room) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedRoomId('ibn_rochd')}
                    >
                      <rect
                        x="375"
                        y="180"
                        width="95"
                        height="140"
                        rx="8"
                        fill={selectedRoomId === 'ibn_rochd' ? '#064e3b' : '#1e293b'}
                        stroke={selectedRoomId === 'ibn_rochd' ? '#10b981' : '#475569'}
                        strokeWidth={selectedRoomId === 'ibn_rochd' ? "3.5" : "1.5"}
                      />
                      <text x="422" y="240" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Salle
                      </text>
                      <text x="422" y="255" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                        IBN ROCHD
                      </text>
                      <text x="422" y="275" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        Ateliers
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Selected Room Details Card */}
              {currentRoom && (
                <div className="bg-slate-950 border border-emerald-500/60 rounded-xl p-3.5 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-red-500" />
                      {currentRoom.name}
                    </span>
                    <span className="text-[10px] text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      Capacité : {currentRoom.capacity} pers.
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {currentRoom.level}
                  </p>
                  <p className="text-xs text-slate-300 pt-1">
                    {currentRoom.description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Stands List */
            <div className="space-y-2.5">
              {exhibitors.map((exh) => (
                <div
                  key={exh.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start justify-between space-x-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">
                        {exh.name}
                      </span>
                      <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        {exh.standNumber}
                      </span>
                    </div>
                    <div className="text-[10px] text-red-400 uppercase font-semibold">
                      {exh.category}
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">
                      {exh.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

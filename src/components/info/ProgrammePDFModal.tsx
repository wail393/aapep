import React, { useState } from 'react';
import { X, FileDown, Download, Eye, ChevronLeft, ChevronRight, BookOpen, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';

export const ProgrammePDFModal: React.FC = () => {
  const { activeModal, closeModal, sessions } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  if (activeModal !== 'programme_pdf') return null;

  const handleDownload = () => {
    // Generate text/html printable format
    window.print();
  };

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
            <FileDown className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Programme Officiel en PDF</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="p-2.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-slate-800 disabled:opacity-30 hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-slate-800 disabled:opacity-30 hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-red-600 hover:from-emerald-500 hover:to-red-500 text-white font-bold rounded-lg flex items-center space-x-1.5 transition shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Imprimer / Télécharger</span>
          </button>
        </div>

        {/* PDF Simulated Viewer Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 flex justify-center">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-lg shadow-xl p-6 space-y-4 font-serif text-xs min-h-[460px] flex flex-col justify-between border border-slate-200">
            {currentPage === 1 && (
              <div className="space-y-4 text-center">
                <div className="border-b-2 border-emerald-700 pb-4">
                  <div className="text-[10px] font-sans uppercase font-extrabold text-emerald-800 tracking-wider">
                    {EVENT_CONFIG.association}
                  </div>
                  <h1 className="text-xl font-extrabold text-slate-900 mt-2 font-sans">
                    {EVENT_CONFIG.title}
                  </h1>
                  <h2 className="text-sm font-semibold italic text-red-700 mt-1">
                    « {EVENT_CONFIG.theme} »
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 font-sans">
                    {EVENT_CONFIG.dates} • {EVENT_CONFIG.venue}
                  </p>
                </div>

                <div className="text-left font-sans text-xs space-y-2 text-slate-700">
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-emerald-800">
                    Édito du Président
                  </h4>
                  <p className="leading-relaxed">
                    Chers confrères et consœurs, c'est avec un honneur renouvelé que le bureau exécutif de l'AAPEP vous accueille à Marrakech pour notre congrès national annuel.
                  </p>
                  <p className="leading-relaxed">
                    L'exercice libéral de la psychiatrie fait face à de profondes mutations : nouvelles exigences déontologiques, avènement du numérique, et essor de protocoles thérapeutiques innovants. Ce programme a été conçu par notre comité scientifique pour répondre directement aux réalités de nos consultations quotidiennes.
                  </p>
                </div>

                <div className="pt-4 text-center font-sans text-[10px] text-slate-400">
                  Programme officiel sous le patronage scientifique de l'AAPEP
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-3 font-sans">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">
                    Journée du Jeudi 06 Novembre 2025
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">
                    Programme Détaillé des Séances
                  </h3>
                </div>

                <div className="space-y-2.5 text-[11px]">
                  {sessions
                    .filter((s) => s.day === '2025-11-06')
                    .map((s) => (
                      <div key={s.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{s.startTime} - {s.endTime}</span>
                          <span className="text-emerald-700 font-semibold">{s.roomName}</span>
                        </div>
                        <div className="font-semibold text-slate-900 mt-0.5">{s.title}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-3 font-sans">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">
                    Journée du Vendredi 07 Novembre 2025
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">
                    Programme Détaillé des Séances
                  </h3>
                </div>

                <div className="space-y-2.5 text-[11px]">
                  {sessions
                    .filter((s) => s.day === '2025-11-07')
                    .map((s) => (
                      <div key={s.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{s.startTime} - {s.endTime}</span>
                          <span className="text-emerald-700 font-semibold">{s.roomName}</span>
                        </div>
                        <div className="font-semibold text-slate-900 mt-0.5">{s.title}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {currentPage === 4 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">
                    Partenaires & Remerciements
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  L'AAPEP tient à remercier chaleureusement l'ensemble des comités, orateurs invités, laboratoires pharmaceutiques partenaires, éditeurs médicaux et congressistes pour leur fidélité et leur contribution au rayonnement de la psychiatrie libérale.
                </p>
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-950">
                  <div className="font-bold text-emerald-800">Secrétariat Général du Congrès</div>
                  <div>Email : {EVENT_CONFIG.contactEmail}</div>
                  <div>Téléphone : {EVENT_CONFIG.contactPhone}</div>
                </div>
              </div>
            )}

            {/* Document Footer */}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-[9px] text-slate-400 font-sans">
              <span>Brochure AAPEP 2025</span>
              <span>Page {currentPage} / {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Award, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ComitesModal: React.FC = () => {
  const { activeModal, closeModal, committees } = useApp();
  const [tab, setTab] = useState<'scientifique' | 'organisation'>('scientifique');

  if (activeModal !== 'comites') return null;

  const scientificMembers = committees.filter(
    (m) => m.committee === 'comite_scientifique'
  );
  const orgMembers = committees.filter(
    (m) => m.committee === 'comite_organisation'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">Comités du Congrès</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-2 border-b border-slate-800 bg-slate-950/40 flex">
          <button
            onClick={() => setTab('scientifique')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              tab === 'scientifique'
                ? 'bg-teal-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Comité Scientifique
          </button>
          <button
            onClick={() => setTab('organisation')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              tab === 'organisation'
                ? 'bg-teal-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Comité d'Organisation
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {(tab === 'scientifique' ? scientificMembers : orgMembers).map((member) => (
            <div
              key={member.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center space-x-3.5"
            >
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-13 h-13 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-white truncate">
                  {member.name}
                </h4>
                <p className="text-[11px] font-semibold text-teal-400 truncate">
                  {member.role}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {member.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

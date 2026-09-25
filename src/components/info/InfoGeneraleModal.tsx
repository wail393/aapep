import React from 'react';
import { X, Info, Target, Compass, BookOpen, HeartPulse } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';

export const InfoGeneraleModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();

  if (activeModal !== 'info_generale') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">Informations Générales</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
          {/* Congress Introduction */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Présentation du Congrès</span>
            </div>
            <p>
              Le Congrès National de l'AAPEP réunit chaque année l'ensemble des praticiens libéraux de santé mentale, universitaires, internes et partenaires institutionnels autour des évolutions majeures de notre spécialité.
            </p>
            <p>
              Sous la thématique centrale « Psychiatrie Libérale : Défis et Actualités », cette édition aborde à la fois les ruptures thérapeutiques pharmacologiques, l'apport des neurosciences, les mutations réglementaires de l'exercice privé et les nouvelles technologies au service du patient.
            </p>
          </div>

          {/* Objectives */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Objectifs Scientifiques</span>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
              <li>Actualiser les connaissances sur les dépressions résistantes et les thérapies innovantes.</li>
              <li>Partager les retours d'expérience sur la pratique ambulatoire de la télémédecine et des TCC.</li>
              <li>Valoriser les travaux de recherche clinique des jeunes psychiatres via l'espace e-Posters.</li>
              <li>Favoriser la coordination pluridisciplinaire entre psychiatres de ville et médecins traitants.</li>
            </ul>
          </div>

          {/* AAPEP Presentation */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <HeartPulse className="w-4 h-4" />
              <span>L'AAPEP en Bref</span>
            </div>
            <p>
              Fondée pour représenter et défendre la pratique psychiatrique libérale, l'Association des Psychiatres d'Exercice Privé est un acteur pivot de la formation médicale continue et un interlocuteur reconnu auprès des instances de santé publique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

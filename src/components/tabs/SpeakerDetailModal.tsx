import React from 'react';
import { X, User, Hospital, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SpeakerDetailModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    selectedSpeakerId,
    speakers,
    sessions,
    openModal
  } = useApp();

  if (activeModal !== 'speaker_detail' || !selectedSpeakerId) return null;

  const speaker = speakers.find((s) => s.id === selectedSpeakerId);
  if (!speaker) return null;

  const speakerSessions = sessions.filter((s) =>
    s.speakerIds.includes(speaker.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
            Fiche Orateur
          </span>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4">
          <div className="flex items-center space-x-3.5">
            <img
              src={speaker.photoUrl}
              alt={speaker.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow"
            />
            <div>
              <h3 className="font-bold text-base text-white">{speaker.name}</h3>
              <p className="text-xs text-teal-400 font-semibold">{speaker.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {speaker.hospital} • {speaker.specialty}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Biographie & Titres
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {speaker.bio}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Interventions au Congrès ({speakerSessions.length})
            </h4>

            <div className="space-y-2">
              {speakerSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => {
                    closeModal();
                    openModal('session_detail', session.id);
                  }}
                  className="bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-xl p-3 cursor-pointer transition space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-teal-400 font-bold">
                    <span>
                      {session.day === '2025-11-06' ? 'Jeu 06' : 'Ven 07'} • {session.startTime} - {session.endTime}
                    </span>
                    <span className="text-slate-400 font-sans">{session.roomName}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white line-clamp-2">
                    {session.title}
                  </h5>
                  <div className="flex items-center justify-end text-[11px] text-teal-400 font-semibold">
                    <span>Voir la session →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

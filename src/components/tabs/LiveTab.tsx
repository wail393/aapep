import React, { useState } from 'react';
import {
  Radio,
  Play,
  Clock,
  MapPin,
  Lock,
  LogIn,
  QrCode,
  MessageSquare,
  Maximize2,
  Tv,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Session } from '../../types';

export const LiveTab: React.FC = () => {
  const {
    sessions,
    currentUser,
    openModal,
    rooms
  } = useApp();

  const [activeStreamingSessionId, setActiveStreamingSessionId] = useState<string>('sess_1');

  const activeStreamingSession =
    sessions.find((s) => s.id === activeStreamingSessionId) ||
    sessions.find((s) => s.status === 'live') ||
    sessions[0];

  const hasAccessToLiveStreams =
    currentUser.entryVerifiedAt !== null || currentUser.role === 'admin';

  return (
    <div className="pb-24 space-y-4">
      {/* 1. Access Guard Banner for Visitors or Unverified Attendees */}
      {!hasAccessToLiveStreams && (
        <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-emerald-950/80 border border-red-500/40 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-white">
                Accès Exclusif aux Retransmissions Directes
              </h3>
              <p className="text-[11px] text-slate-300">
                {currentUser.role === 'visitor'
                  ? 'Connectez-vous pour pouvoir consulter les lives exclusifs des amphithéâtres.'
                  : "Scannez le QR code d'accueil pour débloquer le lecteur vidéo en direct."}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              currentUser.role === 'visitor'
                ? openModal('auth')
                : openModal('qr_scanner')
            }
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center justify-center space-x-1.5"
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

      {/* 2. Primary Live Stream Player Screen */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              {activeStreamingSession?.roomName || 'Salle Plénière'} — Direct 4K
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 flex items-center space-x-1">
            <Tv className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300">Flux sécurisé</span>
          </span>
        </div>

        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
          {hasAccessToLiveStreams ? (
            <iframe
              src={
                activeStreamingSession?.liveUrl ||
                'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1'
              }
              title="Diffusion direct Congrès AAPEP"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center mx-auto border border-slate-800">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-xs font-bold text-white">
                Flux vidéo réservé aux congressistes inscrits
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Veuillez valider votre badge d'entrée pour visionner les conférences en haute définition.
              </p>
            </div>
          )}
        </div>

        {/* Stream info below video */}
        {activeStreamingSession && (
          <div className="p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center space-x-1">
                <Radio className="w-3 h-3 mr-1 text-red-500 animate-pulse" />
                <span>En cours de diffusion</span>
              </span>
              <button
                onClick={() => openModal('session_detail', activeStreamingSession.id)}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Poser une question en direct</span>
              </button>
            </div>
            <h3 className="text-sm font-bold text-white">
              {activeStreamingSession.title}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-1">
              {activeStreamingSession.description}
            </p>
          </div>
        )}
      </div>

      {/* 3. List of Sessions by Room with Red LIVE / Grey LIVE badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Toutes les Salles & Flux Directs
          </h2>
          <span className="text-[11px] text-slate-500">Sélectionnez une salle</span>
        </div>

        <div className="space-y-2.5">
          {sessions.map((session) => {
            const isCurrent = activeStreamingSessionId === session.id;
            const isLive = session.status === 'live';

            return (
              <div
                key={session.id}
                onClick={() => {
                  if (hasAccessToLiveStreams) {
                    setActiveStreamingSessionId(session.id);
                  } else {
                    openModal('session_detail', session.id);
                  }
                }}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {session.startTime} - {session.endTime}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {session.roomName}
                    </span>
                  </div>

                  {/* Status Pill matching specification */}
                  {isLive ? (
                    <div className="flex items-center space-x-1">
                      <span className="inline-flex items-center text-[10px] font-extrabold text-white bg-red-600 px-2 py-0.5 rounded-full shadow animate-pulse">
                        <Radio className="w-2.5 h-2.5 mr-1" />
                        LIVE
                      </span>
                      <span className="text-[10px] text-red-400 font-mono">
                        il y a 35m
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <span className="inline-flex items-center text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                        LIVE
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        dans 1h20m
                      </span>
                    </div>
                  )}
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">
                  {session.title}
                </h4>

                <div className="mt-2 flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80 text-slate-400">
                  <span>{session.domainName}</span>
                  <span className="text-emerald-400 font-semibold hover:underline">
                    {hasAccessToLiveStreams ? 'Regarder le flux →' : 'Voir fiche session →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

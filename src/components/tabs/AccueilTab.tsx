import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Play,
  Users,
  Award,
  Info,
  Map,
  FileDown,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  Radio,
  CheckCircle2,
  QrCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';
import { PhotoItem } from '../../types';

export const AccueilTab: React.FC = () => {
  const { openModal, setActiveTab, photos, currentUser } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: true, // We can simulate the congress is currently active or opening soon
    isFinished: false
  });

  useEffect(() => {
    const targetDate = new Date(EVENT_CONFIG.startDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // In order to show an active, engaging conference experience, if the date is in past or now, we simulate an active congress countdown or live state
      if (difference <= 0) {
        // Event in progress!
        setTimeLeft({
          days: 0,
          hours: 4,
          minutes: 32,
          seconds: 15,
          isStarted: true,
          isFinished: false
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isStarted: false, isFinished: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-24 space-y-5">
      {/* 1. Congress Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950/80 to-red-950/50 text-white p-5 border border-emerald-500/30 shadow-xl">
        {/* Subtle decorative glow in green and red */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-700/80">
              {EVENT_CONFIG.edition}
            </span>
            <span className="text-xs text-slate-300 font-medium flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              {EVENT_CONFIG.dates}
            </span>
          </div>

          <div>
            <h1 className="text-lg font-black tracking-tight text-white leading-tight">
              {EVENT_CONFIG.title}
            </h1>
            <p className="text-xs font-semibold text-emerald-200 mt-1 italic">
              « {EVENT_CONFIG.theme} »
            </p>
          </div>

          <div className="flex items-center text-xs text-slate-300 pt-1">
            <MapPin className="w-3.5 h-3.5 mr-1 text-red-500 shrink-0" />
            <span className="truncate">{EVENT_CONFIG.venue}, {EVENT_CONFIG.city}</span>
          </div>

          {/* User Entry Activation Callout if not activated */}
          {!currentUser.entryVerifiedAt && currentUser.role !== 'admin' && (
            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-red-900/40">
              <div className="flex items-center space-x-2 text-xs">
                <QrCode className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-slate-300 text-[11px]">Activez votre badge d'entrée</span>
              </div>
              <button
                onClick={() => openModal('qr_scanner')}
                className="text-[11px] bg-red-600 hover:bg-red-500 text-white font-bold px-2.5 py-1 rounded-lg transition shadow"
              >
                Scanner
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Countdown Box */}
      <section className="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {timeLeft.isStarted ? "Événement en direct" : "Début de l'événement dans"}
            </h2>
          </div>
          {timeLeft.isStarted && (
            <span className="inline-flex items-center text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full border border-red-500 animate-pulse">
              <Radio className="w-2.5 h-2.5 mr-1" />
              En cours
            </span>
          )}
        </div>

        {timeLeft.isStarted ? (
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div>
              <p className="text-xs font-bold text-white">Le congrès bat son plein !</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Consultez le programme en direct et rejoignez les sessions plénières.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('programme')}
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow hover:bg-emerald-500 shrink-0 ml-2"
            >
              Voir le Direct
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-lg font-black text-emerald-400 font-mono">{timeLeft.days}</div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Jours</div>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-lg font-black text-emerald-400 font-mono">{timeLeft.hours}</div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Heures</div>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-lg font-black text-emerald-400 font-mono">{timeLeft.minutes}</div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Minutes</div>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-lg font-black text-emerald-400 font-mono">{timeLeft.seconds}</div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Secondes</div>
            </div>
          </div>
        )}
      </section>

      {/* 3. Intro Video */}
      <section className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 text-red-500 fill-red-500" />
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Vidéo Introductive du Congrès
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">Présentation officielle</span>
        </div>
        <div className="relative aspect-video w-full bg-slate-950">
          <iframe
            src={EVENT_CONFIG.videoEmbedUrl}
            title="Vidéo officielle Congrès AAPEP"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* 4. Quick-Access Buttons */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Accès Rapide
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => openModal('bureau_executif')}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center space-x-3 text-left transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Bureau exécutif</div>
              <div className="text-[10px] text-slate-400">Gouvernance AAPEP</div>
            </div>
          </button>

          <button
            onClick={() => openModal('comites')}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center space-x-3 text-left transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Comités</div>
              <div className="text-[10px] text-slate-400">Scientifique & Orga</div>
            </div>
          </button>

          <button
            onClick={() => openModal('info_generale')}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center space-x-3 text-left transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/20">
              <Info className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Infos générales</div>
              <div className="text-[10px] text-slate-400">Thèmes & Objectifs</div>
            </div>
          </button>

          <button
            onClick={() => openModal('plan_exposition')}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center space-x-3 text-left transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/20">
              <Map className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Plan d'exposition</div>
              <div className="text-[10px] text-slate-400">Salles & Stands</div>
            </div>
          </button>
        </div>

        {/* PDF Full Program button with Green and Red accents */}
        <button
          onClick={() => openModal('programme_pdf')}
          className="w-full p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-red-950/50 hover:from-emerald-950/80 hover:to-red-950/70 border border-emerald-500/40 flex items-center justify-between text-left transition shadow"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300">Programme complet en PDF</div>
              <div className="text-[10px] text-slate-300">Télécharger la brochure scientifique officielle</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </button>
      </section>

      {/* 5. Album Photos */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Album Photos & Moments Forts
          </h2>
          <span className="text-[11px] text-emerald-400 font-medium">Éditions antérieures</span>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative min-w-[200px] h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow cursor-pointer group shrink-0"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2.5 flex flex-col justify-end">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                  {photo.year}
                </span>
                <p className="text-[11px] font-medium text-white line-clamp-1 leading-tight">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo preview modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-slate-950">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                {selectedPhoto.year}
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

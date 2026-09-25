import React from 'react';
import { X, MapPin, ExternalLink, Phone, Mail, Clock, Car, Bus, Train } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';

export const InfosPratiquesModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();

  if (activeModal !== 'infos_pratiques') return null;

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${EVENT_CONFIG.venue}, ${EVENT_CONFIG.address}`
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">Infos Pratiques & Lieu</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Venue Card */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                Lieu du Congrès
              </span>
              <h4 className="text-sm font-bold text-white">
                {EVENT_CONFIG.venue}
              </h4>
              <p className="text-slate-300">{EVENT_CONFIG.address}</p>
            </div>

            <button
              onClick={handleOpenGoogleMaps}
              className="w-full py-2.5 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg flex items-center justify-center space-x-2 transition shadow"
            >
              <MapPin className="w-4 h-4" />
              <span>Ouvrir dans Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Schedules */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Horaires d'Ouverture de l'Accueil</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>Jeudi 06 Novembre</span>
                <span className="font-mono text-teal-300">08h00 — 19h00</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Vendredi 07 Novembre</span>
                <span className="font-mono text-teal-300">08h30 — 18h00</span>
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
              Accès & Transports
            </span>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start space-x-2.5">
                <Car className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Parking gratuit et surveillé disponible sur place pour les congressistes munis de leur badge.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Train className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>À 5 minutes en taxi de la Gare ONCF Marrakech et à 15 minutes de l'Aéroport Marrakech Ménara.</span>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
              Secrétariat du Congrès
            </span>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <a href={`mailto:${EVENT_CONFIG.contactEmail}`} className="hover:underline text-teal-300">
                  {EVENT_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>{EVENT_CONFIG.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

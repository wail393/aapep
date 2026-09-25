import React from 'react';
import { Bell, X, AlertCircle, Info, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationBanner: React.FC = () => {
  const { latestBannerNotification, dismissBannerNotification, openModal } = useApp();

  if (!latestBannerNotification) return null;

  return (
    <aside
      aria-label="Notification push"
      className="fixed top-12 left-2 right-2 max-w-md mx-auto z-50 pointer-events-auto animate-in slide-in-from-top-4 duration-300 select-none"
    >
      <div className="bg-slate-900/98 text-white border-2 border-emerald-500/60 rounded-xl shadow-2xl p-3.5 backdrop-blur-md flex items-start space-x-3 shadow-emerald-950/50">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
          {latestBannerNotification.type === 'room_change' ? (
            <Calendar className="w-4 h-4 text-red-500" />
          ) : latestBannerNotification.type === 'urgent' ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : (
            <Bell className="w-4 h-4 text-emerald-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {latestBannerNotification.type === 'room_change' ? 'Mise à jour salle' : 'Congrès AAPEP'}
            </span>
            <span className="text-[10px] text-slate-400">À l'instant</span>
          </div>
          <h4 className="text-xs font-semibold text-white mt-0.5 leading-snug">
            {latestBannerNotification.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
            {latestBannerNotification.body}
          </p>

          {latestBannerNotification.sessionId && (
            <button
              onClick={() => {
                openModal('session_detail', latestBannerNotification.sessionId);
                dismissBannerNotification();
              }}
              className="mt-2 text-[11px] text-red-400 font-semibold underline hover:text-red-300"
            >
              Voir la session concernée →
            </button>
          )}
        </div>

        <button
          onClick={dismissBannerNotification}
          aria-label="Fermer la notification"
          className="text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

import React from 'react';
import { X, Bell, Calendar, AlertCircle, Info, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsListModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    notifications,
    markNotificationsAsRead,
    openModal
  } = useApp();

  if (activeModal !== 'notifications_list') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">Notifications du Congrès</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 border-b border-slate-800 flex justify-end bg-slate-950/40">
          <button
            onClick={markNotificationsAsRead}
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 px-2 py-1 rounded"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tout marquer comme lu</span>
          </button>
        </div>

        <div className="p-3 overflow-y-auto space-y-2.5 flex-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              Aucune notification pour le moment.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl border text-xs space-y-1.5 transition ${
                  notif.read
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                    : 'bg-slate-950 border-teal-500/40 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-300 text-[11px] uppercase tracking-wider">
                    {notif.type === 'room_change' ? 'Déplacement Salle' : 'Info Congrès'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(notif.sentAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">
                  {notif.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {notif.body}
                </p>

                {notif.sessionId && (
                  <button
                    onClick={() => {
                      closeModal();
                      openModal('session_detail', notif.sessionId);
                    }}
                    className="text-[11px] text-teal-400 font-semibold hover:underline block pt-1"
                  >
                    Voir la session →
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

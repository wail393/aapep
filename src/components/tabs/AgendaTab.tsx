import React, { useState } from 'react';
import {
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Bell,
  BellRing,
  ChevronRight,
  LogIn,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgendaTab: React.FC = () => {
  const {
    currentUser,
    agendaSessionIds,
    sessions,
    toggleAgendaItem,
    openModal
  } = useApp();

  const [reminders, setReminders] = useState<{ [sessionId: string]: boolean }>({
    sess_1: true,
    sess_2: true
  });
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  const toggleReminder = (sessionId: string) => {
    setReminders((prev) => {
      const nextState = !prev[sessionId];
      const session = sessions.find((s) => s.id === sessionId);
      if (nextState && session) {
        setReminderToast(`Rappel activé : 10 minutes avant "${session.title.slice(0, 35)}..."`);
        setTimeout(() => setReminderToast(null), 3500);
      }
      return { ...prev, [sessionId]: nextState };
    });
  };

  const userSessions = sessions.filter((s) => agendaSessionIds.includes(s.id));

  // Group by day
  const sessionsDay1 = userSessions.filter((s) => s.day === '2025-11-06');
  const sessionsDay2 = userSessions.filter((s) => s.day === '2025-11-07');

  if (currentUser.role === 'visitor') {
    return (
      <div className="pb-24 pt-6 space-y-6 select-none">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">Mon Agenda Personnel</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Connectez-vous pour composer votre planning de conférences, recevoir des rappels et synchroniser vos favoris.
            </p>
          </div>

          <button
            onClick={() => openModal('auth')}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Se connecter / Créer un compte</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-4 select-none">
      {/* Toast Notification Alert for Reminders */}
      {reminderToast && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-200 text-xs flex items-center space-x-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{reminderToast}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">
            Agenda de {currentUser.name}
          </h2>
          <p className="text-[11px] text-emerald-400 font-semibold">
            {userSessions.length} session(s) enregistrée(s)
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/40">
          {userSessions.length}
        </div>
      </div>

      {userSessions.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <Bookmark className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-xs font-semibold text-slate-300">
            Votre agenda est encore vide
          </p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
            Parcourez le programme scientifique et cliquez sur « Ajouter à mon agenda » pour préparer vos journées.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Day 1 Section */}
          {sessionsDay1.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2 px-1">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Jeudi 06 Novembre ({sessionsDay1.length})
                </h3>
              </div>

              <div className="space-y-2">
                {sessionsDay1.map((session) => (
                  <AgendaSessionCard
                    key={session.id}
                    session={session}
                    isReminderActive={!!reminders[session.id]}
                    onToggleReminder={() => toggleReminder(session.id)}
                    onRemove={() => toggleAgendaItem(session.id)}
                    onOpen={() => openModal('session_detail', session.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Day 2 Section */}
          {sessionsDay2.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2 px-1">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Vendredi 07 Novembre ({sessionsDay2.length})
                </h3>
              </div>

              <div className="space-y-2">
                {sessionsDay2.map((session) => (
                  <AgendaSessionCard
                    key={session.id}
                    session={session}
                    isReminderActive={!!reminders[session.id]}
                    onToggleReminder={() => toggleReminder(session.id)}
                    onRemove={() => toggleAgendaItem(session.id)}
                    onOpen={() => openModal('session_detail', session.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AgendaSessionCard: React.FC<{
  session: any;
  isReminderActive: boolean;
  onToggleReminder: () => void;
  onRemove: () => void;
  onOpen: () => void;
}> = ({ session, isReminderActive, onToggleReminder, onRemove, onOpen }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-md space-y-2 hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-emerald-400 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" />
            {session.startTime} - {session.endTime}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-semibold text-slate-300">
            {session.roomName}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {/* Toggle Reminder */}
          <button
            onClick={onToggleReminder}
            title={
              isReminderActive
                ? 'Rappel 10 min avant activé'
                : 'Activer rappel 10 min avant'
            }
            className={`p-1.5 rounded-lg text-xs transition ${
              isReminderActive
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isReminderActive ? (
              <BellRing className="w-4 h-4 text-red-400" />
            ) : (
              <Bell className="w-4 h-4" />
            )}
          </button>

          {/* Remove from agenda */}
          <button
            onClick={onRemove}
            title="Retirer de l'agenda"
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4
        onClick={onOpen}
        className="text-xs font-bold text-white leading-snug cursor-pointer hover:text-emerald-300 transition"
      >
        {session.title}
      </h4>

      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
        <span className="uppercase font-semibold text-emerald-300">
          {session.type.replace('_', ' ')}
        </span>
        <button
          onClick={onOpen}
          className="text-emerald-400 hover:underline flex items-center font-medium"
        >
          <span>Consulter les questions</span>
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
};

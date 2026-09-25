import React, { useState } from 'react';
import {
  X,
  Shield,
  Radio,
  Clock,
  MapPin,
  Bell,
  MessageSquare,
  Users,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Send,
  Edit2,
  Smartphone,
  QrCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SessionStatus } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    sessions,
    rooms,
    questions,
    updateSessionStatus,
    updateSessionDetails,
    answerQuestion,
    toggleHideQuestion,
    sendBroadcastNotification,
    deviceCount,
    accountsCount,
    activatedAccountsCount
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'sessions' | 'questions' | 'broadcast' | 'stats'
  >('sessions');

  // Broadcast state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Edit session state
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editRoomId, setEditRoomId] = useState('');
  const [editTime, setEditTime] = useState('');
  const [notifyAttendees, setNotifyAttendees] = useState(true);

  // Answer question state
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  if (activeModal !== 'admin_dashboard') return null;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifBody.trim()) return;

    sendBroadcastNotification(notifTitle, notifBody, undefined, 'info');
    setNotifTitle('');
    setNotifBody('');
    setNotifSuccess(true);
    setTimeout(() => setNotifSuccess(false), 3000);
  };

  const startEditSession = (sessionId: string) => {
    const s = sessions.find((item) => item.id === sessionId);
    if (!s) return;
    setEditingSessionId(sessionId);
    setEditRoomId(s.roomId);
    setEditTime(s.startTime);
  };

  const saveEditSession = () => {
    if (!editingSessionId) return;
    updateSessionDetails(editingSessionId, editRoomId, editTime, notifyAttendees);
    setEditingSessionId(null);
  };

  const submitAnswer = (questionId: string) => {
    if (!answerDraft.trim()) return;
    answerQuestion(questionId, answerDraft);
    setAnsweringQuestionId(null);
    setAnswerDraft('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-xl bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-bold text-sm text-white">Administration du Congrès</h3>
              <p className="text-[10px] text-emerald-400">Contrôle direct • Gestion en temps réel</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Navigation Sub-tabs */}
        <div className="p-2 border-b border-slate-800 bg-slate-950/60 flex overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveAdminTab('sessions')}
            className={`px-3 py-1.5 font-bold rounded-lg transition whitespace-nowrap ${
              activeAdminTab === 'sessions'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Statuts & Salles
          </button>

          <button
            onClick={() => setActiveAdminTab('questions')}
            className={`px-3 py-1.5 font-bold rounded-lg transition whitespace-nowrap flex items-center space-x-1 ${
              activeAdminTab === 'questions'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Questions Q&R</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full text-slate-300">
              {questions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('broadcast')}
            className={`px-3 py-1.5 font-bold rounded-lg transition whitespace-nowrap ${
              activeAdminTab === 'broadcast'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diffuser Notification
          </button>

          <button
            onClick={() => setActiveAdminTab('stats')}
            className={`px-3 py-1.5 font-bold rounded-lg transition whitespace-nowrap ${
              activeAdminTab === 'stats'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Statistiques
          </button>
        </div>

        {/* Tab 1: Sessions Live Status & Editing */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeAdminTab === 'sessions' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Contrôlez les statuts en direct sur tous les smartphones :</span>
                <span className="text-[10px] text-teal-400 font-semibold">Synchronisation instantanée</span>
              </div>

              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-teal-400 font-bold">
                        <span>{session.startTime} - {session.endTime}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-300">{session.roomName}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                        {session.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => startEditSession(session.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-300 border border-slate-800 shrink-0 ml-2"
                      title="Modifier salle / horaire"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quick Status Buttons */}
                  <div className="flex items-center space-x-2 pt-1 border-t border-slate-900 text-xs">
                    <span className="text-[11px] text-slate-500">Statut :</span>

                    <button
                      onClick={() => updateSessionStatus(session.id, 'preparing')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                        session.status === 'preparing'
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      En préparation
                    </button>

                    <button
                      onClick={() => updateSessionStatus(session.id, 'live')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition flex items-center space-x-1 ${
                        session.status === 'live'
                          ? 'bg-red-600 text-white border-red-500 animate-pulse'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <Radio className="w-3 h-3" />
                      <span>En direct</span>
                    </button>

                    <button
                      onClick={() => updateSessionStatus(session.id, 'finished')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                        session.status === 'finished'
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-white'
                      }`}
                    >
                      Terminé
                    </button>
                  </div>

                  {/* In-place Session Edit Form */}
                  {editingSessionId === session.id && (
                    <div className="p-3 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-3 mt-2 text-xs">
                      <div className="font-bold text-emerald-300">
                        Modifier la salle et l'horaire :
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">
                            Salle
                          </label>
                          <select
                            value={editRoomId}
                            onChange={(e) => setEditRoomId(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          >
                            {rooms.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">
                            Heure de début
                          </label>
                          <input
                            type="time"
                            value={editTime}
                            onChange={(e) => setEditTime(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <input
                          type="checkbox"
                          id="notifyCheck"
                          checked={notifyAttendees}
                          onChange={(e) => setNotifyAttendees(e.target.checked)}
                          className="rounded text-red-500"
                        />
                        <label htmlFor="notifyCheck" className="text-slate-300 text-[11px]">
                          Envoyer une notification push instantanée à tous les congressistes
                        </label>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => setEditingSessionId(null)}
                          className="px-3 py-1.5 bg-slate-800 text-slate-400 rounded-lg text-xs"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={saveEditSession}
                          className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-500"
                        >
                          Enregistrer & Diffuser
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Questions Moderation & Answering */}
          {activeAdminTab === 'questions' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                Questions de la salle triées par nombre de votes d'intérêt :
              </div>

              {questions.map((q) => {
                const s = sessions.find((sess) => sess.id === q.sessionId);

                return (
                  <div
                    key={q.id}
                    className={`bg-slate-950 border rounded-xl p-3.5 space-y-2.5 ${
                      q.isHidden ? 'border-amber-900/60 opacity-60' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-teal-400">
                          {s?.title ? s.title.slice(0, 45) + '...' : 'Session'}
                        </span>
                        <div className="text-xs font-bold text-white">
                          Par : {q.userName}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                          {q.upvotes.length} vote(s)
                        </span>

                        <button
                          onClick={() => toggleHideQuestion(q.id)}
                          className={`p-1.5 rounded-lg border text-xs ${
                            q.isHidden
                              ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                              : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                          }`}
                          title={q.isHidden ? 'Démasquer' : 'Masquer de la salle'}
                        >
                          {q.isHidden ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 italic">
                      « {q.questionText} »
                    </p>

                    {/* Existing Answer */}
                    {q.answerText ? (
                      <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-800 text-xs text-teal-200">
                        <span className="font-bold text-[10px] uppercase block text-teal-400">
                          Réponse officielle :
                        </span>
                        {q.answerText}
                      </div>
                    ) : (
                      <div>
                        {answeringQuestionId === q.id ? (
                          <div className="space-y-2 mt-2">
                            <textarea
                              rows={2}
                              value={answerDraft}
                              onChange={(e) => setAnswerDraft(e.target.value)}
                              placeholder="Rédiger la réponse de la tribune..."
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setAnsweringQuestionId(null)}
                                className="px-2.5 py-1 text-xs text-slate-400"
                              >
                                Annuler
                              </button>
                              <button
                                onClick={() => submitAnswer(q.id)}
                                className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs"
                              >
                                Publier la réponse
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setAnsweringQuestionId(q.id);
                              setAnswerDraft('');
                            }}
                            className="text-xs text-teal-400 hover:underline font-semibold"
                          >
                            + Répondre à cette question
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Broadcast Push Notification */}
          {activeAdminTab === 'broadcast' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Diffusion d'alerte en direct
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ce message sera envoyé immédiatement sous forme de notification push à l'ensemble des <strong>{deviceCount} terminaux mobiles</strong> connectés au congrès.
                </p>
              </div>

              <form onSubmit={handleBroadcast} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Titre de la notification
                  </label>
                  <input
                    type="text"
                    value={notifTitle}
                    onChange={(e) => setNotifTitle(e.target.value)}
                    placeholder="Ex: Début du symposium dans 5 minutes"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={notifBody}
                    onChange={(e) => setNotifBody(e.target.value)}
                    placeholder="Ex: Merci de rejoindre la Salle EL MAWAKIF pour la séance inaugurale."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {notifSuccess && (
                  <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Notification diffusée avec succès à tous les téléphones !</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!notifTitle.trim() || !notifBody.trim()}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la notification push générale</span>
                </button>
              </form>
            </div>
          )}

          {/* Tab 4: Counts & Statistics */}
          {activeAdminTab === 'stats' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-1">
                  <Smartphone className="w-6 h-6 text-teal-400 mx-auto mb-1" />
                  <div className="text-2xl font-black text-white font-mono">
                    {deviceCount}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Appareils installés
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-1">
                  <Users className="w-6 h-6 text-teal-400 mx-auto mb-1" />
                  <div className="text-2xl font-black text-white font-mono">
                    {accountsCount}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Comptes créés
                  </div>
                </div>

                <div className="bg-slate-950 border border-teal-500/40 rounded-xl p-4 text-center space-y-1 bg-teal-950/20">
                  <QrCode className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {activatedAccountsCount}
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Actifs (QR scanné à l'entrée)
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                  Règles d'accès et de sécurité
                </h5>
                <p>
                  • Les personnes qui créent un compte doivent scanner le QR code d'accueil une seule fois pour activer leur badge.
                </p>
                <p>
                  • Les e-Posters, retransmissions en direct et la tribune de questions sont déverrouillés uniquement après ce scan d'entrée.
                </p>
                <p>
                  • Le code d'accueil actuel est paramétré sur : <code className="bg-slate-900 text-teal-300 px-1 py-0.5 rounded font-mono">AAPEP-2025-MARRAKECH-ENTREE</code>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

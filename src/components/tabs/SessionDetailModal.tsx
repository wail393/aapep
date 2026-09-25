import React, { useState } from 'react';
import {
  X,
  Clock,
  MapPin,
  Calendar,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  AlertCircle,
  Radio,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SessionDetailModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    selectedSessionId,
    sessions,
    speakers,
    questions,
    addQuestion,
    toggleQuestionUpvote,
    isSessionInAgenda,
    toggleAgendaItem,
    openModal,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orateurs' | 'questions'>('questions');
  const [questionText, setQuestionText] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const isOpen = activeModal === 'session_detail' && !!selectedSessionId;
  const session = sessions.find((s) => s.id === selectedSessionId);

  if (!isOpen || !session) return null;

  const sessionSpeakers = speakers.filter((spk) =>
    session.speakerIds.includes(spk.id)
  );

  const sessionQuestions = questions
    .filter((q) => q.sessionId === session.id && (!q.isHidden || currentUser.role === 'admin'))
    .sort((a, b) => b.upvotes.length - a.upvotes.length);

  const inAgenda = isSessionInAgenda(session.id);

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const ok = addQuestion(session.id, questionText);
    if (ok) {
      setQuestionText('');
      setSubmittedToast(true);
      setTimeout(() => setSubmittedToast(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-t-2xl sm:rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/70">
              Communication
            </span>
            <span className="text-xs text-slate-400">
              {session.day === '2025-11-06' ? 'Jeudi 06 Nov' : 'Vendredi 07 Nov'}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => toggleAgendaItem(session.id)}
              className={`p-2 rounded-lg transition ${
                inAgenda
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={inAgenda ? 'Dans mon agenda' : 'Ajouter'}
            >
              <Bookmark className={`w-5 h-5 ${inAgenda ? 'fill-emerald-400' : ''}`} />
            </button>
            <button
              onClick={closeModal}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Metadata banner */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                {session.startTime} - {session.endTime}
              </span>

              <button
                onClick={() => {
                  closeModal();
                  openModal('plan_exposition', session.roomId);
                }}
                className="text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700 flex items-center transition"
              >
                <MapPin className="w-3.5 h-3.5 mr-1 text-red-500" />
                {session.roomName}
              </button>

              {session.status === 'live' && (
                <span className="inline-flex items-center text-[10px] font-bold text-white bg-red-600 px-2.5 py-1 rounded-md border border-red-500 animate-pulse">
                  <Radio className="w-3 h-3 mr-1" />
                  En direct
                </span>
              )}
            </div>

            <h2 className="text-base font-bold text-white leading-snug">
              {session.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {session.description}
            </p>
          </div>

          {/* Sub-tabs: Orateurs vs Questions */}
          <div className="border-b border-slate-800 flex">
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 flex items-center justify-center space-x-1.5 transition ${
                activeTab === 'questions'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Questions & Réponses ({sessionQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orateurs')}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 flex items-center justify-center space-x-1.5 transition ${
                activeTab === 'orateurs'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Orateurs ({sessionSpeakers.length})</span>
            </button>
          </div>

          {/* TAB 1: QUESTIONS & UPVOTES */}
          {activeTab === 'questions' && (
            <div className="space-y-4">
              {/* Question input form */}
              {currentUser.entryVerifiedAt || currentUser.role === 'admin' ? (
                <form onSubmit={handleSendQuestion} className="space-y-2">
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Votre question ici (sera posée à la tribune)..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                    />
                    <button
                      type="submit"
                      disabled={!questionText.trim()}
                      className="absolute right-2.5 bottom-2.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-lg flex items-center space-x-1 transition shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Envoyer</span>
                    </button>
                  </div>
                  {submittedToast && (
                    <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Votre question a été soumise avec succès !</span>
                    </div>
                  )}
                </form>
              ) : (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-300">
                    {currentUser.role === 'visitor'
                      ? "Connectez-vous et validez votre badge d'entrée pour poser vos questions aux orateurs."
                      : "Scannez le QR code d'entrée pour poser vos questions."}
                  </p>
                  <button
                    onClick={() =>
                      currentUser.role === 'visitor'
                        ? openModal('auth')
                        : openModal('qr_scanner')
                    }
                    className="text-xs font-bold text-emerald-400 underline hover:text-emerald-300"
                  >
                    {currentUser.role === 'visitor'
                      ? "Se connecter / Créer un compte →"
                      : "Scanner le QR code d'entrée →"}
                  </button>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    Liste des questions (triées par votes)
                  </span>
                  <span className="text-[11px]">{sessionQuestions.length} posée(s)</span>
                </div>

                {sessionQuestions.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800">
                    Soyez le premier à poser une question pour cette session !
                  </div>
                ) : (
                  sessionQuestions.map((q) => {
                    const hasVoted = q.upvotes.includes(currentUser.id);

                    return (
                      <div
                        key={q.id}
                        className={`bg-slate-950 border rounded-xl p-3 space-y-2.5 transition ${
                          q.isHidden
                            ? 'border-red-900/50 bg-red-950/10 opacity-75'
                            : 'border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-emerald-300">
                                {q.userName}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {new Date(q.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            {q.isHidden && (
                              <span className="inline-block text-[9px] text-red-400 font-medium">
                                (Masquée par la modération)
                              </span>
                            )}
                          </div>

                          {/* Upvote Button */}
                          <button
                            onClick={() => toggleQuestionUpvote(q.id)}
                            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                              hasVoted
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                            }`}
                          >
                            <ThumbsUp
                              className={`w-3.5 h-3.5 ${
                                hasVoted ? 'fill-emerald-400 text-emerald-400' : ''
                              }`}
                            />
                            <span>{q.upvotes.length}</span>
                          </button>
                        </div>

                        {/* Question Text */}
                        <p className="text-xs text-slate-200 leading-relaxed">
                          « {q.questionText} »
                        </p>

                        {/* Admin / Speaker Answer if present */}
                        {q.answerText && (
                          <div className="mt-2 p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-xs space-y-1">
                            <div className="flex items-center space-x-1.5 text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Réponse de {q.answeredBy || 'la Tribune'} :</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed text-[11px]">
                              {q.answerText}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SPEAKERS */}
          {activeTab === 'orateurs' && (
            <div className="space-y-3">
              {sessionSpeakers.map((spk) => (
                <div
                  key={spk.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start space-x-3"
                >
                  <img
                    src={spk.photoUrl}
                    alt={spk.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white">{spk.name}</h3>
                    <p className="text-[11px] text-teal-400 font-medium">
                      {spk.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {spk.hospital} • {spk.specialty}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                      {spk.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

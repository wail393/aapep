import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Radio,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  User,
  Sparkles,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Session, Speaker, SessionStatus } from '../../types';

export const ProgrammeTab: React.FC = () => {
  const {
    sessions,
    speakers,
    openModal,
    isSessionInAgenda,
    toggleAgendaItem,
    setHighlightedRoomId
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'sessions' | 'orateurs'>('sessions');
  const [selectedDay, setSelectedDay] = useState<'2025-11-06' | '2025-11-07'>('2025-11-06');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  // Filtered Sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchDay = session.day === selectedDay;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        session.title.toLowerCase().includes(q) ||
        session.roomName.toLowerCase().includes(q) ||
        session.domainName.toLowerCase().includes(q) ||
        session.description.toLowerCase().includes(q);

      const matchType =
        selectedTypeFilter === 'all' || session.type === selectedTypeFilter;

      return matchDay && matchSearch && matchType;
    });
  }, [sessions, selectedDay, searchQuery, selectedTypeFilter]);

  // Filtered Speakers
  const filteredSpeakers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return speakers;
    return speakers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.specialty.toLowerCase().includes(q) ||
        s.hospital.toLowerCase().includes(q)
    );
  }, [speakers, searchQuery]);

  const getStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case 'live':
        return (
          <span className="inline-flex items-center text-[10px] font-bold text-red-400 bg-red-950/70 px-2 py-0.5 rounded-full border border-red-800 animate-pulse">
            <Radio className="w-2.5 h-2.5 mr-1" />
            En direct
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center text-[10px] font-medium text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60">
            En préparation
          </span>
        );
      case 'finished':
        return (
          <span className="inline-flex items-center text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
            Terminé
          </span>
        );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pleniere':
        return 'Séance Plénière';
      case 'communication_orale':
        return 'Communication Orale';
      case 'atelier':
        return 'Atelier Pratique';
      case 'symposium':
        return 'Symposium';
      case 'table_ronde':
        return 'Table Ronde';
      default:
        return type;
    }
  };

  return (
    <div className="pb-24 space-y-4">
      {/* 1. Sub-tabs Switcher (Sessions vs Orateurs) */}
      <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex">
        <button
          onClick={() => setActiveSubTab('sessions')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'sessions'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sessions Scientifiques
        </button>
        <button
          onClick={() => setActiveSubTab('orateurs')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'orateurs'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Orateurs & Experts ({speakers.length})
        </button>
      </div>

      {/* 2. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeSubTab === 'sessions'
              ? 'Rechercher une session, communication, salle...'
              : 'Rechercher un orateur, spécialité...'
          }
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
          >
            Effacer
          </button>
        )}
      </div>

      {/* SESSIONS SUBTAB */}
      {activeSubTab === 'sessions' && (
        <div className="space-y-4">
          {/* Day selection tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedDay('2025-11-06')}
              className={`p-3 rounded-xl border text-left transition ${
                selectedDay === '2025-11-06'
                  ? 'bg-gradient-to-br from-emerald-950/70 to-slate-900 border-emerald-500/80 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Jour 1
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                Jeudi 06 Novembre
              </div>
              <div className="text-[11px] text-slate-400">
                5 sessions • Plénières & Débats
              </div>
            </button>

            <button
              onClick={() => setSelectedDay('2025-11-07')}
              className={`p-3 rounded-xl border text-left transition ${
                selectedDay === '2025-11-07'
                  ? 'bg-gradient-to-br from-emerald-950/70 to-slate-900 border-emerald-500/80 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Jour 2
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                Vendredi 07 Novembre
              </div>
              <div className="text-[11px] text-slate-400">
                3 sessions • Ateliers & Clôture
              </div>
            </button>
          </div>

          {/* Session Type Filters */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            {[
              { id: 'all', label: 'Tous' },
              { id: 'pleniere', label: 'Plénières' },
              { id: 'symposium', label: 'Symposia' },
              { id: 'atelier', label: 'Ateliers' },
              { id: 'communication_orale', label: 'Com. Orales' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedTypeFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition ${
                  selectedTypeFilter === f.id
                    ? 'bg-emerald-600 text-white font-bold border-emerald-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          {filteredSessions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs font-semibold text-slate-300">
                Aucune session trouvée
              </p>
              <p className="text-[11px] text-slate-500">
                Modifiez vos filtres ou vos termes de recherche.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSessions.map((session) => {
                const inAgenda = isSessionInAgenda(session.id);
                const sessionSpeakers = speakers.filter((spk) =>
                  session.speakerIds.includes(spk.id)
                );

                return (
                  <div
                    key={session.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 shadow-md transition space-y-2.5"
                  >
                    {/* Header: Time, Room Chip & Status Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold text-emerald-400 font-mono flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                          {session.startTime} - {session.endTime}
                        </span>

                        {/* Room Chip (tapping opens floor plan with room highlighted!) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal('plan_exposition', session.roomId);
                          }}
                          title="Localiser sur le plan"
                          className="inline-flex items-center text-[10px] font-semibold text-slate-200 bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-700/60 px-2 py-0.5 rounded border border-slate-700 transition"
                        >
                          <MapPin className="w-2.5 h-2.5 mr-1 text-red-500" />
                          {session.roomName}
                        </button>
                      </div>

                      {getStatusBadge(session.status)}
                    </div>

                    {/* Session Type & Domain */}
                    <div className="flex items-center space-x-2 text-[10px]">
                      <span className="font-bold text-red-400 uppercase tracking-wider">
                        {getTypeLabel(session.type)}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 truncate">
                        {session.domainName}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openModal('session_detail', session.id)}
                      className="text-sm font-bold text-white leading-snug cursor-pointer hover:text-emerald-300 transition"
                    >
                      {session.title}
                    </h3>

                    {/* Speakers miniatures */}
                    {sessionSpeakers.length > 0 && (
                      <div className="flex items-center space-x-2 pt-1 border-t border-slate-800/80">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {sessionSpeakers.map((spk) => (
                            <img
                              key={spk.id}
                              src={spk.photoUrl}
                              alt={spk.name}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-300 font-medium truncate">
                          {sessionSpeakers.map((s) => s.name).join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Footer Actions: Add to Agenda + View Details */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => toggleAgendaItem(session.id)}
                        className={`inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                          inAgenda
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            inAgenda ? 'fill-emerald-400 text-emerald-400' : ''
                          }`}
                        />
                        <span>{inAgenda ? 'Dans mon agenda' : 'Ajouter à mon agenda'}</span>
                      </button>

                      <button
                        onClick={() => openModal('session_detail', session.id)}
                        className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-semibold text-[11px]"
                      >
                        <span>Détails & Questions</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ORATEURS SUBTAB */}
      {activeSubTab === 'orateurs' && (
        <div className="space-y-3">
          {filteredSpeakers.map((spk) => {
            const speakerSessions = sessions.filter((s) =>
              s.speakerIds.includes(spk.id)
            );

            return (
              <div
                key={spk.id}
                onClick={() => openModal('speaker_detail', spk.id)}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 shadow-md flex items-start space-x-3.5 cursor-pointer transition group"
              >
                <img
                  src={spk.photoUrl}
                  alt={spk.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700 group-hover:border-emerald-500 transition"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition truncate">
                    {spk.name}
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-medium truncate">
                    {spk.title}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {spk.hospital} • {spk.specialty}
                  </p>

                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-[10px] font-semibold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {speakerSessions.length} session(s)
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center">
                      Voir bio →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Home, Calendar, Radio, Bookmark, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, agendaSessionIds, sessions } = useApp();

  const liveSessionsCount = sessions.filter(s => s.status === 'live').length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/98 border-t border-slate-800 text-slate-400 select-none pb-safe backdrop-blur-lg">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1 relative">
        {/* Tab 1: Accueil */}
        <button
          onClick={() => setActiveTab('accueil')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
            activeTab === 'accueil' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'accueil' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Accueil</span>
        </button>

        {/* Tab 2: Programme */}
        <button
          onClick={() => setActiveTab('programme')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
            activeTab === 'programme' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className={`w-5 h-5 ${activeTab === 'programme' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Programme</span>
        </button>

        {/* Tab 3: LIVE (Center prominent button in crimson red) */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={() => setActiveTab('live')}
            className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform active:scale-95 ${
              activeTab === 'live'
                ? 'bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 text-white ring-4 ring-red-500/30 shadow-red-900/60'
                : 'bg-gradient-to-tr from-red-950 via-slate-800 to-slate-800 text-white ring-2 ring-red-700/50 hover:ring-red-500'
            }`}
          >
            <div className="relative">
              <Radio className="w-6 h-6 animate-pulse text-white" />
              {liveSessionsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-ping" />
              )}
            </div>
            <span className="text-[9px] font-extrabold tracking-wider mt-0.5 uppercase text-white">
              LIVE
            </span>
          </button>
        </div>

        {/* Tab 4: Agenda */}
        <button
          onClick={() => setActiveTab('agenda')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
            activeTab === 'agenda' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Bookmark className={`w-5 h-5 ${activeTab === 'agenda' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {agendaSessionIds.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-slate-900">
                {agendaSessionIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Agenda</span>
        </button>

        {/* Tab 5: ePosters */}
        <button
          onClick={() => setActiveTab('eposters')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
            activeTab === 'eposters' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === 'eposters' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">ePosters</span>
        </button>
      </div>
    </nav>
  );
};

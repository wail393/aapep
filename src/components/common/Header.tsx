import React from 'react';
import { Bell, Menu, QrCode, ShieldCheck, UserCheck, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentUser,
    setIsDrawerOpen,
    openModal,
    unreadNotificationsCount,
    switchUserRole,
    activeTab
  } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'accueil':
        return "AAPEP Congrès 2025";
      case 'programme':
        return "Programme & Orateurs";
      case 'live':
        return "Sessions en Direct";
      case 'agenda':
        return "Mon Agenda";
      case 'eposters':
        return "e-Posters Scientifiques";
      default:
        return "AAPEP Congrès";
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
      {/* Android top notification / status bar mock info */}
      <div className="flex items-center justify-between px-4 py-1 text-[11px] text-slate-400 bg-slate-950/80 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-300">AAPEP Officiel</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium">Marrakech 2025</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>
        <div className="flex items-center space-x-2">
          {currentUser.entryVerifiedAt ? (
            <span className="inline-flex items-center text-[10px] font-medium text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800/50">
              <UserCheck className="w-2.5 h-2.5 mr-1 text-emerald-400" />
              Badge Entrée Validé
            </span>
          ) : currentUser.role === 'admin' ? (
            <span className="inline-flex items-center text-[10px] font-medium text-red-400 bg-red-950/70 px-1.5 py-0.5 rounded border border-red-800/50">
              <Shield className="w-2.5 h-2.5 mr-1 text-red-400" />
              Admin
            </span>
          ) : (
            <button
              onClick={() => openModal('qr_scanner')}
              className="inline-flex items-center text-[10px] font-medium text-red-300 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-700/60 animate-pulse hover:bg-red-900 transition-colors"
            >
              <QrCode className="w-2.5 h-2.5 mr-1 text-red-400" />
              Scan QR Entrée requis
            </button>
          )}
        </div>
      </div>

      {/* Main app bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Ouvrir le menu"
            className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 active:scale-95 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 via-emerald-500 to-red-600 flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-emerald-900/40 border border-emerald-400/30">
              AAPEP
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight">
                {getTabTitle()}
              </h1>
              <p className="text-[10px] text-emerald-400 font-semibold leading-none flex items-center space-x-1 mt-0.5">
                <span>Psychiatrie Libérale</span>
                <span className="text-red-400 font-black">•</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center space-x-1.5">
          {/* Quick role switcher dropdown for testing ease */}
          <div className="relative">
            <select
              aria-label="Mode démonstration profil"
              className="bg-slate-800 text-[11px] text-slate-200 border border-emerald-800/60 rounded-md px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              value={
                currentUser.role === 'admin'
                  ? 'admin'
                  : currentUser.role === 'visitor'
                  ? 'visitor'
                  : currentUser.entryVerifiedAt
                  ? 'user_activated'
                  : 'user_unverified'
              }
              onChange={(e) => switchUserRole(e.target.value as any)}
            >
              <option value="user_activated">Badge Activé (Dr. Mansouri)</option>
              <option value="user_unverified">Inscrit non-scanné (Dr. Cherkaoui)</option>
              <option value="visitor">Visiteur Libre</option>
              <option value="admin">Administrateur (Dr. Tazi)</option>
            </select>
          </div>

          {/* Notifications bell */}
          <button
            onClick={() => openModal('notifications_list')}
            aria-label="Notifications"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg active:scale-95 transition"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-600 ring-2 ring-slate-900 animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

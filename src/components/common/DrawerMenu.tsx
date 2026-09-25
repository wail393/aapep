import React from 'react';
import {
  Users,
  Award,
  Info,
  MapPin,
  Map,
  FileDown,
  Shield,
  LogIn,
  LogOut,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';

export const DrawerMenu: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    currentUser,
    switchUserRole,
    openModal
  } = useApp();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 left-0 max-w-[320px] w-full bg-slate-900 text-slate-100 shadow-2xl flex flex-col border-r border-slate-800 animate-in slide-in-from-left duration-200">
        {/* Drawer Header / User Banner */}
        <div className="p-4 bg-gradient-to-br from-slate-950 via-emerald-950/60 to-red-950/40 border-b border-slate-800 relative">
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Fermer le menu"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 absolute top-4 right-4"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User profile card */}
          <div className="flex items-start space-x-3 mt-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-red-600 text-white font-bold text-lg flex items-center justify-center shadow-md border border-emerald-400/40">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <h3 className="font-bold text-sm text-white truncate">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-400 truncate">
                {currentUser.email}
              </p>
              
              {/* Role & Activation Status Badge */}
              <div className="mt-1.5 flex items-center flex-wrap gap-1.5">
                {currentUser.role === 'visitor' ? (
                  <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Visiteur
                  </span>
                ) : currentUser.role === 'admin' ? (
                  <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                    <Shield className="w-3 h-3 mr-1 text-red-400" />
                    Administrateur
                  </span>
                ) : currentUser.entryVerifiedAt ? (
                  <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
                    Badge Entrée Activé
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                    <AlertTriangle className="w-3 h-3 mr-1 text-red-400" />
                    Non vérifié à l'entrée
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Activation Action for attendees not scanned yet */}
          {currentUser.role !== 'visitor' && !currentUser.entryVerifiedAt && currentUser.role !== 'admin' && (
            <div className="mt-3.5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => openModal('qr_scanner')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold transition"
              >
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-red-400" />
                  <span>Scanner le QR d'entrée</span>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5 text-sm">
          {/* Section 1: Informations */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Informations du Congrès</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => openModal('bureau_executif')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Bureau exécutif</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => openModal('comites')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Comités</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => openModal('info_generale')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>Informations générales</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => openModal('infos_pratiques')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>Infos pratiques & Lieu</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => openModal('plan_exposition')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <Map className="w-4 h-4 text-emerald-400" />
                  <span>Plan d'exposition</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => openModal('programme_pdf')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <FileDown className="w-4 h-4 text-red-400" />
                  <span>Programme en PDF</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Section 2: QR & Accès Entrée */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Accès & Vérification
            </div>
            <div className="space-y-1">
              <button
                onClick={() => openModal('qr_scanner')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-200 transition text-left"
              >
                <div className="flex items-center space-x-3">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-medium text-xs">Scanner QR d'entrée</div>
                    <div className="text-[10px] text-slate-400">Activer les privilèges congressiste</div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={() => openModal('official_entrance_qr')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left text-xs"
              >
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-4 h-4 text-red-400" />
                  <span>Afficher le QR officiel (Accueil)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Section 3: Admin Section */}
          {(currentUser.role === 'admin' || true) && (
            <div>
              <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-bold text-red-400/90 uppercase tracking-wider">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  Administration
                </span>
                {currentUser.role !== 'admin' && (
                  <span className="text-[9px] text-slate-500 font-normal lowercase">(aperçu démo)</span>
                )}
              </div>
              <button
                onClick={() => openModal('admin_dashboard')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/30 transition text-left text-xs font-semibold"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-red-400" />
                  <div>
                    <div>Panneau d'Administration</div>
                    <div className="text-[10px] font-normal text-red-300/80">Direct, notifications, Q&R, stats</div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          )}

          {/* Section 4: Compte & Connexion */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Compte
            </div>
            <div className="space-y-1">
              {currentUser.role === 'visitor' ? (
                <button
                  onClick={() => openModal('auth')}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs transition shadow-md shadow-emerald-900/30"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Se connecter / Créer un compte</span>
                </button>
              ) : (
                <button
                  onClick={() => switchUserRole('visitor')}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/10 transition text-left text-xs"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Se déconnecter</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col space-y-1">
          <div className="font-semibold text-slate-300">
            {EVENT_CONFIG.title}
          </div>
          <div className="text-slate-400 text-[10px]">
            {EVENT_CONFIG.theme} • {EVENT_CONFIG.dates}
          </div>
          <div className="text-slate-400 text-[10px] flex items-center justify-between pt-1">
            <span>© 2025 AAPEP</span>
            <span className="font-mono">v2.4.1 (Android)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

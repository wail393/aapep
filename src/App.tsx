import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DrawerMenu } from './components/common/DrawerMenu';
import { NotificationBanner } from './components/common/NotificationBanner';
import { SplashScreen } from './components/common/SplashScreen';
import { QRScannerModal } from './components/common/QRScannerModal';
import { OfficialEntranceQRModal } from './components/common/OfficialEntranceQRModal';
import { NotificationsListModal } from './components/common/NotificationsListModal';

import { AccueilTab } from './components/tabs/AccueilTab';
import { ProgrammeTab } from './components/tabs/ProgrammeTab';
import { LiveTab } from './components/tabs/LiveTab';
import { AgendaTab } from './components/tabs/AgendaTab';
import { EPostersTab } from './components/tabs/EPostersTab';
import { SessionDetailModal } from './components/tabs/SessionDetailModal';
import { SpeakerDetailModal } from './components/tabs/SpeakerDetailModal';

import { BureauExecutifModal } from './components/info/BureauExecutifModal';
import { ComitesModal } from './components/info/ComitesModal';
import { InfoGeneraleModal } from './components/info/InfoGeneraleModal';
import { InfosPratiquesModal } from './components/info/InfosPratiquesModal';
import { PlanExpositionModal } from './components/info/PlanExpositionModal';
import { ProgrammePDFModal } from './components/info/ProgrammePDFModal';

import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { AuthModal } from './components/auth/AuthModal';
import { Smartphone, Monitor, RotateCcw } from 'lucide-react';

const MainCongressApp: React.FC = () => {
  const {
    activeTab,
    showSplashScreen,
    setShowSplashScreen,
    isMobileDeviceView,
    setIsMobileDeviceView
  } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'accueil':
        return <AccueilTab />;
      case 'programme':
        return <ProgrammeTab />;
      case 'live':
        return <LiveTab />;
      case 'agenda':
        return <AgendaTab />;
      case 'eposters':
        return <EPostersTab />;
      default:
        return <AccueilTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start antialiased font-sans">
      {/* Top Device & Testing Toolbar (for preview convenience) */}
      <aside aria-label="Contrôles d'aperçu" className="w-full bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 py-1.5 px-4 hidden md:flex items-center justify-between z-40">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-teal-400">Congrès National AAPEP</span>
          <span className="text-slate-600">|</span>
          <span>Cible : Application Mobile Android (Psychiatrie Libérale)</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Switch screen frame button */}
          <button
            onClick={() => setIsMobileDeviceView(!isMobileDeviceView)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            {isMobileDeviceView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-teal-400" />
                <span>Passer en Plein Écran Web</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span>Vue Téléphone Android</span>
              </>
            )}
          </button>

          {/* Replay splash screen */}
          <button
            onClick={() => setShowSplashScreen(true)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Splash Screen</span>
          </button>
        </div>
      </aside>

      {/* Main Container: Android Smartphone Mockup or Responsive Shell */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          isMobileDeviceView
            ? 'max-w-md my-0 md:my-5 min-h-screen md:min-h-[820px] md:rounded-[36px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-slate-950'
            : 'max-w-3xl min-h-screen bg-slate-950'
        }`}
      >
        {/* Splash screen component if active */}
        {showSplashScreen && (
          <SplashScreen onFinish={() => setShowSplashScreen(false)} />
        )}

        {/* Global Notification Banner */}
        <NotificationBanner />

        {/* Fixed App Header */}
        <Header />

        {/* Scrollable Tab Content Viewport */}
        <main className="flex-1 p-3.5 overflow-y-auto">
          {renderActiveTab()}
        </main>

        {/* Fixed Bottom Navigation Tabs */}
        <BottomNav />

        {/* Side Menu Drawer */}
        <DrawerMenu />

        {/* App Modals */}
        <SessionDetailModal />
        <SpeakerDetailModal />
        <QRScannerModal />
        <OfficialEntranceQRModal />
        <NotificationsListModal />
        <BureauExecutifModal />
        <ComitesModal />
        <InfoGeneraleModal />
        <InfosPratiquesModal />
        <PlanExpositionModal />
        <ProgrammePDFModal />
        <AdminDashboardModal />
        <AuthModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainCongressApp />
    </AppProvider>
  );
}

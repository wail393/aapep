import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEMO_USERS, EVENT_CONFIG, INITIAL_COMMITTEES, INITIAL_EPOSTERS, INITIAL_EXHIBITORS, INITIAL_PHOTOS, INITIAL_QUESTIONS, INITIAL_ROOMS, INITIAL_SESSIONS, INITIAL_SPEAKERS } from '../data/mockData';
import { CommitteeMember, EPoster, Exhibitor, PhotoItem, PushNotification, Question, Room, Session, SessionStatus, Speaker, User } from '../types';

export type ActiveTab = 'accueil' | 'programme' | 'live' | 'agenda' | 'eposters';

export type ActiveModal =
  | 'none'
  | 'session_detail'
  | 'speaker_detail'
  | 'qr_scanner'
  | 'official_entrance_qr'
  | 'bureau_executif'
  | 'comites'
  | 'info_generale'
  | 'infos_pratiques'
  | 'plan_exposition'
  | 'programme_pdf'
  | 'admin_dashboard'
  | 'auth'
  | 'notifications_list';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchUserRole: (role: 'visitor' | 'user_unverified' | 'user_activated' | 'admin') => void;
  
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  activeModal: ActiveModal;
  setActiveModal: (modal: ActiveModal) => void;
  openModal: (modal: ActiveModal, data?: any) => void;
  closeModal: () => void;
  
  // Selection
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  selectedSpeakerId: string | null;
  setSelectedSpeakerId: (id: string | null) => void;
  highlightedRoomId: string | null;
  setHighlightedRoomId: (id: string | null) => void;
  
  // Data
  sessions: Session[];
  speakers: Speaker[];
  questions: Question[];
  eposters: EPoster[];
  rooms: Room[];
  committees: CommitteeMember[];
  photos: PhotoItem[];
  exhibitors: Exhibitor[];
  agendaSessionIds: string[];
  
  // Actions
  toggleAgendaItem: (sessionId: string) => boolean;
  isSessionInAgenda: (sessionId: string) => boolean;
  addQuestion: (sessionId: string, text: string) => boolean;
  toggleQuestionUpvote: (questionId: string) => void;
  
  // QR Activation
  redeemEntryCode: (code: string) => { success: boolean; message: string };
  
  // Admin Operations
  updateSessionStatus: (sessionId: string, newStatus: SessionStatus) => void;
  updateSessionDetails: (sessionId: string, newRoomId: string, newTime: string, notifyEveryone: boolean) => void;
  answerQuestion: (questionId: string, answerText: string) => void;
  toggleHideQuestion: (questionId: string) => void;
  sendBroadcastNotification: (title: string, body: string, sessionId?: string, type?: 'info' | 'urgent' | 'room_change') => void;
  
  // Notifications
  notifications: PushNotification[];
  latestBannerNotification: PushNotification | null;
  dismissBannerNotification: () => void;
  markNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Stats
  deviceCount: number;
  accountsCount: number;
  activatedAccountsCount: number;

  // Display mode
  isMobileDeviceView: boolean;
  setIsMobileDeviceView: (val: boolean) => void;
  showSplashScreen: boolean;
  setShowSplashScreen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state (starts by default as an activated user for rich exploration, with quick-switcher available)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('aapep_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEMO_USERS[2]; // Dr. Amine Mansouri (activated user)
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('accueil');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null);
  const [highlightedRoomId, setHighlightedRoomId] = useState<string | null>(null);

  // Core Data with localStorage persistence
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('aapep_sessions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SESSIONS;
  });

  const [speakers] = useState<Speaker[]>(INITIAL_SPEAKERS);
  
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('aapep_questions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_QUESTIONS;
  });

  const [eposters] = useState<EPoster[]>(INITIAL_EPOSTERS);
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  const [committees] = useState<CommitteeMember[]>(INITIAL_COMMITTEES);
  const [photos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [exhibitors] = useState<Exhibitor[]>(INITIAL_EXHIBITORS);

  // Agenda items per user
  const [agendaSessionIds, setAgendaSessionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`aapep_agenda_${currentUser.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['sess_1', 'sess_2', 'sess_6'];
  });

  // Notifications
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: 'notif_welcome',
      title: "Bienvenue au Congrès National AAPEP 2025",
      body: "La séance plénière d'ouverture débute à 09:00 en Salle EL MAWAKIF.",
      sentAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      type: 'info',
      read: false
    }
  ]);
  const [latestBannerNotification, setLatestBannerNotification] = useState<PushNotification | null>(null);

  // Stats
  const [deviceCount] = useState(942);
  const [accountsCount, setAccountsCount] = useState(318);
  const [activatedAccountsCount, setActivatedAccountsCount] = useState(194);

  // Layout View mode
  const [isMobileDeviceView, setIsMobileDeviceView] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  // Save current user
  useEffect(() => {
    localStorage.setItem('aapep_current_user', JSON.stringify(currentUser));
    // Load that user's agenda
    const savedAgenda = localStorage.getItem(`aapep_agenda_${currentUser.id}`);
    if (savedAgenda) {
      try {
        setAgendaSessionIds(JSON.parse(savedAgenda));
      } catch (e) {
        setAgendaSessionIds([]);
      }
    } else {
      setAgendaSessionIds(currentUser.role !== 'visitor' ? ['sess_1', 'sess_2'] : []);
    }
  }, [currentUser]);

  // Persist sessions
  useEffect(() => {
    localStorage.setItem('aapep_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Persist questions
  useEffect(() => {
    localStorage.setItem('aapep_questions', JSON.stringify(questions));
  }, [questions]);

  // Persist agenda
  useEffect(() => {
    if (currentUser.id) {
      localStorage.setItem(`aapep_agenda_${currentUser.id}`, JSON.stringify(agendaSessionIds));
    }
  }, [agendaSessionIds, currentUser.id]);

  const switchUserRole = (type: 'visitor' | 'user_unverified' | 'user_activated' | 'admin') => {
    switch (type) {
      case 'visitor':
        setCurrentUser(DEMO_USERS[0]);
        break;
      case 'user_unverified':
        setCurrentUser(DEMO_USERS[1]);
        break;
      case 'user_activated':
        setCurrentUser(DEMO_USERS[2]);
        break;
      case 'admin':
        setCurrentUser(DEMO_USERS[3]);
        break;
    }
  };

  const openModal = (modal: ActiveModal, data?: any) => {
    if (modal === 'session_detail' && typeof data === 'string') {
      setSelectedSessionId(data);
    }
    if (modal === 'speaker_detail' && typeof data === 'string') {
      setSelectedSpeakerId(data);
    }
    if (modal === 'plan_exposition' && typeof data === 'string') {
      setHighlightedRoomId(data);
    }
    setActiveModal(modal);
    setIsDrawerOpen(false);
  };

  const closeModal = () => {
    setActiveModal('none');
  };

  // Agenda Actions
  const toggleAgendaItem = (sessionId: string): boolean => {
    if (currentUser.role === 'visitor') {
      openModal('auth');
      return false;
    }
    if (!currentUser.entryVerifiedAt && currentUser.role !== 'admin') {
      openModal('qr_scanner');
      return false;
    }

    setAgendaSessionIds(prev => {
      const exists = prev.includes(sessionId);
      if (exists) {
        return prev.filter(id => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });
    return true;
  };

  const isSessionInAgenda = (sessionId: string) => {
    return agendaSessionIds.includes(sessionId);
  };

  // Q&A Actions
  const addQuestion = (sessionId: string, text: string): boolean => {
    if (currentUser.role === 'visitor') {
      openModal('auth');
      return false;
    }
    if (!currentUser.entryVerifiedAt && currentUser.role !== 'admin') {
      openModal('qr_scanner');
      return false;
    }
    if (!text.trim()) return false;

    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      sessionId,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      questionText: text.trim(),
      isHidden: false,
      upvotes: [currentUser.id],
      createdAt: new Date().toISOString()
    };

    setQuestions(prev => [newQuestion, ...prev]);
    return true;
  };

  const toggleQuestionUpvote = (questionId: string) => {
    if (currentUser.role === 'visitor') {
      openModal('auth');
      return;
    }
    if (!currentUser.entryVerifiedAt && currentUser.role !== 'admin') {
      openModal('qr_scanner');
      return;
    }

    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const hasVoted = q.upvotes.includes(currentUser.id);
          const nextUpvotes = hasVoted
            ? q.upvotes.filter(uid => uid !== currentUser.id)
            : [...q.upvotes, currentUser.id];
          return { ...q, upvotes: nextUpvotes };
        }
        return q;
      })
    );
  };

  // QR Activation
  const redeemEntryCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const targetCode = EVENT_CONFIG.officialQrCode.toUpperCase();

    // Support either direct code match or standard URL eventapp://activate?c=...
    const matchesCode =
      cleanCode === targetCode ||
      cleanCode.includes(targetCode) ||
      cleanCode === 'AAPEP2025' ||
      cleanCode === 'ENTREE';

    if (matchesCode) {
      const now = new Date().toISOString();
      const updatedUser: User = {
        ...currentUser,
        role: currentUser.role === 'visitor' ? 'user' : currentUser.role,
        entryVerifiedAt: now
      };
      setCurrentUser(updatedUser);
      setActivatedAccountsCount(prev => prev + 1);

      // Trigger celebration notification
      const welcomeNotif: PushNotification = {
        id: `notif_activated_${Date.now()}`,
        title: "Compte Activé avec Succès ! 🎉",
        body: "Votre badge d'accès au Congrès AAPEP 2025 est vérifié. Vous avez désormais accès aux e-Posters, au direct et aux questions.",
        sentAt: now,
        type: 'info',
        read: false
      };
      setNotifications(prev => [welcomeNotif, ...prev]);
      setLatestBannerNotification(welcomeNotif);

      return {
        success: true,
        message: "Code d'entrée validé ! Votre compte congressiste est désormais activé."
      };
    }

    return {
      success: false,
      message: "Code invalide. Veuillez scanner le QR code officiel situé à l'accueil du congrès ou saisir 'AAPEP-2025-MARRAKECH-ENTREE'."
    };
  };

  // Admin Actions
  const updateSessionStatus = (sessionId: string, newStatus: SessionStatus) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          return { ...s, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return s;
      })
    );

    const session = sessions.find(s => s.id === sessionId);
    if (session && newStatus === 'live') {
      sendBroadcastNotification(
        "🔴 Session en direct",
        `La session "${session.title}" commence maintenant en ${session.roomName}.`,
        sessionId,
        'info'
      );
    }
  };

  const updateSessionDetails = (
    sessionId: string,
    newRoomId: string,
    newTime: string,
    notifyEveryone: boolean
  ) => {
    const room = rooms.find(r => r.id === newRoomId);
    let sessionTitle = '';

    setSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          sessionTitle = s.title;
          return {
            ...s,
            roomId: newRoomId,
            roomName: room ? room.name : s.roomName,
            startTime: newTime,
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      })
    );

    if (notifyEveryone) {
      sendBroadcastNotification(
        "Changement de salle / horaire",
        `La session "${sessionTitle.slice(0, 50)}..." a été déplacée en ${room ? room.name : 'nouvelle salle'} à ${newTime}.`,
        sessionId,
        'room_change'
      );
    }
  };

  const answerQuestion = (questionId: string, answerText: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answerText,
            answeredBy: currentUser.name,
            answeredAt: new Date().toISOString()
          };
        }
        return q;
      })
    );
  };

  const toggleHideQuestion = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return { ...q, isHidden: !q.isHidden };
        }
        return q;
      })
    );
  };

  const sendBroadcastNotification = (
    title: string,
    body: string,
    sessionId?: string,
    type: 'info' | 'urgent' | 'room_change' = 'info'
  ) => {
    const newNotif: PushNotification = {
      id: `notif_${Date.now()}`,
      title,
      body,
      sessionId,
      sentAt: new Date().toISOString(),
      type,
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setLatestBannerNotification(newNotif);

    // Auto dismiss banner after 6 seconds
    setTimeout(() => {
      setLatestBannerNotification(curr => (curr?.id === newNotif.id ? null : curr));
    }, 6000);
  };

  const dismissBannerNotification = () => {
    setLatestBannerNotification(null);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        activeTab,
        setActiveTab,
        isDrawerOpen,
        setIsDrawerOpen,
        activeModal,
        setActiveModal,
        openModal,
        closeModal,
        selectedSessionId,
        setSelectedSessionId,
        selectedSpeakerId,
        setSelectedSpeakerId,
        highlightedRoomId,
        setHighlightedRoomId,
        sessions,
        speakers,
        questions,
        eposters,
        rooms,
        committees,
        photos,
        exhibitors,
        agendaSessionIds,
        toggleAgendaItem,
        isSessionInAgenda,
        addQuestion,
        toggleQuestionUpvote,
        redeemEntryCode,
        updateSessionStatus,
        updateSessionDetails,
        answerQuestion,
        toggleHideQuestion,
        sendBroadcastNotification,
        notifications,
        latestBannerNotification,
        dismissBannerNotification,
        markNotificationsAsRead,
        unreadNotificationsCount,
        deviceCount,
        accountsCount,
        activatedAccountsCount,
        isMobileDeviceView,
        setIsMobileDeviceView,
        showSplashScreen,
        setShowSplashScreen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export type UserRole = 'visitor' | 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title?: string;
  institution?: string;
  entryVerifiedAt: string | null; // null = not scanned at entrance
  createdAt: string;
}

export type SessionStatus = 'preparing' | 'live' | 'finished';
export type SessionType = 'pleniere' | 'communication_orale' | 'atelier' | 'symposium' | 'table_ronde';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  hospital: string;
  specialty: string;
}

export interface Session {
  id: string;
  day: '2025-11-06' | '2025-11-07'; // Jeudi 06 / Vendredi 07
  startTime: string; // "09:00"
  endTime: string;   // "10:30"
  roomId: string;
  roomName: string;
  domainId: string;
  domainName: string;
  type: SessionType;
  title: string;
  description: string;
  speakerIds: string[];
  status: SessionStatus;
  liveUrl?: string; // YouTube or stream embed
  updatedAt?: string;
}

export interface Question {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  questionText: string;
  answerText?: string;
  answeredBy?: string;
  answeredAt?: string;
  isHidden: boolean;
  upvotes: string[]; // array of user IDs
  createdAt: string;
}

export interface EPoster {
  id: string;
  title: string;
  authors: string;
  domain: string;
  abstract: string;
  pdfUrl?: string;
  thumbnailUrl: string;
  keywords: string[];
}

export interface CommitteeMember {
  id: string;
  committee: 'bureau_executif' | 'comite_scientifique' | 'comite_organisation';
  name: string;
  role: string;
  institution: string;
  photoUrl: string;
  sortOrder: number;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  year: string;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  sessionId?: string;
  sentAt: string;
  type: 'urgent' | 'info' | 'room_change';
  read: boolean;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  level: string;
  description: string;
  x: number; // percentage on floor plan
  y: number;
}

export interface Exhibitor {
  id: string;
  name: string;
  standNumber: string;
  category: string;
  description: string;
}

import { CommitteeMember, EPoster, Exhibitor, PhotoItem, Question, Room, Session, Speaker, User } from '../types';

export const EVENT_CONFIG = {
  title: "Congrès National de l'AAPEP",
  edition: "Édition 2025",
  theme: "Psychiatrie Libérale : Défis et Actualités",
  association: "Association des Psychiatres d'Exercice Privé (AAPEP)",
  dates: "06 – 07 Novembre 2025",
  startDate: "2025-11-06T08:30:00",
  endDate: "2025-11-07T19:00:00",
  venue: "Palais des Congrès Mansour Eddahbi",
  city: "Marrakech, Maroc",
  address: "Boulevard Mohamed VI, Marrakech 40000",
  coordinates: { lat: 31.6214, lng: -8.0125 },
  officialQrCode: "AAPEP-2025-MARRAKECH-ENTREE",
  youtubeVideoId: "dQw4w9WgXcQ", // Intro congress video or fallback
  videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", // ambient high-level medical congress / psychiatric science keynote
  contactEmail: "contact@aapep-congres.ma",
  contactPhone: "+212 5 24 33 90 00",
  programPdfUrl: "/programme-aapep-2025.pdf",
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: "el_mawakif",
    name: "Salle EL MAWAKIF",
    capacity: 450,
    level: "Niveau 0 - Amphithéâtre Principal",
    description: "Salle plénière principale équipée en retransmission vidéo 4K et traduction simultanée.",
    x: 48,
    y: 38
  },
  {
    id: "yw",
    name: "Salle Y & W",
    capacity: 200,
    level: "Niveau 1 - Aile Ouest",
    description: "Salle dédiée aux symposia d'experts et communications orales thématiques.",
    x: 24,
    y: 65
  },
  {
    id: "ibn_rochd",
    name: "Salle IBN ROCHD",
    capacity: 150,
    level: "Niveau 1 - Aile Est",
    description: "Espace ateliers interactifs, mises en situation et cas cliniques complexes.",
    x: 76,
    y: 65
  },
  {
    id: "espace_posters",
    name: "Espace e-Posters & Stands",
    capacity: 500,
    level: "Niveau 0 - Hall Central",
    description: "Hall d'exposition des partenaires industriels, bornes interactives e-Posters et pauses café.",
    x: 50,
    y: 78
  }
];

export const INITIAL_SPEAKERS: Speaker[] = [
  {
    id: "spk_1",
    name: "Prof. Driss Moussaoui",
    title: "Professeur Émérite de Psychiatrie",
    hospital: "Faculté de Médecine de Casablanca",
    specialty: "Psychiatrie Clinique & Santé Publique",
    photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    bio: "Pionnier de la psychiatrie universitaire au Maroc, membre associé de l'Académie Nationale de Médecine en France. Ancien président de la Société Marocaine de Psychiatrie."
  },
  {
    id: "spk_2",
    name: "Dr. Laila Benhaddou",
    title: "Psychiatre Libérale, Vice-Présidente AAPEP",
    hospital: "Cabinet Privé, Rabat",
    specialty: "Troubles Bipolaires & Psychoéducation",
    photoUrl: "https://images.unsplash.com/photo-1594824813637-640989b5c3ff?auto=format&fit=crop&q=80&w=400",
    bio: "Spécialiste de la prise en charge ambulatoire des troubles de l'humeur complexes et de l'optimisation des parcours de soins en pratique libérale."
  },
  {
    id: "spk_3",
    name: "Prof. Jean-Pierre Olié",
    title: "Membre de l'Académie Nationale de Médecine",
    hospital: "Hôpital Sainte-Anne, Paris",
    specialty: "Psychopharmacologie & Dépressions Résistantes",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    bio: "Professeur de psychiatrie à l'Université Paris Cité, auteur de multiples ouvrages de référence sur la pharmacologie clinique et les neurosciences psychiatriques."
  },
  {
    id: "spk_4",
    name: "Dr. Karim Tazi",
    title: "Psychiatre & Addictologue",
    hospital: "Cabinet Médical de Psychiatrie, Casablanca",
    specialty: "Addictions & Nouvelles Technologies",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    bio: "Secrétaire général de l'AAPEP, engagé dans les programmes de réhabilitation psychosociale et la régulation éthique de la télémédecine."
  },
  {
    id: "spk_5",
    name: "Dr. Sophia El Mansouri",
    title: "Pédopsychiatre & Thérapeute Systémique",
    hospital: "Cabinet Privé, Marrakech",
    specialty: "Pédopsychiatrie & Adolescence",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    bio: "Consultante experte en psychopathologie de l'adolescent, coordinatrice du groupe de travail AAPEP Jeunesse & Société."
  },
  {
    id: "spk_6",
    name: "Prof. Nicolas Franck",
    title: "Chef de Pôle Psychiatrie & Réhabilitation",
    hospital: "Centre Hospitalier Le Vinatier, Lyon",
    specialty: "Remédiation Cognitive & Rétablissement",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
    bio: "Auteur de référence sur la remédiation cognitive et l'implémentation de la pair-aidance en santé mentale moderne."
  }
];

export const INITIAL_SESSIONS: Session[] = [
  {
    id: "sess_1",
    day: "2025-11-06",
    startTime: "09:00",
    endTime: "10:15",
    roomId: "el_mawakif",
    roomName: "Salle EL MAWAKIF",
    domainId: "general",
    domainName: "Cérémonie & Plénière d'Ouverture",
    type: "pleniere",
    title: "Cérémonie d'ouverture & Discours inaugural : La psychiatrie libérale face aux mutations sociétales",
    description: "Allocution de bienvenue du Bureau exécutif de l'AAPEP, point sur les enjeux réglementaires, la démographie médicale et la place du psychiatre libéral dans le système de santé national.",
    speakerIds: ["spk_1", "spk_4"],
    status: "live",
    liveUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    updatedAt: "2025-11-06T09:05:00"
  },
  {
    id: "sess_2",
    day: "2025-11-06",
    startTime: "10:45",
    endTime: "12:15",
    roomId: "el_mawakif",
    roomName: "Salle EL MAWAKIF",
    domainId: "mood",
    domainName: "Troubles de l'Humeur",
    type: "symposium",
    title: "Symposium : Dépressions résistantes : Stratégies de recours et innovations pharmacologiques",
    description: "Évaluation diagnostique des échecs thérapeutiques, place de l'Eskétamine intranasale, des thérapies de neurostimulation (rTMS) et des combinaisons de molécules en consultation privée.",
    speakerIds: ["spk_3", "spk_2"],
    status: "preparing",
    liveUrl: "https://www.youtube.com/embed/ScMzIvxBSi4"
  },
  {
    id: "sess_3",
    day: "2025-11-06",
    startTime: "10:45",
    endTime: "12:15",
    roomId: "yw",
    roomName: "Salle Y & W",
    domainId: "legal",
    domainName: "Pratique Libérale & Droit",
    type: "communication_orale",
    title: "La télémédecine et le télé-suivi en psychiatrie libérale : Cadre médico-légal et limites déontologiques",
    description: "Retours d'expérience sur la téléconsultation, gestion des urgences à distance, ordonnance sécurisée et respect du secret médical avec les outils numériques.",
    speakerIds: ["spk_4"],
    status: "preparing",
    liveUrl: "https://www.youtube.com/embed/ScMzIvxBSi4"
  },
  {
    id: "sess_4",
    day: "2025-11-06",
    startTime: "14:30",
    endTime: "16:00",
    roomId: "ibn_rochd",
    roomName: "Salle IBN ROCHD",
    domainId: "workshop",
    domainName: "Atelier Pratique",
    type: "atelier",
    title: "Atelier : Prise en charge des troubles paniques sévères et agoraphobie par TCC brève au cabinet",
    description: "Exercices pratiques d'exposition intéroceptive, restructuration cognitive et protocoles de suivi en 8 séances adaptées à la patientèle de ville.",
    speakerIds: ["spk_5"],
    status: "preparing"
  },
  {
    id: "sess_5",
    day: "2025-11-06",
    startTime: "16:30",
    endTime: "18:00",
    roomId: "el_mawakif",
    roomName: "Salle EL MAWAKIF",
    domainId: "addictions",
    domainName: "Addictologie",
    type: "table_ronde",
    title: "Table ronde : Addictions comportementales et écrans chez les jeunes adultes : Quel rôle pour le psychiatre de ville ?",
    description: "Hyperconnectivité, jeux d'argent en ligne, dérégulation dopaminergique et interactions avec les pathologies psychiatriques sous-jacentes.",
    speakerIds: ["spk_4", "spk_5", "spk_1"],
    status: "preparing"
  },
  {
    id: "sess_6",
    day: "2025-11-07",
    startTime: "09:00",
    endTime: "10:30",
    roomId: "el_mawakif",
    roomName: "Salle EL MAWAKIF",
    domainId: "neurosciences",
    domainName: "Neurosciences & Réhabilitation",
    type: "pleniere",
    title: "Remédiation cognitive et rétablissement en pratique ambulatoire : Utopie ou nécessité ?",
    description: "Comment intégrer des outils de stimulation cognitive et de psychoéducation dans la routine du cabinet libéral pour favoriser l'autonomie socioprofessionnelle.",
    speakerIds: ["spk_6", "spk_2"],
    status: "preparing",
    liveUrl: "https://www.youtube.com/embed/ScMzIvxBSi4"
  },
  {
    id: "sess_7",
    day: "2025-11-07",
    startTime: "11:00",
    endTime: "12:30",
    roomId: "yw",
    roomName: "Salle Y & W",
    domainId: "somatique",
    domainName: "Somatique & Psychiatrie",
    type: "symposium",
    title: "Syndrome métabolique et traitements psychotropes : Prévention et surveillance cardiométabolique",
    description: "Algorithmes de surveillance des antipsychotiques de seconde génération, prise en charge de la prise de poids et coordination avec les confrères généralistes et cardiologues.",
    speakerIds: ["spk_3", "spk_1"],
    status: "preparing"
  },
  {
    id: "sess_8",
    day: "2025-11-07",
    startTime: "15:00",
    endTime: "16:45",
    roomId: "el_mawakif",
    roomName: "Salle EL MAWAKIF",
    domainId: "cloture",
    domainName: "Remise des Prix & Clôture",
    type: "pleniere",
    title: "Séance plénière de clôture : Prix des meilleurs e-Posters, recommandations AAPEP et perspectives 2026",
    description: "Synthèse des travaux du congrès, annonce des lauréats des travaux de recherche e-Posters et présentation de l'agenda scientifique de l'année à venir.",
    speakerIds: ["spk_1", "spk_2", "spk_4"],
    status: "preparing"
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: "q_1",
    sessionId: "sess_1",
    userId: "usr_2",
    userName: "Dr. Othmane B.",
    userRole: "user",
    questionText: "Quelle position officielle adopte l'AAPEP concernant la nomenclature des actes de psychothérapie en pratique libérale ?",
    answerText: "L'AAPEP est actuellement en négociation avec l'ANAM et les caisses d'assurance maladie pour la revalorisation spécifique de l'acte intellectuel et psychothérapique approfondi.",
    answeredBy: "Prof. Driss Moussaoui",
    answeredAt: "2025-11-06T10:05:00",
    isHidden: false,
    upvotes: ["usr_1", "usr_3", "usr_4", "usr_5"],
    createdAt: "2025-11-06T09:22:00"
  },
  {
    id: "q_2",
    sessionId: "sess_1",
    userId: "usr_3",
    userName: "Dr. Meriem K.",
    userRole: "user",
    questionText: "Avez-vous des statistiques sur le nombre d'installations en secteur libéral ces 3 dernières années au Maroc ?",
    isHidden: false,
    upvotes: ["usr_1", "usr_2"],
    createdAt: "2025-11-06T09:35:00"
  },
  {
    id: "q_3",
    sessionId: "sess_2",
    userId: "usr_4",
    userName: "Dr. Jalil F.",
    userRole: "user",
    questionText: "Dans le protocole de recours à l'Eskétamine, quelle est la durée minimale d'observation recommandée en cabinet versus clinique de jour ?",
    isHidden: false,
    upvotes: ["usr_1", "usr_5", "usr_6"],
    createdAt: "2025-11-06T10:10:00"
  }
];

export const INITIAL_EPOSTERS: EPoster[] = [
  {
    id: "post_1",
    title: "Évaluation de la charge d'aidant dans la prise en charge ambulatoire de la maladie bipolaire",
    authors: "S. Belkacem, M. Naciri, L. Benhaddou (Casablanca)",
    domain: "Troubles de l'Humeur",
    abstract: "Étude transversale prospective menée auprès de 120 aidants principaux de patients suivis en cabinet libéral. Mise en évidence d'un niveau d'épuisement élevé corrélé au nombre d'hospitalisations antérieures et à l'adhésion thérapeutique.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    keywords: ["Troubles bipolaires", "Aidants", "Zarit", "Pratique libérale"]
  },
  {
    id: "post_2",
    title: "Prévalence du syndrome de burnout chez les praticiens libéraux de santé mentale : Enquête nationale",
    authors: "K. Tazi, R. Zniber, A. Chraibi (Rabat, Casablanca, Marrakech)",
    domain: "Santé du Soignant",
    abstract: "Enquête anonyme en ligne auprès de 214 psychiatres libéraux. 38% présentent des scores Maslach Burnout Inventory en zone critique, principalement liée à la solitude de la pratique et à la gestion des urgences nocturnes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    keywords: ["Burnout", "Psychiatres libéraux", "Santé au travail", "Prévention"]
  },
  {
    id: "post_3",
    title: "Neurostimulation transcrânienne à courant continu (tDCS) : Faisabilité en cabinet privé de ville",
    authors: "J-P. Olié, A. Bennani, F. Cherkaoui (Paris & Marrakech)",
    domain: "Neurosciences Cliniques",
    abstract: "Série clinique de 45 patients souffrant d'épisode dépressif caractérisé modéré recevant 15 séances de tDCS bifrontale. Tolérance excellente (98%) et taux de réponse clinique de 54% à 6 semaines.",
    thumbnailUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600",
    keywords: ["tDCS", "Dépression", "Consultation externe", "Neurostimulation"]
  },
  {
    id: "post_4",
    title: "Usage problématique des smartphones et troubles du sommeil chez les lycéens : Données cliniques",
    authors: "S. El Mansouri, H. Daoudi (Marrakech)",
    domain: "Pédopsychiatrie & Addictions",
    abstract: "Analyse des profils de 85 adolescents orientés en consultation libérale pour baisse de rendement scolaire. Corrélation statistiquement significative entre l'utilisation nocturne d'écrans et l'intensité des symptômes anxio-dépressifs.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    keywords: ["Adolescents", "Écrans", "Insomnie", "Pédopsychiatrie"]
  },
  {
    id: "post_5",
    title: "Coordination psychiatre libéral - médecin de famille : Analyse des motifs d'adressage",
    authors: "M. Idrissi, B. Hachimi (Fès, Meknès)",
    domain: "Organisation des Soins",
    abstract: "Revue de 300 courriers d'adressage en consultation privée. Nécessité d'harmoniser les fiches de liaison et de systématiser les synthèses écrites de fin de prise en charge.",
    thumbnailUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    keywords: ["Réseau de soins", "Médecine générale", "Liaison", "Qualité"]
  }
];

export const INITIAL_COMMITTEES: CommitteeMember[] = [
  // Bureau exécutif
  {
    id: "com_1",
    committee: "bureau_executif",
    name: "Dr. Karim Tazi",
    role: "Président de l'AAPEP",
    institution: "Psychiatre d'exercice privé, Casablanca",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    sortOrder: 1
  },
  {
    id: "com_2",
    committee: "bureau_executif",
    name: "Dr. Laila Benhaddou",
    role: "Vice-Présidente",
    institution: "Psychiatre d'exercice privé, Rabat",
    photoUrl: "https://images.unsplash.com/photo-1594824813637-640989b5c3ff?auto=format&fit=crop&q=80&w=300",
    sortOrder: 2
  },
  {
    id: "com_3",
    committee: "bureau_executif",
    name: "Dr. Mehdi Bennani",
    role: "Secrétaire Général",
    institution: "Psychiatre d'exercice privé, Marrakech",
    photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    sortOrder: 3
  },
  {
    id: "com_4",
    committee: "bureau_executif",
    name: "Dr. Fatine Alami",
    role: "Trésorière Générale",
    institution: "Psychiatre d'exercice privé, Tanger",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    sortOrder: 4
  },

  // Comité Scientifique
  {
    id: "com_5",
    committee: "comite_scientifique",
    name: "Prof. Driss Moussaoui",
    role: "Président du Comité Scientifique",
    institution: "Professeur Émérite, Casablanca",
    photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    sortOrder: 1
  },
  {
    id: "com_6",
    committee: "comite_scientifique",
    name: "Prof. Jean-Pierre Olié",
    role: "Membre d'Honneur",
    institution: "Académie Nationale de Médecine, Paris",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    sortOrder: 2
  },
  {
    id: "com_7",
    committee: "comite_scientifique",
    name: "Prof. Nicolas Franck",
    role: "Membre Expert",
    institution: "Université Claude Bernard Lyon 1",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300",
    sortOrder: 3
  },

  // Comité d'Organisation
  {
    id: "com_8",
    committee: "comite_organisation",
    name: "Dr. Sophia El Mansouri",
    role: "Coordinatrice Générale du Congrès",
    institution: "Psychiatre libérale, Marrakech",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    sortOrder: 1
  },
  {
    id: "com_9",
    committee: "comite_organisation",
    name: "Dr. Youssef El Fassi",
    role: "Responsable Logistique & Partenariats",
    institution: "Psychiatre libéral, Casablanca",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    sortOrder: 2
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: "pho_1",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    caption: "Séance plénière inaugurale - Amphithéâtre plein",
    year: "Édition 2024"
  },
  {
    id: "pho_2",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    caption: "Échanges interactifs et questions de la salle",
    year: "Édition 2024"
  },
  {
    id: "pho_3",
    url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800",
    caption: "Exposition des stands pharmaceutiques et pauses café",
    year: "Édition 2024"
  },
  {
    id: "pho_4",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    caption: "Atelier pratique de TCC en petits groupes",
    year: "Édition 2024"
  },
  {
    id: "pho_5",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
    caption: "Cérémonie de remise des prix e-Posters",
    year: "Édition 2024"
  }
];

export const INITIAL_EXHIBITORS: Exhibitor[] = [
  { id: "exh_1", name: "Laboratoires Pharma Santé", standNumber: "Stand 01", category: "Psychopharmacologie", description: "Solutions novatrices dans le traitement de la dépression et des troubles anxieux." },
  { id: "exh_2", name: "NeuroTech Médical", standNumber: "Stand 02", category: "Équipements & Neurostimulation", description: "Dispositifs de rTMS et tDCS homologués pour la pratique en cabinet." },
  { id: "exh_3", name: "PsySoft Maroc", standNumber: "Stand 03", category: "Santé Numérique", description: "Logiciel de gestion de dossiers patients et téléconsultation sécurisée pour psychiatres." },
  { id: "exh_4", name: "Éditions Médicales du Maghreb", standNumber: "Stand 04", category: "Publications & Livres", description: "Ouvrages scientifiques, traités de psychiatrie clinique et DSM-5-TR en langue française." },
  { id: "exh_5", name: "BioGen Maghreb", standNumber: "Stand 05", category: "Compléments & Santé mentale", description: "Nutraceutiques et régulateurs du microbiote intestinal dans l'axe intestin-cerveau." },
  { id: "exh_6", name: "Assurances Soins & Santé", standNumber: "Stand 06", category: "Services & Prévoyance", description: "Solutions de responsabilité civile professionnelle et prévoyance des médecins libéraux." }
];

export const DEMO_USERS: User[] = [
  {
    id: "usr_visitor",
    name: "Visiteur non connecté",
    email: "visiteur@aapep.ma",
    role: "visitor",
    entryVerifiedAt: null,
    createdAt: "2025-11-06T08:00:00"
  },
  {
    id: "usr_unverified",
    name: "Dr. Sofia Cherkaoui",
    email: "sofia.cherkaoui@aapep.ma",
    role: "user",
    title: "Médecin Psychiatre",
    institution: "Cabinet Privé, Fès",
    entryVerifiedAt: null, // Logged in, NOT scanned QR yet
    createdAt: "2025-11-06T08:15:00"
  },
  {
    id: "usr_activated",
    name: "Dr. Amine Mansouri",
    email: "amine.mansouri@aapep.ma",
    role: "user",
    title: "Psychiatre Libéral",
    institution: "Cabinet Médical, Casablanca",
    entryVerifiedAt: "2025-11-06T08:42:15", // Scanned at congress entrance!
    createdAt: "2025-11-06T08:30:00"
  },
  {
    id: "usr_admin",
    name: "Dr. Karim Tazi (Admin)",
    email: "admin@aapep.ma",
    role: "admin",
    title: "Président AAPEP & Administrateur",
    institution: "Comité d'Organisation AAPEP",
    entryVerifiedAt: "2025-11-06T07:30:00",
    createdAt: "2025-11-01T08:00:00"
  }
];

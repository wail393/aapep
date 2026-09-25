import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User, Hospital, CheckCircle2, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { activeModal, closeModal, setCurrentUser, openModal } = useApp();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  if (activeModal !== 'auth') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (tab === 'signup') {
      const newUser = {
        id: `usr_${Date.now()}`,
        name: name.trim() || 'Dr. Congressiste',
        email: email.trim(),
        role: 'user' as const,
        institution: institution.trim() || 'Cabinet de Psychiatrie',
        entryVerifiedAt: null, // requires entrance QR scan
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newUser);
      setSuccessNotice(true);
      setTimeout(() => {
        closeModal();
        openModal('qr_scanner');
      }, 1400);
    } else {
      // Mock login
      const loggedUser = {
        id: `usr_${Date.now()}`,
        name: name.trim() || 'Dr. Amine Mansouri',
        email: email.trim(),
        role: 'user' as const,
        institution: 'Cabinet Privé, Casablanca',
        entryVerifiedAt: '2025-11-06T08:42:00', // automatically activated for convenience
        createdAt: new Date().toISOString()
      };
      setCurrentUser(loggedUser);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LogIn className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Espace Congressiste</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-2 border-b border-slate-800 bg-slate-950/60 flex text-xs">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition ${
              tab === 'login'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Se Connecter
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition ${
              tab === 'signup'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Créer un Compte
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4">
          {successNotice ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="font-bold text-sm text-white">Compte créé !</h4>
              <p className="text-xs text-slate-300">
                Ouverture du scanner pour valider le QR code d'accueil...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {tab === 'signup' && (
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">
                    Nom & Prénom (Dr.)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Dr. Karim..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">
                  Adresse Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="confrere@aapep.ma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {tab === 'signup' && (
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">
                    Lieu d'exercice / Cabinet (Optionnel)
                  </label>
                  <div className="relative">
                    <Hospital className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Ex: Cabinet Privé, Casablanca"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-red-600 hover:from-emerald-500 hover:to-red-500 text-white font-bold rounded-xl shadow transition"
              >
                {tab === 'login' ? 'Se Connecter' : 'Créer mon Compte Congressiste'}
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-500">
                Après inscription, un scan du QR officiel à l'accueil active l'ensemble des modules.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

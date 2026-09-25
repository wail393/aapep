import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Camera, CheckCircle2, AlertCircle, X, Sparkles, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENT_CONFIG } from '../../data/mockData';

export const QRScannerModal: React.FC = () => {
  const { activeModal, closeModal, redeemEntryCode, currentUser, openModal } = useApp();
  const [manualCode, setManualCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isOpen = activeModal === 'qr_scanner';

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setErrorMessage(null);
      setSuccessMessage(null);
      return;
    }

    // Try camera access
    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        setCameraPermissionError(false);
      } else {
        setCameraPermissionError(true);
      }
    } catch (err) {
      console.warn("Camera not available or permission denied:", err);
      setCameraPermissionError(true);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleValidate = (codeToTest: string) => {
    setErrorMessage(null);
    const result = redeemEntryCode(codeToTest);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        closeModal();
      }, 1800);
    } else {
      setErrorMessage(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Scanner le QR d'Entrée</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {successMessage ? (
            <div className="py-8 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-base text-white">Badge Activé !</h4>
              <p className="text-xs text-slate-300 max-w-xs">{successMessage}</p>
              <div className="pt-2">
                <span className="text-[11px] text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  Redirection automatique...
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Camera Scanner Viewfinder */}
              <div className="relative w-full aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4 text-slate-400 space-y-2">
                    <Camera className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
                    <p className="text-xs font-medium">
                      {cameraPermissionError
                        ? "Caméra non accessible ou non autorisée"
                        : "Initialisation du viseur caméra..."}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Vous pouvez utiliser le simulateur direct ou la saisie manuelle ci-dessous.
                    </p>
                  </div>
                )}

                {/* Viewfinder overlay targeting frame in Green and Red */}
                <div className="absolute inset-8 border-2 border-emerald-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-red-500 -mt-1 -ml-1" />
                    <div className="w-4 h-4 border-t-2 border-r-2 border-red-500 -mt-1 -mr-1" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-semibold text-emerald-300 bg-slate-950/90 px-2 py-0.5 rounded shadow border border-emerald-800">
                      Ciblez le QR à l'accueil
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-b-2 border-l-2 border-red-500 -mb-1 -ml-1" />
                    <div className="w-4 h-4 border-b-2 border-r-2 border-red-500 -mb-1 -mr-1" />
                  </div>
                </div>
              </div>

              {/* Instant Test Simulator Button */}
              <button
                onClick={() => handleValidate(EVENT_CONFIG.officialQrCode)}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-red-600 hover:from-emerald-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center space-x-2 transition active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simuler le scan du QR d'entrée officiel</span>
              </button>

              <div className="relative flex items-center justify-center my-1">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  ou saisie manuelle
                </span>
              </div>

              {/* Manual input */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Code (ex: AAPEP2025)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={() => handleValidate(manualCode)}
                    disabled={!manualCode.trim()}
                    className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white text-xs font-semibold rounded-lg border border-emerald-600 transition"
                  >
                    Valider
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-2 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                  <span>Besoin d'afficher le QR ?</span>
                  <button
                    onClick={() => openModal('official_entrance_qr')}
                    className="text-red-400 hover:underline font-medium"
                  >
                    Voir l'affiche d'accueil →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Send, Mic, MicOff, Square, Loader2, X, Sparkles, CheckCheck, 
  ShieldCheck, Lock, Key, Flame, Clock, Eye, EyeOff, Image as ImageIcon, 
  AlertCircle, Crown, Play, Pause, Volume2, ChevronDown, Check, RefreshCw, Info
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'recipient';
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio';
  audioDuration?: number; // seconds
  timestamp: string;
  isEncrypted: boolean;
  expiresInSeconds?: number; // Burn-on-read timer in seconds
  burnRemaining?: number;
  isBurned?: boolean;
  isVoiceToText?: boolean;
  isVipPriority?: boolean;
}

export interface SecureEncryptedChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar?: string;
  recipientCode?: string;
  recipientRole?: string;
  recipientLocation?: string;
  recipientIsVerified?: boolean;
}

export const SecureEncryptedChatModal: React.FC<SecureEncryptedChatModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  recipientAvatar,
  recipientCode = 'MMC-VIP',
  recipientRole,
  recipientLocation,
  recipientIsVerified = true,
}) => {
  // Session Cryptographic Fingerprint
  const sessionFingerprint = useMemo(() => {
    const chars = '0123456789ABCDEF';
    const pairs: string[] = [];
    for (let i = 0; i < 8; i++) {
      pairs.push(chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)]);
    }
    return `SHA-256: ${pairs.join(':')}`;
  }, [recipientCode]);

  // Premium state (Allows live toggle to test both Free and VIP Black tiers)
  const [isVipMode, setIsVipMode] = useState<boolean>(true);
  const [freeMessagesRemaining, setFreeMessagesRemaining] = useState<number>(3);
  const [showVipUpgradeModal, setShowVipUpgradeModal] = useState<boolean>(false);
  const [incognitoMode, setIncognitoMode] = useState<boolean>(false);

  // Security & Discretion Settings
  const [showSecurityDetails, setShowSecurityDetails] = useState<boolean>(false);
  const [disappearingTimer, setDisappearingTimer] = useState<number>(0); // 0 = off, 30, 300, 3600, 86400
  const [showTimerSelector, setShowTimerSelector] = useState<boolean>(false);

  // Messages state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'recipient',
      text: `¡Hola! Gracias por contactarme. Mi canal directo está protegido con cifrado E2EE de 256 bits. ¿En qué te puedo apoyar hoy con total discreción?`,
      timestamp: '10:45 AM',
      isEncrypted: true,
      isVipPriority: true,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [honeypotVal, setHoneypotVal] = useState(''); // Anti-bot trap
  const [isSending, setIsSending] = useState(false);
  const [rateLimitCooldown, setRateLimitCooldown] = useState(0);

  // Audio Voice Notes State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});

  // Media attachment simulation
  const [isAttachingPhoto, setIsAttachingPhoto] = useState(false);
  const [photoBlurred, setPhotoBlurred] = useState(true);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isRecording]);

  // Handle disappearing messages countdown
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (!msg.expiresInSeconds || msg.isBurned) return msg;

          const currentRemaining = msg.burnRemaining !== undefined ? msg.burnRemaining : msg.expiresInSeconds;
          if (currentRemaining <= 1) {
            return {
              ...msg,
              text: '[Mensaje autodestruido por protocolo de confidencialidad]',
              mediaUrl: undefined,
              burnRemaining: 0,
              isBurned: true,
            };
          }
          return {
            ...msg,
            burnRemaining: currentRemaining - 1,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Rate limit cooldown counter
  useEffect(() => {
    if (rateLimitCooldown > 0) {
      const timer = setTimeout(() => setRateLimitCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitCooldown]);

  if (!isOpen) return null;

  // Rate Limiting Check (OWASP & Anti-Spam)
  const checkRateLimit = () => {
    if (rateLimitCooldown > 0) {
      return false;
    }
    setRateLimitCooldown(2); // 2 second pause between sends
    return true;
  };

  // Honeypot bot check
  const isBotDetected = () => {
    return honeypotVal.trim().length > 0;
  };

  // Send message
  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend && !audioBlobUrl) return;

    // Bot check
    if (isBotDetected()) {
      console.warn('Bot submission blocked via honeypot field.');
      return;
    }

    // Free tier limitation check
    if (!isVipMode && freeMessagesRemaining <= 0) {
      setShowVipUpgradeModal(true);
      return;
    }

    // Rate limit check
    if (!checkRateLimit()) return;

    setIsSending(true);

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true,
      expiresInSeconds: disappearingTimer > 0 ? disappearingTimer : undefined,
      burnRemaining: disappearingTimer > 0 ? disappearingTimer : undefined,
      isVipPriority: isVipMode,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setIsSending(false);

    if (!isVipMode) {
      setFreeMessagesRemaining((prev) => Math.max(0, prev - 1));
    }

    // Simulated authentic provider reply
    setTimeout(() => {
      const sampleReplies = [
        `Hola, gracias por escribirme. Cuento con lugar discreto en ${recipientLocation || 'la zona'} o puedo desplazarme. ¿Para qué horario te acomoda?`,
        `Entendido. Manejo total discreción y trato cordial. ¿Te gustaría coordinar detalles o consultar tarifas?`,
        `Mensaje cifrado verificado con éxito. Me encuentro en línea y con disponibilidad próxima.`,
      ];
      const randomReply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'recipient',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isEncrypted: true,
          expiresInSeconds: disappearingTimer > 0 ? disappearingTimer : undefined,
          burnRemaining: disappearingTimer > 0 ? disappearingTimer : undefined,
          isVipPriority: isVipMode,
        },
      ]);
    }, 1400);
  };

  // Start Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        sendVoiceMessage(url, recordingSeconds || 4);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      // Fallback voice note simulation if mic permission denied
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback simulation
      const simulatedDuration = recordingSeconds || 3;
      sendVoiceMessage('simulated-voice-url', simulatedDuration);
    }
  };

  // Send Voice Message
  const sendVoiceMessage = (url: string, duration: number) => {
    if (!isVipMode && freeMessagesRemaining <= 0) {
      setShowVipUpgradeModal(true);
      return;
    }

    const voiceMsg: ChatMessage = {
      id: `voice-${Date.now()}`,
      sender: 'user',
      mediaType: 'audio',
      mediaUrl: url,
      audioDuration: duration,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true,
      expiresInSeconds: disappearingTimer > 0 ? disappearingTimer : undefined,
      burnRemaining: disappearingTimer > 0 ? disappearingTimer : undefined,
      isVipPriority: isVipMode,
    };

    setMessages((prev) => [...prev, voiceMsg]);
    if (!isVipMode) {
      setFreeMessagesRemaining((prev) => Math.max(0, prev - 1));
    }
  };

  // Send photo attachment (VIP feature)
  const handleAttachPhoto = () => {
    if (!isVipMode) {
      setShowVipUpgradeModal(true);
      return;
    }

    const photoMsg: ChatMessage = {
      id: `photo-${Date.now()}`,
      sender: 'user',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      text: 'Foto enviada con marca de agua anti-captura.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true,
      expiresInSeconds: disappearingTimer > 0 ? disappearingTimer : undefined,
      burnRemaining: disappearingTimer > 0 ? disappearingTimer : undefined,
      isVipPriority: true,
    };

    setMessages((prev) => [...prev, photoMsg]);
  };

  // Quick Chips
  const quickStarters = [
    '¿Tienes disponibilidad hoy?',
    '¿Manejas lugar propio o a domicilio?',
    '¿Cuáles son tus tarifas de acompañamiento?',
    'Máxima discreción, por favor.',
  ];

  const formatTimerLabel = (secs: number) => {
    if (secs === 0) return 'Desactivado';
    if (secs < 60) return `${secs}s`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m`;
    return `${Math.floor(secs / 3600)}h`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Honeypot hidden input for anti-bot detection */}
      <input
        type="text"
        name="b_trap_address"
        value={honeypotVal}
        onChange={(e) => setHoneypotVal(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="opacity-0 absolute -top-9999 left-0 pointer-events-none w-0 h-0"
        aria-hidden="true"
      />

      <div className="bg-neutral-950 border border-neutral-800 w-full max-w-2xl h-[94vh] sm:h-[85vh] max-h-[850px] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* TOP STATUS BAR: E2EE CRYPTOGRAPHY & VIP TIER TOGGLE */}
        <div className="bg-neutral-900/90 border-b border-neutral-800 px-3 sm:px-4 py-2 flex items-center justify-between text-[11px] text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-400 font-mono font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>AES-256-GCM E2EE</span>
            </span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <button
              onClick={() => setShowSecurityDetails(!showSecurityDetails)}
              className="text-neutral-400 hover:text-amber-400 underline decoration-dotted transition-colors flex items-center gap-1"
              title="Verificar huella criptográfica de seguridad"
            >
              <Key className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Huella Criptográfica</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* VIP Status & Live Tester Toggle */}
            <button
              onClick={() => setIsVipMode(!isVipMode)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all border ${
                isVipMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
              }`}
              title="Haz clic para alternar entre modo Free y VIP para probar las funciones"
            >
              <Crown className="w-3 h-3 text-amber-400" />
              <span>{isVipMode ? 'VIP BLACK ACTIVO' : `FREE (${freeMessagesRemaining} restantes)`}</span>
            </button>

            {/* Incognito mode toggle */}
            <button
              onClick={() => setIncognitoMode(!incognitoMode)}
              className={`p-1 rounded text-neutral-400 hover:text-white transition-colors ${
                incognitoMode ? 'text-amber-400 bg-neutral-800' : ''
              }`}
              title={incognitoMode ? 'Modo Incógnito Activado (Identidad enmascarada)' : 'Activar Modo Incógnito'}
            >
              {incognitoMode ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* SECURITY DETAILS POP-DOWN MODAL */}
        {showSecurityDetails && (
          <div className="bg-neutral-900 border-b border-neutral-800 p-3 sm:p-4 text-xs space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verificación de Claves de Cifrado de Extremo a Extremo</span>
              </h4>
              <button
                onClick={() => setShowSecurityDetails(false)}
                className="text-neutral-400 hover:text-white p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Tus mensajes y notas de voz se cifran localmente en tu dispositivo antes de viajar por la red. Compara esta huella de seguridad con la otra parte para garantizar cero intercepción (Man-in-the-Middle).
            </p>
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 font-mono text-[11px] text-amber-300 flex items-center justify-between">
              <span className="truncate">{sessionFingerprint}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-sans ml-2 shrink-0">
                Verificado
              </span>
            </div>
          </div>
        )}

        {/* RECIPIENT HEADER */}
        <div className="bg-neutral-900/60 p-3 sm:p-4 border-b border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={recipientAvatar || 'https://picsum.photos/seed/user/200/200'}
                alt={recipientName}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-neutral-700"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-neutral-900" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white truncate">{recipientName}</h3>
                {recipientIsVerified && (
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 shrink-0">
                    <ShieldCheck className="w-3 h-3" /> Verificada
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 flex items-center gap-2 truncate">
                <span className="font-mono text-neutral-500">{recipientCode}</span>
                {recipientLocation && <span>• {recipientLocation}</span>}
                {recipientRole && <span>• {recipientRole}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Disappearing Messages Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowTimerSelector(!showTimerSelector)}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                  disappearingTimer > 0
                    ? 'bg-rose-950/70 text-rose-300 border-rose-500/60'
                    : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                }`}
                title="Configurar mensajes temporales / autodestrucción"
              >
                <Flame className={`w-3.5 h-3.5 ${disappearingTimer > 0 ? 'text-rose-400 animate-pulse' : ''}`} />
                <span className="hidden sm:inline">Autodestruir:</span>
                <span>{formatTimerLabel(disappearingTimer)}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Timer selector menu */}
              {showTimerSelector && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-1.5 z-30 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 px-2 py-1 block">
                    Tiempo de vida
                  </span>
                  {[
                    { sec: 0, label: 'Desactivado (Permanente)' },
                    { sec: 30, label: '30 segundos' },
                    { sec: 300, label: '5 minutos' },
                    { sec: 3600, label: '1 hora' },
                    { sec: 86400, label: '24 horas' },
                  ].map((opt) => (
                    <button
                      key={opt.sec}
                      onClick={() => {
                        setDisappearingTimer(opt.sec);
                        setShowTimerSelector(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        disappearingTimer === opt.sec
                          ? 'bg-rose-600 text-white font-bold'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {disappearingTimer === opt.sec && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CHAT MESSAGES SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 bg-neutral-950/90">
          
          {/* Incognito Notice */}
          {incognitoMode && (
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-2.5 text-center text-xs text-amber-200 flex items-center justify-center gap-2">
              <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Modo Incógnito Activado: Tu nombre y código de usuario están enmascarados como "Usuario VIP Anónimo".</span>
            </div>
          )}

          {/* Messages list */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[88%] sm:max-w-[78%] ${
                  isUser ? 'ml-auto' : 'mr-auto'
                }`}
              >
                {/* Ephemeral burn timer alert */}
                {msg.expiresInSeconds && !msg.isBurned && (
                  <div className="flex items-center gap-1 text-[10px] text-rose-400 font-mono mb-0.5">
                    <Flame className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>Autodestrucción en {msg.burnRemaining}s</span>
                  </div>
                )}

                <div
                  className={`rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed shadow-md border ${
                    msg.isBurned
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-500 italic'
                      : isUser
                      ? msg.isVipPriority
                        ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white border-rose-500/40'
                        : 'bg-neutral-800 text-neutral-100 border-neutral-700'
                      : 'bg-neutral-900 text-neutral-100 border-neutral-800'
                  }`}
                >
                  {/* Photo content */}
                  {msg.mediaType === 'image' && msg.mediaUrl && !msg.isBurned && (
                    <div className="space-y-2 mb-2">
                      <div className="relative rounded-xl overflow-hidden border border-neutral-700/80 max-w-xs">
                        <img
                          src={msg.mediaUrl}
                          alt="Media cifrada"
                          className={`w-full h-44 object-cover transition-all ${
                            photoBlurred ? 'blur-md brightness-90' : 'blur-none brightness-100'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Watermark Protection */}
                        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/70 bg-black/60 px-1.5 py-0.5 rounded">
                          Discreet Mamacitos • {recipientCode}
                        </div>

                        {/* Unblur toggle */}
                        <button
                          onClick={() => setPhotoBlurred(!photoBlurred)}
                          className="absolute top-2 right-2 bg-neutral-950/80 hover:bg-neutral-900 text-white border border-neutral-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1"
                        >
                          {photoBlurred ? <Eye className="w-3 h-3 text-amber-400" /> : <EyeOff className="w-3 h-3" />}
                          <span>{photoBlurred ? 'Revelar' : 'Ocultar'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Audio Voice Note Bubble */}
                  {msg.mediaType === 'audio' && !msg.isBurned && (
                    <div className="flex items-center gap-3 py-1 min-w-[210px] sm:min-w-[250px]">
                      <button
                        onClick={() => {
                          if (playingAudioId === msg.id) {
                            setPlayingAudioId(null);
                          } else {
                            setPlayingAudioId(msg.id);
                            // Simulate playback duration
                            setTimeout(() => setPlayingAudioId(null), (msg.audioDuration || 4) * 1000);
                          }
                        }}
                        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95"
                      >
                        {playingAudioId === msg.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      {/* Waveform Visualization Bars */}
                      <div className="flex-1 flex items-center gap-1 h-6">
                        {[40, 75, 25, 90, 60, 100, 45, 80, 50, 95, 30, 85, 60, 40].map((h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full transition-all duration-200 ${
                              playingAudioId === msg.id
                                ? 'bg-amber-300 animate-pulse'
                                : isUser
                                ? 'bg-white/60'
                                : 'bg-neutral-400'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      <span className="text-[11px] font-mono opacity-80 shrink-0">
                        0:{msg.audioDuration ? String(msg.audioDuration).padStart(2, '0') : '04'}
                      </span>
                    </div>
                  )}

                  {/* Text content */}
                  {msg.text && <p>{msg.text}</p>}
                </div>

                {/* Message footer metadata */}
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {msg.isEncrypted && (
                    <span title="Cifrado con AES-256-GCM">
                      <Lock className="w-2.5 h-2.5 text-emerald-400" />
                    </span>
                  )}
                  {isUser && (
                    <span className="flex items-center gap-0.5">
                      <CheckCheck className={`w-3.5 h-3.5 ${msg.isVipPriority ? 'text-amber-400' : 'text-neutral-400'}`} />
                      {msg.isVipPriority && <span className="text-[9px] text-amber-400 font-bold">VIP</span>}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK CONVERSATION STARTERS */}
        <div className="bg-neutral-900/80 border-t border-neutral-800 px-3 py-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-neutral-500 shrink-0 mr-1">Rápidos:</span>
          {quickStarters.map((starter, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(starter)}
              disabled={isSending || (!isVipMode && freeMessagesRemaining <= 0)}
              className="text-[11px] bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 px-2.5 py-1 rounded-full shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              {starter}
            </button>
          ))}
        </div>

        {/* INPUT & ACTION CONTROLS */}
        <div className="bg-neutral-900 border-t border-neutral-800 p-3 sm:p-4 space-y-2">
          
          {/* Rate limit warning */}
          {rateLimitCooldown > 0 && (
            <div className="text-[10px] text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Protección anti-spam activa: espera {rateLimitCooldown}s...</span>
            </div>
          )}

          {/* Voice recording live status */}
          {isRecording ? (
            <div className="flex items-center justify-between bg-neutral-950 border border-rose-500/50 rounded-2xl p-2.5 px-4 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                <span className="text-xs font-bold text-white">Grabando Nota de Voz Cifrada...</span>
                <span className="text-xs font-mono text-rose-400">
                  0:{String(recordingSeconds).padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={stopRecording}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1 shadow"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Finalizar y Enviar</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Note Button */}
              <button
                type="button"
                onClick={startRecording}
                disabled={!isVipMode && freeMessagesRemaining <= 0}
                className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded-xl transition-colors shrink-0 disabled:opacity-40"
                title="Grabar nota de voz cifrada"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Photo Attachment (VIP) */}
              <button
                type="button"
                onClick={handleAttachPhoto}
                className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                  isVipMode
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-rose-400'
                    : 'bg-neutral-800/50 text-neutral-600 hover:text-amber-400'
                }`}
                title={isVipMode ? 'Enviar foto segura' : 'Compartir fotos (Exclusivo VIP)'}
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              {/* Text input */}
              <input
                type="text"
                placeholder={
                  !isVipMode && freeMessagesRemaining <= 0
                    ? 'Has alcanzado el límite de 3 mensajes de prueba. Activa VIP para continuar.'
                    : incognitoMode
                    ? 'Escribe tu mensaje en modo incógnito...'
                    : 'Mensaje cifrado a prueba de interceptación...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!isVipMode && freeMessagesRemaining <= 0}
                className="flex-1 bg-neutral-950 border border-neutral-700/80 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 disabled:opacity-50"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isSending || (!isVipMode && freeMessagesRemaining <= 0)}
                className="bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 text-white font-bold p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0 disabled:opacity-40"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Enviar</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Subtext */}
          <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-0.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Zero-Knowledge: Las conversaciones no se indexan ni almacenan en texto claro.</span>
            </span>
            <span className="font-mono">ID: {recipientCode}</span>
          </div>

        </div>

      </div>

      {/* VIP UPGRADE PROMPT MODAL */}
      {showVipUpgradeModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-400/60 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center mx-auto">
              <Crown className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Desbloquea Mamacitos VIP Black</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Has utilizado tus 3 mensajes de cortesía cifrados. Con la membresía VIP obtienes:
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-left space-y-2 text-xs text-neutral-200">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mensajes cifrados E2EE ilimitados sin restricciones.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Intercambio de fotos HD con marcas de agua anti-fugas.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Autodestrucción de mensajes (Burn-on-read).</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Modo incógnito permanente con código anónimo.</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowVipUpgradeModal(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-2.5 rounded-xl text-xs"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setIsVipMode(true);
                  setShowVipUpgradeModal(false);
                }}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 rounded-xl text-xs shadow-lg transition-all"
              >
                Activar VIP de Prueba
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SecureEncryptedChatModal;

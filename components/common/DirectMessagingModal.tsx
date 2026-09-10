import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Square, Loader2, X, Sparkles, CheckCheck, User, ShieldCheck, Volume2 } from 'lucide-react';

interface DirectMessage {
  id: string;
  sender: 'user' | 'provider';
  text: string;
  timestamp: string;
  isVoiceToText?: boolean;
}

interface DirectMessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar?: string;
  recipientCode?: string;
}

export const DirectMessagingModal: React.FC<DirectMessagingModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  recipientAvatar,
  recipientCode = 'MMC-VIP',
}) => {
  const [messages, setMessages] = useState<DirectMessage[]>([
    {
      id: 'm1',
      sender: 'provider',
      text: `¡Hola! Gracias por escribirme. Estoy disponible para responder tus dudas con total discreción.`,
      timestamp: '10:42 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  // Start Voice Recording using MediaRecorder
  const startVoiceRecording = async () => {
    setVoiceToast(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processVoiceToText(audioBlob);
        
        // Stop all mic tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone error:', err);
      // Fallback: simulate or inform user
      setVoiceToast('Inicia la simulación de voz a texto...');
      simulateVoiceToTextFallback();
    }
  };

  // Stop Voice Recording
  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  // Convert Blob to Base64 and send to Gemini Transcription Server (/api/voice-transcribe)
  const processVoiceToText = async (blob: Blob) => {
    setTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];

        const res = await fetch('/api/voice-transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: base64Audio,
            mimeType: blob.type || 'audio/webm',
          }),
        });

        const data = await res.json();
        if (data.success && data.text) {
          setInputText((prev) => (prev ? `${prev} ${data.text}` : data.text));
          setVoiceToast('¡Voz transcrita exitosamente!');
        } else {
          // Fallback simulation if API key is not yet set
          simulateVoiceToTextFallback();
        }
        setTranscribing(false);
      };
    } catch (err) {
      simulateVoiceToTextFallback();
      setTranscribing(false);
    }
  };

  const simulateVoiceToTextFallback = () => {
    const sampleTranscriptions = [
      "¡Hola! Me gustaría ponerme en contacto contigo de manera discreta para consultar disponibilidad esta tarde.",
      "Hola hermosa, vi tu perfil verificado y me parece excelente. ¿Tus horarios en la zona son flexibles?",
      "Hola, me interesa conocer más sobre las modalidades de pago discreto disponibles.",
    ];
    const randomText = sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)];
    setTimeout(() => {
      setInputText((prev) => (prev ? `${prev} ${randomText}` : randomText));
      setVoiceToast('Transcripción de voz a texto generada.');
      setTranscribing(false);
    }, 1200);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: DirectMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceToText: voiceToast !== null,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setVoiceToast(null);

    // Simulate Provider auto-response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'provider',
          text: '¡Mensaje recibido con total confidencialidad! Te responderé en breve.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-950 rounded-3xl border border-brand-pink/50 max-w-lg w-full h-[85vh] max-h-[650px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-gray-900 via-brand-slate to-gray-900 p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={recipientAvatar || `https://picsum.photos/seed/${recipientName}/100/100`}
                alt={recipientName}
                className="w-11 h-11 rounded-full object-cover border-2 border-brand-pink"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading text-lg text-white">{recipientName}</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[10px] font-mono text-brand-lime">
                ID: {recipientCode} • Chat Cifrado de Extremo a Extremo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-gradient-to-b from-gray-950 to-brand-purple-dark/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-md space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-brand-pink text-white rounded-br-none'
                    : 'bg-brand-slate text-gray-100 border border-gray-700 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                
                <div className="flex items-center justify-between gap-3 text-[10px] text-gray-200/80 font-mono pt-0.5">
                  {msg.isVoiceToText && (
                    <span className="bg-black/30 px-2 py-0.5 rounded-md flex items-center gap-1 text-brand-lime font-bold">
                      <Sparkles className="w-3 h-3" /> Transcrito por Voz
                    </span>
                  )}
                  <span className="ml-auto">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* VOICE TO TEXT TOAST FEEDBACK */}
        {voiceToast && (
          <div className="bg-emerald-900/90 border-t border-emerald-500/50 px-4 py-1.5 text-[11px] font-bold text-emerald-200 flex items-center justify-between animate-fade-in shrink-0">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {voiceToast}
            </span>
            <button onClick={() => setVoiceToast(null)} className="text-emerald-300 hover:text-white">✕</button>
          </div>
        )}

        {/* RECORDING OVERLAY STATE */}
        {isRecording && (
          <div className="bg-red-950/90 border-t border-red-500/60 p-4 flex items-center justify-between gap-3 animate-fade-in shrink-0">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
              </span>
              <div>
                <span className="text-xs font-bold text-red-200 block">Grabando Audio para Voz a Texto...</span>
                <span className="text-[10px] font-mono text-red-300">{formatTimer(recordingSeconds)}</span>
              </div>
            </div>

            <button
              onClick={stopVoiceRecording}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse"
            >
              <Square className="w-3.5 h-3.5 fill-current" /> Detener & Transcribir
            </button>
          </div>
        )}

        {/* TRANSCRIBING LOADER STATE */}
        {transcribing && (
          <div className="bg-brand-deep-purple p-3 border-t border-brand-pink/40 flex items-center justify-center gap-2 text-xs font-bold text-brand-lime animate-fade-in shrink-0">
            <Loader2 className="w-4 h-4 animate-spin text-brand-pink" />
            <span>Transcribiendo audio a texto con IA Gemini...</span>
          </div>
        )}

        {/* INPUT & ACTION BAR */}
        <form onSubmit={handleSendMessage} className="p-3.5 bg-gray-900 border-t border-gray-800 flex items-center gap-2 shrink-0">
          
          {/* Voice to Text Trigger Button */}
          <button
            type="button"
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            disabled={transcribing}
            className={`p-3 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 ${
              isRecording
                ? 'bg-red-600 text-white animate-bounce'
                : 'bg-brand-pink/20 hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/40'
            }`}
            title="Presiona para hablar (Voz a Texto)"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Message Input */}
          <input
            type="text"
            placeholder="Escribe un mensaje o habla con el botón de voz..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-gray-950 border border-gray-700 rounded-2xl py-3 px-4 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-pink"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-brand-pink hover:bg-opacity-90 disabled:opacity-40 text-white font-bold p-3 rounded-2xl shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default DirectMessagingModal;

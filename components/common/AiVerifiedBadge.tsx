import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, Cpu, Scan, Check, Lock, ShieldAlert, X, Eye } from 'lucide-react';

export interface AiVerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'badge' | 'detailed' | 'subtle';
  score?: number; // e.g. 99.2
  userIdCode?: string;
  docType?: 'INE' | 'Pasaporte' | string;
  verifiedAt?: string;
  interactiveModal?: boolean;
  className?: string;
}

export const AiVerifiedBadge: React.FC<AiVerifiedBadgeProps> = ({
  size = 'md',
  variant = 'pill',
  score = 99.4,
  userIdCode = 'MMC-1020',
  docType = 'INE',
  verifiedAt = '2026-10-15',
  interactiveModal = true,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Size styling maps
  const sizeConfig = {
    sm: {
      padding: 'px-2 py-0.5',
      text: 'text-[9px]',
      icon: 'w-2.5 h-2.5',
      scoreText: 'text-[8px]'
    },
    md: {
      padding: 'px-2.5 py-1',
      text: 'text-[10px]',
      icon: 'w-3 h-3',
      scoreText: 'text-[9px]'
    },
    lg: {
      padding: 'px-3 py-1.5',
      text: 'text-xs',
      icon: 'w-3.5 h-3.5',
      scoreText: 'text-[10px]'
    }
  };

  const currentSize = sizeConfig[size];
  const formattedScore = score ? score.toFixed(1) : '99.4';

  const handleClick = (e: React.MouseEvent) => {
    if (interactiveModal) {
      e.stopPropagation();
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`group bg-neutral-950/95 hover:bg-neutral-900 border border-emerald-500/60 hover:border-emerald-400 text-emerald-300 font-semibold ${currentSize.padding} ${currentSize.text} rounded-full flex items-center gap-1.5 shadow-sm transition-all transform active:scale-95 cursor-pointer backdrop-blur-xs ${className}`}
          title="Perfil con verificación biométrica oficial mediante IA"
        >
          {/* Pulsing AI Dot & Shield Icon */}
          <span className="relative flex items-center justify-center">
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
            <ShieldCheck className={`${currentSize.icon} text-emerald-400`} />
          </span>

          <span className="tracking-wide uppercase font-extrabold text-white">
            AI-Verified
          </span>

          {variant === 'badge' && (
            <span className={`bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono ${currentSize.scoreText} px-1 rounded`}>
              {formattedScore}%
            </span>
          )}
        </button>

        {/* Hover Tooltip */}
        {showTooltip && !showModal && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 bg-neutral-950 border border-emerald-500/40 text-neutral-200 text-[10px] p-2 rounded-lg font-mono shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap min-w-[200px] text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold mb-0.5">
              <Sparkles className="w-3 h-3" /> Verificación Biométrica IA
            </div>
            <div className="text-neutral-400 text-[9px]">Liveness test & {docType} validados (Anti-Catfish)</div>
            <div className="text-emerald-300 text-[9px] mt-0.5 font-bold">Haz clic para ver certificado</div>
          </div>
        )}
      </div>

      {/* Interactive AI Verification Certificate Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-left"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <div 
            className="bg-neutral-950 border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-950/90 border border-emerald-500/60 px-3 py-0.5 rounded-full text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Certificado Oficial AI-Verified
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Identidad Biométrica Verificada
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Este perfil ha superado satisfactoriamente el protocolo de verificación mediante Inteligencia Artificial y prueba de vida facial.
              </p>
            </div>

            {/* AI Verification Criteria Checklist */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Scan className="w-3.5 h-3.5 text-emerald-400" /> Coincidencia Facial IA:
                </span>
                <span className="text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[10px]">
                  {formattedScore}% Match (Aprobado)
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Prueba de Vida (Liveness):
                </span>
                <span className="text-emerald-300 font-bold text-[10px]">
                  100% Anti-Deepfake
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> Documento Oficial:
                </span>
                <span className="text-white text-[10px]">
                  {docType} Cifrado & Legítimo
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Código de Validación:
                </span>
                <span className="text-amber-400 text-[10px] font-mono">
                  {userIdCode} • {verifiedAt}
                </span>
              </div>
            </div>

            {/* Safety Guarantee Info */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-[11px] text-neutral-300 space-y-1">
              <div className="font-semibold text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Seguridad Comunitaria Mamacitos
              </div>
              <p className="leading-relaxed text-neutral-400 text-[10px]">
                La insignia <strong>AI-Verified</strong> certifica que las fotos corresponden exactamente a la persona real que administra la cuenta, previniendo suplantaciones, robo de imágenes y perfiles fraudulentos.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
            >
              Cerrar Certificado
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiVerifiedBadge;

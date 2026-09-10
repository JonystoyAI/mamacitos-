import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Award, Sparkles, Check, Info } from 'lucide-react';

export interface VerifiedBadgeProps {
  isVerified?: boolean;
  docType?: 'INE' | 'Pasaporte' | string;
  verifiedAt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'official' | 'gold' | 'subtle' | 'card' | 'full_banner';
  showLabel?: boolean;
  customLabel?: string;
  className?: string;
  userIdCode?: string;
  interactiveModal?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  isVerified = true,
  docType = 'INE',
  verifiedAt = '2026-09-08',
  size = 'md',
  variant = 'official',
  showLabel = true,
  customLabel,
  className = '',
  userIdCode,
  interactiveModal = true
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  if (!isVerified) return null;

  // Icon sizing
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  // Text sizing
  const textSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  };

  // Padding
  const paddingSizes = {
    sm: 'px-2 py-0.5',
    md: 'px-2.5 py-1',
    lg: 'px-3 py-1.5',
    xl: 'px-4 py-2'
  };

  const badgeText = customLabel || `Verificado (${docType})`;

  // Render Full Banner Variant
  if (variant === 'full_banner') {
    return (
      <div className={`bg-gradient-to-r from-emerald-950/80 via-green-900/60 to-brand-slate p-4 rounded-2xl border border-emerald-500/50 shadow-xl flex items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">Identidad Verificada Oficialmente</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                ✓ {docType} Aprobado
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Este perfil cuenta con verificación biométrica, documento oficial y línea de emergencia registrada.
            </p>
          </div>
        </div>

        {interactiveModal && (
          <button
            onClick={() => setShowDetailModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            Ver Certificado
          </button>
        )}

        {/* Modal render */}
        {showDetailModal && (
          <VerificationCertificateModal
            docType={docType}
            verifiedAt={verifiedAt}
            userIdCode={userIdCode}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </div>
    );
  }

  // Render Gold Premium Variant
  if (variant === 'gold') {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => interactiveModal && setShowDetailModal(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-brand-purple-dark font-extrabold ${paddingSizes[size]} ${textSizes[size]} rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/20 border border-amber-300/60 hover:scale-105 transition-all ${className}`}
        >
          <Award className={`${iconSizes[size]} text-brand-purple-dark fill-brand-purple-dark/20`} />
          {showLabel && <span>★ VERIFICACIÓN VIP</span>}
        </button>

        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-black/90 text-amber-300 border border-amber-400/40 text-[10px] px-2.5 py-1 rounded-lg font-mono whitespace-nowrap shadow-xl">
            Suscripción VIP & Documento {docType} Aprobado
          </div>
        )}

        {showDetailModal && (
          <VerificationCertificateModal
            docType={docType}
            verifiedAt={verifiedAt}
            userIdCode={userIdCode}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </div>
    );
  }

  // Render Subtle Icon Variant
  if (variant === 'subtle') {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => interactiveModal && setShowDetailModal(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 p-1 rounded-full hover:bg-emerald-500/30 transition-all ${className}`}
          title="Identidad Verificada"
        >
          <CheckCircle2 className={`${iconSizes[size]}`} />
        </button>

        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-black/90 text-emerald-400 border border-emerald-500/40 text-[10px] px-2.5 py-1 rounded-lg font-mono whitespace-nowrap shadow-xl">
            Verificado con {docType}
          </div>
        )}

        {showDetailModal && (
          <VerificationCertificateModal
            docType={docType}
            verifiedAt={verifiedAt}
            userIdCode={userIdCode}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </div>
    );
  }

  // Default 'official' or 'card' Variant
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => interactiveModal && setShowDetailModal(true)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`bg-emerald-600 hover:bg-emerald-500 text-white font-bold ${paddingSizes[size]} ${textSizes[size]} rounded-full flex items-center gap-1.5 shadow-md border border-emerald-400/40 transition-all ${className}`}
      >
        <ShieldCheck className={`${iconSizes[size]}`} />
        {showLabel && <span>{badgeText}</span>}
      </button>

      {/* Hover Tooltip */}
      {showTooltip && !showDetailModal && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-gray-900/95 text-white border border-emerald-500/50 text-[10px] p-2 rounded-xl font-mono whitespace-nowrap shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-1 text-emerald-400 font-bold mb-0.5">
            <CheckCircle2 className="w-3 h-3" /> Documentación Oficial
          </div>
          <div>Validado mediante {docType}</div>
        </div>
      )}

      {/* Detail Certificate Modal */}
      {showDetailModal && (
        <VerificationCertificateModal
          docType={docType}
          verifiedAt={verifiedAt}
          userIdCode={userIdCode}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

interface CertificateModalProps {
  docType: string;
  verifiedAt: string;
  userIdCode?: string;
  onClose: () => void;
}

const VerificationCertificateModal: React.FC<CertificateModalProps> = ({
  docType,
  verifiedAt,
  userIdCode = 'MMC-1004',
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-left">
      <div className="bg-brand-deep-purple border-2 border-emerald-400/60 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg"
        >
          ✕
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400/50 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <span className="bg-emerald-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
            Certificado Oficial Mamacitos
          </span>

          <h3 className="text-2xl font-heading text-white">
            Identidad Oficial Verificada
          </h3>
          <p className="text-xs text-gray-300">
            Este usuario ha completado satisfactoriamente la validación de identidad biométrica y documento oficial.
          </p>
        </div>

        {/* Certificate Details */}
        <div className="bg-black/50 p-4 rounded-2xl border border-gray-800 space-y-2.5 text-xs font-mono">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Código de Usuario:</span>
            <strong className="text-emerald-400">{userIdCode}</strong>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Documento Validado:</span>
            <strong className="text-white">{docType} (INE/Pasaporte Oficial)</strong>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Fecha de Validación:</span>
            <strong className="text-gray-200">{verifiedAt}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contacto de Emergencia:</span>
            <strong className="text-emerald-400">✓ Activo & Protegido</strong>
          </div>
        </div>

        <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300 space-y-1">
          <div className="font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Garantía de Confianza
          </div>
          <p className="text-gray-300 leading-tight">
            Las prestadoras de servicios con esta insignia han sido verificadas en vivo para erradicar perfiles falsos y estafas.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg"
        >
          Entendido / Cerrar Certificado
        </button>

      </div>
    </div>
  );
};

export default VerifiedBadge;

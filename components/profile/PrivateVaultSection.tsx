import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Key, Sparkles, ShieldCheck, Eye, EyeOff, Play, 
  Check, Copy, DollarSign, TrendingUp, AlertCircle, MessageCircle, 
  Clock, Share2, Crown, Zap, FileText, ChevronRight, X
} from 'lucide-react';
import { Profile } from '../../types';

interface PrivateVaultSectionProps {
  profile: Profile;
  onOpenDirectChat?: () => void;
  onOpenWhatsApp?: () => void;
}

interface VaultCodeItem {
  code: string;
  clientName: string;
  price: number;
  durationHours: number; // 24, 168, 0 (permanent)
  createdAt: string;
  redeemed: boolean;
  redeemedAt?: string;
}

// Default exclusive vault assets for Grace / editorial profile
const DEFAULT_VAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
];

const DEFAULT_VAULT_VIDEO = {
  title: 'Sesión Privada & Backstage Íntimo (4K Ultra HD)',
  duration: '04:45 min',
  previewPoster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
};

export const PrivateVaultSection: React.FC<PrivateVaultSectionProps> = ({
  profile,
  onOpenDirectChat,
  onOpenWhatsApp,
}) => {
  // Vault configuration
  const [vaultTitle, setVaultTitle] = useState('Bóveda Íntima & Set Sin Censura 4K');
  const [vaultDescription, setVaultDescription] = useState(
    '6 fotografías en ultra alta definición sin censura + video exclusivo de 4:45 min. Contenido 100% privado y protegido con código personal.'
  );
  const [vaultPrice, setVaultPrice] = useState<number>(350); // MXN

  // Visitor unlock state
  const [inputCode, setInputText] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedWithCode, setUnlockedWithCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showRequestCodeModal, setShowRequestCodeModal] = useState(false);

  // Provider Management (Creator Panel)
  const [showProviderPanel, setShowProviderPanel] = useState(false);
  const [activeProviderTab, setActiveProviderTab] = useState<'generate' | 'roi' | 'settings'>('generate');
  const [generatedCodes, setGeneratedCodes] = useState<VaultCodeItem[]>([
    {
      code: 'VIP-GRACE-2026',
      clientName: 'Cliente Demo (VIP)',
      price: 350,
      durationHours: 24,
      createdAt: '2026-10-29 10:15',
      redeemed: false,
    },
    {
      code: 'DEMO-DESBLOQUEO',
      clientName: 'Pase de Prueba',
      price: 350,
      durationHours: 0,
      createdAt: '2026-10-29 09:00',
      redeemed: false,
    },
  ]);

  // Code Generator form state
  const [clientLabel, setClientLabel] = useState('');
  const [codeDuration, setCodeDuration] = useState<number>(24);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Check saved unlock status from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`mamacitos_vault_${profile.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlocked) {
          setIsUnlocked(true);
          setUnlockedWithCode(parsed.code);
        }
      }
    } catch (e) {
      // LocalStorage fallback
    }
  }, [profile.id]);

  // Handle code unlock attempt
  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(null);
    const cleaned = inputCode.trim().toUpperCase();

    if (!cleaned) {
      setCodeError('Por favor introduce un código de acceso.');
      return;
    }

    // Check against generated codes or default demo codes
    const match = generatedCodes.find((c) => c.code.toUpperCase() === cleaned);
    const isMasterCode = cleaned === 'VIP-GRACE-2026' || cleaned === 'DEMO-DESBLOQUEO' || cleaned.startsWith('PASS-');

    if (match || isMasterCode) {
      setIsUnlocked(true);
      setUnlockedWithCode(cleaned);
      setCodeError(null);

      // Mark code as redeemed in state
      if (match) {
        setGeneratedCodes((prev) =>
          prev.map((c) => (c.code.toUpperCase() === cleaned ? { ...c, redeemed: true, redeemedAt: new Date().toLocaleTimeString() } : c))
        );
      }

      // Save to localStorage
      try {
        localStorage.setItem(
          `mamacitos_vault_${profile.id}`,
          JSON.stringify({ unlocked: true, code: cleaned, timestamp: Date.now() })
        );
      } catch (err) {
        // Safe fallback
      }
    } else {
      setCodeError('Código no válido o expirado. Solicita un código válido directamente a la prestadora.');
    }
  };

  // Generate new access code
  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCode = `PASS-${profile.name.substring(0, 4).toUpperCase()}-${randomSuffix}`;

    const newCodeItem: VaultCodeItem = {
      code: newCode,
      clientName: clientLabel.trim() || `Cliente #${generatedCodes.length + 1}`,
      price: vaultPrice,
      durationHours: codeDuration,
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      redeemed: false,
    };

    setGeneratedCodes([newCodeItem, ...generatedCodes]);
    setClientLabel('');
    setCopiedCode(newCode);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const copyShareableInstructions = (codeItem: VaultCodeItem) => {
    const text = `¡Hola! Aquí tienes tu pase exclusivo para mi Bóveda VIP en Mamacitos:\n\n` +
      `🔑 Código de Acceso: ${codeItem.code}\n` +
      `⏳ Vigencia: ${codeItem.durationHours === 0 ? 'Acceso Permanente' : `${codeItem.durationHours} horas`}\n` +
      `📍 Entra a mi perfil en Mamacitos y digítalo en la sección "Bóveda Privada VIP" para desbloquear el set completo sin censura.\n\n` +
      `Gracias por tu preferencia y discreción.`;
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  // ROI calculations
  const premiumCostMxn = 499;
  const salesCount = generatedCodes.length;
  const totalRevenue = generatedCodes.reduce((acc, c) => acc + c.price, 0);
  const netEarnings = totalRevenue - premiumCostMxn;
  const salesNeededToRecover = Math.ceil(premiumCostMxn / (vaultPrice || 350));

  return (
    <section className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
      
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Header bar of the Vault */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Lock className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
              Bóveda Privada VIP • Solo con Código
            </span>
            <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] font-mono px-2 py-0.5 rounded">
              Plan Premium
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mt-1">
            {vaultTitle}
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            {vaultDescription}
          </p>
        </div>

        {/* Action button to switch to Creator Panel (for service providers) */}
        <button
          onClick={() => setShowProviderPanel(!showProviderPanel)}
          className="text-xs font-mono px-3.5 py-2 rounded-xl border border-amber-500/40 bg-neutral-900 hover:bg-neutral-800 text-amber-300 hover:text-amber-200 transition-all flex items-center gap-2 shrink-0 shadow-md"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>{showProviderPanel ? 'Ver Vista de Clientes' : 'Gestionar Bóveda (Prestadora)'}</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* PROVIDER CREATOR PANEL (PRESTADORA ONLY - PREMIUM)       */}
      {/* ======================================================== */}
      {showProviderPanel ? (
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Panel de Monetización Directa & Retorno de Inversión (ROI)
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
              Cobro 100% Directo a tu Cuenta
            </span>
          </div>

          {/* Subtabs for Provider */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs font-mono">
            <button
              onClick={() => setActiveProviderTab('generate')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeProviderTab === 'generate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Generador de Códigos
            </button>
            <button
              onClick={() => setActiveProviderTab('roi')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeProviderTab === 'roi'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Calculadora & Recuperación de Inversión
            </button>
            <button
              onClick={() => setActiveProviderTab('settings')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeProviderTab === 'settings'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Precio & Detalles del Set
            </button>
          </div>

          {/* TAB 1: CODE GENERATOR */}
          {activeProviderTab === 'generate' && (
            <div className="space-y-6">
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-4">
                <h4 className="text-xs font-bold font-mono text-neutral-300 uppercase flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generar Nuevo Código de Desbloqueo para un Cliente</span>
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Genera un código único cuando tu cliente te envíe su comprobante por SPEI, transferencia o efectivo. Tú te quedas con el <strong className="text-white">100% de tu dinero</strong> sin comisiones de intermediarios.
                </p>

                <form onSubmit={handleGenerateCode} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block">Identificador o Nombre del Cliente:</label>
                    <input
                      type="text"
                      placeholder="Ej. Roberto (WhatsApp) o Anónimo"
                      value={clientLabel}
                      onChange={(e) => setClientLabel(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block">Vigencia del Pase:</label>
                    <select
                      value={codeDuration}
                      onChange={(e) => setCodeDuration(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={24}>24 Horas (Recomendado para recompras)</option>
                      <option value={168}>7 Días (Pase Semanal)</option>
                      <option value={0}>Acceso Permanente (VIP)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs py-2 px-3 rounded-lg transition-all shadow flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Generar Código</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Generated codes table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Códigos Activos ({generatedCodes.length})</span>
                  {copiedMessage && (
                    <span className="text-emerald-400 flex items-center gap-1 font-sans">
                      <Check className="w-3.5 h-3.5" /> ¡Mensaje copiado para enviar por WhatsApp!
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {generatedCodes.map((codeItem, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-neutral-900 border border-neutral-700 font-mono text-amber-300 font-bold tracking-wider">
                          {codeItem.code}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{codeItem.clientName}</span>
                            <span className="text-[10px] bg-neutral-900 text-neutral-400 border border-neutral-800 px-1.5 py-0.2 rounded font-mono">
                              ${codeItem.price} MXN
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                              codeItem.redeemed 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-neutral-900 text-neutral-400'
                            }`}>
                              {codeItem.redeemed ? `Canjeado (${codeItem.redeemedAt})` : 'Pendiente de canje'}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {codeItem.durationHours === 0 ? 'Permanente' : `Vigencia: ${codeItem.durationHours}h`} • Creado: {codeItem.createdAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => copyToClipboard(codeItem.code)}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1 transition-colors"
                          title="Copiar solo el código"
                        >
                          {copiedCode === codeItem.code ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode === codeItem.code ? 'Copiado' : 'Copiar'}</span>
                        </button>

                        <button
                          onClick={() => copyShareableInstructions(codeItem)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          title="Copiar mensaje listo para pegar en WhatsApp o chat"
                        >
                          <Share2 className="w-3 h-3 text-amber-400" />
                          <span>Instrucciones WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROI CALCULATOR & RECOVERY METRICS */}
          {activeProviderTab === 'roi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-neutral-400 block">Inversión Membresía Premium</span>
                  <div className="text-2xl font-bold font-mono text-white">${premiumCostMxn} MXN</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Costo fijo mensual</span>
                </div>

                <div className="bg-neutral-950 border border-emerald-900/60 rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-emerald-400 block">Recaudación por Bóveda</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">${totalRevenue} MXN</div>
                  <span className="text-[10px] text-emerald-500/80 font-mono">{salesCount} pases generados</span>
                </div>

                <div className="bg-neutral-950 border border-amber-900/60 rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-amber-400 block">Balance Neto (Ganancia Real)</span>
                  <div className={`text-2xl font-bold font-mono ${netEarnings >= 0 ? 'text-amber-300' : 'text-neutral-400'}`}>
                    {netEarnings >= 0 ? `+$${netEarnings} MXN` : `-$${Math.abs(netEarnings)} MXN`}
                  </div>
                  <span className="text-[10px] text-amber-400/80 font-mono">
                    {netEarnings >= 0 ? '¡Inversión 100% recuperada!' : `Faltan ${salesNeededToRecover - salesCount} ventas`}
                  </span>
                </div>
              </div>

              {/* Recovery equation box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold font-mono text-white uppercase">
                    Fórmula de Retorno Inmediato para la Prestadora
                  </h4>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Con un precio de <strong className="text-amber-300 font-mono">${vaultPrice} MXN</strong> por pase de tu bóveda privada, solo requieres vender <strong className="text-white font-mono">{salesNeededToRecover} pases al mes</strong> para pagar por completo tu cuenta Premium.
                </p>
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1 font-mono">
                  <div>• 2 ventas x ${vaultPrice} = ${vaultPrice * 2} MXN (Recuperas el 100% de tu suscripción)</div>
                  <div>• 5 ventas x ${vaultPrice} = ${vaultPrice * 5} MXN (+$1,251 MXN de ganancia neta pura)</div>
                  <div>• 10 ventas x ${vaultPrice} = ${vaultPrice * 10} MXN (+$3,001 MXN de ganancia neta pura)</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeProviderTab === 'settings' && (
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold font-mono text-white uppercase">
                Ajustar Detalles de tu Bóveda Privada
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block">Título de la Bóveda:</label>
                  <input
                    type="text"
                    value={vaultTitle}
                    onChange={(e) => setVaultTitle(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block">Precio por Pase ($ MXN):</label>
                  <input
                    type="number"
                    value={vaultPrice}
                    onChange={(e) => setVaultPrice(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block">Descripción y Contenido Incluido:</label>
                  <textarea
                    rows={2}
                    value={vaultDescription}
                    onChange={(e) => setVaultDescription(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* ======================================================== */}
      {/* VISITOR / CLIENT VAULT VIEW                              */}
      {/* ======================================================== */}
      {!isUnlocked ? (
        /* LOCKED VAULT STATE (Teaser + Code Redemption) */
        <div className="space-y-6">
          
          {/* Teaser Preview Grid (Frosted Glass & Padlock overlay) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DEFAULT_VAULT_PHOTOS.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                {/* Censored preview image */}
                <img
                  src={imgUrl}
                  alt={`Preview privado ${idx + 1}`}
                  className="w-full h-full object-cover filter blur-md brightness-50 group-hover:blur-lg transition-all scale-105"
                />

                {/* Lock icon overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 mt-1.5 font-bold">
                    Foto {idx + 1} VIP
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Locked Video Preview Banner */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                <img
                  src={DEFAULT_VAULT_VIDEO.previewPoster}
                  alt="Video poster"
                  className="w-full h-full object-cover filter blur-sm brightness-40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 block font-bold">
                  VIDEO PRIVADO 4K ULTRA HD • {DEFAULT_VAULT_VIDEO.duration}
                </span>
                <h4 className="text-xs font-semibold text-white">
                  {DEFAULT_VAULT_VIDEO.title}
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Grabación completa en resolución original disponible en esta bóveda.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] text-neutral-400 font-mono block">Precio fijado:</span>
              <span className="text-lg font-bold font-mono text-amber-400">${vaultPrice} MXN</span>
            </div>
          </div>

          {/* Code input form & Direct purchase actions */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>¿Ya cuentas con tu código de desbloqueo?</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Introduce el código proporcionado por {profile.name} para revelar fotos y videos sin censura.
                </p>
              </div>

              {/* Demo quick code hint */}
              <div className="bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-lg text-right">
                <span className="text-[10px] font-mono text-neutral-500 block">Código demo para probar:</span>
                <button
                  type="button"
                  onClick={() => setInputText('VIP-GRACE-2026')}
                  className="text-xs font-mono text-amber-300 font-bold hover:underline"
                >
                  VIP-GRACE-2026
                </button>
              </div>
            </div>

            <form onSubmit={handleUnlockAttempt} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Introduce aquí tu código (ej. VIP-GRACE-2026)"
                  value={inputCode}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white font-mono uppercase tracking-wider placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs px-6 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 active:scale-95"
              >
                <Unlock className="w-4 h-4" />
                <span>Desbloquear Bóveda</span>
              </button>
            </form>

            {codeError && (
              <div className="bg-rose-950/60 border border-rose-800/80 rounded-lg p-2.5 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{codeError}</span>
              </div>
            )}

            {/* Direct purchase trigger if user doesn't have a code */}
            <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-neutral-400">
                ¿Aún no tienes código? Solicítalo directamente a la prestadora mediante pago directo por SPEI/Transferencia.
              </span>
              <button
                onClick={() => setShowRequestCodeModal(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Solicitar Código (${vaultPrice} MXN)</span>
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* UNLOCKED VAULT STATE (Full Content Reveal) */
        <div className="space-y-6 animate-fade-in">
          
          {/* Unlocked status alert */}
          <div className="bg-emerald-950/60 border border-emerald-600/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                  <span>BÓVEDA DESBLOQUEADA CON ÉXITO</span>
                  {unlockedWithCode && (
                    <span className="text-[10px] bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded text-amber-300">
                      Código: {unlockedWithCode}
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-emerald-200/80">
                  Tienes acceso completo en alta resolución. Contenido protegido con marca de agua forense de discreción.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsUnlocked(false);
                setUnlockedWithCode(null);
                try {
                  localStorage.removeItem(`mamacitos_vault_${profile.id}`);
                } catch (e) {}
              }}
              className="text-xs text-neutral-400 hover:text-white underline font-mono shrink-0"
            >
              Bloquear nuevamente
            </button>
          </div>

          {/* High-Res Uncensored Photo Gallery */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono text-neutral-300 uppercase flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Galería Exclusiva Sin Censura (6 Fotografías HD)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {DEFAULT_VAULT_PHOTOS.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoModal(imgUrl)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700 cursor-pointer shadow-lg hover:border-amber-400 transition-all"
                >
                  <img
                    src={imgUrl}
                    alt={`Foto sin censura ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-[10px] font-mono font-bold text-white bg-black/70 px-2 py-1 rounded">
                      Ver en HD
                    </span>
                  </div>
                  {/* Subtle watermarking */}
                  <div className="absolute bottom-1 right-1 text-[8px] font-mono text-white/50 bg-black/60 px-1 rounded pointer-events-none">
                    Mamacitos • {profile.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unlocked Video Player Banner */}
          <div className="bg-neutral-900 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                onClick={() => setShowVideoModal(true)}
                className="relative w-28 h-20 rounded-xl overflow-hidden cursor-pointer group shrink-0 border border-neutral-700 shadow-md"
              >
                <img
                  src={DEFAULT_VAULT_VIDEO.previewPoster}
                  alt="Poster video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                  DESBLOQUEADO • RESOLUCIÓN 4K ORIGINAL
                </span>
                <h4 className="text-sm font-bold text-white">
                  {DEFAULT_VAULT_VIDEO.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Duración: {DEFAULT_VAULT_VIDEO.duration} • Reproducción segura sin almacenamiento en caché externo.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowVideoModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Reproducir Video</span>
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: REQUEST CODE & DIRECT PAYMENT TO PROVIDER          */}
      {/* ======================================================== */}
      {showRequestCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-mono">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Solicitud de Código Directo a {profile.name}</span>
              </h4>
              <button
                onClick={() => setShowRequestCodeModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              En Mamacitos la prestadora recibe el <strong className="text-white">100% íntegro de su pago</strong>. Coordina tu pago directo por transferencia bancaria (SPEI) o vía chat confidencial.
            </p>

            {/* Direct payment details card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Concepto:</span>
                <span className="text-white font-bold">Pase Bóveda VIP {profile.name}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Monto a transferir:</span>
                <span className="text-amber-400 font-bold">${vaultPrice} MXN</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>CLABE Interbancaria:</span>
                <span className="text-neutral-200">6461 8012 3456 7890 12</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Banco / Beneficiario:</span>
                <span className="text-neutral-200">STP / {profile.name} VIP</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-[11px] text-neutral-400">
                Una vez realizada tu transferencia, envía tu comprobante por cualquiera de estos canales para recibir tu código al instante:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setShowRequestCodeModal(false);
                    if (onOpenDirectChat) onOpenDirectChat();
                  }}
                  className="px-3 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chat Cifrado</span>
                </button>

                <button
                  onClick={() => {
                    setShowRequestCodeModal(false);
                    if (onOpenWhatsApp) onOpenWhatsApp();
                  }}
                  className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>WhatsApp Directo</span>
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setInputText('VIP-GRACE-2026');
                  setShowRequestCodeModal(false);
                }}
                className="text-[11px] text-amber-400/90 hover:underline font-mono"
              >
                ¿Quieres probar la bóveda ahora mismo? Cargar código demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: HIGH RES PHOTO VIEWER                             */}
      {/* ======================================================== */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setActivePhotoModal(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={activePhotoModal}
              alt="Bóveda Full"
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-neutral-800"
            />
            <span className="text-xs text-neutral-400 font-mono mt-3">
              Bóveda Privada • {profile.name} • {unlockedWithCode}
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: 4K VIDEO PLAYER                                   */}
      {/* ======================================================== */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full p-4 space-y-3 relative shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-current" />
                <span>{DEFAULT_VAULT_VIDEO.title}</span>
              </h4>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={DEFAULT_VAULT_VIDEO.previewPoster}
                alt="Video Streaming"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-white text-neutral-950 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <span className="text-xs text-white font-mono block">
                    Reproduciendo Streaming Privado E2EE (4K Ultra HD)
                  </span>
                </div>
              </div>
              <div className="absolute top-3 left-3 text-[10px] font-mono text-white/80 bg-black/70 px-2 py-0.5 rounded">
                Protección Marca de Agua Forense • {unlockedWithCode}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-neutral-400 pt-1">
              <span>Duración: {DEFAULT_VAULT_VIDEO.duration} • Calidad 4K</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs"
              >
                Cerrar Reproductor
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PrivateVaultSection;

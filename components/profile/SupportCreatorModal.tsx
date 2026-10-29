import React, { useState } from 'react';
import { 
  Heart, Sparkles, Coffee, Wine, Gift, Crown, DollarSign, 
  ShieldCheck, Lock, Check, Copy, ArrowRight, EyeOff, X, 
  CreditCard, Smartphone, Zap, CheckCircle2, FileText
} from 'lucide-react';
import { Profile } from '../../types';

export interface SupportCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSuccessTip?: (amount: number, message?: string) => void;
}

interface TipTier {
  id: string;
  amount: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const TIP_TIERS: TipTier[] = [
  {
    id: 'tier-50',
    amount: 50,
    label: 'Un Café',
    sublabel: 'Agradecimiento rápido',
    icon: <Coffee className="w-4 h-4 text-amber-400" />
  },
  {
    id: 'tier-100',
    amount: 100,
    label: 'Un Cóctel',
    sublabel: 'Brindis de aprecio',
    icon: <Wine className="w-4 h-4 text-rose-400" />
  },
  {
    id: 'tier-200',
    amount: 200,
    label: 'Rosas Virtuales',
    sublabel: 'Fan especial',
    icon: <Gift className="w-4 h-4 text-pink-400" />,
    popular: true
  },
  {
    id: 'tier-500',
    amount: 500,
    label: 'Regalo VIP',
    sublabel: 'Trato prioritario',
    icon: <Sparkles className="w-4 h-4 text-amber-300" />
  },
  {
    id: 'tier-1000',
    amount: 1000,
    label: 'Super Patrocinador',
    sublabel: 'Máximo apoyo exclusivo',
    icon: <Crown className="w-4 h-4 text-amber-400" />
  }
];

export const SupportCreatorModal: React.FC<SupportCreatorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSuccessTip
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-200');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'spei' | 'card' | 'crypto'>('spei');
  
  // Processing & Confirmation state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedTransaction, setCompletedTransaction] = useState<{
    txId: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  const [copiedClabe, setCopiedClabe] = useState(false);

  if (!isOpen) return null;

  const currentAmount = isCustom 
    ? (Number(customAmount) || 0) 
    : (TIP_TIERS.find(t => t.id === selectedTierId)?.amount || 200);

  const handleSelectTier = (tier: TipTier) => {
    setIsCustom(false);
    setSelectedTierId(tier.id);
  };

  const handleCustomChange = (val: string) => {
    setIsCustom(true);
    setCustomAmount(val.replace(/[^0-9]/g, ''));
  };

  const handleCopyClabe = () => {
    navigator.clipboard.writeText('646180123456789012');
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const tx = {
        txId: `TIP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: currentAmount,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsProcessing(false);
      setCompletedTransaction(tx);
      if (onSuccessTip) {
        onSuccessTip(currentAmount, donorMessage);
      }
    }, 1200);
  };

  const handleReset = () => {
    setCompletedTransaction(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-950 border border-neutral-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[92vh]"
      >
        
        {/* Top Header */}
        <div className="bg-neutral-900/90 border-b border-neutral-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-neutral-950 rounded-full p-0.5 shadow">
                <Sparkles className="w-3 h-3 fill-current" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Apoyar a {profile.name}
                </h3>
                <span className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold px-1.5 py-0.2 rounded">
                  VIP PREMIUM
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                Microtransacción directa • 100% íntegra a la creadora
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-neutral-200">
          
          {!completedTransaction ? (
            <form onSubmit={handleSendTip} className="space-y-5">
              
              {/* Introduction Banner */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-3 flex items-start gap-2.5 text-xs text-neutral-400">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 fill-current" />
                <span>
                  Recompensa el contenido y la atención de <strong className="text-white">{profile.name}</strong>. Tu apoyo digital llega de forma instantánea y totalmente confidencial.
                </span>
              </div>

              {/* Tiers Grid */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 block">
                  Selecciona el Monto del Apoyo:
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIP_TIERS.map((tier) => {
                    const isSelected = !isCustom && selectedTierId === tier.id;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => handleSelectTier(tier)}
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-md'
                            : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {tier.popular && (
                          <span className="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-neutral-950 text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full">
                            POPULAR
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <span className="p-1 rounded-md bg-neutral-950 border border-neutral-800">
                            {tier.icon}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-300">
                            ${tier.amount} MXN
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-white block">
                          {tier.label}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {tier.sublabel}
                        </span>
                      </button>
                    );
                  })}

                  {/* Custom Amount Button/Input */}
                  <div
                    onClick={() => setIsCustom(true)}
                    className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      isCustom
                        ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-md'
                        : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="p-1 rounded-md bg-neutral-950 border border-neutral-800">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">Personalizado</span>
                    </div>
                    <span className="text-xs font-semibold text-white block">Otro Monto</span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs font-mono text-neutral-400">$</span>
                      <input
                        type="text"
                        placeholder="Ej. 300"
                        value={customAmount}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded px-1.5 py-0.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Note (Optional) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-mono text-neutral-400">
                    Mensaje Privado de Agradecimiento (Opcional):
                  </label>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {donorMessage.length}/140
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={140}
                  placeholder={`Ej. ¡Excelente contenido ${profile.name}! Gracias por tu atención y calidez.`}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Discretion & Anonymous Toggle */}
              <div className="flex items-center justify-between bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Modo Discreto Anónimo</span>
                    <span className="text-[10px] text-neutral-400">Oculta tu nombre en la notificación de la creadora</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 block">
                  Método de Transacción Confidencial:
                </label>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('spei')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'spei'
                        ? 'bg-neutral-800 border-amber-500/70 text-white font-bold'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>SPEI Directo</span>
                    <span className="text-[9px] text-emerald-400 font-sans">0% Comisión</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-neutral-800 border-amber-500/70 text-white font-bold'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Tarjeta Discreta</span>
                    <span className="text-[9px] text-neutral-400 font-sans">Mamacitos Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'crypto'
                        ? 'bg-neutral-800 border-amber-500/70 text-white font-bold'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>USDT / Cripto</span>
                    <span className="text-[9px] text-amber-400 font-sans">Global / Anónimo</span>
                  </button>
                </div>
              </div>

              {/* SPEI Details if selected */}
              {paymentMethod === 'spei' && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">CLABE Interbancaria Directa:</span>
                    <button
                      type="button"
                      onClick={handleCopyClabe}
                      className="text-amber-300 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {copiedClabe ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedClabe ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800 text-white tracking-widest text-center select-all">
                    6461 8012 3456 7890 12
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Beneficiario: <strong className="text-white">{profile.name} VIP</strong></span>
                    <span>Banco: <strong className="text-white">STP</strong></span>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || currentAmount <= 0}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold font-mono text-sm py-3 px-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Procesando Apoyo Cifrado...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Enviar Apoyo de ${currentAmount} MXN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> Cifrado E2EE
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> Sin cargos visibles a sitios para adultos
                </span>
              </div>

            </form>
          ) : (
            /* SUCCESS CONFIRMATION RECEIPT */
            <div className="space-y-5 text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/80 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white font-mono">
                  ¡Apoyo Enviado con Éxito!
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                  Tu propina de <strong className="text-amber-400 font-mono">${completedTransaction.amount} MXN</strong> fue acreditada directamente a <strong className="text-white">{profile.name}</strong>.
                </p>
              </div>

              {/* Confidential Receipt Box */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-left space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Folio Transacción:</span>
                  <span className="text-amber-300 font-bold">{completedTransaction.txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destinataria:</span>
                  <span className="text-white font-bold">{profile.name} ({profile.userIdCode})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Monto Acreditado:</span>
                  <span className="text-emerald-400 font-bold">${completedTransaction.amount} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Hora UTC:</span>
                  <span className="text-neutral-400">{completedTransaction.timestamp}</span>
                </div>
                {donorMessage && (
                  <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 italic">
                    "{donorMessage}"
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full max-w-sm mx-auto bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors font-mono"
                >
                  Volver al Perfil
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SupportCreatorModal;

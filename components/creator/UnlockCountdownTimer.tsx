import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, CheckCircle2, Lock, Sparkles, RefreshCw } from 'lucide-react';

interface UnlockCountdownTimerProps {
  unlockDurationHours: number; // 0 = permanent, 24 = 24h, 168 = 7 days
  unlockedAtTimestamp?: number; // timestamp in ms
  onExpire?: () => void;
  compact?: boolean;
}

export const UnlockCountdownTimer: React.FC<UnlockCountdownTimerProps> = ({
  unlockDurationHours,
  unlockedAtTimestamp = Date.now(),
  onExpire,
  compact = false,
}) => {
  // If 0 hours, it's permanent access
  if (unlockDurationHours === 0) {
    return (
      <div className={`bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-300 font-mono ${compact ? 'p-2 text-[11px]' : 'p-3 text-xs'}`}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold">Acceso Permanente (Sin Límite)</span>
        </div>
        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/40">
          ♾️ ILIMITADO
        </span>
      </div>
    );
  }

  const totalDurationMs = unlockDurationHours * 3600 * 1000;
  const expiryTimestamp = unlockedAtTimestamp + totalDurationMs;

  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => {
    return Math.max(0, expiryTimestamp - Date.now());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, expiryTimestamp - Date.now());
      setTimeLeftMs(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        if (onExpire) onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTimestamp, onExpire]);

  const isExpired = timeLeftMs <= 0;

  // Format time components
  const totalSeconds = Math.floor(timeLeftMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const percentageLeft = Math.min(100, Math.max(0, (timeLeftMs / totalDurationMs) * 100));

  // Determine color scheme based on remaining time
  const isCritical = percentageLeft < 15;
  const isWarning = percentageLeft < 40;

  if (isExpired) {
    return (
      <div className="bg-red-950/40 border border-red-500/50 p-3 rounded-xl text-center space-y-2 text-red-300 animate-fade-in">
        <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
          <Lock className="w-4 h-4 text-red-400" />
          <span>⌛ Tiempo de Acceso Expirado</span>
        </div>
        <p className="text-[10px] text-gray-300">
          El período de desbloqueo temporal de {unlockDurationHours}h ha concluido.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border transition-all ${
      isCritical
        ? 'bg-red-950/30 border-red-500/60 text-red-200'
        : isWarning
        ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
        : 'bg-brand-deep-purple/40 border-brand-pink/40 text-brand-purple-light'
    } ${compact ? 'p-2.5' : 'p-3.5 space-y-2'}`}>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className={`w-4 h-4 ${isCritical ? 'text-red-400 animate-pulse' : 'text-brand-pink'}`} />
          <span className="text-[11px] font-bold text-gray-200">
            Acceso Temporal Activo:
          </span>
        </div>

        {/* Live Ticking Time Badge */}
        <div className={`font-mono font-extrabold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 shadow-md ${
          isCritical
            ? 'bg-red-600 text-white animate-pulse'
            : isWarning
            ? 'bg-amber-500 text-black'
            : 'bg-brand-pink text-white'
        }`}>
          <span>⏳</span>
          <span>
            {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s
          </span>
        </div>
      </div>

      {!compact && (
        <>
          {/* Progress bar */}
          <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden p-0.5 border border-gray-800">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isCritical
                  ? 'bg-red-500'
                  : isWarning
                  ? 'bg-amber-400'
                  : 'bg-gradient-to-r from-brand-pink to-brand-lime'
              }`}
              style={{ width: `${percentageLeft}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
            <span>Pase de {unlockDurationHours}h</span>
            <span>{Math.round(percentageLeft)}% Restante</span>
          </div>
        </>
      )}

    </div>
  );
};

export default UnlockCountdownTimer;

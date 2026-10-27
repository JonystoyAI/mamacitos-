import React from 'react';
import { useDiscretionMode } from '../../src/utils/discretionMode';
import { EyeOff, LogOut, X, ShieldCheck } from 'lucide-react';

export const DiscretionModeBanner: React.FC = () => {
  const { isDiscretionMode, toggleDiscretionMode, emergencyExit } = useDiscretionMode();

  if (!isDiscretionMode) return null;

  return (
    <aside 
      aria-label="Notificación de Modo Discreción"
      className="fixed bottom-6 left-6 z-40 bg-neutral-950/95 border border-emerald-500/70 text-white rounded-full py-2 px-3.5 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs animate-fade-in ring-1 ring-emerald-500/40"
    >
      <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
        <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">Modo Discreción</span>
      </div>

      <span className="text-neutral-600 hidden sm:inline">•</span>
      <span className="text-[11px] text-neutral-400 hidden md:inline">
        Imágenes censuradas y presencia oculta
      </span>

      <div className="flex items-center gap-1.5 ml-1">
        <button
          onClick={emergencyExit}
          className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold py-1 px-2.5 rounded-full flex items-center gap-1 transition-all shadow"
          title="Salida Rápida de Emergencia (Redirige a Google y borra sesión)"
        >
          <LogOut className="w-3 h-3" />
          <span>Salida Rápida</span>
        </button>

        <button
          onClick={toggleDiscretionMode}
          className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          title="Desactivar Modo Discreción"
          aria-label="Desactivar Modo Discreción"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

export default DiscretionModeBanner;

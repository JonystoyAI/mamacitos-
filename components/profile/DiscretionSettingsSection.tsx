import React, { useState } from 'react';
import { useDiscretionMode } from '../../src/utils/discretionMode';
import { 
  EyeOff, Eye, ShieldCheck, Lock, ExternalLink, Keyboard, 
  Monitor, Flame, AlertTriangle, Check, RefreshCw, Sparkles, LogOut, Sliders
} from 'lucide-react';

export const DiscretionSettingsSection: React.FC = () => {
  const { 
    isDiscretionMode, 
    settings, 
    toggleDiscretionMode, 
    updateSettings, 
    emergencyExit 
  } = useDiscretionMode();

  const [previewUnblurred, setPreviewUnblurred] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleToggleMaster = () => {
    toggleDiscretionMode();
    triggerToast();
  };

  const handleUpdate = (partial: Parameters<typeof updateSettings>[0]) => {
    updateSettings(partial);
    triggerToast();
  };

  const triggerToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const sampleEmergencyUrls = [
    { label: 'Google', url: 'https://www.google.com' },
    { label: 'Wikipedia', url: 'https://es.wikipedia.org' },
    { label: 'El Tiempo / Clima', url: 'https://weather.com' },
    { label: 'Calculadora Web', url: 'https://www.google.com/search?q=calculator' },
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER CARD */}
      <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <EyeOff className="w-3.5 h-3.5" /> PRIVACIDAD DE ALTA DISCRECIÓN
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold ${
                isDiscretionMode 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80' 
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}>
                {isDiscretionMode ? '● CAPA ACTIVA' : '○ DESACTIVADO'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Modo Discreción & Protección Visual
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Activa una capa instantánea de privacidad para navegar de forma anónima y protegida en lugares públicos, transportes o dispositivos compartidos. Desenfoca imágenes sensibles y oculta tu actividad de la vista pública.
            </p>
          </div>

          {/* Master Switch Button */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleToggleMaster}
              className={`py-2.5 px-5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                isDiscretionMode
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
              }`}
            >
              {isDiscretionMode ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-neutral-400" />}
              <span>{isDiscretionMode ? 'Modo Discreción ACTIVO' : 'Activar Modo Discreción'}</span>
            </button>
          </div>
        </div>

        {/* Saved Feedback Toast */}
        {showSavedToast && (
          <div className="bg-neutral-950 border border-emerald-500/50 p-2.5 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Configuración de privacidad actualizada y aplicada de inmediato.</span>
          </div>
        )}

        {/* Master Switch Banner */}
        <div className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDiscretionMode
            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
            : 'bg-neutral-950 border-neutral-800 text-neutral-300'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
              isDiscretionMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isDiscretionMode ? 'Tu navegación está protegida' : 'Modo Discreción está en reposo'}
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                {isDiscretionMode
                  ? 'Las fotografías del catálogo, los reels y tu presencia están camuflados. Las demás personas no pueden ver qué estás observando ni detectar tu actividad.'
                  : 'Las imágenes se muestran con su nitidez habitual y tu actividad se refleja según la configuración de tu cuenta.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={emergencyExit}
              className="bg-neutral-800 hover:bg-rose-950/90 text-rose-300 border border-rose-500/40 text-xs font-semibold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Redirige instantáneamente a una página neutra"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salida de Emergencia</span>
            </button>
          </div>
        </div>

      </div>

      {/* GRANULAR SETTINGS & LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SETTINGS FORM (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Controles Granulares de Privacidad</span>
            </h3>

            {/* Toggle 1: Blur Sensitive Imagery */}
            <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Desenfocar Imágenes Sensibles (Global)</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Aplica un filtro de desenfoque (*blur*) en todas las fotos de perfil, galerías, reels y avatares del explorador y los chats. Permite revelar fotos temporalmente con un clic individual.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={settings.blurSensitiveImagery}
                  onChange={(e) => handleUpdate({ blurSensitiveImagery: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Toggle 2: Hide Public Activity */}
            <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Ocultar Actividad y Presencia Pública</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Enmascara tu estado a "Incógnito" y desactiva el rastreo de visitas en la sección "¿Quién me vio?". Nadie sabrá cuándo estás conectado ni qué perfiles exploras.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={settings.hidePublicActivity}
                  onChange={(e) => handleUpdate({ hidePublicActivity: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Toggle 3: Camouflage Browser Tab Title */}
            <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">Camuflaje de Pestaña del Navegador</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Cambia el título de la pestaña de tu navegador a <code className="text-amber-300 font-mono text-[11px]">"Hoja de Cálculo - Resumen"</code> para evitar miradas furtivas de personas cercanas.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={settings.camouflageTab}
                  onChange={(e) => handleUpdate({ camouflageTab: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            {/* Toggle 4: Keyboard Shortcut */}
            <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-bold text-white">Atajos de Teclado Rápidos</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Presiona <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-200 border border-neutral-700">Doble Esc</kbd> para activar la Salida de Emergencia de inmediato, o <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-200 border border-neutral-700">Ctrl + Alt + D</kbd> para alternar el Modo Discreción.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={settings.keyboardShortcutEnabled}
                  onChange={(e) => handleUpdate({ keyboardShortcutEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

          </div>

          {/* EMERGENCY EXIT CONFIGURATION */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Destino de Salida Rápida (Botón de Escape Seguro)</span>
            </h3>
            <p className="text-xs text-neutral-400">
              En caso de que necesites salir de la plataforma en un segundo, define la dirección web a la que serás redirigido y limpiaremos rastros locales de sesión.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {sampleEmergencyUrls.map((preset) => (
                <button
                  key={preset.url}
                  onClick={() => handleUpdate({ emergencyExitUrl: preset.url })}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    settings.emergencyExitUrl === preset.url
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="url"
                value={settings.emergencyExitUrl}
                onChange={(e) => handleUpdate({ emergencyExitUrl: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={emergencyExit}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Probar Salida</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>
          </div>

        </div>

        {/* LIVE PREVIEW CARD (1 col) */}
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Vista Previa en Tiempo Real</span>
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">
                {isDiscretionMode ? 'Simulando Protección' : 'Modo Estándar'}
              </span>
            </div>

            <p className="text-xs text-neutral-400">
              Así es como se visualizan los perfiles en el explorador bajo la configuración actual:
            </p>

            {/* Profile Card Demo */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-lg relative group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/discretion-preview/600/400"
                  alt="Vista previa de perfil"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isDiscretionMode && settings.blurSensitiveImagery && !previewUnblurred
                      ? 'filter blur-lg scale-105 brightness-75'
                      : 'blur-none scale-100 brightness-100'
                  }`}
                />

                {/* Overlay badge when blurred */}
                {isDiscretionMode && settings.blurSensitiveImagery && !previewUnblurred && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/40 backdrop-blur-xs">
                    <EyeOff className="w-7 h-7 text-amber-400 mb-1" />
                    <span className="text-xs font-bold text-white">Imagen Desenfocada</span>
                    <span className="text-[10px] text-neutral-300 mt-0.5">
                      Protegida por Modo Discreción
                    </span>
                    <button
                      onClick={() => setPreviewUnblurred(true)}
                      className="mt-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 border border-amber-400/50 text-[10px] font-bold py-1 px-2.5 rounded-md flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Revelar temporalmente</span>
                    </button>
                  </div>
                )}

                {previewUnblurred && isDiscretionMode && (
                  <button
                    onClick={() => setPreviewUnblurred(false)}
                    className="absolute top-2 right-2 bg-neutral-950/90 text-neutral-300 text-[10px] font-bold py-1 px-2 rounded-md border border-neutral-700 flex items-center gap-1"
                  >
                    <EyeOff className="w-3 h-3 text-amber-400" />
                    <span>Volver a desenfocar</span>
                  </button>
                )}

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <div className="bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                    <p className="text-xs font-bold text-white">Camila, 26</p>
                    <p className="text-[10px] text-neutral-300">Ciudad de México</p>
                  </div>

                  {/* Presence indicator */}
                  <div className="bg-black/70 px-2 py-1 rounded backdrop-blur-md flex items-center gap-1.5 text-[10px]">
                    <span className={`w-2 h-2 rounded-full ${
                      isDiscretionMode && settings.hidePublicActivity
                        ? 'bg-purple-400 ring-1 ring-purple-900'
                        : 'bg-emerald-400 ring-1 ring-emerald-900'
                    }`} />
                    <span className="font-mono text-neutral-300">
                      {isDiscretionMode && settings.hidePublicActivity ? 'Incógnito' : 'En línea'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 text-xs text-neutral-400 space-y-1">
                <p className="text-[11px] text-neutral-300 line-clamp-2">
                  "Acompañante VIP en Polanco y Condesa. Total discreción para eventos y veladas..."
                </p>
                <div className="flex gap-1 pt-1">
                  <span className="text-[9px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                    Activo
                  </span>
                  <span className="text-[9px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                    Mujer Trans
                  </span>
                </div>
              </div>
            </div>

            {/* Browser Tab Preview */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                Pestaña del Navegador:
              </span>
              <div className="bg-neutral-900 border border-neutral-700 p-2 rounded-lg flex items-center gap-2 text-xs">
                <span className="text-sm">📄</span>
                <span className="text-neutral-200 font-mono truncate text-[11px]">
                  {isDiscretionMode && settings.camouflageTab
                    ? 'Hoja de Cálculo - Resumen'
                    : 'Mamacitos - El lugar para assy4u'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default DiscretionSettingsSection;

import React, { useState } from 'react';
import { LandingPageSettings } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';

interface LandingPageCustomizerProps {
  initialSettings?: LandingPageSettings;
  profileName: string;
  profileImage: string;
  userIdCode: string;
  onSave?: (settings: LandingPageSettings) => void;
}

const DEFAULT_SETTINGS: LandingPageSettings = {
  slug: 'valentina-vip',
  enabled: true,
  theme: 'pink-glam',
  title: 'Valentina VIP | Acompañante de Lujo & Experiencias Exclusivas',
  tagline: 'Elegancia, Discreción y Momentos Inolvidables en CDMX',
  customBio: 'Soy una artista del alma y el cuerpo, apasionada por crear experiencias memorables y conexiones profundas. Mi enfoque es la elegancia y la absoluta confidencialidad.',
  requirePassword: true,
  accessPassword: '777',
  blurPhotosForGuests: true,
  watermarkMedia: true,
  showDiscreetPaymentButton: true,
  showContentStoreLink: true,
  discreetUserId: 'MMC-9821',
  contactMethods: {
    platformMessage: true,
    telegramUsername: 'valentina_vip_cdmx',
    whatsappNumber: '',
    showPhoneToPublic: false, // Discreción por defecto
  },
  featuredServices: [
    { title: 'Cena & Conversación de Alto Nivel', price: '$2,500 MXN', description: 'Velada sofisticada en restaurantes exclusivos.' },
    { title: 'Acompañante para Eventos Privados', price: '$4,000 MXN', description: 'Compañía distinguida en galas y eventos corporativos.' },
    { title: 'Experiencia Personalizada', price: 'A Tratar por ID', description: 'Sesión privada con pago discreto por Bóveda Mamacitos.' }
  ]
};

const LandingPageCustomizer: React.FC<LandingPageCustomizerProps> = ({
  initialSettings = DEFAULT_SETTINGS,
  profileName,
  profileImage,
  userIdCode,
  onSave
}) => {
  const [settings, setSettings] = useState<LandingPageSettings>(initialSettings);
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewPasscode, setPreviewPasscode] = useState('');
  const [isPreviewUnlocked, setIsPreviewUnlocked] = useState(!settings.requirePassword);
  const [passwordError, setPasswordError] = useState(false);

  const fullShareUrl = `https://mamacitos.com/p/${settings.slug || 'perfil'}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (onSave) onSave(settings);
    alert('¡Configuración de Landing Page guardada exitosamente!');
  };

  const handleUnlockPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewPasscode === settings.accessPassword) {
      setIsPreviewUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="bg-brand-slate rounded-3xl p-6 sm:p-8 border border-brand-pink/40 shadow-2xl space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-brand-pink text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              MAMACITOS LANDING PAGE VIP
            </span>
            <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-bold px-2.5 py-1 rounded-full">
              ★ Función Premium Exclusiva
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading text-white mt-2">
            Tu Web Personal Fuera del Sitio
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Genera un enlace único para promocionar tus servicios en redes o clientes privados con restricciones de privacidad ajustables.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setIsPreviewUnlocked(!settings.requirePassword);
              setPreviewPasscode('');
              setPasswordError(false);
              setShowPreviewModal(true);
            }}
            className="flex-1 md:flex-initial bg-brand-deep-purple hover:bg-opacity-90 text-brand-lime font-bold text-xs py-3 px-5 rounded-xl border border-brand-lime/30 transition-all flex items-center justify-center gap-1.5 shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Vista Previa Externa
          </button>

          <button
            onClick={handleSave}
            className="flex-1 md:flex-initial bg-brand-pink hover:bg-opacity-90 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-lg shadow-brand-pink/20"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Shareable Link Bar */}
      <div className="bg-brand-deep-purple/80 p-5 rounded-2xl border border-brand-purple-light/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-1">
          <label className="block text-xs font-bold text-brand-lime mb-1 uppercase tracking-wider">
            Enlace Personal Compartible (Slug Único)
          </label>
          <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs font-mono text-white">
            <span className="text-gray-500 select-none">mamacitos.com/p/</span>
            <input
              type="text"
              value={settings.slug}
              onChange={(e) => setSettings({ ...settings, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
              className="bg-transparent text-brand-pink font-bold focus:outline-none flex-1 ml-1"
              placeholder="tu-nombre-vip"
            />
          </div>
        </div>

        <button
          onClick={handleCopyUrl}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow ${
            copied ? 'bg-green-600 text-white' : 'bg-brand-pink text-white hover:bg-opacity-90'
          }`}
        >
          {copied ? (
            <>
              ✓ ¡Enlace Copiado!
            </>
          ) : (
            <>
              📋 Copiar Enlace
            </>
          )}
        </button>
      </div>

      {/* Grid Settings: Privacy Controls & Appearance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL 1: PRIVACY & RESTRICTIONS */}
        <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <span className="text-brand-pink font-bold text-lg">🛡️</span>
            <h3 className="text-lg font-heading text-white">Restricciones de Privacidad y Contenido</h3>
          </div>

          {/* Enable Landing Page */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
            <div>
              <span className="text-xs font-bold text-white block">Activar Landing Page Externa</span>
              <span className="text-[11px] text-gray-400">Permite que personas ajenas al sitio accedan a tu enlace.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              className="w-5 h-5 text-brand-pink bg-gray-900 border-gray-700 rounded focus:ring-0"
            />
          </div>

          {/* Password Wall Protection */}
          <div className="p-4 bg-gray-800/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Muro de Acceso con Contraseña / PIN</span>
                <span className="text-[11px] text-gray-400">Los visitantes deben ingresar un código para ver tu contenido completo.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.requirePassword}
                onChange={(e) => setSettings({ ...settings, requirePassword: e.target.checked })}
                className="w-5 h-5 text-brand-pink bg-gray-900 border-gray-700 rounded focus:ring-0"
              />
            </div>

            {settings.requirePassword && (
              <div className="pt-2 animate-fade-in">
                <label className="block text-[11px] font-bold text-brand-lime mb-1">
                  Código de Acceso Privado (PIN):
                </label>
                <input
                  type="text"
                  value={settings.accessPassword || ''}
                  onChange={(e) => setSettings({ ...settings, accessPassword: e.target.value })}
                  className="w-full bg-gray-900 border border-brand-lime/40 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-lime"
                  placeholder="Ej. 777 o VIP2026"
                />
              </div>
            )}
          </div>

          {/* Blur Photos for Non-Authenticated Visitors */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
            <div>
              <span className="text-xs font-bold text-white block">Censurar / Difuminar Fotos para Visitantes Sin PIN</span>
              <span className="text-[11px] text-gray-400">Aplica efecto Blur a las fotos públicas hasta que ingresen la contraseña.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.blurPhotosForGuests}
              onChange={(e) => setSettings({ ...settings, blurPhotosForGuests: e.target.checked })}
              className="w-5 h-5 text-brand-pink bg-gray-900 border-gray-700 rounded focus:ring-0"
            />
          </div>

          {/* Watermark Security */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
            <div>
              <span className="text-xs font-bold text-white block">Marca de Agua "Mamacitos Exclusivo"</span>
              <span className="text-[11px] text-gray-400">Superpone un sello de seguridad anti-captura de pantalla.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.watermarkMedia}
              onChange={(e) => setSettings({ ...settings, watermarkMedia: e.target.checked })}
              className="w-5 h-5 text-brand-pink bg-gray-900 border-gray-700 rounded focus:ring-0"
            />
          </div>

          {/* Hide Phone Number / Require Discreet ID */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
            <div>
              <span className="text-xs font-bold text-white block">Ocultar Teléfono & Usar ID Mamacitos Anónimo</span>
              <span className="text-[11px] text-gray-400">Oculta WhatsApp/Llamadas directas y dirige el pago a tu ID ({userIdCode}).</span>
            </div>
            <input
              type="checkbox"
              checked={!settings.contactMethods.showPhoneToPublic}
              onChange={(e) => setSettings({
                ...settings,
                contactMethods: { ...settings.contactMethods, showPhoneToPublic: !e.target.checked }
              })}
              className="w-5 h-5 text-brand-lime bg-gray-900 border-gray-700 rounded focus:ring-0"
            />
          </div>

        </div>

        {/* PANEL 2: THEME & CONTENT CUSTOMIZATION */}
        <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <span className="text-brand-lime font-bold text-lg">🎨</span>
            <h3 className="text-lg font-heading text-white">Diseño & Contenido de la Landing</h3>
          </div>

          {/* Theme Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2">Tema Estético:</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'pink-glam', label: 'Pink Glam VIP', color: 'border-brand-pink bg-brand-pink/20 text-brand-pink' },
                { id: 'dark-luxury', label: 'Dark Luxury Noir', color: 'border-purple-500 bg-purple-950 text-purple-300' },
                { id: 'cyber-lime', label: 'Cyber Lime Neon', color: 'border-brand-lime bg-brand-lime/20 text-brand-lime' },
                { id: 'minimal-slate', label: 'Minimal Slate Elegance', color: 'border-gray-500 bg-gray-800 text-gray-200' },
              ].map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setSettings({ ...settings, theme: th.id as any })}
                  className={`p-3 rounded-xl text-xs font-bold border-2 text-left transition-all ${
                    settings.theme === th.id ? `${th.color} shadow-lg scale-[1.02]` : 'border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          {/* Headline Title */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Título de Portada:</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-pink"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Subtítulo / Eslogan:</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-pink"
            />
          </div>

          {/* Custom Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Presentación Exclusiva (Bio Externa):</label>
            <textarea
              rows={3}
              value={settings.customBio}
              onChange={(e) => setSettings({ ...settings, customBio: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-pink"
            />
          </div>

        </div>

      </div>

      {/* EXTERNAL VISITOR LIVE PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-brand-slate border-2 border-brand-pink/60 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="text-xs font-mono text-gray-300 ml-2">
                  Simulación de Visitante Externo: mamacitos.com/p/{settings.slug}
                </span>
              </div>

              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-white font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: External Landing View */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* PASSWORD WALL IF PROTECTED */}
              {settings.requirePassword && !isPreviewUnlocked ? (
                <div className="text-center py-12 px-4 space-y-4 bg-gray-900/90 rounded-2xl border border-brand-pink/30">
                  <span className="text-5xl">🔒</span>
                  <h3 className="text-2xl font-heading text-white">Contenido Protegido por Contraseña</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    El titular de este perfil requiere un código de acceso o PIN privado para desbloquear la biografía completa, tarifas y fotos sin censura.
                  </p>

                  <form onSubmit={handleUnlockPreview} className="max-w-xs mx-auto space-y-3 pt-2">
                    <input
                      type="password"
                      value={previewPasscode}
                      onChange={(e) => setPreviewPasscode(e.target.value)}
                      placeholder="Ingresa el PIN de Acceso"
                      className="w-full bg-gray-800 border border-brand-pink rounded-xl py-2.5 px-4 text-center text-white text-sm font-mono focus:outline-none"
                    />
                    {passwordError && (
                      <span className="text-[11px] text-red-400 block font-bold">
                        PIN Incorrecto. (Sugerencia de prueba: {settings.accessPassword})
                      </span>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider"
                    >
                      Desbloquear Perfil
                    </button>
                  </form>
                </div>
              ) : (
                /* UNLOCKED / PUBLIC LANDING VIEW */
                <div className="space-y-6">
                  
                  {/* Hero Header */}
                  <div className="relative rounded-2xl overflow-hidden h-64 border border-gray-700">
                    <img
                      src={profileImage}
                      alt={profileName}
                      className={`w-full h-full object-cover ${
                        settings.blurPhotosForGuests && !isPreviewUnlocked ? 'filter blur-md brightness-75' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Security Watermark */}
                    {settings.watermarkMedia && (
                      <div className="absolute top-3 left-3 bg-black/60 text-brand-pink text-[9px] font-mono px-2 py-1 rounded border border-brand-pink/30">
                        © MAMACITOS VIP SECURITY WATERMARK
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-heading text-white">{settings.title || profileName}</h2>
                          <VerifiedBadge
                            isVerified={true}
                            docType="INE"
                            userIdCode={userIdCode}
                            size="sm"
                            variant="official"
                          />
                        </div>
                        <p className="text-xs text-brand-lime font-bold">{settings.tagline}</p>
                      </div>
                      <span className="bg-black/80 text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-gray-700 shrink-0">
                        ID: {userIdCode}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="bg-gray-900/80 p-5 rounded-2xl border border-gray-800">
                    <h3 className="text-sm font-bold text-brand-pink mb-1">Presentación Exclusiva</h3>
                    <p className="text-xs text-gray-200 leading-relaxed">{settings.customBio}</p>
                  </div>

                  {/* Featured Services Rates */}
                  <div className="bg-gray-900/80 p-5 rounded-2xl border border-gray-800 space-y-3">
                    <h3 className="text-sm font-bold text-brand-lime">Tarifas de Servicios</h3>
                    <div className="space-y-2">
                      {settings.featuredServices.map((srv, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-800/60 p-3 rounded-xl border border-gray-700/50">
                          <div>
                            <strong className="text-xs text-white block">{srv.title}</strong>
                            <span className="text-[11px] text-gray-400">{srv.description}</span>
                          </div>
                          <span className="text-xs font-bold text-brand-lime bg-black/40 px-3 py-1 rounded-lg">
                            {srv.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call To Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => alert(`Iniciando simulación de Pago Discreto por ID: ${userIdCode}`)}
                      className="flex-1 bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-xl text-xs text-center shadow-lg"
                    >
                      💳 Pago Discreto por ID ({userIdCode})
                    </button>
                    <button
                      onClick={() => alert('Abriendo chat privado en Mamacitos...')}
                      className="flex-1 bg-brand-lime text-brand-purple-dark font-bold py-3 px-4 rounded-xl text-xs text-center shadow-lg"
                    >
                      💬 Enviar Mensaje Privado
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-900 p-4 border-t border-gray-800 text-right">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl text-xs"
              >
                Cerrar Vista Previa
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPageCustomizer;

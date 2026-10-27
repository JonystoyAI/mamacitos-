import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Bell, Lock, Sparkles, Filter, RefreshCw, UserCheck, Share2, Link, Search, QrCode, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';
import { ProfileView, ProfileViewPrivacySettings } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';
import EngagementAnalyticsChart from './EngagementAnalyticsChart';
import { useDiscretionMode } from '../../src/utils/discretionMode';

interface ProfileViewsTrackerProps {
  isPremium?: boolean;
  userIdCode?: string;
  userName?: string;
}

const INITIAL_MOCK_VIEWS: ProfileView[] = [
  {
    id: 'view-1',
    viewerUserId: 'MMC-1042',
    viewerName: 'Carlos M.',
    viewerImage: 'https://picsum.photos/seed/user1042/200/200',
    viewerIsVerified: true,
    viewerIsPremium: true,
    viewedAt: 'Hace 4 min',
    viewDuration: '2 min 45s',
    viewSource: 'direct_link',
    isIncognitoView: false
  },
  {
    id: 'view-2',
    viewerUserId: 'MMC-1088',
    viewerName: 'Usuario Incógnito',
    viewerImage: undefined,
    viewerIsVerified: false,
    viewerIsPremium: true,
    viewedAt: 'Hace 18 min',
    viewDuration: '1 min 10s',
    viewSource: 'telegram_share',
    isIncognitoView: true
  },
  {
    id: 'view-3',
    viewerUserId: 'MMC-1015',
    viewerName: 'Alejandro R.',
    viewerImage: 'https://picsum.photos/seed/user1015/200/200',
    viewerIsVerified: true,
    viewerIsPremium: false,
    viewedAt: 'Hace 35 min',
    viewDuration: '4 min 20s',
    viewSource: 'explore_page',
    isIncognitoView: false
  },
  {
    id: 'view-4',
    viewerUserId: 'MMC-1099',
    viewerName: 'Usuario Incógnito',
    viewerImage: undefined,
    viewerIsVerified: false,
    viewerIsPremium: true,
    viewedAt: 'Hace 1 hora',
    viewDuration: '55s',
    viewSource: 'qr_code',
    isIncognitoView: true
  },
  {
    id: 'view-5',
    viewerUserId: 'MMC-1003',
    viewerName: 'Fernando G.',
    viewerImage: 'https://picsum.photos/seed/user1003/200/200',
    viewerIsVerified: true,
    viewerIsPremium: true,
    viewedAt: 'Hace 2 horas',
    viewDuration: '3 min 15s',
    viewSource: 'services_page',
    isIncognitoView: false
  },
  {
    id: 'view-6',
    viewerUserId: 'MMC-1067',
    viewerName: 'Roberto V.',
    viewerImage: 'https://picsum.photos/seed/user1067/200/200',
    viewerIsVerified: false,
    viewerIsPremium: false,
    viewedAt: 'Ayer, 22:40',
    viewDuration: '1 min 30s',
    viewSource: 'direct_link',
    isIncognitoView: false
  }
];

export const ProfileViewsTracker: React.FC<ProfileViewsTrackerProps> = ({
  isPremium: initialIsPremium = true,
  userIdCode = 'MMC-9821',
  userName = 'Valentina'
}) => {
  const { shouldHideActivity, isDiscretionMode } = useDiscretionMode();
  const [isPremium, setIsPremium] = useState<boolean>(initialIsPremium);
  const [views, setViews] = useState<ProfileView[]>(INITIAL_MOCK_VIEWS);
  const [filter, setFilter] = useState<'all' | 'verified' | 'incognito' | 'direct'>('all');
  const [privacySettings, setPrivacySettings] = useState<ProfileViewPrivacySettings>({
    incognitoBrowsing: false,
    hideFromVisitorsList: false,
    notifyOnNewView: true,
    blurVisitorAvatars: false,
    blockIncognitoVisitors: false
  });
  const [isSimulatingIncomingView, setIsSimulatingIncomingView] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const togglePrivacy = (key: keyof ProfileViewPrivacySettings) => {
    if (!isPremium && (key === 'incognitoBrowsing' || key === 'blockIncognitoVisitors')) {
      showToast('⚠️ Activa Mamacitos VIP Premium para desbloquear controles avanzados de privacidad.');
      return;
    }
    setPrivacySettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast(`Ajuste actualizado: ${key} = ${updated[key] ? 'Activado' : 'Desactivado'}`);
      return updated;
    });
  };

  // Simulate new real-time visitor event
  const simulateNewView = () => {
    setIsSimulatingIncomingView(true);
    setTimeout(() => {
      const newNames = ['Javier K.', 'Mauricio T.', 'Cliente VIP #204', 'Usuario Incógnito', 'Gabriel M.'];
      const randomName = newNames[Math.floor(Math.random() * newNames.length)];
      const isIncognito = randomName.includes('Incógnito');
      const sources: ProfileView['viewSource'][] = ['direct_link', 'telegram_share', 'explore_page', 'qr_code'];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];

      const newEntry: ProfileView = {
        id: `view-${Date.now()}`,
        viewerUserId: `MMC-${Math.floor(1000 + Math.random() * 900)}`,
        viewerName: isIncognito ? 'Usuario Incógnito' : randomName,
        viewerImage: isIncognito ? undefined : `https://picsum.photos/seed/${Date.now()}/200/200`,
        viewerIsVerified: !isIncognito && Math.random() > 0.3,
        viewerIsPremium: Math.random() > 0.4,
        viewedAt: 'Ahora mismo',
        viewDuration: '1 min 05s',
        viewSource: randomSource,
        isIncognitoView: isIncognito
      };

      setViews(prev => [newEntry, ...prev]);
      setIsSimulatingIncomingView(false);
      showToast(`🔔 ¡Nueva visita detectada! ${newEntry.viewerName} acaba de ver tu perfil.`);
    }, 800);
  };

  const filteredViews = views.filter(v => {
    if (filter === 'verified') return v.viewerIsVerified;
    if (filter === 'incognito') return v.isIncognitoView;
    if (filter === 'direct') return v.viewSource === 'direct_link' || v.viewSource === 'telegram_share';
    return true;
  });

  const getSourceBadge = (source: ProfileView['viewSource']) => {
    switch (source) {
      case 'direct_link':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Link className="w-3 h-3" /> Enlace Directo</span>;
      case 'telegram_share':
        return <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Share2 className="w-3 h-3" /> Telegram</span>;
      case 'explore_page':
        return <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Search className="w-3 h-3" /> Sección Explorar</span>;
      case 'qr_code':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><QrCode className="w-3 h-3" /> Código QR</span>;
      case 'services_page':
        return <span className="bg-brand-pink/20 text-brand-pink border border-brand-pink/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><UserCheck className="w-3 h-3" /> Servicios</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-black/90 text-white border border-brand-pink/60 px-4 py-3 rounded-2xl shadow-2xl text-xs font-mono flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-slate via-brand-deep-purple to-brand-slate p-6 sm:p-8 rounded-3xl border border-gray-700/80 shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-pink text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              ANALÍTICA DE AUDIENCIA VIP
            </span>
            {isPremium ? (
              <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3 fill-black" /> Membresía VIP Activa
              </span>
            ) : (
              <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-700">
                Pase Básico
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading text-white flex items-center gap-3">
            <Eye className="w-7 h-7 text-brand-pink" />
            ¿Quién ha visto mi perfil?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Rastrea en tiempo real qué clientes y miembros han visitado tu Landing Page privada o portafolio, con filtros de confidencialidad y navegación fantasma.
          </p>

          {shouldHideActivity && (
            <div className="mt-3 bg-emerald-950/60 border border-emerald-500/50 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Modo Discreción Activo:</strong> Tu navegación actual está en modo fantasma; tus visitas no quedarán registradas en perfiles ajenos.</span>
            </div>
          )}
        </div>

        {/* Live Simulation Button & Premium Toggle Test */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={simulateNewView}
            disabled={isSimulatingIncomingView}
            className="bg-brand-pink hover:bg-opacity-90 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingIncomingView ? 'animate-spin' : ''}`} />
            Simular Nueva Visita
          </button>

          <button
            onClick={() => {
              setIsPremium(!isPremium);
              showToast(isPremium ? 'Cambiaste a Modo Gratuito / Básico' : '¡Pase VIP Premium Activado!');
            }}
            className={`text-xs font-extrabold px-4 py-3 rounded-xl transition-all border shrink-0 ${
              isPremium
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 hover:bg-amber-500/30'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:text-white'
            }`}
          >
            {isPremium ? '★ Prueba: Desactivar VIP' : '⚡ Prueba: Activar VIP'}
          </button>
        </div>
      </div>

      {/* Recharts Data Visualization Component: 30-Day Engagement Trends */}
      <EngagementAnalyticsChart userName={userName} userIdCode={userIdCode} />

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-brand-slate p-5 rounded-2xl border border-gray-700/80 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Visitas Hoy</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">184</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +28%
            </span>
          </div>
          <p className="text-[10px] text-gray-400">vs. promedio del día anterior</p>
        </div>

        <div className="bg-brand-slate p-5 rounded-2xl border border-gray-700/80 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Visitantes Únicos</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-brand-pink">126</span>
            <span className="text-xs font-bold text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded-full">
              68.4%
            </span>
          </div>
          <p className="text-[10px] text-gray-400">Usuarios con ID verificado</p>
        </div>

        <div className="bg-brand-slate p-5 rounded-2xl border border-gray-700/80 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Visitas Incógnito</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-purple-400">32</span>
            <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full">
              Modo Fantasma
            </span>
          </div>
          <p className="text-[10px] text-gray-400">Miembros VIP en navegación privada</p>
        </div>

        <div className="bg-brand-slate p-5 rounded-2xl border border-gray-700/80 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Origen Principal</span>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-sky-400 truncate">Telegram Share</span>
            <span className="text-xs font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full">
              45%
            </span>
          </div>
          <p className="text-[10px] text-gray-400">Desde tu Landing Page mamacitos.com/p/{userName.toLowerCase()}</p>
        </div>
      </div>

      {/* PRIVACY & INCOGNITO CONTROL PANEL FOR PREMIUM */}
      <div className="bg-brand-slate rounded-3xl p-6 sm:p-8 border border-gray-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-800 pb-4">
          <div>
            <h3 className="text-xl font-heading text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Ajustes de Privacidad & Navegación Fantasma
            </h3>
            <p className="text-xs text-gray-400">
              Controla qué ven otros miembros cuando visitas sus perfiles y cómo se registra la actividad en tu Landing Page.
            </p>
          </div>

          {!isPremium && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Requiere Pase VIP Premium
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Toggle 1: Incognito Browsing */}
          <div className={`p-4 rounded-2xl border transition-all ${privacySettings.incognitoBrowsing ? 'bg-amber-950/30 border-amber-400/60' : 'bg-gray-900/60 border-gray-800'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-amber-400" />
                  <strong className="text-sm text-white">Navegación Fantasma (Incógnito)</strong>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Visita perfiles y portafolios de otros usuarios sin aparecer en su lista de historial de visitas.
                </p>
              </div>

              <button
                onClick={() => togglePrivacy('incognitoBrowsing')}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${privacySettings.incognitoBrowsing ? 'bg-amber-400' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${privacySettings.incognitoBrowsing ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Toggle 2: Realtime View Alerts */}
          <div className={`p-4 rounded-2xl border transition-all ${privacySettings.notifyOnNewView ? 'bg-brand-deep-purple/60 border-brand-pink/60' : 'bg-gray-900/60 border-gray-800'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand-pink" />
                  <strong className="text-sm text-white">Alertas de Visitas en Tiempo Real</strong>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Notificación instantánea en pantalla cuando un cliente potencial abra tu enlace personal.
                </p>
              </div>

              <button
                onClick={() => togglePrivacy('notifyOnNewView')}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${privacySettings.notifyOnNewView ? 'bg-brand-pink' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${privacySettings.notifyOnNewView ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Toggle 3: Block Incognito Visitors */}
          <div className={`p-4 rounded-2xl border transition-all ${privacySettings.blockIncognitoVisitors ? 'bg-emerald-950/30 border-emerald-400/60' : 'bg-gray-900/60 border-gray-800'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <strong className="text-sm text-white">Exigir Identidad Verificada</strong>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Oculta la vista previa de tus tarifas y fotos privadas si el visitante está en modo anónimo sin sesión iniciada.
                </p>
              </div>

              <button
                onClick={() => togglePrivacy('blockIncognitoVisitors')}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${privacySettings.blockIncognitoVisitors ? 'bg-emerald-400' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${privacySettings.blockIncognitoVisitors ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Toggle 4: Hide My Profile from Others' Lists */}
          <div className={`p-4 rounded-2xl border transition-all ${privacySettings.hideFromVisitorsList ? 'bg-purple-950/30 border-purple-400/60' : 'bg-gray-900/60 border-gray-800'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-purple-400" />
                  <strong className="text-sm text-white">Ocultar mi ID en Registros Externos</strong>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Reemplaza tu nombre por "Usuario Verificado" cuando explores perfiles de otros prestadores o clientes.
                </p>
              </div>

              <button
                onClick={() => togglePrivacy('hideFromVisitorsList')}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${privacySettings.hideFromVisitorsList ? 'bg-purple-400' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${privacySettings.hideFromVisitorsList ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* VISITOR LOG LIST */}
      <div className="bg-brand-slate rounded-3xl p-6 sm:p-8 border border-gray-700/80 shadow-2xl space-y-6">
        
        {/* List Controls Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
          <div>
            <h3 className="text-xl font-heading text-white">Historial Reciente de Visitantes</h3>
            <p className="text-xs text-gray-400">
              {filteredViews.length} registro(s) mostrados
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'all' ? 'bg-brand-pink text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              Todos ({views.length})
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'verified' ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              Verificados
            </button>
            <button
              onClick={() => setFilter('incognito')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'incognito' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              Incógnito
            </button>
            <button
              onClick={() => setFilter('direct')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'direct' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              Por Enlace Directo
            </button>
          </div>
        </div>

        {/* Visitor Items */}
        <div className="space-y-3">
          {filteredViews.map(view => (
            <div
              key={view.id}
              className="bg-gray-900/80 hover:bg-gray-900 p-4 rounded-2xl border border-gray-800/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                {/* Avatar / Placeholder */}
                {view.isIncognitoView ? (
                  <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 shadow-lg">
                    <EyeOff className="w-6 h-6" />
                  </div>
                ) : (
                  <img
                    src={view.viewerImage || 'https://picsum.photos/seed/user/200/200'}
                    alt={view.viewerName}
                    className="w-12 h-12 rounded-2xl object-cover border border-gray-700 shrink-0 shadow-md"
                  />
                )}

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-sm text-white font-bold">{view.viewerName}</strong>
                    
                    {!view.isIncognitoView && view.viewerIsVerified && (
                      <VerifiedBadge
                        isVerified={true}
                        docType="INE"
                        userIdCode={view.viewerUserId}
                        size="sm"
                        variant="subtle"
                        showLabel={false}
                      />
                    )}

                    {view.viewerIsPremium && (
                      <span className="bg-amber-400/20 text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-amber-400/30">
                        ★ VIP
                      </span>
                    )}

                    {getSourceBadge(view.viewSource)}
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400 font-mono">
                    <span>ID: {view.viewerUserId}</span>
                    <span>•</span>
                    <span>Duración: {view.viewDuration}</span>
                  </div>
                </div>
              </div>

              {/* Timestamp & Action */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs text-gray-400 font-mono">
                  {view.viewedAt}
                </span>

                {!view.isIncognitoView && (
                  <button
                    onClick={() => showToast(`Iniciando chat directo con ${view.viewerName} (${view.viewerUserId})`)}
                    className="bg-brand-pink/20 hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  >
                    Contactar
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredViews.length === 0 && (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <Info className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-xs font-mono">No hay registros de visitas que coincidan con este filtro.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ProfileViewsTracker;

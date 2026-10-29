import React, { useState } from 'react';
import { Profile, ProfileReel, ProfileShowcaseVideo } from '../../types';
import SiteIcon from '../common/SiteIcon';
import VerifiedBadge from '../common/VerifiedBadge';
import AiVerifiedBadge from '../common/AiVerifiedBadge';
import DirectMessagingModal from '../common/DirectMessagingModal';
import ReportProfileModal from './ReportProfileModal';
import PrivateVaultSection from './PrivateVaultSection';
import SupportCreatorModal from './SupportCreatorModal';
import { useFavorites } from '../../src/utils/favorites';
import { useDiscretionMode } from '../../src/utils/discretionMode';
import { 
  Heart, 
  Share2, 
  ArrowLeft, 
  Play, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Volume2,
  Eye,
  EyeOff,
  Flag,
  Crown
} from 'lucide-react';

interface EditorialProfileViewProps {
  profile?: Profile;
  onBack: () => void;
  onNavigateToBlog?: () => void;
}

// Fallback mock profile matching the exact reference image "HOLA SOY GRACE"
const DEFAULT_EDITORIAL_PROFILE: Profile = {
  id: 999,
  userIdCode: 'MMC-7701',
  name: 'Grace',
  age: 24,
  location: 'Querétaro, Qro.',
  state: 'Querétaro',
  municipality: 'Querétaro',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  isProvider: true,
  bio: 'Acompañante de alta gama, modelo y creadora. Experiencias exclusivas, elegancia atemporal y discreción absoluta.',
  profileType: 'sex_worker',
  userType: 'Mujer Trans',
  seeking: 'Encuentro casual / Trato de novios',
  gender: 'Mujer Trans',
  role: 'Versátil Pasiva',
  lookingFor: ['Soy Escort / Scort', 'Trato de novios (GFE)', 'Discreción absoluta'],
  logistics: ['Con lugar propio', 'Motel / Hotel'],
  safetyPractices: ['Solo con condón', 'Pruebas de salud al día', 'No drogas (Cero sustancias)'],
  sexualPreferences: ['Oral apasionado', 'Lencería y tacones', 'Masajes eróticos', 'Morbo / Dirty talk'],
  bodyType: 'Delgada / Slim',
  heightCategory: 'Media (1.68 m)',
  hairColor: 'Negro',
  eyeColor: 'Cafés / Castaños',
  physicalFeatures: ['Depilación total', 'Tatuajes discretos'],
  isVerified: true,
  verificationDoc: 'Pasaporte',
  rating: 4.9,
  reviewsCount: 38,
  onlineStatus: 'online',
  topPosition: true,
  isPremium: true,
  whatsappNumber: '+524421234567',
  editorialHeadline: 'HOLA SOY GRACE',
  editorialBioParagraph: 'Bienvenido a mi espacio privado. Te ofrezco una compañía sofisticada, cálida y sin tabúes, diseñada para desconectar del ritmo acelerado y disfrutar de una intimidad genuina y de máxima discreción.',
  editorialLocationHeadline: 'Vivo en Querétaro',
  editorialDetailedBio: 'Resido en una zona residencial exclusiva y de alta seguridad en Querétaro con departamento privado, ambientado para tu comodidad. Cuento con total disponibilidad para cenas, viajes o momentos íntimos donde la complicidad y el trato delicado son la regla. La higiene impecable y el respeto mutuo son la base de cada encuentro.',
  editorialClosingText: 'Para consultas y reservaciones previas, puedes iniciar una conversación segura por chat directo o enviar un mensaje por WhatsApp. Los acuerdos y requerimientos se confirman con total confidencialidad.',
  showcaseVideos: [
    {
      id: 'vid-1',
      title: 'Sesión Black & White Estudio',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      duration: '0:45'
    },
    {
      id: 'vid-2',
      title: 'Backstage Pasarela & Lookbook',
      thumbnailUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      duration: '1:12'
    },
    {
      id: 'vid-3',
      title: 'Vlog Privado & Estilo de Vida',
      thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      duration: '0:58'
    }
  ],
  editorialGallery: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80'
  ],
  reels: [
    {
      id: 'reel-1',
      title: 'Morning Routine & Glam',
      posterUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      duration: '0:30',
      views: 1420
    },
    {
      id: 'reel-2',
      title: 'Sesión Nocturna Querétaro',
      posterUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
      duration: '0:42',
      views: 2150
    }
  ]
};

const EditorialProfileView: React.FC<EditorialProfileViewProps> = ({
  profile = DEFAULT_EDITORIAL_PROFILE,
  onBack,
  onNavigateToBlog
}) => {
  const currentProfile = profile || DEFAULT_EDITORIAL_PROFILE;
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(currentProfile.id);
  const { shouldBlurMedia, shouldHideActivity, isDiscretionMode } = useDiscretionMode();
  const [tempReveal, setTempReveal] = useState(false);
  
  // Censorship filter for primary photos: 'censored' (artistic blur) | 'discreet' (full blur for public spaces) | 'uncensored' (original)
  const [censorshipFilter, setCensorshipFilter] = useState<'censored' | 'discreet' | 'uncensored'>('censored');

  const getFilterClass = () => {
    if (censorshipFilter === 'discreet' || (shouldBlurMedia && !tempReveal)) {
      return 'blur-xl brightness-75';
    }
    if (censorshipFilter === 'censored') {
      return 'blur-sm brightness-95';
    }
    return 'blur-none brightness-100';
  };
  const isBlurred = getFilterClass() !== 'blur-none brightness-100';

  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; url: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Gallery images (fallback to default 9 if not provided)
  const gallery = currentProfile.editorialGallery && currentProfile.editorialGallery.length === 9
    ? currentProfile.editorialGallery
    : DEFAULT_EDITORIAL_PROFILE.editorialGallery!;

  // Showcase videos (fallback to default 3)
  const showcaseVideos = currentProfile.showcaseVideos && currentProfile.showcaseVideos.length > 0
    ? currentProfile.showcaseVideos
    : DEFAULT_EDITORIAL_PROFILE.showcaseVideos!;

  // Reels (fallback to default 2)
  const reels = currentProfile.reels && currentProfile.reels.length > 0
    ? currentProfile.reels
    : DEFAULT_EDITORIAL_PROFILE.reels!;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppClick = () => {
    const phone = currentProfile.whatsappNumber || '524421234567';
    const message = encodeURIComponent(`Hola ${currentProfile.name}, vi tu perfil editorial en Mamacitos y me gustaría solicitar información con discreción.`);
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % gallery.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neutral-800 selection:text-white">
      
      {/* 1. Header Bar matching reference image */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-neutral-900 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver a Explorar</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleFavorite(currentProfile)}
              className={`p-2 rounded-full border transition-colors ${
                favorited
                  ? 'bg-rose-950/80 border-rose-600 text-rose-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
              title={favorited ? 'En favoritos' : 'Guardar en favoritos'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Compartir perfil"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Quick Support Creator button in header if premium */}
            {currentProfile.isPremium && (
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold transition-all shadow-sm"
                title="Apoyar a la creadora con una propina digital directa"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Apoyar</span>
              </button>
            )}

            {/* Discreet Report Profile Flag */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              title="Reportar cuenta sospechosa de manera discreta"
            >
              <Flag className="w-4 h-4" />
            </button>

            {isDiscretionMode && (
              <button
                onClick={() => setTempReveal(!tempReveal)}
                className="text-xs font-semibold px-2.5 py-1 rounded-md border border-amber-400/40 text-amber-300 bg-neutral-900 hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                title={tempReveal ? 'Volver a desenfocar imágenes' : 'Revelar imágenes temporalmente'}
              >
                {tempReveal ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{tempReveal ? 'Desenfocar' : 'Revelar'}</span>
              </button>
            )}

            {/* Presence Indicator with Site Icon */}
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
              <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${shouldHideActivity ? 'bg-purple-400' : 'bg-emerald-400 animate-pulse'}`}></span>
                {shouldHideActivity ? 'INCÓGNITO' : 'ON LINE'}
              </span>
              <SiteIcon size="sm" alt="Mamacitos Icon" />
            </div>
          </div>
        </div>
      </header>

      {copiedLink && (
        <div className="fixed top-16 right-6 z-50 bg-neutral-900 border border-neutral-700 text-xs text-white px-3 py-1.5 rounded-lg shadow-2xl flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>¡Enlace copiado al portapapeles!</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
        
        {/* 2. Hero Section: Left typography & action buttons, Right overlapping high-fashion portraits */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-wider font-light text-white uppercase leading-none">
                {currentProfile.editorialHeadline || `HOLA SOY ${currentProfile.name.toUpperCase()}`}
              </h1>

              <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                {currentProfile.editorialBioParagraph || currentProfile.bio || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.'}
              </p>
            </div>

            {/* Direct action buttons: whatsapp & chat directo (exact design from image) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-[#00bcd4] via-[#26a69a] to-[#ff9800] text-neutral-950 font-mono font-bold text-xs uppercase px-4 py-2 rounded-sm shadow-md hover:opacity-95 transition-all transform active:scale-95 flex items-center gap-1.5"
              >
                <span>whatsapp</span>
              </button>

              {/* Chat Directo Button */}
              <button
                onClick={() => setIsMessagingOpen(true)}
                className="bg-white text-neutral-950 font-mono font-medium text-xs px-4 py-2 rounded-sm shadow-md hover:bg-neutral-200 transition-all transform active:scale-95 flex items-center gap-1.5"
              >
                <span>chat directo</span>
              </button>

              {/* Support the creator button (Available exclusively for premium profiles) */}
              {currentProfile.isPremium ? (
                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-mono font-bold text-xs uppercase px-4 py-2 rounded-sm shadow-md transition-all transform active:scale-95 flex items-center gap-1.5 shadow-amber-500/10"
                  title="Enviar propina digital o microtransacción directa para apoyar a la creadora"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Apoyar Creadora</span>
                </button>
              ) : (
                <div 
                  className="text-[11px] font-mono text-neutral-500 border border-neutral-800 px-3 py-1.5 rounded-sm flex items-center gap-1.5 bg-neutral-900/50"
                  title="Propinas digitales exclusivas para perfiles con Membresía Premium"
                >
                  <Sparkles className="w-3 h-3 text-neutral-600" />
                  <span>Propinas: Solo Plan Premium</span>
                </div>
              )}
            </div>

            {/* Subtle profile attributes bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-neutral-400">
              {currentProfile.isPremium && (
                <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded text-amber-300 font-mono font-semibold">
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>Creadora Premium VIP</span>
                </span>
              )}
              <span className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>{currentProfile.location}</span>
              </span>
              {currentProfile.gender && (
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-neutral-300">
                  {currentProfile.gender}
                </span>
              )}
              {currentProfile.role && (
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-amber-300">
                  Rol: {currentProfile.role}
                </span>
              )}
              {(currentProfile.isVerified || currentProfile.isAiVerified) && (
                <AiVerifiedBadge
                  size="md"
                  variant="badge"
                  score={currentProfile.aiVerificationScore || 99.4}
                  userIdCode={currentProfile.userIdCode}
                  docType={currentProfile.verificationDoc || 'INE'}
                  verifiedAt={currentProfile.aiVerifiedDate || '2026-10-15'}
                />
              )}
            </div>
          </div>

          {/* Right Hero Portraits Collage (Matching the monochrome high-contrast composition from the screenshot) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-[340px] sm:h-[400px]">
              {/* Secondary background portrait */}
              <img
                src={gallery[0]}
                alt="Portrait Left"
                className={`absolute left-0 top-6 w-52 sm:w-60 h-72 sm:h-80 object-cover rounded-sm filter grayscale contrast-125 opacity-80 transition-all duration-300 ${isBlurred ? 'blur-lg' : ''}`}
              />
              {/* Primary foreground portrait */}
              <img
                src={gallery[1]}
                alt="Portrait Right"
                className={`absolute right-2 top-0 w-56 sm:w-64 h-80 sm:h-96 object-cover rounded-sm filter contrast-110 shadow-2xl z-10 transition-all duration-300 ${isBlurred ? 'blur-lg' : ''}`}
              />
              {/* Ambient radial fade to seamlessly blend with black */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-15 pointer-events-none"></div>
            </div>
          </div>

        </section>

        {/* 3. Horizontal Showcase Video Strip (3 wide preview cards with central play button ▶) */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {showcaseVideos.map((video, idx) => (
              <div
                key={video.id || idx}
                onClick={() => setActiveVideoModal({ title: video.title, url: video.thumbnailUrl })}
                className="group relative cursor-pointer aspect-video bg-neutral-900 overflow-hidden rounded-sm border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 ${isBlurred ? 'blur-lg' : ''}`}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>

                {/* Central Play Button matching screenshot icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Title & Duration Overlay */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-mono">
                  <span className="truncate pr-2">{video.title}</span>
                  <span className="bg-black/70 px-1.5 py-0.5 rounded text-[10px]">{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Secondary Narrative Section ("Vivo en Querétaro") */}
        <section className="text-center max-w-3xl mx-auto space-y-4 py-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-wide text-white">
            {currentProfile.editorialLocationHeadline || `Vivo en ${currentProfile.state || currentProfile.location || 'Querétaro'}`}
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
            {currentProfile.editorialDetailedBio || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui.'}
          </p>

          {/* Physical traits & logistics chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {currentProfile.bodyType && (
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded">
                Complexión: {currentProfile.bodyType}
              </span>
            )}
            {currentProfile.heightCategory && (
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded">
                Estatura: {currentProfile.heightCategory}
              </span>
            )}
            {currentProfile.hairColor && (
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded">
                Cabello: {currentProfile.hairColor}
              </span>
            )}
            {currentProfile.logistics?.map((item, idx) => (
              <span key={idx} className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded">
                📍 {item}
              </span>
            ))}
          </div>
        </section>

        {/* 5. Censorship Filter Bar for Primary Photos */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-neutral-950 border border-neutral-800 rounded-xl p-3 px-4 shadow-md">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-mono font-bold text-white block">
                Filtro de Censura para Fotos Principales
              </span>
              <span className="text-[10px] text-neutral-400">
                Ajusta la visibilidad de la galería pública según tu entorno
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-lg text-xs font-mono">
            <button
              onClick={() => setCensorshipFilter('censored')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                censorshipFilter === 'censored'
                  ? 'bg-neutral-800 text-amber-300 font-bold border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Censura artística suave"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Censura Artística</span>
            </button>

            <button
              onClick={() => setCensorshipFilter('discreet')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                censorshipFilter === 'discreet'
                  ? 'bg-neutral-800 text-purple-300 font-bold border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Desenfoque total para transporte o lugares públicos"
            >
              <EyeOff className="w-3.5 h-3.5 text-purple-400" />
              <span>Discreción Total</span>
            </button>

            <button
              onClick={() => setCensorshipFilter('uncensored')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                censorshipFilter === 'uncensored'
                  ? 'bg-neutral-800 text-emerald-300 font-bold border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Fotos originales completas"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sin Censura</span>
            </button>
          </div>
        </div>

        {/* Visual Grid (3x3 Photo Collage) & Vertical Reels Section (Exact layout from reference) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: 3x3 Photo Grid (9 Photos) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white p-2.5 sm:p-3 rounded-sm shadow-2xl">
              {gallery.map((photoUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="group relative cursor-pointer aspect-square overflow-hidden bg-neutral-200"
                >
                  <img
                    src={photoUrl}
                    alt={`Editorial Photo ${idx + 1}`}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 filter contrast-105 ${getFilterClass()}`}
                    loading="lazy"
                  />
                  {censorshipFilter === 'censored' && (
                    <div className="absolute top-1.5 left-1.5 bg-black/75 backdrop-blur-sm border border-neutral-700/80 text-[8px] font-mono text-neutral-300 px-1.5 py-0.5 rounded pointer-events-none">
                      Censura Artística
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-neutral-500 text-center mt-2 font-mono">
              ★ Haz clic en cualquier imagen para abrir la galería en alta resolución
            </p>
          </div>

          {/* Right: 2 Vertical Tall Cards: "REEL (IMAGEN O VIDEO)" */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {reels.map((reel, idx) => (
              <div
                key={reel.id || idx}
                onClick={() => setActiveVideoModal({ title: reel.title, url: reel.posterUrl })}
                className="group relative cursor-pointer aspect-[9/16] bg-white text-neutral-950 overflow-hidden rounded-sm shadow-2xl flex flex-col justify-between p-4 sm:p-6 hover:shadow-neutral-800 transition-all"
              >
                {/* Background Image / Poster */}
                <img
                  src={reel.posterUrl}
                  alt={reel.title}
                  className={`absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-500 filter contrast-110 ${isBlurred ? 'blur-md' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between text-white text-[10px] font-mono">
                  <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">REEL {idx + 1}</span>
                  <span className="flex items-center gap-1"><Volume2 className="w-3 h-3" /> AUDIO</span>
                </div>

                {/* Central Serif Typography matching screenshot: "REEL (IMAGEN O VIDEO)" */}
                <div className="relative z-10 text-center text-white my-auto space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-serif tracking-widest uppercase leading-tight font-light drop-shadow-md">
                    REEL
                  </h3>
                  <p className="text-[11px] sm:text-xs font-serif italic text-neutral-200 tracking-wider">
                    (IMAGEN O VIDEO)
                  </p>

                  <div className="pt-3">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-950 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom title */}
                <div className="relative z-10 text-white text-xs font-mono truncate">
                  {reel.title}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 6. Private Vault Section (Exclusive Photos & 4K Videos with Provider Code Generator & Direct Monetization) */}
        <PrivateVaultSection
          profile={currentProfile}
          onOpenDirectChat={() => setIsMessagingOpen(true)}
          onOpenWhatsApp={handleWhatsAppClick}
        />

        {/* 7. Bottom Narrative & Social Section (Matching the footer in reference image) */}
        <section className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Bottom Left: Official Updated Mamacitos Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/loco-sitio-mamacitos_aa765503.png"
              alt="Mamacitos Logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>

          {/* Bottom Center / Right: Closing text & Social Icons */}
          <div className="space-y-4 text-center md:text-right max-w-lg">
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              {currentProfile.editorialClosingText || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.'}
            </p>

            {/* Social Icons row (Facebook, YouTube, Twitter/X, LinkedIn/Instagram) */}
            <div className="flex items-center justify-center md:justify-end gap-3 text-neutral-400">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center text-xs hover:text-white hover:border-white transition-colors"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center text-xs hover:text-white hover:border-white transition-colors"
                title="YouTube"
              >
                ▶
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center text-xs hover:text-white hover:border-white transition-colors"
                title="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center text-xs hover:text-white hover:border-white transition-colors"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Trust & Community Safety discreet report banner */}
          <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-950/70 border border-neutral-900/80 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-300">
                  Compromiso de Seguridad & Verificación Comunitaria
                </p>
                <p className="text-[11px] text-neutral-500">
                  ¿Detectaste suplantación, contenido no consentido o anomalías? Sistema con auditoría confidencial y protección anti-sabotaje.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 text-xs font-mono transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Flag className="w-3.5 h-3.5 text-amber-400" />
              <span>Reportar / Ver Protocolo</span>
            </button>
          </div>

        </section>

      </div>

      {/* Lightbox Modal for 3x3 Gallery */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col items-center">
            <img
              src={gallery[lightboxIndex]}
              alt={`Gallery Full ${lightboxIndex + 1}`}
              className="max-h-[80vh] w-auto object-contain rounded shadow-2xl"
            />
            <span className="text-xs text-neutral-400 mt-2 font-mono">
              Foto {lightboxIndex + 1} de {gallery.length} • {currentProfile.name}
            </span>
          </div>
        </div>
      )}

      {/* Video / Reel Player Lightbox */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-4 space-y-3 relative shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-current" />
                <span>{activeVideoModal.title}</span>
              </h4>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-neutral-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={activeVideoModal.url}
                alt="Video Preview"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-white text-neutral-950 flex items-center justify-center mx-auto shadow-2xl">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-xs text-neutral-300 font-mono block">
                    Reproductor Seguro Mamacitos (Streaming Privado)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-neutral-400 pt-1">
              <span>Resolución: 1080p Ultra HD</span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs"
              >
                Cerrar Reproductor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Messaging Voice/Text Modal */}
      <DirectMessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        recipientName={currentProfile.name}
        recipientAvatar={currentProfile.image}
        recipientCode={currentProfile.userIdCode}
      />

      {/* Discreet Profile Reporting & Anti-Sabotage Review Modal */}
      <ReportProfileModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        profile={currentProfile}
      />

      {/* Support the Creator & Digital Tips Microtransaction Modal */}
      <SupportCreatorModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        profile={currentProfile}
      />

    </div>
  );
};

export default EditorialProfileView;


import React, { useState } from 'react';
import PortfolioAssistant from '../ai/PortfolioAssistant';
import LandingPageCustomizer from '../profile/LandingPageCustomizer';
import ProfileViewsTracker from '../profile/ProfileViewsTracker';
import AnonymousReviewManager from '../profile/AnonymousReviewManager';
import MyFavoritesSection from '../profile/MyFavoritesSection';
import VerifiedBadge from '../common/VerifiedBadge';
import { useFavorites } from '../../src/utils/favorites';
import ProviderPhotoGallery, { GalleryImage } from '../profile/ProviderPhotoGallery';
import BloggerManager from '../profile/BloggerManager';
import EditorialProfileView from '../profile/EditorialProfileView';
import { PenTool, ExternalLink, Sparkles } from 'lucide-react';
import { Page } from '../../types';

type Template = 'classic' | 'modern' | 'vibrant';
type Visibility = 'public' | 'members' | 'private';

const ProfilePage: React.FC<{ onNavigate?: (page: Page) => void }> = ({ onNavigate }) => {
    // Mock data for a provider profile
    const provider = {
        name: 'Valentina',
        username: 'valentina-premium',
        userIdCode: 'MMC-9821',
        age: 28,
        location: 'Ciudad de México',
        profileImage: 'https://picsum.photos/seed/profile/1200/800',
        gallery: [
            { id: 1, url: 'https://picsum.photos/seed/gallery1/800/600', title: 'Cena de Gala', category: 'Acompañante' },
            { id: 2, url: 'https://picsum.photos/seed/gallery2/800/600', title: 'Relax Total', category: 'Relajación' },
            { id: 3, url: 'https://picsum.photos/seed/gallery3/800/600', title: 'Sesión Fotográfica', category: 'Modelaje' },
            { id: 4, url: 'https://picsum.photos/seed/gallery4/800/600', title: 'Evento Social', category: 'Acompañante' },
            { id: 5, url: 'https://picsum.photos/seed/gallery5/800/600', title: 'Masaje VIP', category: 'Relajación' },
            { id: 6, url: 'https://picsum.photos/seed/gallery6/800/600', title: 'Discreción Absoluta', category: 'Exclusivo' },
        ] as GalleryImage[],
        aboutMe: "Soy una artista del alma y el cuerpo, apasionada por crear experiencias memorables y conexiones profundas. Mi enfoque es la elegancia, la discreción y una compañía que te hará olvidar el mundo exterior. Me encanta el cine clásico, la gastronomía y las conversaciones que fluyen hasta el amanecer.",
        services: [
            { name: "Cena y Conversación", description: "Una velada encantadora en el restaurante de tu elección, llena de risas y diálogo estimulante." },
            { name: "Acompañante de Eventos", description: "La compañia perfecta y sofisticada para tus eventos sociales o de negocios." },
            { name: "Experiencia de Relajación", description: "Sesiones de masaje y relajación para aliviar el estrés y reconectar contigo mismo." },
        ],
    };

    const [activeTab, setActiveTab] = useState<'landing_customizer' | 'profile_views' | 'reviews' | 'favorites' | 'blogger' | 'portfolio_view'>('landing_customizer');
    const [showEditorialPreview, setShowEditorialPreview] = useState(false);
    const { count: favoritesCount } = useFavorites();
    const [isVerified, setIsVerified] = useState<boolean>(true); // Verification state toggle for testing
    const [template, setTemplate] = useState<Template>('classic');
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [isAIAssistantOpen, setAIAssistantOpen] = useState(false);

    const baseSectionClass = "p-6 rounded-lg transition-colors duration-500";
    const templateStyles = {
        classic: {
            bg: 'bg-brand-slate',
            sectionBg: 'bg-brand-deep-purple/50',
            headingColor: 'text-brand-pink',
            buttonClass: 'bg-brand-pink hover:bg-opacity-80'
        },
        modern: {
            bg: 'bg-gray-900',
            sectionBg: 'bg-gray-800/50',
            headingColor: 'text-gray-200',
            buttonClass: 'bg-gray-600 hover:bg-gray-500'
        },
        vibrant: {
            bg: 'bg-brand-deep-purple',
            sectionBg: 'bg-brand-slate/80',
            headingColor: 'text-brand-lime',
            buttonClass: 'bg-brand-lime hover:bg-opacity-80 text-brand-deep-purple'
        }
    };
    
    const currentStyle = templateStyles[template];
    
    const VisibilityOption: React.FC<{
        level: Visibility;
        title: string;
        description: string;
        icon: React.ReactNode;
    }> = ({ level, title, description, icon }) => {
        const isActive = visibility === level;
        return (
            <button
                onClick={() => setVisibility(level)}
                className={`p-4 rounded-lg text-left transition-all duration-300 border-2 ${
                    isActive
                        ? 'bg-brand-deep-purple/70 border-brand-pink scale-105'
                        : 'bg-brand-slate/50 border-transparent hover:bg-brand-slate/80'
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isActive ? 'bg-brand-pink' : 'bg-gray-600'}`}>
                        {icon}
                    </div>
                    <h3 className="font-bold text-white">{title}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-2">{description}</p>
            </button>
        );
    };

    return (
        <div className={`${currentStyle.bg} min-h-screen py-8`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Mode Selector Tabs */}
                <div className="bg-brand-slate p-2 rounded-2xl border border-gray-700/80 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto shadow-xl">
                  <button
                    onClick={() => setActiveTab('landing_customizer')}
                    className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'landing_customizer'
                        ? 'bg-brand-pink text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>🌐</span>
                    <span>Landing VIP</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile_views')}
                    className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'profile_views'
                        ? 'bg-brand-pink text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>👁</span>
                    <span>¿Quién me vio?</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'reviews'
                        ? 'bg-brand-pink text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>⭐</span>
                    <span>Reseñas Anónimas</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 relative ${
                      activeTab === 'favorites'
                        ? 'bg-brand-pink text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>❤️</span>
                    <span>Mis Favoritos</span>
                    {favoritesCount > 0 && (
                      <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                        {favoritesCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('blogger')}
                    className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'blogger'
                        ? 'bg-amber-400 text-neutral-950 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>✍️</span>
                    <span>Modo Blogger VIP</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('portfolio_view')}
                    className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'portfolio_view'
                        ? 'bg-brand-pink text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>👤</span>
                    <span>Editar Portafolio</span>
                  </button>
                </div>

                {/* Editorial Profile Preview Quick Launcher Button */}
                <div className="flex justify-center max-w-3xl mx-auto">
                  <button
                    onClick={() => setShowEditorialPreview(true)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-400/50 text-xs font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Ver Mi Perfil Editorial (Diseño Grace) ➔</span>
                  </button>
                </div>

                {/* Quick Verification State Test Bar */}
                <div className="flex justify-end items-center gap-2 max-w-3xl mx-auto">
                  <span className="text-[11px] text-gray-400 font-mono">Estado de Prueba Proveedor:</span>
                  <button
                    onClick={() => setIsVerified(!isVerified)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                      isVerified
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {isVerified ? '✓ Cuenta Verificada (INE)' : '🔒 Cuenta Sin Verificar'}
                  </button>
                </div>

                {/* TAB 1: LANDING PAGE GENERATOR & CUSTOMIZER */}
                {activeTab === 'landing_customizer' ? (
                  <LandingPageCustomizer
                    profileName={provider.name}
                    profileImage={provider.profileImage}
                    userIdCode={provider.userIdCode}
                  />
                ) : activeTab === 'profile_views' ? (
                  /* TAB 2: PROFILE VIEWS TRACKER & PRIVACY */
                  <ProfileViewsTracker
                    isPremium={true}
                    userIdCode={provider.userIdCode}
                    userName={provider.name}
                  />
                ) : activeTab === 'reviews' ? (
                  /* TAB 3: ANONYMOUS REVIEWS & REPUTATION MANAGEMENT */
                  <AnonymousReviewManager
                    providerId={101}
                    providerName={provider.name}
                    isVerified={isVerified}
                    userIdCode={provider.userIdCode}
                    isOwnerView={true}
                  />
                ) : activeTab === 'favorites' ? (
                  /* TAB 4: MY FAVORITES & SAVED PROFILES SECTION */
                  <MyFavoritesSection />
                ) : activeTab === 'blogger' ? (
                  /* TAB 5: BLOGGER VIP & ARTICLE MANAGEMENT */
                  <BloggerManager
                    isPremium={true}
                    userIdCode={provider.userIdCode}
                    userName={provider.name}
                    onNavigateToBlog={() => onNavigate?.('blog')}
                  />
                ) : (
                  /* TAB 5: PORTFOLIO VIEW & STYLES */
                  <div className="space-y-8">
                    {/* Portfolio Customization Panel */}
                    <div className="bg-black/30 p-4 rounded-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-white">Personaliza tu Portafolio</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 hidden sm:block">Estilos:</span>
                            <button onClick={() => setTemplate('classic')} className={`px-3 py-1 text-xs rounded-full ${template === 'classic' ? 'bg-brand-pink text-white' : 'bg-gray-600'}`}>Clásico</button>
                            <button onClick={() => setTemplate('modern')} className={`px-3 py-1 text-xs rounded-full ${template === 'modern' ? 'bg-brand-pink text-white' : 'bg-gray-600'}`}>Moderno</button>
                            <button onClick={() => setTemplate('vibrant')} className={`px-3 py-1 text-xs rounded-full ${template === 'vibrant' ? 'bg-brand-pink text-white' : 'bg-gray-600'}`}>Vibrante</button>
                            <button onClick={() => setAIAssistantOpen(true)} className="ml-4 bg-brand-lime text-brand-deep-purple font-bold text-xs py-1 px-3 rounded-full flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                                Asistente AI
                            </button>
                        </div>
                    </div>

                    {/* Visibility Control Panel */}
                    <div className="bg-black/30 p-4 rounded-lg mb-8">
                        <h2 className="text-lg font-bold text-white mb-4 text-center sm:text-left">Visibilidad del Perfil</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <VisibilityOption
                                level="public"
                                title="Público"
                                description="Tu perfil será visible para todos en internet a través de tu enlace público."
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935m-16.945 7.055A10 10 0 0112 3c2.959 0 5.655 1.259 7.645 3.288m-15.29 0A10.001 10.001 0 0112 21c2.959 0 5.655-1.259 7.645-3.288" /></svg>}
                            />
                            <VisibilityOption
                                level="members"
                                title="Solo Miembros"
                                description="Tu perfil solo será visible para usuarios registrados en Mamacitos."
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            />
                            <VisibilityOption
                                level="private"
                                title="Privado"
                                description="Tu perfil no será visible en búsquedas y solo tú podrás compartirlo."
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                            />
                        </div>
                    </div>

                    {/* Profile Header */}
                    <div className="relative rounded-lg overflow-hidden h-96">
                        <img src={provider.profileImage} alt={provider.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-5xl font-heading">{provider.name}</h1>
                                <VerifiedBadge
                                  isVerified={true}
                                  docType="INE"
                                  userIdCode={provider.userIdCode}
                                  size="lg"
                                  variant="official"
                                />
                            </div>
                            <p className="text-lg text-gray-300">@{provider.username} • {provider.userIdCode}</p>
                            <p className="text-md text-gray-400">{provider.location}</p>
                        </div>
                         <div className="absolute top-4 right-4 text-sm text-gray-300 bg-black/60 px-3.5 py-1.5 rounded-full border border-gray-700">
                            <span className="font-mono">mamacitos.com/p/{provider.username}</span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column (About & Services) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Me */}
                            <div className={`${baseSectionClass} ${currentStyle.sectionBg}`}>
                                <h2 className={`text-3xl font-heading ${currentStyle.headingColor} mb-4`}>Sobre Mí</h2>
                                <p className="text-gray-300 leading-relaxed">{provider.aboutMe}</p>
                            </div>

                            {/* Services */}
                            <div className={`${baseSectionClass} ${currentStyle.sectionBg}`}>
                                <h2 className={`text-3xl font-heading ${currentStyle.headingColor} mb-4`}>Servicios Ofrecidos</h2>
                                <div className="space-y-4">
                                    {provider.services.map((service, index) => (
                                        <div key={index} className="border-b border-gray-700 pb-2">
                                            <h3 className="font-bold text-lg text-white">{service.name}</h3>
                                            <p className="text-gray-400 text-sm">{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Gallery & Contact) */}
                        <div className="space-y-8">
                            <div className={`${baseSectionClass} ${currentStyle.sectionBg}`}>
                                <ProviderPhotoGallery images={provider.gallery} headingColorClass={currentStyle.headingColor} />
                            </div>
                            <div className={`${baseSectionClass} ${currentStyle.sectionBg} text-center`}>
                                <h2 className="text-2xl font-heading text-white">Contactar</h2>
                                <p className="text-gray-400 my-2 text-sm">Inicia una conversación segura a través de la plataforma.</p>
                                <button className={`w-full text-white font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 ${currentStyle.buttonClass}`}>
                                    Enviar Mensaje
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                )}

            </div>
             {isAIAssistantOpen && <PortfolioAssistant onClose={() => setAIAssistantOpen(false)} />}
        </div>
    );
};

export default ProfilePage;

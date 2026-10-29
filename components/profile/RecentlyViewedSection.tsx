import React, { useState } from 'react';
import { useRecentlyViewed, RecentlyViewedItem, seedDemoRecentlyViewed } from '../../src/utils/recentlyViewed';
import { useFavorites } from '../../src/utils/favorites';
import { useDiscretionMode } from '../../src/utils/discretionMode';
import { Profile } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';
import AiVerifiedBadge from '../common/AiVerifiedBadge';
import DirectMessagingModal from '../common/DirectMessagingModal';
import { 
  Clock, Trash2, MessageSquare, ExternalLink, Heart, 
  ShieldCheck, MapPin, Compass, Eye, EyeOff, Shield, 
  Sparkles, Check, AlertCircle, ArrowUpRight
} from 'lucide-react';

interface RecentlyViewedSectionProps {
  onNavigateToExplore?: () => void;
  onViewProfile?: (profile: Profile) => void;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  onNavigateToExplore,
  onViewProfile,
}) => {
  const { recentlyViewed, count, removeRecentlyViewed, clearHistory, maxLimit } = useRecentlyViewed();
  const { isFavorited, toggleFavorite } = useFavorites();
  const { isDiscretionMode, shouldBlurMedia } = useDiscretionMode();

  const [selectedMessagingProfile, setSelectedMessagingProfile] = useState<Profile | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [unblurredIds, setUnblurredIds] = useState<Record<number, boolean>>({});

  const formatTimeAgo = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

      if (diffInMinutes < 1) return 'Hace un momento';
      if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
      return date.toLocaleDateString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'Recientemente';
    }
  };

  const getInteractionBadge = (type: RecentlyViewedItem['interactionType']) => {
    switch (type) {
      case 'messaged':
        return (
          <span className="bg-rose-950/70 border border-rose-500/50 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <MessageSquare className="w-2.5 h-2.5 text-rose-400" />
            <span>Mensaje E2EE</span>
          </span>
        );
      case 'favorited':
        return (
          <span className="bg-amber-950/70 border border-amber-500/50 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 fill-current text-amber-400" />
            <span>Guardado</span>
          </span>
        );
      default:
        return (
          <span className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Eye className="w-2.5 h-2.5 text-neutral-400" />
            <span>Perfil Visto</span>
          </span>
        );
    }
  };

  const toggleUnblur = (id: number) => {
    setUnblurredIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER CARD */}
      <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> HISTORIAL RECIENTE
              </span>
              <span className="bg-neutral-800 text-neutral-300 border border-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
                {count} / {maxLimit} Registrados
              </span>
              <span className="text-neutral-500 text-[11px] hidden sm:inline">
                • Almacenamiento local privado
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Perfiles Vistos Recientemente
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Accede de inmediato a los últimos 10 perfiles con los que has interactuado para retomar conversaciones o consultar detalles.
            </p>
          </div>

          {count > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="bg-neutral-800 hover:bg-rose-950/80 text-neutral-300 hover:text-rose-400 border border-neutral-700 hover:border-rose-500/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Borrar todo el historial reciente"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar Historial</span>
            </button>
          )}
        </div>

        {/* Discretion Mode note if active */}
        {isDiscretionMode && (
          <div className="bg-emerald-950/30 border border-emerald-500/40 p-2.5 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Modo Discreción Activo:</strong> Las imágenes del historial están protegidas con desenfoque automático. Puedes vaciar este registro en cualquier momento para eliminar cualquier rastro.
            </span>
          </div>
        )}

      </div>

      {/* CONFIRMATION CLEAR MODAL */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">¿Borrar el historial de perfiles vistos?</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Esta acción eliminará de inmediato los {count} perfiles registrados de la memoria local de tu navegador.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold py-2 rounded-lg text-xs transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 rounded-lg text-xs shadow transition-colors"
              >
                Sí, Limpiar Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECENTLY VIEWED GRID OR EMPTY STATE */}
      {recentlyViewed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recentlyViewed.map(({ profile, interactedAt, interactionType }) => {
            const favorited = isFavorited(profile.id);
            const isUnblurred = unblurredIds[profile.id];
            const isBlurred = shouldBlurMedia && !isUnblurred;

            return (
              <div
                key={profile.id}
                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-md group hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Blur & Indicators */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isBlurred ? 'filter blur-md scale-105 brightness-80' : 'filter blur-none scale-100 brightness-100'
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    {/* Discretion Mode reveal button */}
                    {shouldBlurMedia && (
                      <button
                        onClick={() => toggleUnblur(profile.id)}
                        className="absolute top-2.5 left-2.5 bg-neutral-950/80 hover:bg-neutral-900 text-neutral-200 border border-neutral-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 z-20 backdrop-blur-sm"
                        title={isBlurred ? 'Revelar temporalmente' : 'Volver a desenfocar'}
                      >
                        {isBlurred ? <Eye className="w-3 h-3 text-amber-400" /> : <EyeOff className="w-3 h-3 text-neutral-400" />}
                        <span>{isBlurred ? 'Revelar' : 'Blur'}</span>
                      </button>
                    )}

                    {/* Badges on Top Right */}
                    <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
                      {/* Highly Discreet Badge */}
                      {profile.isHighlyDiscreet && (
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/60 text-[9px] font-extrabold px-2 py-0.5 rounded shadow flex items-center gap-0.5">
                          <Shield className="w-2.5 h-2.5 text-emerald-400" />
                          <span>ALTA DISCRECIÓN</span>
                        </span>
                      )}

                      {(profile.isVerified || profile.isAiVerified) && (
                        <AiVerifiedBadge
                          size="sm"
                          score={profile.aiVerificationScore || 99.2}
                          userIdCode={profile.userIdCode}
                          docType={profile.verificationDoc || 'INE'}
                        />
                      )}
                    </div>

                    {/* Interaction Time Overlay on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-white tracking-tight">{profile.name}, {profile.age}</h3>
                          <span
                            className={`h-2 w-2 rounded-full ${
                              profile.onlineStatus === 'online' ? 'bg-emerald-400' : 'bg-neutral-500'
                            }`}
                          />
                        </div>
                        <p className="text-[11px] text-neutral-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                          <span className="truncate">{profile.location}</span>
                        </p>
                      </div>

                      {/* Remove from history button */}
                      <button
                        onClick={() => removeRecentlyViewed(profile.id)}
                        className="p-1.5 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-neutral-400 hover:text-rose-400 border border-neutral-700 transition-colors"
                        title="Quitar este perfil del historial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata and Interaction Tags */}
                  <div className="p-3.5 space-y-2">
                    
                    {/* Timestamp and Interaction Badge */}
                    <div className="flex items-center justify-between text-[11px] border-b border-neutral-800 pb-2">
                      {getInteractionBadge(interactionType)}
                      <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        <span>{formatTimeAgo(interactedAt)}</span>
                      </span>
                    </div>

                    {/* Taxonomy Attributes */}
                    <div className="flex flex-wrap gap-1">
                      {profile.role && (
                        <span className="bg-neutral-800 border border-neutral-700 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {profile.role}
                        </span>
                      )}
                      {profile.gender && (
                        <span className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] px-2 py-0.5 rounded">
                          {profile.gender}
                        </span>
                      )}
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {profile.bio || 'Sin biografía disponible.'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="p-3.5 pt-0 grid grid-cols-3 gap-1.5 border-t border-neutral-800/80 mt-2">
                  {/* Chat button */}
                  <button
                    onClick={() => setSelectedMessagingProfile(profile)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-medium py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                    title="Iniciar mensaje cifrado E2EE"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Chat</span>
                  </button>

                  {/* Favorite toggle button */}
                  <button
                    onClick={() => toggleFavorite(profile)}
                    className={`font-medium py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors border ${
                      favorited
                        ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
                    }`}
                    title={favorited ? 'En Favoritos' : 'Guardar en Favoritos'}
                  >
                    <Heart className={`w-3 h-3 ${favorited ? 'fill-current text-amber-400' : ''}`} />
                    <span>{favorited ? 'Guardado' : 'Guardar'}</span>
                  </button>

                  {/* View profile button */}
                  <button
                    onClick={() => {
                      if (onViewProfile) {
                        onViewProfile(profile);
                      }
                    }}
                    className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white border border-neutral-700 font-medium py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-0.5 transition-colors"
                  >
                    <span>Ver</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE WHEN NO RECENT PROFILES */
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Aún no has explorado perfiles</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Conforme visites perfiles, consultes fichas o envíes mensajes directos en Mamacitos, tus últimas 10 interacciones aparecerán aquí para un acceso veloz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
            {onNavigateToExplore && (
              <button
                onClick={onNavigateToExplore}
                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explorar el Catálogo Ahora</span>
              </button>
            )}
            <button
              onClick={() => seedDemoRecentlyViewed()}
              className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white border border-neutral-700 font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Cargar 4 perfiles de prueba en el historial reciente"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cargar Perfiles de Prueba</span>
            </button>
          </div>
        </div>
      )}

      {/* DIRECT MESSAGING MODAL */}
      {selectedMessagingProfile && (
        <DirectMessagingModal
          isOpen={!!selectedMessagingProfile}
          onClose={() => setSelectedMessagingProfile(null)}
          recipientName={selectedMessagingProfile.name}
          recipientAvatar={selectedMessagingProfile.image}
          recipientCode={selectedMessagingProfile.userIdCode}
          recipientRole={selectedMessagingProfile.role}
          recipientLocation={selectedMessagingProfile.location}
          recipientIsVerified={selectedMessagingProfile.isVerified}
        />
      )}

    </div>
  );
};

export default RecentlyViewedSection;

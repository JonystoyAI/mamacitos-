
import React, { useState } from 'react';
import { Profile } from '../../types';
import VerifiedBadge from './VerifiedBadge';
import DirectMessagingModal from './DirectMessagingModal';
import { useFavorites } from '../../src/utils/favorites';
import { Heart, Sparkles } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  isUnblurred?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isUnblurred = false }) => {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(profile.id);

  const [showUncensored, setShowUncensored] = useState(isUnblurred);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowAdded = toggleFavorite(profile);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className={`bg-brand-slate rounded-2xl overflow-hidden shadow-xl group transform transition-all duration-300 hover:-translate-y-1.5 border ${profile.topPosition ? 'border-brand-lime shadow-brand-lime/10' : 'border-gray-700/60'}`}>
      <div className="relative">
        <img
          className={`w-full h-64 object-cover transition-all duration-500 ${!showUncensored ? 'filter blur-[3px] brightness-90' : 'blur-none brightness-100'}`}
          src={profile.image}
          alt={profile.name}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        
        {/* Save for Later / Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 group/heart ${
            favorited
              ? 'bg-brand-pink/90 text-white shadow-lg shadow-brand-pink/50 scale-110'
              : 'bg-black/60 hover:bg-black/80 text-gray-300 hover:text-brand-pink'
          }`}
          aria-label={favorited ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
          title={favorited ? 'Quitar de Favoritos' : 'Guardar para después'}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-300 ${
              favorited ? 'fill-current text-white scale-110' : 'group-hover/heart:scale-110'
            }`}
          />
        </button>

        {/* Favorite Feedback Toast */}
        {showToast && (
          <div className="absolute top-14 left-3 bg-gray-950/95 border border-brand-pink/80 px-3 py-1.5 rounded-xl shadow-2xl text-[10px] font-bold text-white flex items-center gap-1.5 animate-fade-in z-30 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-brand-lime" />
            <span>{favorited ? '¡Guardado en Mis Favoritos!' : 'Eliminado de Favoritos'}</span>
          </div>
        )}

        {/* Top Position Tag */}
        {profile.topPosition && (
          <span className="absolute top-3 left-12 bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            ★ TOP POSICIÓN
          </span>
        )}

        {/* Badges on Top Right */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
          {profile.isVerified && (
            <VerifiedBadge
              isVerified={true}
              docType={profile.verificationDoc || 'INE'}
              userIdCode={profile.userIdCode}
              size="sm"
              variant={profile.topPosition ? 'gold' : 'official'}
            />
          )}

          {profile.isProvider && (
            <span className="bg-brand-pink text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              Prestadora
            </span>
          )}
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{profile.name}, {profile.age}</h3>
                <span className={`h-2.5 w-2.5 rounded-full ${profile.onlineStatus === 'online' ? 'bg-green-400' : profile.onlineStatus === 'incognito' ? 'bg-purple-400' : 'bg-gray-500'}`} title={profile.onlineStatus || 'offline'}></span>
              </div>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {profile.municipality ? `${profile.municipality}, ${profile.state || profile.location}` : profile.location}
              </p>
            </div>

            {/* Photo Unblur Toggle */}
            <button
              onClick={() => setShowUncensored(!showUncensored)}
              className="text-[10px] font-bold bg-black/70 hover:bg-black/90 text-yellow-300 border border-yellow-400/40 px-2 py-1 rounded-md transition-colors"
              title="Alternar vista de foto sin censura"
            >
              {showUncensored ? '👁 Sin Censura' : '🔒 Con Blur'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-300 text-xs h-10 overflow-hidden leading-relaxed">{profile.bio}</p>
        
        {/* Landing Page Shareable Link Preview */}
        {profile.landingSlug && (
          <div className="mt-2 text-[10px] text-gray-400 font-mono flex items-center gap-1 truncate">
            <span className="text-brand-pink font-bold">Landing:</span> mamacitos.com/perfil/{profile.landingSlug}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => setIsMessagingOpen(true)}
            className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md transition-all"
          >
            <span>💬 Mensaje con Voz</span>
          </button>
          
          <button className="bg-brand-slate hover:bg-gray-700 text-gray-200 border border-gray-700 font-bold py-2 px-3 rounded-xl text-xs transition-all">
            Ver Perfil ➔
          </button>
        </div>

        {/* Direct Messaging Modal with Voice-to-Text */}
        <DirectMessagingModal
          isOpen={isMessagingOpen}
          onClose={() => setIsMessagingOpen(false)}
          recipientName={profile.name}
          recipientAvatar={profile.image}
          recipientCode={profile.userIdCode}
        />
      </div>
    </div>
  );
};

export default ProfileCard;

import React, { useState } from 'react';
import { Profile } from '../../types';
import VerifiedBadge from './VerifiedBadge';
import DirectMessagingModal from './DirectMessagingModal';
import { useFavorites } from '../../src/utils/favorites';
import { Heart, Sparkles, MapPin, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  isUnblurred?: boolean;
  onViewProfile?: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isUnblurred = false, onViewProfile }) => {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(profile.id);

  const [showUncensored, setShowUncensored] = useState(isUnblurred);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(profile);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCardClick = () => {
    if (onViewProfile) {
      onViewProfile(profile);
    }
  };

  return (
    <div className={`bg-neutral-900 rounded-xl overflow-hidden shadow-md group transform transition-all duration-200 hover:-translate-y-1 border ${profile.topPosition ? 'border-amber-400/70 shadow-amber-500/10' : 'border-neutral-800 hover:border-neutral-700'}`}>
      <div className="relative cursor-pointer" onClick={handleCardClick}>
        <img
          className={`w-full h-64 object-cover transition-all duration-300 ${!showUncensored ? 'filter blur-[3px] brightness-90' : 'blur-none brightness-100'}`}
          src={profile.image}
          alt={profile.name}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
        
        {/* Save for Later / Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-20 group/heart ${
            favorited
              ? 'bg-rose-600 text-white shadow-md scale-105'
              : 'bg-neutral-950/70 hover:bg-neutral-950 text-neutral-300 hover:text-rose-400'
          }`}
          aria-label={favorited ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
          title={favorited ? 'Quitar de Favoritos' : 'Guardar para después'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              favorited ? 'fill-current text-white scale-110' : 'group-hover/heart:scale-110'
            }`}
          />
        </button>

        {/* Favorite Feedback Toast */}
        {showToast && (
          <div className="absolute top-14 left-3 bg-neutral-950/95 border border-rose-500/80 px-3 py-1.5 rounded-lg shadow-xl text-[11px] font-semibold text-white flex items-center gap-1.5 animate-fade-in z-30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{favorited ? 'Guardado en Favoritos' : 'Eliminado de Favoritos'}</span>
          </div>
        )}

        {/* Top Position Badge */}
        {profile.topPosition && (
          <span className="absolute top-3 left-12 bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
            ★ TOP DESTACADO
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
            <span className="bg-rose-500/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow border border-rose-400/40">
              Prestadora
            </span>
          )}
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">{profile.name}, {profile.age}</h3>
                <span 
                  className={`h-2.5 w-2.5 rounded-full ${
                    profile.onlineStatus === 'online' ? 'bg-emerald-400 ring-2 ring-emerald-950' : 
                    profile.onlineStatus === 'incognito' ? 'bg-purple-400 ring-2 ring-purple-950' : 
                    'bg-neutral-500'
                  }`} 
                  title={`Estado: ${profile.onlineStatus || 'offline'}`}
                />
              </div>
              <p className="text-xs text-neutral-300 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-rose-400 shrink-0" />
                <span className="truncate">{profile.municipality ? `${profile.municipality}, ${profile.state || profile.location}` : profile.location}</span>
              </p>
            </div>

            {/* Photo Unblur Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUncensored(!showUncensored);
              }}
              className="text-[10px] font-medium bg-neutral-950/80 hover:bg-neutral-900 text-neutral-200 border border-neutral-700 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
              title="Alternar vista de foto sin censura"
            >
              {showUncensored ? <EyeOff className="w-3 h-3 text-amber-400" /> : <Eye className="w-3 h-3 text-neutral-400" />}
              <span>{showUncensored ? 'Nítida' : 'Blur'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-3.5 space-y-2.5">
        {/* Core Attributes: Role, Gender & Looking For */}
        <div className="flex flex-wrap gap-1.5">
          {profile.gender && (
            <span className="bg-neutral-800 border border-neutral-700 text-neutral-100 text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="text-rose-400 text-[10px]">●</span> {profile.gender}
            </span>
          )}
          {profile.role && (
            <span className="bg-neutral-800/90 border border-neutral-700 text-amber-300 text-[11px] font-medium px-2 py-0.5 rounded-md">
              Rol: {profile.role}
            </span>
          )}
          {profile.lookingFor && profile.lookingFor.length > 0 && (
            <span className="bg-rose-950/40 border border-rose-800/40 text-rose-200 text-[11px] px-2 py-0.5 rounded-md font-medium truncate max-w-[160px]">
              🎯 {profile.lookingFor[0]}
            </span>
          )}
        </div>

        {/* Physical Traits preview */}
        {(profile.bodyType || profile.heightCategory || profile.hairColor || profile.eyeColor) && (
          <div className="flex flex-wrap items-center gap-1 text-[10px] text-neutral-400 bg-neutral-950/60 px-2 py-1 rounded border border-neutral-800/80">
            {profile.bodyType && <span className="text-neutral-300 font-medium">{profile.bodyType}</span>}
            {profile.heightCategory && (
              <>
                <span className="text-neutral-600">•</span>
                <span>{profile.heightCategory}</span>
              </>
            )}
            {profile.hairColor && (
              <>
                <span className="text-neutral-600">•</span>
                <span>Cabello {profile.hairColor}</span>
              </>
            )}
            {profile.eyeColor && (
              <>
                <span className="text-neutral-600">•</span>
                <span>Ojos {profile.eyeColor}</span>
              </>
            )}
          </div>
        )}

        {/* Bio preview */}
        <p className="text-neutral-300 text-xs leading-relaxed line-clamp-2">{profile.bio}</p>

        {/* Logistics & Safety badging */}
        {((profile.logistics && profile.logistics.length > 0) || (profile.safetyPractices && profile.safetyPractices.length > 0)) && (
          <div className="flex flex-wrap gap-1 pt-1">
            {profile.logistics?.map((item, idx) => (
              <span key={idx} className="bg-neutral-800/70 border border-neutral-700 text-neutral-300 text-[10px] px-1.5 py-0.5 rounded">
                📍 {item}
              </span>
            ))}
            {profile.safetyPractices?.map((item, idx) => (
              <span key={idx} className="bg-emerald-950/30 border border-emerald-800/30 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /> {item}
              </span>
            ))}
          </div>
        )}
        
        {/* Sexual Preferences / Gustos */}
        {profile.sexualPreferences && profile.sexualPreferences.length > 0 && (
          <div className="pt-1.5 border-t border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-1">
              Gustos & Prácticas:
            </span>
            <div className="flex flex-wrap gap-1">
              {profile.sexualPreferences.slice(0, 3).map((gusto, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-800 border border-neutral-700 text-rose-300 text-[10px] px-1.5 py-0.5 rounded"
                >
                  {gusto}
                </span>
              ))}
              {profile.sexualPreferences.length > 3 && (
                <span className="text-[10px] text-neutral-400 self-center">
                  +{profile.sexualPreferences.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
          <button
            onClick={() => setIsMessagingOpen(true)}
            className="bg-rose-600 hover:bg-rose-500 text-white font-medium py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
          >
            <span>💬 Mensaje</span>
          </button>
          
          <button 
            onClick={handleCardClick}
            className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white border border-neutral-700 font-medium py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center"
          >
            Ver Perfil ➔
          </button>
        </div>

        {/* Direct Messaging Modal */}
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

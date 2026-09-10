
import React, { useState } from 'react';
import { Profile } from '../../types';
import VerifiedBadge from './VerifiedBadge';
import DirectMessagingModal from './DirectMessagingModal';

interface ProfileCardProps {
  profile: Profile;
  isUnblurred?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isUnblurred = false }) => {
  const [liked, setLiked] = useState(false);
  const [showUncensored, setShowUncensored] = useState(isUnblurred);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
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
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-3 left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors duration-200 z-10"
          aria-label="Like profile"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-colors ${liked ? 'text-red-500' : 'text-white'}`} 
            fill={liked ? 'currentColor' : 'none'} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>

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

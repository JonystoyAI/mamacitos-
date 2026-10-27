import React, { useState } from 'react';
import { useFavorites } from '../../src/utils/favorites';
import { Profile } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';
import DirectMessagingModal from '../common/DirectMessagingModal';
import { Heart, Search, Filter, Trash2, Share2, MessageSquare, ExternalLink, Sparkles, ShieldCheck, MapPin, Compass, Copy, Check } from 'lucide-react';

interface MyFavoritesSectionProps {
  onNavigateToExplore?: () => void;
}

export const MyFavoritesSection: React.FC<MyFavoritesSectionProps> = ({ onNavigateToExplore }) => {
  const { favorites, toggleFavorite, clearAllFavorites, count } = useFavorites();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'providers' | 'verified'>('all');
  const [selectedMessagingProfile, setSelectedMessagingProfile] = useState<Profile | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter saved profiles based on search and filters
  const filteredFavorites = favorites.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'all' ||
      (filterType === 'providers' && profile.isProvider) ||
      (filterType === 'verified' && profile.isVerified);

    return matchesSearch && matchesType;
  });

  const handleCopyLink = (slug?: string) => {
    if (!slug) return;
    const url = `${window.location.origin}/perfil/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleExportList = () => {
    const listSummary = favorites
      .map(
        (p, idx) =>
          `${idx + 1}. ${p.name} (${p.isProvider ? 'Prestadora' : 'Usuario'}) - ${p.location} - ID: ${p.userIdCode}`
      )
      .join('\n');

    const blob = new Blob([`MIS FAVORITOS EN MAMACITOS (Total: ${count})\n\n${listSummary}`], {
      type: 'text/plain;charset=utf-8',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `mis_favoritos_mamacitos_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION HEADER CARD */}
      <div className="bg-gradient-to-br from-gray-950 via-brand-purple-dark to-gray-950 p-6 sm:p-8 rounded-3xl border border-brand-pink/50 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-pink text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                <Heart className="w-3.5 h-3.5 fill-current" /> SECCIÓN PRIVADA DE USUARIO
              </span>
              <span className="bg-brand-lime/20 text-brand-lime border border-brand-lime/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                {count} {count === 1 ? 'Guardado' : 'Guardados'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading text-white flex items-center gap-2">
              Mis Favoritos / Guardados para Después
            </h2>
            <p className="text-xs text-brand-purple-light mt-0.5">
              Acceso rápido, privado e instantáneo a las perfiles y prestadoras que has guardado.
            </p>
          </div>

          {count > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportList}
                className="bg-gray-900 hover:bg-gray-800 text-brand-lime border border-brand-lime/40 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer"
                title="Exportar resumen de favoritos"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Exportar Lista</span>
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-gray-900 hover:bg-red-950/80 text-red-400 border border-red-500/40 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Vaciar lista de favoritos"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar Todo</span>
              </button>
            </div>
          )}
        </div>

        {/* SEARCH AND FILTERS TOOLBAR */}
        {count > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, ubicación o descripción en tus favoritos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-pink"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-gray-900 p-1 rounded-2xl border border-gray-800 shrink-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === 'all' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Todos ({favorites.length})
              </button>
              <button
                onClick={() => setFilterType('providers')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === 'providers' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Prestadoras ({favorites.filter((p) => p.isProvider).length})
              </button>
              <button
                onClick={() => setFilterType('verified')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === 'verified' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Verificados ({favorites.filter((p) => p.isVerified).length})
              </button>
            </div>
          </div>
        )}

      </div>

      {/* CONFIRMATION CLEAR MODAL */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-red-500/50 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-lg font-heading text-white">¿Vaciar toda la lista de favoritos?</h3>
            <p className="text-xs text-gray-300">
              Esta acción eliminará los {count} perfiles guardados de tu almacenamiento local.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2.5 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearAllFavorites();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg"
              >
                Sí, Vaciar Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAVORITES GRID OR EMPTY STATE */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredFavorites.map((profile) => (
            <div
              key={profile.id}
              className="bg-brand-slate rounded-2xl overflow-hidden border border-gray-700/80 shadow-xl group hover:border-brand-pink/80 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image and Header Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Remove Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(profile)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-brand-pink text-white shadow-lg hover:scale-110 transition-transform"
                    title="Quitar de Favoritos"
                  >
                    <Heart className="w-4 h-4 fill-current text-white" />
                  </button>

                  {/* Badges on Top Right */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
                    {profile.isVerified && (
                      <VerifiedBadge
                        isVerified={true}
                        docType={profile.verificationDoc || 'INE'}
                        userIdCode={profile.userIdCode}
                        size="sm"
                        variant="official"
                      />
                    )}
                    {profile.isProvider && (
                      <span className="bg-brand-pink text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        Prestadora
                      </span>
                    )}
                  </div>

                  {/* Profile info overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{profile.name}, {profile.age}</h3>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          profile.onlineStatus === 'online' ? 'bg-green-400' : 'bg-gray-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-brand-pink shrink-0" />
                      <span>{profile.location}</span>
                    </p>
                  </div>
                </div>

                {/* Bio text */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {profile.bio || 'Sin biografía disponible.'}
                  </p>

                  {profile.landingSlug && (
                    <div className="bg-gray-900/80 p-2 rounded-xl border border-gray-800 flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span className="truncate pr-1">/perfil/{profile.landingSlug}</span>
                      <button
                        onClick={() => handleCopyLink(profile.landingSlug)}
                        className="text-brand-pink hover:text-white flex items-center gap-1 shrink-0 font-bold"
                      >
                        {copiedSlug === profile.landingSlug ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedSlug === profile.landingSlug ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedMessagingProfile(profile)}
                  className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Mensaje</span>
                </button>

                <button
                  onClick={() => toggleFavorite(profile)}
                  className="bg-gray-800 hover:bg-red-900/50 text-gray-300 hover:text-red-300 border border-gray-700 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quitar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE WHEN NO FAVORITES OR NONE MATCH FILTER */
        <div className="bg-gray-950/80 rounded-3xl border border-gray-800 p-12 text-center space-y-4 max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 bg-brand-pink/10 border border-brand-pink/30 text-brand-pink rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-heading text-white">
              {count === 0 ? 'Aún no tienes perfiles guardados' : 'No hay resultados para tu búsqueda'}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {count === 0
                ? 'Explora el catálogo de usuarios y prestadoras de servicios en Mamacitos y presiona el ícono de corazón para guardarlos en esta sección privada.'
                : 'Intenta ajustar los términos de búsqueda o limpia los filtros seleccionados.'}
            </p>
          </div>

          {count === 0 && onNavigateToExplore && (
            <button
              onClick={onNavigateToExplore}
              className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-xs flex items-center gap-2 mx-auto shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explorar Perfiles Ahora</span>
            </button>
          )}
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
        />
      )}

    </div>
  );
};

export default MyFavoritesSection;

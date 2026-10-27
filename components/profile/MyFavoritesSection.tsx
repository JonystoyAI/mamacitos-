import React, { useState } from 'react';
import { useFavorites } from '../../src/utils/favorites';
import { Profile } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';
import DirectMessagingModal from '../common/DirectMessagingModal';
import { 
  Heart, Search, Filter, Trash2, Share2, MessageSquare, ExternalLink, 
  Sparkles, ShieldCheck, MapPin, Compass, Copy, Check, FileText, Lock, 
  Eye, EyeOff, Edit3, Save, X
} from 'lucide-react';

interface MyFavoritesSectionProps {
  onNavigateToExplore?: () => void;
  onViewProfile?: (profile: Profile) => void;
}

export const MyFavoritesSection: React.FC<MyFavoritesSectionProps> = ({ 
  onNavigateToExplore,
  onViewProfile 
}) => {
  const { favorites, toggleFavorite, clearAllFavorites, count, updateNote, getNote } = useFavorites();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'providers' | 'verified' | 'with_location'>('all');
  const [selectedMessagingProfile, setSelectedMessagingProfile] = useState<Profile | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // Note editing state
  const [editingNoteProfileId, setEditingNoteProfileId] = useState<number | null>(null);
  const [currentNoteText, setCurrentNoteText] = useState('');

  // Filter saved profiles based on search and filters
  const filteredFavorites = favorites.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (profile.role && profile.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNote(profile.id).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'all' ||
      (filterType === 'providers' && profile.isProvider) ||
      (filterType === 'verified' && profile.isVerified) ||
      (filterType === 'with_location' && profile.logistics?.some(l => l.includes('Con lugar')));

    return matchesSearch && matchesType;
  });

  const handleCopyLink = (slug?: string) => {
    if (!slug) return;
    const url = `${window.location.origin}/perfil/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleOpenNoteEditor = (profileId: number) => {
    setEditingNoteProfileId(profileId);
    setCurrentNoteText(getNote(profileId));
  };

  const handleSaveNote = (profileId: number) => {
    updateNote(profileId, currentNoteText);
    setEditingNoteProfileId(null);
  };

  const handleExportList = () => {
    const listSummary = favorites
      .map((p, idx) => {
        const note = getNote(p.id);
        return `${idx + 1}. ${p.name} (${p.isProvider ? 'Prestadora / Escort' : 'Usuario'})
Ubicación: ${p.location}
Código ID: ${p.userIdCode}
Rol: ${p.role || 'No especificado'}
${note ? `Nota privada: "${note}"` : ''}
---`;
      })
      .join('\n');

    const content = `MIS FAVORITOS GUARDADOS EN MAMACITOS (Total: ${count})
Generado el: ${new Date().toLocaleString()}
Modo: Cifrado Local / Confidencial

${listSummary}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `mis_favoritos_mamacitos_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION HEADER CARD */}
      <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <Heart className="w-3 h-3 fill-current" /> BÓVEDA PRIVADA DE FAVORITOS
              </span>
              <span className="bg-neutral-800 text-amber-400 border border-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
                {count} {count === 1 ? 'Perfil' : 'Perfiles'}
              </span>
              <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Almacenamiento Local Seguro</span>
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Perfiles Guardados para Después
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Acceso rápido y discreto a los perfiles que has marcado desde el explorador. Añade notas privadas o inicia chats cifrados directos.
            </p>
          </div>

          {count > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportList}
                className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 hover:border-amber-400/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Exportar archivo de favoritos"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar</span>
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-neutral-800 hover:bg-rose-950/80 text-neutral-400 hover:text-rose-400 border border-neutral-700 hover:border-rose-500/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Vaciar lista de favoritos"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar</span>
              </button>
            </div>
          )}
        </div>

        {/* SEARCH AND FILTERS TOOLBAR */}
        {count > 0 && (
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, ciudad, rol, notas o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  filterType === 'all' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Todos ({favorites.length})
              </button>
              <button
                onClick={() => setFilterType('providers')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  filterType === 'providers' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Prestadoras ({favorites.filter((p) => p.isProvider).length})
              </button>
              <button
                onClick={() => setFilterType('verified')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  filterType === 'verified' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Verificados ({favorites.filter((p) => p.isVerified).length})
              </button>
              <button
                onClick={() => setFilterType('with_location')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  filterType === 'with_location' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Con Lugar ({favorites.filter((p) => p.logistics?.some(l => l.includes('Con lugar'))).length})
              </button>
            </div>
          </div>
        )}

      </div>

      {/* CONFIRMATION CLEAR MODAL */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">¿Vaciar toda la lista de favoritos?</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Esta acción eliminará los {count} perfiles y sus notas privadas de este navegador.
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
                  clearAllFavorites();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 rounded-lg text-xs shadow transition-colors"
              >
                Sí, Vaciar Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAVORITES GRID OR EMPTY STATE */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFavorites.map((profile) => {
            const privateNote = getNote(profile.id);
            const isEditingThisNote = editingNoteProfileId === profile.id;

            return (
              <div
                key={profile.id}
                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-md group hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo and overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    {/* Remove favorite button */}
                    <button
                      onClick={() => toggleFavorite(profile)}
                      className="absolute top-2.5 left-2.5 p-2 rounded-full bg-rose-600 text-white shadow-md hover:scale-110 transition-transform"
                      title="Quitar de Favoritos"
                    >
                      <Heart className="w-4 h-4 fill-current text-white" />
                    </button>

                    {/* Badges on Top Right */}
                    <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
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
                        <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Prestadora
                        </span>
                      )}
                    </div>

                    {/* Profile info overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white tracking-tight">{profile.name}, {profile.age}</h3>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            profile.onlineStatus === 'online' ? 'bg-emerald-400 ring-2 ring-emerald-950' : 'bg-neutral-500'
                          }`}
                        />
                      </div>
                      <p className="text-xs text-neutral-300 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate">{profile.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Taxonomy tags & bio */}
                  <div className="p-3.5 space-y-2.5">
                    
                    {/* Role & Gender chips */}
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
                      {profile.seeking && (
                        <span className="bg-rose-950/60 border border-rose-800/60 text-rose-300 text-[10px] px-2 py-0.5 rounded">
                          {profile.seeking}
                        </span>
                      )}
                    </div>

                    {/* Bio text */}
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {profile.bio || 'Sin biografía disponible.'}
                    </p>

                    {/* Private Note Box */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>Nota privada:</span>
                        </span>
                        {!isEditingThisNote && (
                          <button
                            onClick={() => handleOpenNoteEditor(profile.id)}
                            className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
                          >
                            <Edit3 className="w-2.5 h-2.5" />
                            <span>{privateNote ? 'Editar' : 'Añadir nota'}</span>
                          </button>
                        )}
                      </div>

                      {isEditingThisNote ? (
                        <div className="space-y-1.5 pt-1">
                          <textarea
                            value={currentNoteText}
                            onChange={(e) => setCurrentNoteText(e.target.value)}
                            placeholder="Escribe un recordatorio privado (horarios, preferencias, etc.)..."
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none h-14"
                          />
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => setEditingNoteProfileId(null)}
                              className="px-2 py-0.5 text-[10px] text-neutral-400 hover:text-white"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleSaveNote(profile.id)}
                              className="px-2 py-0.5 text-[10px] bg-amber-400 text-neutral-950 font-bold rounded flex items-center gap-1"
                            >
                              <Save className="w-2.5 h-2.5" /> Guardar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className={`text-[11px] ${privateNote ? 'text-amber-200/90 italic' : 'text-neutral-500'}`}>
                          {privateNote || 'Sin notas privadas guardadas.'}
                        </p>
                      )}
                    </div>

                    {/* Landing link if available */}
                    {profile.landingSlug && (
                      <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span className="truncate pr-1">/perfil/{profile.landingSlug}</span>
                        <button
                          onClick={() => handleCopyLink(profile.landingSlug)}
                          className="text-amber-400 hover:text-white flex items-center gap-1 shrink-0 font-semibold"
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
                <div className="p-3.5 pt-0 grid grid-cols-2 gap-2 border-t border-neutral-800/80 mt-2">
                  <button
                    onClick={() => setSelectedMessagingProfile(profile)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-medium py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>💬 Chat E2EE</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onViewProfile) {
                        onViewProfile(profile);
                      }
                    }}
                    className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white border border-neutral-700 font-medium py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Ver Perfil ➔</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE WHEN NO FAVORITES OR NONE MATCH FILTER */
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {count === 0 ? 'Aún no tienes perfiles guardados' : 'No hay perfiles que coincidan con el filtro'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {count === 0
                ? 'Explora el catálogo de usuarios y prestadoras de servicios en Mamacitos y haz clic en el ícono de corazón para guardarlos en esta bóveda privada.'
                : 'Intenta limpiar el término de búsqueda o selecciona otra categoría.'}
            </p>
          </div>

          {count === 0 && onNavigateToExplore && (
            <button
              onClick={onNavigateToExplore}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-6 rounded-lg text-xs flex items-center gap-2 mx-auto shadow-md transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explorar Perfiles Ahora</span>
            </button>
          )}
        </div>
      )}

      {/* DIRECT MESSAGING MODAL WITH FULL E2EE AND VIP CAPABILITIES */}
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

export default MyFavoritesSection;

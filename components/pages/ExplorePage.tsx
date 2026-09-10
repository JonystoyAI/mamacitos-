import React, { useState, useMemo } from 'react';
import { Profile, ProfileType } from '../../types';
import ProfileCard from '../common/ProfileCard';
import { MEXICO_STATES_DATA } from '../../src/data/mexicoLocations';

const mockProfiles: Profile[] = Array.from({ length: 24 }, (_, i) => {
  const stateObj = MEXICO_STATES_DATA[i % MEXICO_STATES_DATA.length];
  const mun = stateObj.municipios[i % stateObj.municipios.length];
  const name = ['Valeria', 'Isabella', 'Sofia', 'Camila', 'Regina', 'Ximena', 'Daniela', 'Alexa', 'Luna', 'Aurora', 'Venus', 'Zafiro'][i % 12];
  
  return {
    id: i + 1,
    userIdCode: `MMC-${1000 + i}`,
    name,
    age: 21 + (i % 12),
    location: `${mun}, ${stateObj.state}`,
    state: stateObj.state,
    municipality: mun,
    image: `https://picsum.photos/seed/${i + 50}/400/500`,
    isProvider: i % 2 === 0,
    bio: 'Buscando conexiones genuinas y momentos especiales. Discreción, elegancia y atención de primera.',
    profileType: (['sex_worker', 'social', 'dom_sub', 'other_services', 'personal_contact'] as ProfileType[])[i % 5],
    userType: ['HOMBRE(H)', 'MUJER(M)', 'TRANS(TRs)', 'Pareja (H&M)', 'Pareja (M&TRs)'][i % 5],
    seeking: ['Trans(TRs)', 'Parejas', 'Hombres(H)', 'Indeciso'][i % 4],
    isVerified: i % 2 === 0,
    verificationDoc: i % 4 === 0 ? 'Pasaporte' : 'INE',
    rating: 4.8,
    reviewsCount: 14 + (i * 3),
    onlineStatus: i % 3 === 0 ? 'online' : i % 3 === 1 ? 'incognito' : 'offline',
    topPosition: i < 4, // First 4 appear as Top Position
    landingSlug: name.toLowerCase().replace(/\s+/g, '-') + '-' + (i + 1)
  };
});

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [filterProfileType, setFilterProfileType] = useState<string>('all');
  const [filterUserType, setFilterUserType] = useState<string>('all');
  const [filterSeeking, setFilterSeeking] = useState<string>('all');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [filterTopOnly, setFilterTopOnly] = useState<boolean>(false);

  // Active municipios depending on state selection
  const availableMunicipios = useMemo(() => {
    if (selectedState === 'all') return [];
    const found = MEXICO_STATES_DATA.find(s => s.state === selectedState);
    return found ? found.municipios : [];
  }, [selectedState]);

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      const matchesSearch = searchTerm === '' || 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = selectedState === 'all' || profile.state === selectedState;
      const matchesMun = selectedMunicipality === 'all' || profile.municipality === selectedMunicipality;
      const matchesProfileType = filterProfileType === 'all' || profile.profileType === filterProfileType;
      const matchesUserType = filterUserType === 'all' || profile.userType === filterUserType;
      const matchesSeeking = filterSeeking === 'all' || profile.seeking === filterSeeking;
      const matchesVerified = !filterVerifiedOnly || profile.isVerified;
      const matchesTop = !filterTopOnly || profile.topPosition;

      return matchesSearch && matchesState && matchesMun && matchesProfileType && matchesUserType && matchesSeeking && matchesVerified && matchesTop;
    });
  }, [searchTerm, selectedState, selectedMunicipality, filterProfileType, filterUserType, filterSeeking, filterVerifiedOnly, filterTopOnly]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4 bg-brand-slate p-6 rounded-2xl border border-gray-700/80 self-start shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading text-white">Filtros Avanzados</h2>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedState('all');
                setSelectedMunicipality('all');
                setFilterProfileType('all');
                setFilterUserType('all');
                setFilterSeeking('all');
                setFilterVerifiedOnly(false);
                setFilterTopOnly(false);
              }}
              className="text-xs text-brand-pink underline hover:text-white"
            >
              Limpiar
            </button>
          </div>

          <div className="space-y-5">
            {/* Search input */}
            <div>
              <label htmlFor="search" className="block text-xs font-bold text-gray-300 mb-1">
                Buscar por nombre o palabra
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-pink"
                placeholder="Ej. Valeria, CDMX..."
              />
            </div>

            {/* MEXICO STATES LISTING */}
            <div>
              <label htmlFor="state" className="block text-xs font-bold text-gray-300 mb-1">
                Estado de México (32 Estados)
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedMunicipality('all');
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-pink"
              >
                <option value="all">Todos los Estados de México ({MEXICO_STATES_DATA.length})</option>
                {MEXICO_STATES_DATA.map(st => (
                  <option key={st.state} value={st.state}>{st.state}</option>
                ))}
              </select>
            </div>

            {/* MEXICO MUNICIPIOS LISTING */}
            {selectedState !== 'all' && (
              <div className="animate-fade-in">
                <label htmlFor="municipality" className="block text-xs font-bold text-brand-pink mb-1">
                  Municipio de {selectedState}
                </label>
                <select
                  id="municipality"
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                  className="w-full bg-gray-800 border border-brand-pink/50 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-pink"
                >
                  <option value="all">Todos los Municipios de {selectedState}</option>
                  {availableMunicipios.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Profile Type */}
            <div>
              <label htmlFor="profileType" className="block text-xs font-bold text-gray-300 mb-1">Tipo de Perfil</label>
              <select
                id="profileType"
                value={filterProfileType}
                onChange={(e) => setFilterProfileType(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-pink"
              >
                <option value="all">Todos</option>
                <option value="sex_worker">Prestadoras de Servicios</option>
                <option value="social">Conexiones Sociales</option>
                <option value="dom_sub">Ama-Esclavo</option>
                <option value="other_services">Otros Servicios</option>
                <option value="personal_contact">Contactos Personales</option>
              </select>
            </div>

            {/* Quick Toggles */}
            <div className="pt-2 border-t border-gray-700/80 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterVerifiedOnly}
                  onChange={e => setFilterVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-700 rounded"
                />
                <span className="text-xs text-gray-200">Solo Perfiles Verificados (INE / Pasaporte)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterTopOnly}
                  onChange={e => setFilterTopOnly(e.target.checked)}
                  className="w-4 h-4 text-brand-lime bg-gray-800 border-gray-700 rounded"
                />
                <span className="text-xs text-gray-200">Solo Posiciones VIP Top</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Profiles Grid */}
        <main className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <div>
              <h1 className="text-3xl font-heading text-white">Explora Perfiles en México</h1>
              <p className="text-xs text-gray-300">
                Mostrando {filteredProfiles.length} perfiles {selectedState !== 'all' ? `en ${selectedState}` : 'en todo el país'}
              </p>
            </div>

            <div className="bg-brand-deep-purple/60 text-xs text-brand-purple-light px-3 py-1.5 rounded-xl border border-brand-purple-light/20 font-mono">
              ★ Primeros puestos VIP prioritarios
            </div>
          </div>

          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProfiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-brand-slate rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white">No se encontraron perfiles</h3>
              <p className="text-gray-400 text-xs mt-2">Intenta cambiar de municipio o borrar los filtros de búsqueda.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;

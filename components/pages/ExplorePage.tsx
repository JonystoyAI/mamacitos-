import React, { useState, useMemo } from 'react';
import { Profile, ProfileType, Page } from '../../types';
import ProfileCard from '../common/ProfileCard';
import { MEXICO_STATES_DATA } from '../../src/data/mexicoLocations';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Check, 
  Flame, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Search,
  HeartHandshake,
  Activity,
  Layers,
  Compass,
  Palette,
  Eye
} from 'lucide-react';

export const ROLE_OPTIONS = [
  'Activo',
  'Pasivo',
  'Versátil',
  'Versátil Activo',
  'Versátil Pasivo',
  'Ama / Dominante',
  'Sumiso / Esclavo',
  'Solo Oral / Intercambio'
] as const;

export const GENDER_OPTIONS = [
  'Mujer Trans',
  'Chica Cis',
  'TV (Travesti)',
  'Sissy',
  'Fem / Femboy',
  'Hombre Cis',
  'Hombre Trans',
  'No binario',
  'Pareja Trans y Trans',
  'Pareja H y Trans',
  'Pareja H y H',
  'Pareja (H y M)'
] as const;

export const LOOKING_FOR_OPTIONS = [
  'Soy Escort / Scort',
  'No pago por sexo',
  'Grabar contenido',
  'Encuentro casual',
  'Citas y romance',
  'Trato de novios (GFE)',
  'Amistad y buen rollo',
  'Discreción absoluta',
  'Eventos y salidas'
] as const;

export const LOGISTICS_OPTIONS = [
  'Con lugar propio',
  'Sin lugar (a domicilio / motel)',
  'Motel / Hotel',
  'Auto / Cruising'
] as const;

export const SAFETY_PRACTICES_OPTIONS = [
  'Solo con condón',
  'A pelo (Bareback / PrEP)',
  'No drogas (Cero sustancias)',
  'Dulces (Chem / Ambiente)',
  'Pruebas de salud al día'
] as const;

export const SEXUAL_PRACTICES_OPTIONS = [
  'Feminización',
  'Transformación',
  'Fisting',
  'Cruising',
  'Gangbang',
  'Tríos',
  '2 Romano (DP)',
  'Rapidín',
  'Masturbación mutua',
  'Ver nopor',
  'XXL / Dotados',
  'Morbo / Dirty talk',
  'Voyerismo',
  'Exhibicionismo',
  'Juguetes eróticos',
  'BDSM / Kink',
  'Oral apasionado',
  'Lencería y tacones',
  'Masajes eróticos',
  'Roleplay'
] as const;

export const BODY_TYPE_OPTIONS = [
  'Delgada / Slim',
  'Atlética / Fitness',
  'Curvy / Curvilínea',
  'Normal / Media',
  'Musculosa',
  'Robusta / Chubby'
] as const;

export const HEIGHT_OPTIONS = [
  'Petit (< 1.60 m)',
  'Media (1.60 m - 1.75 m)',
  'Alta (> 1.75 m)'
] as const;

export const HAIR_COLOR_OPTIONS = [
  'Negro',
  'Castaño',
  'Rubio',
  'Pelirrojo',
  'Fantasía / Teñido',
  'Rapado / Calvo'
] as const;

export const EYE_COLOR_OPTIONS = [
  'Cafés / Castaños',
  'Negros',
  'Verdes',
  'Azules',
  'Miel / Ámbar'
] as const;

export const PHYSICAL_FEATURES_OPTIONS = [
  'Tatuajes',
  'Piercings',
  'Depilación total',
  'Vello natural / Barba'
] as const;

export const HOBBIES_OPTIONS = [
  'Viajes y escapadas',
  'Fitness / Gym',
  'Música y festivales',
  'Gastronomía y vinos',
  'Videojuegos y anime',
  'Cine y series',
  'Arte y fotografía',
  'Baile y fiesta',
  'Naturaleza y relax',
  'Moda y shopping'
] as const;

const mockProfiles: Profile[] = Array.from({ length: 28 }, (_, i) => {
  const stateObj = MEXICO_STATES_DATA[i % MEXICO_STATES_DATA.length];
  const mun = stateObj.municipios[i % stateObj.municipios.length];
  const names = [
    'Valeria', 'Isabella', 'Sofia', 'Camila', 'Regina', 'Ximena', 
    'Daniela', 'Alexa', 'Luna', 'Aurora', 'Venus', 'Zafiro', 
    'Pareja Alex & Dani', 'Pareja Leo & Max', 'Pareja Nicole & Samantha', 'Kassandra'
  ];
  const name = names[i % names.length];

  const assignedRole = ROLE_OPTIONS[i % ROLE_OPTIONS.length];
  const assignedGender = GENDER_OPTIONS[i % GENDER_OPTIONS.length];

  // Distribute varied lookingFor intentions including user's specific targets
  const lookingForSets = [
    ['Soy Escort / Scort', 'Encuentro casual'],
    ['No pago por sexo', 'Amistad y buen rollo'],
    ['Grabar contenido', 'Citas y romance'],
    ['Soy Escort / Scort', 'Trato de novios (GFE)'],
    ['Encuentro casual', 'Discreción absoluta'],
    ['No pago por sexo', 'Eventos y salidas'],
    ['Grabar contenido', 'Discreción absoluta'],
    ['Soy Escort / Scort', 'Fetiches y BDSM']
  ];
  const assignedLookingFor = lookingForSets[i % lookingForSets.length];

  // Distribute logistics
  const logisticsSets = [
    ['Con lugar propio'],
    ['Sin lugar (a domicilio / motel)', 'Motel / Hotel'],
    ['Con lugar propio', 'Motel / Hotel'],
    ['Motel / Hotel', 'Auto / Cruising'],
    ['Con lugar propio', 'Auto / Cruising']
  ];
  const assignedLogistics = logisticsSets[i % logisticsSets.length];

  // Distribute safety practices
  const safetySets = [
    ['Solo con condón', 'No drogas (Cero sustancias)', 'Pruebas de salud al día'],
    ['A pelo (Bareback / PrEP)', 'Pruebas de salud al día'],
    ['Solo con condón', 'No drogas (Cero sustancias)'],
    ['Dulces (Chem / Ambiente)', 'A pelo (Bareback / PrEP)'],
    ['Solo con condón', 'Pruebas de salud al día']
  ];
  const assignedSafety = safetySets[i % safetySets.length];

  // Distribute sexual practices from user's specific list
  const practicesSets = [
    ['Feminización', 'Transformación', 'Morbo / Dirty talk', 'Lencería y tacones'],
    ['Fisting', 'BDSM / Kink', 'XXL / Dotados'],
    ['Cruising', 'Rapidín', 'Masturbación mutua', 'Auto / Cruising'],
    ['Gangbang', 'Tríos', '2 Romano (DP)', 'Morbo / Dirty talk'],
    ['Ver nopor', 'Masturbación mutua', 'Rapidín', 'Juguetes eróticos'],
    ['Voyerismo', 'Exhibicionismo', 'Grabar contenido', 'Morbo / Dirty talk'],
    ['2 Romano (DP)', 'Tríos', 'XXL / Dotados', 'Oral apasionado'],
    ['Feminización', 'Juguetes eróticos', 'Oral apasionado', 'Lencería y tacones']
  ];
  const assignedPractices = practicesSets[i % practicesSets.length];

  // Distribute physical traits
  const assignedBody = BODY_TYPE_OPTIONS[i % BODY_TYPE_OPTIONS.length];
  const assignedHeight = HEIGHT_OPTIONS[i % HEIGHT_OPTIONS.length];
  const assignedHair = HAIR_COLOR_OPTIONS[i % HAIR_COLOR_OPTIONS.length];
  const assignedEye = EYE_COLOR_OPTIONS[i % EYE_COLOR_OPTIONS.length];
  const assignedFeatures = [
    PHYSICAL_FEATURES_OPTIONS[i % PHYSICAL_FEATURES_OPTIONS.length],
    PHYSICAL_FEATURES_OPTIONS[(i + 1) % PHYSICAL_FEATURES_OPTIONS.length]
  ];

  // Distribute hobbies
  const hobbiesSets = [
    ['Viajes y escapadas', 'Gastronomía y vinos', 'Fitness / Gym'],
    ['Música y festivales', 'Arte y fotografía', 'Cine y series'],
    ['Videojuegos y anime', 'Cine y series', 'Naturaleza y relax'],
    ['Baile y fiesta', 'Moda y shopping', 'Viajes y escapadas'],
    ['Fitness / Gym', 'Naturaleza y relax', 'Gastronomía y vinos'],
    ['Arte y fotografía', 'Moda y shopping', 'Música y festivales'],
  ];
  const assignedHobbies = hobbiesSets[i % hobbiesSets.length];

  const isEscort = assignedLookingFor.includes('Soy Escort / Scort');

  return {
    id: i + 1,
    userIdCode: `MMC-${1000 + i}`,
    name,
    age: 20 + (i % 14),
    location: `${mun}, ${stateObj.state}`,
    state: stateObj.state,
    municipality: mun,
    image: `https://picsum.photos/seed/${i + 70}/400/500`,
    isProvider: isEscort || (i % 2 === 0),
    bio: isEscort 
      ? 'Atención exclusiva de alto nivel. Trato cálido, discreción inquebrantable e higiene impecable.'
      : 'Conexión auténtica, excelente química y momentos relajados sin prisas.',
    profileType: (['sex_worker', 'social', 'dom_sub', 'other_services', 'personal_contact'] as ProfileType[])[i % 5],
    userType: assignedGender,
    seeking: assignedLookingFor[0],
    role: assignedRole,
    gender: assignedGender,
    lookingFor: assignedLookingFor,
    logistics: assignedLogistics,
    safetyPractices: assignedSafety,
    sexualPreferences: assignedPractices,
    bodyType: assignedBody,
    heightCategory: assignedHeight,
    hairColor: assignedHair,
    eyeColor: assignedEye,
    physicalFeatures: assignedFeatures,
    hobbies: assignedHobbies,
    isVerified: i % 2 === 0,
    verificationDoc: i % 4 === 0 ? 'Pasaporte' : 'INE',
    rating: 4.8,
    reviewsCount: 12 + (i * 3),
    onlineStatus: i % 3 === 0 ? 'online' : i % 3 === 1 ? 'incognito' : 'offline',
    topPosition: i < 4,
    landingSlug: name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + (i + 1)
  };
});

interface ExplorePageProps {
  onViewProfile?: (profile: Profile) => void;
  onNavigate?: (page: Page) => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onViewProfile, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  
  // Advanced filters states
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterLookingFor, setFilterLookingFor] = useState<string>('all');
  
  // Multi-select arrays
  const [filterLogistics, setFilterLogistics] = useState<string[]>([]);
  const [filterSafety, setFilterSafety] = useState<string[]>([]);
  const [filterSexualPreferences, setFilterSexualPreferences] = useState<string[]>([]);
  
  // Physical traits
  const [filterBodyType, setFilterBodyType] = useState<string>('all');
  const [filterHeight, setFilterHeight] = useState<string>('all');
  const [filterHairColor, setFilterHairColor] = useState<string>('all');
  const [filterEyeColor, setFilterEyeColor] = useState<string>('all');
  const [filterPhysicalFeatures, setFilterPhysicalFeatures] = useState<string[]>([]);

  // Hobbies
  const [filterHobbies, setFilterHobbies] = useState<string[]>([]);

  // Toggles
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [filterTopOnly, setFilterTopOnly] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Accordion collapsed states for cleaner sidebar navigation
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    identity: true,
    intent: true,
    logistics: true,
    safety: true,
    practices: true,
    physical: true,
    hobbies: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Active municipios depending on state selection
  const availableMunicipios = useMemo(() => {
    if (selectedState === 'all') return [];
    const found = MEXICO_STATES_DATA.find(s => s.state === selectedState);
    return found ? found.municipios : [];
  }, [selectedState]);

  // Array togglers helper
  const toggleArrayItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedState('all');
    setSelectedMunicipality('all');
    setFilterRole('all');
    setFilterGender('all');
    setFilterLookingFor('all');
    setFilterLogistics([]);
    setFilterSafety([]);
    setFilterSexualPreferences([]);
    setFilterBodyType('all');
    setFilterHeight('all');
    setFilterHairColor('all');
    setFilterEyeColor('all');
    setFilterPhysicalFeatures([]);
    setFilterHobbies([]);
    setFilterVerifiedOnly(false);
    setFilterTopOnly(false);
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedState !== 'all') count++;
    if (selectedMunicipality !== 'all') count++;
    if (filterRole !== 'all') count++;
    if (filterGender !== 'all') count++;
    if (filterLookingFor !== 'all') count++;
    if (filterBodyType !== 'all') count++;
    if (filterHeight !== 'all') count++;
    if (filterHairColor !== 'all') count++;
    if (filterEyeColor !== 'all') count++;
    if (filterVerifiedOnly) count++;
    if (filterTopOnly) count++;
    count += filterLogistics.length;
    count += filterSafety.length;
    count += filterSexualPreferences.length;
    count += filterPhysicalFeatures.length;
    count += filterHobbies.length;
    return count;
  }, [
    selectedState, selectedMunicipality, filterRole, filterGender, filterLookingFor,
    filterBodyType, filterHeight, filterHairColor, filterEyeColor, filterVerifiedOnly,
    filterTopOnly, filterLogistics, filterSafety, filterSexualPreferences,
    filterPhysicalFeatures, filterHobbies
  ]);

  // Filtering engine
  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = profile.name.toLowerCase().includes(query);
        const matchesBio = profile.bio.toLowerCase().includes(query);
        const matchesLoc = (profile.location || '').toLowerCase().includes(query);
        const matchesRole = (profile.role || '').toLowerCase().includes(query);
        const matchesGender = (profile.gender || '').toLowerCase().includes(query);
        if (!matchesName && !matchesBio && !matchesLoc && !matchesRole && !matchesGender) {
          return false;
        }
      }

      // Location
      if (selectedState !== 'all' && profile.state !== selectedState) return false;
      if (selectedMunicipality !== 'all' && profile.municipality !== selectedMunicipality) return false;

      // Role
      if (filterRole !== 'all' && profile.role !== filterRole) return false;

      // Gender (including Pareja Trans y Trans, Pareja H y Trans, Pareja H y H)
      if (filterGender !== 'all' && profile.gender !== filterGender) return false;

      // Looking for (¿Qué busco?)
      if (filterLookingFor !== 'all') {
        if (!profile.lookingFor || !profile.lookingFor.includes(filterLookingFor)) {
          return false;
        }
      }

      // Logistics (Con lugar, Sin lugar, Motel)
      if (filterLogistics.length > 0) {
        const hasAnyLogistics = filterLogistics.some(item => profile.logistics?.includes(item));
        if (!hasAnyLogistics) return false;
      }

      // Safety (Solo con condón, A pelo, No drogas, Dulces)
      if (filterSafety.length > 0) {
        const hasAnySafety = filterSafety.some(item => profile.safetyPractices?.includes(item));
        if (!hasAnySafety) return false;
      }

      // Sexual preferences / practices (Feminización, Fisting, Cruising, Gangbang, 2 Romano, etc.)
      if (filterSexualPreferences.length > 0) {
        const hasAnyPractice = filterSexualPreferences.some(item => profile.sexualPreferences?.includes(item));
        if (!hasAnyPractice) return false;
      }

      // Physical traits
      if (filterBodyType !== 'all' && profile.bodyType !== filterBodyType) return false;
      if (filterHeight !== 'all' && profile.heightCategory !== filterHeight) return false;
      if (filterHairColor !== 'all' && profile.hairColor !== filterHairColor) return false;
      if (filterEyeColor !== 'all' && profile.eyeColor !== filterEyeColor) return false;
      if (filterPhysicalFeatures.length > 0) {
        const hasAnyFeature = filterPhysicalFeatures.some(f => profile.physicalFeatures?.includes(f));
        if (!hasAnyFeature) return false;
      }

      // Hobbies
      if (filterHobbies.length > 0) {
        const hasAnyHobby = filterHobbies.some(h => profile.hobbies?.includes(h));
        if (!hasAnyHobby) return false;
      }

      // Verified & Top
      if (filterVerifiedOnly && !profile.isVerified) return false;
      if (filterTopOnly && !profile.topPosition) return false;

      return true;
    });
  }, [
    searchTerm, selectedState, selectedMunicipality, filterRole, filterGender,
    filterLookingFor, filterLogistics, filterSafety, filterSexualPreferences,
    filterBodyType, filterHeight, filterHairColor, filterEyeColor,
    filterPhysicalFeatures, filterHobbies, filterVerifiedOnly, filterTopOnly
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-16">
      {/* Top Header Banner */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-500" />
              <span>Explorador & Filtros Avanzados</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Filtra con precisión: Género, Rol, Qué Busco, Prácticas Íntimas, Logística y Rasgos Físicos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold py-2 px-3 rounded-lg border border-neutral-700"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-400" />
              <span>Filtros Avanzados {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 py-1.5 px-2.5 rounded border border-neutral-800 bg-neutral-900 transition-colors"
                title="Reiniciar todos los filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-80 shrink-0">
            <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
              
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-bold text-white">Filtros Activos</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Limpiar</span>
                  </button>
                )}
              </div>

              {/* 1. Ubicación (Estado & Municipio) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Ubicación
                </span>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Estado</label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedMunicipality('all');
                    }}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  >
                    <option value="all">Todos los Estados (México)</option>
                    {MEXICO_STATES_DATA.map((st) => (
                      <option key={st.state} value={st.state}>{st.state}</option>
                    ))}
                  </select>
                </div>

                {selectedState !== 'all' && (
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Municipio / Alcaldía</label>
                    <select
                      value={selectedMunicipality}
                      onChange={(e) => setSelectedMunicipality(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    >
                      <option value="all">Todos los municipios</option>
                      {availableMunicipios.map((mun) => (
                        <option key={mun} value={mun}>{mun}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* 2. Identidad: Rol & Género (Including Pareja Trans y Trans, Pareja H y Trans, Pareja H y H) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('identity')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-rose-400" /> Rol & Género
                  </span>
                  {expandedSections.identity ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.identity && (
                  <div className="space-y-3 pt-1">
                    {/* Preferencia de Rol */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">Preferencia de Rol</label>
                      <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      >
                        <option value="all">Todos los roles</option>
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    {/* Género */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">
                        Identidad de Género / Modalidad
                      </label>
                      <select
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      >
                        <option value="all">Todos los géneros / parejas</option>
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {['Pareja Trans y Trans', 'Pareja H y Trans', 'Pareja H y H'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setFilterGender(filterGender === item ? 'all' : item)}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                              filterGender === item
                                ? 'bg-rose-900/60 border-rose-500 text-white font-medium'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Intención: ¿Qué busco? (Including Soy Escort / Scort, No pago por sexo, Grabar contenido) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('intent')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-400" /> ¿Qué Busco? / Intención
                  </span>
                  {expandedSections.intent ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.intent && (
                  <div className="space-y-2 pt-1">
                    <select
                      value={filterLookingFor}
                      onChange={(e) => setFilterLookingFor(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    >
                      <option value="all">Cualquier intención / búsqueda</option>
                      {LOOKING_FOR_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Soy Escort / Scort', 'No pago por sexo', 'Grabar contenido'].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setFilterLookingFor(filterLookingFor === item ? 'all' : item)}
                          className={`text-[10px] px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                            filterLookingFor === item
                              ? 'bg-amber-950/70 border-amber-500 text-amber-300 font-semibold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {filterLookingFor === item && <Check className="w-2.5 h-2.5" />}
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Logística del Encuentro (Con lugar, Sin lugar, Motel, etc.) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('logistics')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> Logística de Encuentro
                  </span>
                  {expandedSections.logistics ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.logistics && (
                  <div className="space-y-1.5 pt-1">
                    {LOGISTICS_OPTIONS.map((item) => {
                      const selected = filterLogistics.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem(filterLogistics, setFilterLogistics, item)}
                          className={`w-full text-left text-xs p-2 rounded-md border transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-blue-950/40 border-blue-500/80 text-blue-200'
                              : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <span>{item}</span>
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${selected ? 'bg-blue-600 border-blue-500 text-white' : 'border-neutral-700'}`}>
                            {selected && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. Cuidado & Salud Sexual (Solo con condón, A pelo, No drogas, Dulces) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('safety')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cuidado, Salud & Prevención
                  </span>
                  {expandedSections.safety ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.safety && (
                  <div className="space-y-1.5 pt-1">
                    {SAFETY_PRACTICES_OPTIONS.map((item) => {
                      const selected = filterSafety.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem(filterSafety, setFilterSafety, item)}
                          className={`w-full text-left text-xs p-2 rounded-md border transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                              : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <span>{item}</span>
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${selected ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-neutral-700'}`}>
                            {selected && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 6. Gustos & Prácticas Sexuales (Feminización, Fisting, Cruising, Gangbang, 2 Romano, etc.) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('practices')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-500" /> Gustos & Prácticas Sexuales
                    {filterSexualPreferences.length > 0 && (
                      <span className="text-[10px] bg-rose-950 border border-rose-800 text-rose-300 px-1.5 rounded">
                        {filterSexualPreferences.length}
                      </span>
                    )}
                  </span>
                  {expandedSections.practices ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.practices && (
                  <div className="pt-1">
                    <p className="text-[11px] text-neutral-400 mb-2">Selecciona las prácticas de tu preferencia:</p>
                    <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
                      {SEXUAL_PRACTICES_OPTIONS.map((item) => {
                        const selected = filterSexualPreferences.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleArrayItem(filterSexualPreferences, setFilterSexualPreferences, item)}
                            className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                              selected
                                ? 'bg-rose-900/60 border-rose-500 text-white font-medium shadow-sm'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            {selected && '✓ '}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 7. Rasgos Físicos & Apariencia (Complexión, Estatura, Cabello, Ojos) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('physical')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" /> Rasgos Físicos & Apariencia
                  </span>
                  {expandedSections.physical ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.physical && (
                  <div className="space-y-2.5 pt-1">
                    {/* Complexión */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">Complexión</label>
                      <select
                        value={filterBodyType}
                        onChange={(e) => setFilterBodyType(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      >
                        <option value="all">Cualquier complexión</option>
                        {BODY_TYPE_OPTIONS.map((bt) => (
                          <option key={bt} value={bt}>{bt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Estatura */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">Estatura</label>
                      <select
                        value={filterHeight}
                        onChange={(e) => setFilterHeight(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      >
                        <option value="all">Cualquier estatura</option>
                        {HEIGHT_OPTIONS.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>

                    {/* Color de Cabello */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">Color de Cabello</label>
                      <select
                        value={filterHairColor}
                        onChange={(e) => setFilterHairColor(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      >
                        <option value="all">Cualquier color de cabello</option>
                        {HAIR_COLOR_OPTIONS.map((hc) => (
                          <option key={hc} value={hc}>{hc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Color de Ojos */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">Color de Ojos</label>
                      <select
                        value={filterEyeColor}
                        onChange={(e) => setFilterEyeColor(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                      >
                        <option value="all">Cualquier color de ojos</option>
                        {EYE_COLOR_OPTIONS.map((ec) => (
                          <option key={ec} value={ec}>{ec}</option>
                        ))}
                      </select>
                    </div>

                    {/* Atributos / Rasgos distintivos */}
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1.5">Atributos distintivos</label>
                      <div className="flex flex-wrap gap-1">
                        {PHYSICAL_FEATURES_OPTIONS.map((item) => {
                          const selected = filterPhysicalFeatures.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleArrayItem(filterPhysicalFeatures, setFilterPhysicalFeatures, item)}
                              className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                                selected
                                  ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-medium'
                                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {selected && '✓ '}
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 8. Pasatiempos (Hobbies) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('hobbies')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-neutral-400" /> Pasatiempos (Hobbies)
                    {filterHobbies.length > 0 && (
                      <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 rounded">
                        {filterHobbies.length}
                      </span>
                    )}
                  </span>
                  {expandedSections.hobbies ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.hobbies && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {HOBBIES_OPTIONS.map((hobby) => {
                      const selected = filterHobbies.includes(hobby);
                      return (
                        <button
                          key={hobby}
                          type="button"
                          onClick={() => toggleArrayItem(filterHobbies, setFilterHobbies, hobby)}
                          className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                            selected
                              ? 'bg-neutral-800 border-neutral-600 text-white font-medium'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {selected && '✓ '}
                          {hobby}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 9. Verificados & Top */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={filterVerifiedOnly}
                    onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-950 text-rose-600 focus:ring-0"
                  />
                  <span>Sólo perfiles verificados (INE/Pasaporte)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={filterTopOnly}
                    onChange={(e) => setFilterTopOnly(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-950 text-amber-400 focus:ring-0"
                  />
                  <span>Sólo posiciones Top VIP destacadas</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Main Profiles Content Area */}
          <main className="flex-1 min-w-0">
            {/* Search Input and Status bar */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 mb-4 shadow-sm">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, palabra clave, fetiche, gustos o municipio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs sm:text-sm rounded-lg pl-9 pr-8 py-2.5 focus:border-neutral-600 focus:outline-none transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Active Filter Badges/Pills */}
              {activeFiltersCount > 0 && (
                <div className="mt-3 pt-3 border-t border-neutral-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-neutral-500 mr-1">Filtros aplicados:</span>

                  {selectedState !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      📍 {selectedState}
                      <button onClick={() => setSelectedState('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {selectedMunicipality !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      🏙 {selectedMunicipality}
                      <button onClick={() => setSelectedMunicipality('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterRole !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-amber-950/60 border border-amber-800 text-amber-200 px-2 py-0.5 rounded-md">
                      Rol: {filterRole}
                      <button onClick={() => setFilterRole('all')} className="hover:text-amber-400"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterGender !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-rose-950/60 border border-rose-800 text-rose-200 px-2 py-0.5 rounded-md">
                      Género: {filterGender}
                      <button onClick={() => setFilterGender('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterLookingFor !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      Busca: {filterLookingFor}
                      <button onClick={() => setFilterLookingFor('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterLogistics.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-blue-950/60 border border-blue-800 text-blue-200 px-2 py-0.5 rounded-md">
                      📍 {item}
                      <button onClick={() => toggleArrayItem(filterLogistics, setFilterLogistics, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterSafety.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-emerald-950/60 border border-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md">
                      🛡 {item}
                      <button onClick={() => toggleArrayItem(filterSafety, setFilterSafety, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterSexualPreferences.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-rose-950/60 border border-rose-800 text-rose-200 px-2 py-0.5 rounded-md">
                      🔥 {item}
                      <button onClick={() => toggleArrayItem(filterSexualPreferences, setFilterSexualPreferences, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterBodyType !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      Cuerpo: {filterBodyType}
                      <button onClick={() => setFilterBodyType('all')}><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterHeight !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      Estatura: {filterHeight}
                      <button onClick={() => setFilterHeight('all')}><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterHairColor !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      Cabello: {filterHairColor}
                      <button onClick={() => setFilterHairColor('all')}><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterEyeColor !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      Ojos: {filterEyeColor}
                      <button onClick={() => setFilterEyeColor('all')}><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterPhysicalFeatures.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      ✨ {item}
                      <button onClick={() => toggleArrayItem(filterPhysicalFeatures, setFilterPhysicalFeatures, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-rose-400 hover:underline ml-1"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}
            </div>

            {/* Results Count Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-neutral-400">
                Mostrando <strong className="text-neutral-200">{filteredProfiles.length}</strong> de {mockProfiles.length} perfiles disponibles
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-500 hidden sm:inline">Ordenado por: Relevancia y Actividad</span>
              </div>
            </div>

            {/* Profile Grid */}
            {filteredProfiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map(profile => (
                  <ProfileCard key={profile.id} profile={profile} onViewProfile={onViewProfile} />
                ))}
              </div>
            ) : (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-200">No encontramos perfiles con estos filtros exactos</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Prueba reduciendo o desmarcando algunas de las opciones seleccionadas (como prácticas sexuales específicas o rasgos físicos) para ver más resultados.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restablecer Filtros</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm md:hidden">
          <div className="w-full max-w-md bg-neutral-950 h-full flex flex-col border-r border-neutral-800">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-bold text-white">Filtros Avanzados</h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Location */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Ubicación</span>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedMunicipality('all');
                  }}
                  className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2"
                >
                  <option value="all">Todos los Estados (México)</option>
                  {MEXICO_STATES_DATA.map((st) => (
                    <option key={st.state} value={st.state}>{st.state}</option>
                  ))}
                </select>
                {selectedState !== 'all' && (
                  <select
                    value={selectedMunicipality}
                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2"
                  >
                    <option value="all">Todos los municipios</option>
                    {availableMunicipios.map((mun) => (
                      <option key={mun} value={mun}>{mun}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Role & Gender */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Rol & Género</span>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Preferencia de Rol</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2"
                  >
                    <option value="all">Todos los roles</option>
                    {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Género / Modalidad</label>
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2"
                  >
                    <option value="all">Todos los géneros / parejas</option>
                    {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Qué Busco */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">¿Qué Busco?</span>
                <select
                  value={filterLookingFor}
                  onChange={(e) => setFilterLookingFor(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-2"
                >
                  <option value="all">Cualquier intención</option>
                  {LOOKING_FOR_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Logistics */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Logística de Encuentro</span>
                <div className="flex flex-wrap gap-1.5">
                  {LOGISTICS_OPTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleArrayItem(filterLogistics, setFilterLogistics, item)}
                      className={`text-xs px-2.5 py-1 rounded border ${
                        filterLogistics.includes(item)
                          ? 'bg-blue-900/60 border-blue-500 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Safety */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Salud & Prevención</span>
                <div className="flex flex-wrap gap-1.5">
                  {SAFETY_PRACTICES_OPTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleArrayItem(filterSafety, setFilterSafety, item)}
                      className={`text-xs px-2.5 py-1 rounded border ${
                        filterSafety.includes(item)
                          ? 'bg-emerald-900/60 border-emerald-500 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sexual practices */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Gustos & Prácticas</span>
                <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto">
                  {SEXUAL_PRACTICES_OPTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleArrayItem(filterSexualPreferences, setFilterSexualPreferences, item)}
                      className={`text-[11px] px-2 py-1 rounded border ${
                        filterSexualPreferences.includes(item)
                          ? 'bg-rose-900/60 border-rose-500 text-white font-medium'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical traits */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Rasgos Físicos</span>
                <div className="space-y-2">
                  <select
                    value={filterBodyType}
                    onChange={(e) => setFilterBodyType(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5"
                  >
                    <option value="all">Complexión (todas)</option>
                    {BODY_TYPE_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select
                    value={filterHeight}
                    onChange={(e) => setFilterHeight(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5"
                  >
                    <option value="all">Estatura (todas)</option>
                    {HEIGHT_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <select
                    value={filterHairColor}
                    onChange={(e) => setFilterHairColor(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5"
                  >
                    <option value="all">Color de cabello (todos)</option>
                    {HAIR_COLOR_OPTIONS.map((hc) => <option key={hc} value={hc}>{hc}</option>)}
                  </select>
                  <select
                    value={filterEyeColor}
                    onChange={(e) => setFilterEyeColor(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-md p-1.5"
                  >
                    <option value="all">Color de ojos (todos)</option>
                    {EYE_COLOR_OPTIONS.map((ec) => <option key={ec} value={ec}>{ec}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-neutral-800 flex items-center gap-2 bg-neutral-900">
              <button
                onClick={handleResetFilters}
                className="w-1/3 py-2 text-xs text-neutral-400 bg-neutral-800 rounded-lg hover:text-white"
              >
                Limpiar
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-2/3 py-2 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-500 shadow"
              >
                Ver {filteredProfiles.length} Resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;

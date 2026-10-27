import React, { useState, useMemo } from 'react';
import { Profile, ProfileType, Page } from '../../types';
import ProfileCard from '../common/ProfileCard';
import { MEXICO_STATES_DATA } from '../../src/data/mexicoLocations';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Flame, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  Search,
  HeartHandshake,
  Activity,
  Compass,
  Palette,
  Eye,
  Ruler,
  Users,
  Sparkles,
  Heart,
  Lock
} from 'lucide-react';
import { useFavorites } from '../../src/utils/favorites';

export const ROLE_OPTIONS = [
  'Activo',
  'Pasivo',
  'Versátil',
  'Versátil Activo',
  'Versátil Pasivo',
  'Ama / Dominante',
  'Sumiso / Esclavo',
  'Solo Oral / Intercambio',
  'Intercambio de roles'
] as const;

export const GENDER_OPTIONS = [
  'Mujer Trans',
  'Pareja Trans y Trans',
  'Pareja H y Trans',
  'Pareja H y H',
  'Chica Cis',
  'TV (Travesti)',
  'Sissy',
  'Fem / Femboy',
  'Hombre Cis',
  'Hombre Trans',
  'No binario',
  'Pareja (H y M)'
] as const;

export const LOOKING_FOR_OPTIONS = [
  'Soy Escort / Scort',
  'Feminización',
  'Fisting',
  'Cruising',
  'Gangbang',
  'Voyerismo',
  'Exhibicionismo',
  'Tríos',
  '2 Romano (DP)',
  'Rapidín',
  'Ver nopor',
  'Masturbación mutua',
  'XXL / Dotados',
  'Morbo / Dirty talk',
  'Transformación',
  'No pago por sexo',
  'Grabar contenido',
  'Juguetes eróticos',
  'BDSM / Kink',
  'Encuentro casual',
  'Citas y romance',
  'Trato de novios (GFE)',
  'Discreción absoluta',
  'Eventos y salidas',
  'Amistad y buen rollo'
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
  'BDSM / Dominación',
  'Oral apasionado',
  'Lencería y tacones',
  'Masajes eróticos',
  'Roleplay'
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

export const HEIGHT_OPTIONS = [
  'Petit (< 1.60 m)',
  'Media (1.60 m - 1.70 m)',
  'Media-Alta (1.70 m - 1.80 m)',
  'Alta (> 1.80 m)'
] as const;

export const EYE_COLOR_OPTIONS = [
  { label: 'Cafés / Castaños', hex: '#5c3818' },
  { label: 'Negros', hex: '#1c1917' },
  { label: 'Verdes / Claros', hex: '#15803d' },
  { label: 'Azules', hex: '#0284c7' },
  { label: 'Miel / Ámbar', hex: '#d97706' }
] as const;

export const HAIR_COLOR_OPTIONS = [
  { label: 'Negro', hex: '#171717' },
  { label: 'Castaño', hex: '#5c3818' },
  { label: 'Rubio', hex: '#eab308' },
  { label: 'Pelirrojo', hex: '#ea580c' },
  { label: 'Fantasía / Teñido', hex: '#ec4899' },
  { label: 'Rapado / Calvo', hex: '#737373' }
] as const;

export const BODY_TYPE_OPTIONS = [
  'Delgada / Slim',
  'Atlética / Fitness',
  'Curvy / Curvilínea',
  'Normal / Media',
  'Musculosa',
  'Robusta / Chubby'
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

// 32 Rich diverse mock profiles covering all newly added options
const mockProfiles: Profile[] = Array.from({ length: 32 }, (_, i) => {
  const stateObj = MEXICO_STATES_DATA[i % MEXICO_STATES_DATA.length];
  const mun = stateObj.municipios[i % stateObj.municipios.length];

  const profileDossiers = [
    {
      name: 'Pareja Nicole & Samantha',
      gender: 'Pareja Trans y Trans',
      role: 'Versátil',
      lookingFor: ['Soy Escort / Scort', 'Tríos', 'Voyerismo', 'Grabar contenido'],
      practices: ['Tríos', 'Voyerismo', 'Feminización', 'Lencería y tacones', 'Juguetes eróticos'],
      bodyType: 'Curvy / Curvilínea',
      height: 'Media (1.60 m - 1.70 m)',
      hair: 'Castaño',
      eye: 'Cafés / Castaños',
      features: ['Tatuajes', 'Piercings'],
      logistics: ['Con lugar propio', 'Motel / Hotel'],
      safety: ['Solo con condón', 'No drogas (Cero sustancias)', 'Pruebas de salud al día'],
      hobbies: ['Arte y fotografía', 'Viajes y escapadas', 'Moda y shopping'],
      bio: 'Dúo de chicas trans en complicidad total. Encuentros para parejas y caballeros educados con discreción absoluta.'
    },
    {
      name: 'Pareja Alex & Dani',
      gender: 'Pareja H y Trans',
      role: 'Versátil Activo',
      lookingFor: ['Soy Escort / Scort', 'Gangbang', '2 Romano (DP)', 'Tríos'],
      practices: ['Gangbang', '2 Romano (DP)', 'Morbo / Dirty talk', 'Oral apasionado'],
      bodyType: 'Atlética / Fitness',
      height: 'Alta (> 1.80 m)',
      hair: 'Negro',
      eye: 'Negros',
      features: ['Tatuajes', 'Depilación total'],
      logistics: ['Con lugar propio'],
      safety: ['Solo con condón', 'Pruebas de salud al día'],
      hobbies: ['Fitness / Gym', 'Cine y series', 'Música y festivales'],
      bio: 'Pareja joven (él chico fitness, ella bella chica trans). Fantasías compartidas, tríos y dobles penetraciones reales.'
    },
    {
      name: 'Pareja Leo & Max',
      gender: 'Pareja H y H',
      role: 'Intercambio de roles',
      lookingFor: ['Cruising', 'Encuentro casual', 'Rapidín', 'Ver nopor'],
      practices: ['Cruising', 'Rapidín', 'Masturbación mutua', 'Ver nopor', 'XXL / Dotados'],
      bodyType: 'Musculosa',
      height: 'Media-Alta (1.70 m - 1.80 m)',
      hair: 'Castaño',
      eye: 'Miel / Ámbar',
      features: ['Vello natural / Barba'],
      logistics: ['Auto / Cruising', 'Motel / Hotel'],
      safety: ['A pelo (Bareback / PrEP)', 'Pruebas de salud al día'],
      hobbies: ['Fitness / Gym', 'Videojuegos y anime', 'Baile y fiesta'],
      bio: 'Chicos cómplices de mente abierta. Cruising nocturno, acción rápida y complicidad sin complicaciones.'
    },
    {
      name: 'Valeria Diamond',
      gender: 'Mujer Trans',
      role: 'Pasivo',
      lookingFor: ['Soy Escort / Scort', 'Feminización', 'Transformación', 'Juguetes eróticos'],
      practices: ['Feminización', 'Transformación', 'Lencería y tacones', 'Juguetes eróticos', 'Masajes eróticos'],
      bodyType: 'Delgada / Slim',
      height: 'Media (1.60 m - 1.70 m)',
      hair: 'Rubio',
      eye: 'Verdes / Claros',
      features: ['Depilación total'],
      logistics: ['Con lugar propio', 'Motel / Hotel'],
      safety: ['Solo con condón', 'No drogas (Cero sustancias)'],
      hobbies: ['Moda y shopping', 'Gastronomía y vinos', 'Viajes y escapadas'],
      bio: 'Diosa de la feminización y glamour. Te transformo en sumisa o disfruto ser tu muñeca consentida.'
    },
    {
      name: 'Kassandra Fox',
      gender: 'Mujer Trans',
      role: 'Ama / Dominante',
      lookingFor: ['Soy Escort / Scort', 'Fisting', 'BDSM / Kink', 'XXL / Dotados'],
      practices: ['Fisting', 'BDSM / Dominación', 'XXL / Dotados', 'Morbo / Dirty talk'],
      bodyType: 'Atlética / Fitness',
      height: 'Alta (> 1.80 m)',
      hair: 'Negro',
      eye: 'Negros',
      features: ['Tatuajes', 'Piercings'],
      logistics: ['Con lugar propio'],
      safety: ['Solo con condón', 'Pruebas de salud al día'],
      hobbies: ['Fitness / Gym', 'Arte y fotografía'],
      bio: 'Dominación sensual y extrema, fisting consentido y sesiones BDSM en mazmorra privada acondicionada.'
    },
    {
      name: 'Luna Travesti Glam',
      gender: 'TV (Travesti)',
      role: 'Versátil',
      lookingFor: ['Feminización', 'Transformación', 'No pago por sexo', 'Amistad y buen rollo'],
      practices: ['Feminización', 'Transformación', 'Lencería y tacones', 'Oral apasionado'],
      bodyType: 'Normal / Media',
      height: 'Media-Alta (1.70 m - 1.80 m)',
      hair: 'Fantasía / Teñido',
      eye: 'Cafés / Castaños',
      features: ['Depilación total'],
      logistics: ['Sin lugar (a domicilio / motel)', 'Motel / Hotel'],
      safety: ['Solo con condón', 'No drogas (Cero sustancias)'],
      hobbies: ['Música y festivales', 'Cine y series'],
      bio: 'Travesti pasional con vestuario exclusivo. Sesiones de maquillaje, tacones y desinhibición total.'
    },
    {
      name: 'Sissy Mia',
      gender: 'Sissy',
      role: 'Sumiso / Esclavo',
      lookingFor: ['Feminización', 'Voyerismo', 'Exhibicionismo', 'Ver nopor'],
      practices: ['Feminización', 'Voyerismo', 'Exhibicionismo', 'Ver nopor', 'Masturbación mutua'],
      bodyType: 'Petit (< 1.60 m)',
      height: 'Petit (< 1.60 m)',
      hair: 'Rubio',
      eye: 'Azules',
      features: ['Depilación total'],
      logistics: ['Sin lugar (a domicilio / motel)'],
      safety: ['Solo con condón', 'No drogas (Cero sustancias)'],
      hobbies: ['Videojuegos y anime', 'Moda y shopping'],
      bio: 'Pequeña sissy sumisa dispuesta a complacer. Me encanta el voyerismo, usar lencería de encaje y servir.'
    },
    {
      name: 'Pareja Carlos & Luna',
      gender: 'Pareja H y Trans',
      role: 'Versátil',
      lookingFor: ['Soy Escort / Scort', 'Gangbang', 'Cruising', 'Tríos'],
      practices: ['Gangbang', 'Cruising', 'Tríos', 'Morbo / Dirty talk', 'XXL / Dotados'],
      bodyType: 'Curvy / Curvilínea',
      height: 'Media (1.60 m - 1.70 m)',
      hair: 'Castaño',
      eye: 'Miel / Ámbar',
      features: ['Tatuajes'],
      logistics: ['Motel / Hotel', 'Auto / Cruising'],
      safety: ['Solo con condón', 'Pruebas de salud al día'],
      hobbies: ['Viajes y escapadas', 'Gastronomía y vinos'],
      bio: 'Encuentros intensos para caballeros que buscan experiencias de trío y gangbang seguro y discreto.'
    },
    {
      name: 'Zafiro Blue',
      gender: 'Mujer Trans',
      role: 'Activo',
      lookingFor: ['Soy Escort / Scort', 'XXL / Dotados', 'Rapidín', '2 Romano (DP)'],
      practices: ['XXL / Dotados', 'Rapidín', '2 Romano (DP)', 'Oral apasionado'],
      bodyType: 'Robusta / Chubby',
      height: 'Alta (> 1.80 m)',
      hair: 'Negro',
      eye: 'Cafés / Castaños',
      features: ['Tatuajes'],
      logistics: ['Con lugar propio'],
      safety: ['Solo con condón'],
      hobbies: ['Cine y series', 'Gastronomía y vinos'],
      bio: 'Activa dotada con gran tamaño y potencia. Trato varonil para complacer a pasivos y parejas curiosas.'
    },
    {
      name: 'Alexa & Brenda (Doble Trans)',
      gender: 'Pareja Trans y Trans',
      role: 'Versátil Pasivo',
      lookingFor: ['Soy Escort / Scort', 'Grabar contenido', 'Tríos', 'Voyerismo'],
      practices: ['Tríos', 'Voyerismo', 'Exhibicionismo', 'Juguetes eróticos', 'Feminización'],
      bodyType: 'Atlética / Fitness',
      height: 'Media-Alta (1.70 m - 1.80 m)',
      hair: 'Pelirrojo',
      eye: 'Verdes / Claros',
      features: ['Piercings', 'Depilación total'],
      logistics: ['Con lugar propio', 'Motel / Hotel'],
      safety: ['Solo con condón', 'Pruebas de salud al día'],
      hobbies: ['Arte y fotografía', 'Viajes y escapadas'],
      bio: 'Dos muñecas trans dispuestas a cumplir tus fantasías más secretas. Grabación consentida y voyerismo.'
    },
    {
      name: 'Mateo & Sergio',
      gender: 'Pareja H y H',
      role: 'Activo',
      lookingFor: ['No pago por sexo', 'Cruising', 'Rapidín', 'Masturbación mutua'],
      practices: ['Cruising', 'Rapidín', 'Masturbación mutua', 'Ver nopor'],
      bodyType: 'Atlética / Fitness',
      height: 'Media-Alta (1.70 m - 1.80 m)',
      hair: 'Rapado / Calvo',
      eye: 'Negros',
      features: ['Vello natural / Barba', 'Tatuajes'],
      logistics: ['Auto / Cruising'],
      safety: ['A pelo (Bareback / PrEP)', 'Dulces (Chem / Ambiente)'],
      hobbies: ['Fitness / Gym', 'Baile y fiesta'],
      bio: 'Chicos morenos atléticos para encuentros espontáneos, cruising sobre ruedas y química inmediata.'
    },
    {
      name: 'Aurora Ross',
      gender: 'Mujer Trans',
      role: 'Solo Oral / Intercambio',
      lookingFor: ['No pago por sexo', 'Grabar contenido', 'Discreción absoluta', 'Amistad y buen rollo'],
      practices: ['Oral apasionado', 'Ver nopor', 'Masturbación mutua', 'Lencería y tacones'],
      bodyType: 'Delgada / Slim',
      height: 'Petit (< 1.60 m)',
      hair: 'Fantasía / Teñido',
      eye: 'Azules',
      features: ['Piercings'],
      logistics: ['Sin lugar (a domicilio / motel)'],
      safety: ['Solo con condón', 'No drogas (Cero sustancias)', 'Pruebas de salud al día'],
      hobbies: ['Videojuegos y anime', 'Música y festivales'],
      bio: 'Chica trans alternativa. Me encanta crear contenido sensual y compartir momentos divertidos sin costo.'
    }
  ];

  const dossier = profileDossiers[i % profileDossiers.length];
  const isEscort = dossier.lookingFor.includes('Soy Escort / Scort');

  return {
    id: i + 1,
    userIdCode: `MMC-${1020 + i}`,
    name: i < profileDossiers.length ? dossier.name : `${dossier.name} ${i + 1}`,
    age: 21 + (i % 12),
    location: `${mun}, ${stateObj.state}`,
    state: stateObj.state,
    municipality: mun,
    image: `https://picsum.photos/seed/${i + 88}/400/500`,
    isProvider: isEscort || (i % 2 === 0),
    bio: dossier.bio,
    profileType: (isEscort ? 'sex_worker' : (['social', 'dom_sub', 'personal_contact'] as ProfileType[])[i % 3]),
    userType: dossier.gender,
    seeking: dossier.lookingFor[0],
    role: dossier.role,
    gender: dossier.gender,
    lookingFor: dossier.lookingFor,
    logistics: dossier.logistics,
    safetyPractices: dossier.safety,
    sexualPreferences: dossier.practices,
    bodyType: dossier.bodyType,
    heightCategory: dossier.height,
    hairColor: dossier.hair,
    eyeColor: dossier.eye,
    physicalFeatures: dossier.features,
    hobbies: dossier.hobbies,
    isVerified: i % 2 === 0,
    verificationDoc: i % 3 === 0 ? 'Pasaporte' : 'INE',
    rating: 4.9,
    reviewsCount: 14 + (i * 2),
    onlineStatus: i % 3 === 0 ? 'online' : i % 3 === 1 ? 'incognito' : 'offline',
    topPosition: i < 5,
    landingSlug: dossier.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + (i + 1)
  };
});

interface ExplorePageProps {
  onViewProfile?: (profile: Profile) => void;
  onNavigate?: (page: Page) => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onViewProfile, onNavigate }) => {
  const { count: favoritesCount, isFavorited } = useFavorites();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  
  // Expanded filter arrays for multi-selection
  const [filterRoles, setFilterRoles] = useState<string[]>([]);
  const [filterGenders, setFilterGenders] = useState<string[]>([]);
  const [filterLookingFor, setFilterLookingFor] = useState<string[]>([]);
  const [filterSexualPreferences, setFilterSexualPreferences] = useState<string[]>([]);
  const [filterLogistics, setFilterLogistics] = useState<string[]>([]);
  const [filterSafety, setFilterSafety] = useState<string[]>([]);
  
  // Physical traits
  const [filterHeights, setFilterHeights] = useState<string[]>([]);
  const [filterEyeColors, setFilterEyeColors] = useState<string[]>([]);
  const [filterHairColors, setFilterHairColors] = useState<string[]>([]);
  const [filterBodyTypes, setFilterBodyTypes] = useState<string[]>([]);
  const [filterPhysicalFeatures, setFilterPhysicalFeatures] = useState<string[]>([]);

  // Hobbies & Toggles
  const [filterHobbies, setFilterHobbies] = useState<string[]>([]);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [filterTopOnly, setFilterTopOnly] = useState<boolean>(false);
  const [filterOnlineOnly, setFilterOnlineOnly] = useState<boolean>(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Accordion collapsed states for sidebar navigation
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    identity: true,
    intent: true,
    practices: true,
    physical: true,
    safety: true,
    logistics: true,
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

  // Array toggler helper
  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedState('all');
    setSelectedMunicipality('all');
    setFilterRoles([]);
    setFilterGenders([]);
    setFilterLookingFor([]);
    setFilterSexualPreferences([]);
    setFilterLogistics([]);
    setFilterSafety([]);
    setFilterHeights([]);
    setFilterEyeColors([]);
    setFilterHairColors([]);
    setFilterBodyTypes([]);
    setFilterPhysicalFeatures([]);
    setFilterHobbies([]);
    setFilterVerifiedOnly(false);
    setFilterTopOnly(false);
    setFilterOnlineOnly(false);
    setFilterFavoritesOnly(false);
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedState !== 'all') count++;
    if (selectedMunicipality !== 'all') count++;
    if (filterVerifiedOnly) count++;
    if (filterTopOnly) count++;
    if (filterOnlineOnly) count++;
    if (filterFavoritesOnly) count++;
    count += filterRoles.length;
    count += filterGenders.length;
    count += filterLookingFor.length;
    count += filterSexualPreferences.length;
    count += filterLogistics.length;
    count += filterSafety.length;
    count += filterHeights.length;
    count += filterEyeColors.length;
    count += filterHairColors.length;
    count += filterBodyTypes.length;
    count += filterPhysicalFeatures.length;
    count += filterHobbies.length;
    return count;
  }, [
    selectedState, selectedMunicipality, filterVerifiedOnly, filterTopOnly, filterOnlineOnly,
    filterFavoritesOnly,
    filterRoles, filterGenders, filterLookingFor, filterSexualPreferences,
    filterLogistics, filterSafety, filterHeights, filterEyeColors, filterHairColors,
    filterBodyTypes, filterPhysicalFeatures, filterHobbies
  ]);

  // Filtering engine with comprehensive matching
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
        const matchesLookingFor = profile.lookingFor?.some(item => item.toLowerCase().includes(query));
        const matchesPractices = profile.sexualPreferences?.some(item => item.toLowerCase().includes(query));
        if (!matchesName && !matchesBio && !matchesLoc && !matchesRole && !matchesGender && !matchesLookingFor && !matchesPractices) {
          return false;
        }
      }

      // Location
      if (selectedState !== 'all' && profile.state !== selectedState) return false;
      if (selectedMunicipality !== 'all' && profile.municipality !== selectedMunicipality) return false;

      // Role filter (matches if any selected role matches)
      if (filterRoles.length > 0 && (!profile.role || !filterRoles.includes(profile.role))) {
        return false;
      }

      // Gender filter (specifically supports Pareja Trans y Trans, Pareja H y Trans, Pareja H y H, etc.)
      if (filterGenders.length > 0 && (!profile.gender || !filterGenders.includes(profile.gender))) {
        return false;
      }

      // What I'm Looking For filter (matches if profile has ANY of selected options)
      if (filterLookingFor.length > 0) {
        const hasLookingFor = filterLookingFor.some(item => profile.lookingFor?.includes(item));
        const hasPractice = filterLookingFor.some(item => profile.sexualPreferences?.includes(item));
        if (!hasLookingFor && !hasPractice) return false;
      }

      // Sexual practices / kinks
      if (filterSexualPreferences.length > 0) {
        const hasPractice = filterSexualPreferences.some(item => profile.sexualPreferences?.includes(item));
        if (!hasPractice) return false;
      }

      // Logistics (Con lugar, Sin lugar, Motel, etc.)
      if (filterLogistics.length > 0) {
        const hasLogistics = filterLogistics.some(item => profile.logistics?.includes(item));
        if (!hasLogistics) return false;
      }

      // Safety & Prevention (Solo con condón, A pelo, No drogas, Dulces)
      if (filterSafety.length > 0) {
        const hasSafety = filterSafety.some(item => profile.safetyPractices?.includes(item));
        if (!hasSafety) return false;
      }

      // Physical: Height (Estatura)
      if (filterHeights.length > 0 && (!profile.heightCategory || !filterHeights.includes(profile.heightCategory))) {
        return false;
      }

      // Physical: Eye Color (Color de ojos)
      if (filterEyeColors.length > 0 && (!profile.eyeColor || !filterEyeColors.includes(profile.eyeColor))) {
        return false;
      }

      // Physical: Hair Color (Color de cabello)
      if (filterHairColors.length > 0 && (!profile.hairColor || !filterHairColors.includes(profile.hairColor))) {
        return false;
      }

      // Physical: Body Type (Complexión)
      if (filterBodyTypes.length > 0 && (!profile.bodyType || !filterBodyTypes.includes(profile.bodyType))) {
        return false;
      }

      // Physical Features (Tatuajes, Piercings, etc.)
      if (filterPhysicalFeatures.length > 0) {
        const hasFeature = filterPhysicalFeatures.some(f => profile.physicalFeatures?.includes(f));
        if (!hasFeature) return false;
      }

      // Hobbies
      if (filterHobbies.length > 0) {
        const hasHobby = filterHobbies.some(h => profile.hobbies?.includes(h));
        if (!hasHobby) return false;
      }

      // Verified & Top & Online
      if (filterVerifiedOnly && !profile.isVerified) return false;
      if (filterTopOnly && !profile.topPosition) return false;
      if (filterOnlineOnly && profile.onlineStatus !== 'online') return false;

      // Favorites Only
      if (filterFavoritesOnly && !isFavorited(profile.id)) return false;

      return true;
    });
  }, [
    searchTerm, selectedState, selectedMunicipality, filterRoles, filterGenders,
    filterLookingFor, filterSexualPreferences, filterLogistics, filterSafety,
    filterHeights, filterEyeColors, filterHairColors, filterBodyTypes,
    filterPhysicalFeatures, filterHobbies, filterVerifiedOnly, filterTopOnly, filterOnlineOnly,
    filterFavoritesOnly, isFavorited
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-16">
      {/* Top Header Banner */}
      <div className="border-b border-neutral-800 bg-neutral-900/80 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-500" />
              <span>Explorador & Filtros Avanzados</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Taxonomía completa: Rol, Género & Parejas, Qué Busco, Prácticas Íntimas, Rasgos Físicos, Logística y Salud.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Favorites Filter Toggle */}
            <button
              onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
              className={`text-xs font-semibold py-1.5 px-3 rounded-lg border flex items-center gap-1.5 transition-colors ${
                filterFavoritesOnly
                  ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
              }`}
              title="Filtrar únicamente mis perfiles guardados"
            >
              <Heart className={`w-3.5 h-3.5 ${filterFavoritesOnly ? 'fill-current text-white' : 'text-rose-400'}`} />
              <span>Guardados {favoritesCount > 0 ? `(${favoritesCount})` : ''}</span>
            </button>

            {onNavigate && favoritesCount > 0 && (
              <button
                onClick={() => onNavigate('profile' as Page)}
                className="hidden sm:flex text-xs font-semibold py-1.5 px-3 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-amber-300 hover:text-white items-center gap-1.5 transition-colors"
                title="Abrir la sección de Favoritos en Mi Perfil"
              >
                <span>Bóveda ➔</span>
              </button>
            )}

            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold py-2 px-3 rounded-lg border border-neutral-700 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-400" />
              <span>Filtros Completos {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-neutral-800 bg-neutral-900 transition-colors"
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
                  <span className="text-sm font-bold text-white">Filtros Avanzados</span>
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
                    <span>Limpiar todo</span>
                  </button>
                )}
              </div>

              {/* 1. Ubicación (Estado & Municipio) */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-2.5">
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
                    className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
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
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    >
                      <option value="all">Todos los municipios</option>
                      {availableMunicipios.map((mun) => (
                        <option key={mun} value={mun}>{mun}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* 2. Identidad: Género / Modalidad (Destacando Pareja Trans y Trans, Pareja H y Trans, Pareja H y H) */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('identity')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-rose-400" /> Género & Modalidad
                    {filterGenders.length > 0 && (
                      <span className="bg-rose-950 border border-rose-800 text-rose-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {filterGenders.length}
                      </span>
                    )}
                  </span>
                  {expandedSections.identity ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.identity && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] text-neutral-400">Modalidades y géneros (selección múltiple):</p>
                    
                    {/* Featured Couplet tags */}
                    <div className="space-y-1 mb-2">
                      <span className="text-[10px] uppercase font-bold text-amber-400/90 tracking-wider block">
                        ★ Parejas Solicitadas
                      </span>
                      <div className="flex flex-col gap-1">
                        {['Pareja Trans y Trans', 'Pareja H y Trans', 'Pareja H y H'].map((item) => {
                          const selected = filterGenders.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleItem(filterGenders, setFilterGenders, item)}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                                selected
                                  ? 'bg-rose-950/70 border-rose-500 text-white font-semibold shadow-sm'
                                  : 'bg-neutral-950/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <span>{item}</span>
                              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] border ${selected ? 'bg-rose-600 border-rose-500 text-white' : 'border-neutral-700'}`}>
                                {selected && '✓'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Rest of gender identities */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {GENDER_OPTIONS.filter(g => !['Pareja Trans y Trans', 'Pareja H y Trans', 'Pareja H y H'].includes(g)).map((g) => {
                        const selected = filterGenders.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => toggleItem(filterGenders, setFilterGenders, g)}
                            className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                              selected
                                ? 'bg-rose-900/60 border-rose-500 text-white font-medium'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            {selected && '✓ '}
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Preferencia de Rol */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" /> Preferencia de Rol
                    {filterRoles.length > 0 && (
                      <span className="bg-amber-950 border border-amber-800 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {filterRoles.length}
                      </span>
                    )}
                  </span>
                </span>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ROLE_OPTIONS.map((role) => {
                    const selected = filterRoles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleItem(filterRoles, setFilterRoles, role)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                          selected
                            ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-semibold shadow-sm'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {selected && '✓ '}
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. ¿Qué Busco? / Servicios & Intenciones (Con Scort, Feminización, Fisting, Cruising, Gangbang, Voyerismo, etc.) */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('intent')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-rose-400" /> ¿Qué Busco? / Servicios
                    {filterLookingFor.length > 0 && (
                      <span className="bg-rose-950 border border-rose-800 text-rose-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {filterLookingFor.length}
                      </span>
                    )}
                  </span>
                  {expandedSections.intent ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.intent && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] text-neutral-400">Selecciona intenciones o modalidades:</p>
                    <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                      {LOOKING_FOR_OPTIONS.map((item) => {
                        const selected = filterLookingFor.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, item)}
                            className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                              selected
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200 font-semibold shadow-sm'
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

              {/* 5. Rasgos Físicos & Apariencia (Estatura, Color de Ojos, Color de Cabello, Complexión) */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('physical')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" /> Rasgos Físicos
                    {(filterHeights.length + filterEyeColors.length + filterHairColors.length + filterBodyTypes.length) > 0 && (
                      <span className="bg-amber-950 border border-amber-800 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {filterHeights.length + filterEyeColors.length + filterHairColors.length + filterBodyTypes.length}
                      </span>
                    )}
                  </span>
                  {expandedSections.physical ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.physical && (
                  <div className="space-y-3 pt-1">
                    {/* Estatura (Height) */}
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1 mb-1.5">
                        <Ruler className="w-3 h-3 text-amber-400" /> Estatura
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {HEIGHT_OPTIONS.map((h) => {
                          const selected = filterHeights.includes(h);
                          return (
                            <button
                              key={h}
                              type="button"
                              onClick={() => toggleItem(filterHeights, setFilterHeights, h)}
                              className={`text-[10px] p-1.5 rounded border text-left truncate transition-colors ${
                                selected
                                  ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-medium'
                                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {selected && '✓ '}
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Color de Ojos (Eye color with visual dots) */}
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1 mb-1.5">
                        <Eye className="w-3 h-3 text-cyan-400" /> Color de Ojos
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {EYE_COLOR_OPTIONS.map((item) => {
                          const selected = filterEyeColors.includes(item.label);
                          return (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => toggleItem(filterEyeColors, setFilterEyeColors, item.label)}
                              className={`text-[10px] px-2 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
                                selected
                                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-medium'
                                  : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-neutral-600 shrink-0" 
                                style={{ backgroundColor: item.hex }}
                              />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Color de Cabello (Hair color with visual dots) */}
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1 mb-1.5">
                        <Sparkles className="w-3 h-3 text-pink-400" /> Color de Cabello
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {HAIR_COLOR_OPTIONS.map((item) => {
                          const selected = filterHairColors.includes(item.label);
                          return (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => toggleItem(filterHairColors, setFilterHairColors, item.label)}
                              className={`text-[10px] px-2 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
                                selected
                                  ? 'bg-pink-950/70 border-pink-500 text-pink-200 font-medium'
                                  : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-neutral-600 shrink-0" 
                                style={{ backgroundColor: item.hex }}
                              />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Complexión (Body type) */}
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-300 block mb-1.5">Complexión</span>
                      <div className="flex flex-wrap gap-1">
                        {BODY_TYPE_OPTIONS.map((bt) => {
                          const selected = filterBodyTypes.includes(bt);
                          return (
                            <button
                              key={bt}
                              type="button"
                              onClick={() => toggleItem(filterBodyTypes, setFilterBodyTypes, bt)}
                              className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                                selected
                                  ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-medium'
                                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {selected && '✓ '}
                              {bt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Rasgos distintivos */}
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-300 block mb-1.5">Atributos distintivos</span>
                      <div className="flex flex-wrap gap-1">
                        {PHYSICAL_FEATURES_OPTIONS.map((item) => {
                          const selected = filterPhysicalFeatures.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleItem(filterPhysicalFeatures, setFilterPhysicalFeatures, item)}
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

              {/* 6. Gustos & Prácticas Sexuales (Kinks, Fetishes & Acciones) */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('practices')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-500" /> Gustos & Prácticas Sexuales
                    {filterSexualPreferences.length > 0 && (
                      <span className="text-[10px] bg-rose-950 border border-rose-800 text-rose-300 px-1.5 rounded-full font-bold">
                        {filterSexualPreferences.length}
                      </span>
                    )}
                  </span>
                  {expandedSections.practices ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedSections.practices && (
                  <div className="pt-1">
                    <p className="text-[11px] text-neutral-400 mb-2">Fetiches y gustos específicos:</p>
                    <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                      {SEXUAL_PRACTICES_OPTIONS.map((item) => {
                        const selected = filterSexualPreferences.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleItem(filterSexualPreferences, setFilterSexualPreferences, item)}
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

              {/* 7. Logística del Encuentro */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('logistics')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> Logística de Encuentro
                    {filterLogistics.length > 0 && (
                      <span className="text-[10px] bg-blue-950 border border-blue-800 text-blue-300 px-1.5 rounded-full font-bold">
                        {filterLogistics.length}
                      </span>
                    )}
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
                          onClick={() => toggleItem(filterLogistics, setFilterLogistics, item)}
                          className={`w-full text-left text-xs p-2 rounded-lg border transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-blue-950/50 border-blue-500 text-blue-200 font-medium'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
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

              {/* 8. Cuidado, Salud & Prevención */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('safety')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Salud & Prevención
                    {filterSafety.length > 0 && (
                      <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-1.5 rounded-full font-bold">
                        {filterSafety.length}
                      </span>
                    )}
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
                          onClick={() => toggleItem(filterSafety, setFilterSafety, item)}
                          className={`w-full text-left text-xs p-2 rounded-lg border transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-medium'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
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

              {/* 9. Pasatiempos (Hobbies) */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <button
                  type="button"
                  onClick={() => toggleSection('hobbies')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-neutral-400" /> Pasatiempos (Hobbies)
                    {filterHobbies.length > 0 && (
                      <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 rounded-full font-bold">
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
                          onClick={() => toggleItem(filterHobbies, setFilterHobbies, hobby)}
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

              {/* 10. Verificación & Estado */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 space-y-2.5">
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

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={filterOnlineOnly}
                    onChange={(e) => setFilterOnlineOnly(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-950 text-emerald-400 focus:ring-0"
                  />
                  <span>Sólo usuarios actualmente en línea</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Main Profiles Content Area */}
          <main className="flex-1 min-w-0">
            {/* Search Input and Status bar */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 mb-4 shadow-sm">
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

              {/* Quick Filter Chips Row */}
              <div className="mt-3 pt-3 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Filtros Rápidos Populares:
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="text-[11px] text-rose-400 hover:underline"
                    >
                      Limpiar todos ({activeFiltersCount})
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {/* Requested Gender highlights */}
                  <button
                    onClick={() => toggleItem(filterGenders, setFilterGenders, 'Pareja Trans y Trans')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterGenders.includes('Pareja Trans y Trans')
                        ? 'bg-rose-600 border-rose-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>👫 Pareja Trans y Trans</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterGenders, setFilterGenders, 'Pareja H y Trans')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterGenders.includes('Pareja H y Trans')
                        ? 'bg-rose-600 border-rose-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>👫 Pareja H y Trans</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterGenders, setFilterGenders, 'Pareja H y H')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterGenders.includes('Pareja H y H')
                        ? 'bg-rose-600 border-rose-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>👬 Pareja H y H</span>
                  </button>

                  {/* Looking For / Kink highlights */}
                  <button
                    onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, 'Soy Escort / Scort')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLookingFor.includes('Soy Escort / Scort')
                        ? 'bg-amber-500 border-amber-400 text-neutral-950 font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>💎 Soy Scort</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, 'Feminización')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLookingFor.includes('Feminización')
                        ? 'bg-rose-600 border-rose-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>👠 Feminización</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, 'Fisting')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLookingFor.includes('Fisting')
                        ? 'bg-rose-600 border-rose-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>✊ Fisting</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, 'Cruising')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLookingFor.includes('Cruising')
                        ? 'bg-blue-600 border-blue-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>🚗 Cruising</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, 'Gangbang')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLookingFor.includes('Gangbang')
                        ? 'bg-rose-600 border-rose-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>🔥 Gangbang</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, 'Voyerismo')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLookingFor.includes('Voyerismo')
                        ? 'bg-purple-600 border-purple-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>👀 Voyerismo</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterSafety, setFilterSafety, 'Solo con condón')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterSafety.includes('Solo con condón')
                        ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>🛡 Solo con condón</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterLogistics, setFilterLogistics, 'Con lugar propio')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterLogistics.includes('Con lugar propio')
                        ? 'bg-blue-600 border-blue-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>🏠 Con lugar</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterHeights, setFilterHeights, 'Alta (> 1.80 m)')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterHeights.includes('Alta (> 1.80 m)')
                        ? 'bg-amber-600 border-amber-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>📏 &gt; 1.80 m</span>
                  </button>

                  <button
                    onClick={() => toggleItem(filterEyeColors, setFilterEyeColors, 'Verdes / Claros')}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      filterEyeColors.includes('Verdes / Claros')
                        ? 'bg-cyan-600 border-cyan-500 text-white font-bold shadow'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Ojos Claros</span>
                  </button>
                </div>
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

                  {filterGenders.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-rose-950/70 border border-rose-700 text-rose-200 px-2 py-0.5 rounded-md font-medium">
                      Género: {item}
                      <button onClick={() => toggleItem(filterGenders, setFilterGenders, item)} className="hover:text-white"><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterRoles.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-amber-950/70 border border-amber-700 text-amber-200 px-2 py-0.5 rounded-md font-medium">
                      Rol: {item}
                      <button onClick={() => toggleItem(filterRoles, setFilterRoles, item)} className="hover:text-white"><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterLookingFor.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-rose-950/60 border border-rose-800 text-rose-200 px-2 py-0.5 rounded-md">
                      Busca: {item}
                      <button onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, item)} className="hover:text-white"><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterSexualPreferences.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-rose-900/50 border border-rose-700 text-rose-200 px-2 py-0.5 rounded-md">
                      🔥 {item}
                      <button onClick={() => toggleItem(filterSexualPreferences, setFilterSexualPreferences, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterHeights.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      📏 {item}
                      <button onClick={() => toggleItem(filterHeights, setFilterHeights, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterEyeColors.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-cyan-950/60 border border-cyan-800 text-cyan-200 px-2 py-0.5 rounded-md">
                      👁 {item}
                      <button onClick={() => toggleItem(filterEyeColors, setFilterEyeColors, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterHairColors.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-pink-950/60 border border-pink-800 text-pink-200 px-2 py-0.5 rounded-md">
                      ✨ Cabello {item}
                      <button onClick={() => toggleItem(filterHairColors, setFilterHairColors, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterBodyTypes.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-neutral-800 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded-md">
                      Cuerpo: {item}
                      <button onClick={() => toggleItem(filterBodyTypes, setFilterBodyTypes, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterLogistics.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-blue-950/60 border border-blue-800 text-blue-200 px-2 py-0.5 rounded-md">
                      📍 {item}
                      <button onClick={() => toggleItem(filterLogistics, setFilterLogistics, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterSafety.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 text-[11px] bg-emerald-950/60 border border-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md">
                      🛡 {item}
                      <button onClick={() => toggleItem(filterSafety, setFilterSafety, item)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}

                  {filterVerifiedOnly && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950/60 border border-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md">
                      ✓ Verificados
                      <button onClick={() => setFilterVerifiedOnly(false)}><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterTopOnly && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-amber-950/60 border border-amber-800 text-amber-200 px-2 py-0.5 rounded-md">
                      ★ Top VIP
                      <button onClick={() => setFilterTopOnly(false)}><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {filterFavoritesOnly && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-rose-950/60 border border-rose-800 text-rose-200 px-2 py-0.5 rounded-md">
                      ❤️ Mis Guardados
                      <button onClick={() => setFilterFavoritesOnly(false)}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Count Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-neutral-400">
                Mostrando <strong className="text-neutral-100 font-bold">{filteredProfiles.length}</strong> de {mockProfiles.length} perfiles disponibles
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
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-200">No encontramos perfiles con estos filtros exactos</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Prueba reduciendo o desmarcando algunas de las opciones seleccionadas (como prácticas o rasgos específicos) para ver más resultados.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors shadow"
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
        <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm md:hidden animate-fade-in">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Location */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2">
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

              {/* Gender & Couplets */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  Género & Modalidad
                </span>
                
                <div className="space-y-1 mb-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400">★ Parejas Solicitadas</span>
                  {['Pareja Trans y Trans', 'Pareja H y Trans', 'Pareja H y H'].map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleItem(filterGenders, setFilterGenders, item)}
                      className={`w-full text-xs p-2 rounded-lg border text-left flex justify-between items-center ${
                        filterGenders.includes(item)
                          ? 'bg-rose-950/70 border-rose-500 text-white font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      <span>{item}</span>
                      <span>{filterGenders.includes(item) ? '✓' : ''}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {GENDER_OPTIONS.filter(g => !['Pareja Trans y Trans', 'Pareja H y Trans', 'Pareja H y H'].includes(g)).map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleItem(filterGenders, setFilterGenders, g)}
                      className={`text-[11px] px-2 py-1 rounded border ${
                        filterGenders.includes(g)
                          ? 'bg-rose-900/60 border-rose-500 text-white font-medium'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {filterGenders.includes(g) && '✓ '}
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roles */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Preferencia de Rol</span>
                <div className="flex flex-wrap gap-1">
                  {ROLE_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => toggleItem(filterRoles, setFilterRoles, r)}
                      className={`text-[11px] px-2 py-1 rounded border ${
                        filterRoles.includes(r)
                          ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {filterRoles.includes(r) && '✓ '}
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* What I'm Looking For */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  ¿Qué Busco? / Servicios & Prácticas
                </span>
                <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto">
                  {LOOKING_FOR_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleItem(filterLookingFor, setFilterLookingFor, opt)}
                      className={`text-[11px] px-2 py-1 rounded border ${
                        filterLookingFor.includes(opt)
                          ? 'bg-rose-950/70 border-rose-500 text-white font-medium'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {filterLookingFor.includes(opt) && '✓ '}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical attributes */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  Rasgos Físicos (Estatura, Ojos, Cabello)
                </span>
                
                <div>
                  <span className="text-[11px] text-neutral-400 block mb-1">Estatura</span>
                  <div className="grid grid-cols-2 gap-1">
                    {HEIGHT_OPTIONS.map((h) => (
                      <button
                        key={h}
                        onClick={() => toggleItem(filterHeights, setFilterHeights, h)}
                        className={`text-[10px] p-1.5 rounded border text-left truncate ${
                          filterHeights.includes(h)
                            ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-medium'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {filterHeights.includes(h) && '✓ '}
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-neutral-400 block mb-1">Color de Ojos</span>
                  <div className="flex flex-wrap gap-1">
                    {EYE_COLOR_OPTIONS.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => toggleItem(filterEyeColors, setFilterEyeColors, item.label)}
                        className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 ${
                          filterEyeColors.includes(item.label)
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-medium'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.hex }} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-neutral-400 block mb-1">Color de Cabello</span>
                  <div className="flex flex-wrap gap-1">
                    {HAIR_COLOR_OPTIONS.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => toggleItem(filterHairColors, setFilterHairColors, item.label)}
                        className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 ${
                          filterHairColors.includes(item.label)
                            ? 'bg-pink-950/70 border-pink-500 text-pink-200 font-medium'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.hex }} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logistics & Safety */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Logística & Salud</span>
                <div className="flex flex-wrap gap-1">
                  {LOGISTICS_OPTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleItem(filterLogistics, setFilterLogistics, item)}
                      className={`text-[10px] px-2 py-1 rounded border ${
                        filterLogistics.includes(item)
                          ? 'bg-blue-900/60 border-blue-500 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  {SAFETY_PRACTICES_OPTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleItem(filterSafety, setFilterSafety, item)}
                      className={`text-[10px] px-2 py-1 rounded border ${
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

            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-neutral-800 flex items-center gap-2 bg-neutral-900">
              <button
                onClick={handleResetFilters}
                className="w-1/3 py-2.5 text-xs text-neutral-400 bg-neutral-800 rounded-lg hover:text-white"
              >
                Limpiar
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-2/3 py-2.5 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-500 shadow"
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

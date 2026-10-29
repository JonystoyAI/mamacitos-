import { useState, useEffect, useCallback } from 'react';
import { Profile } from '../../types';

export interface RecentlyViewedItem {
  profile: Profile;
  interactedAt: string; // ISO string or formatted timestamp
  interactionType: 'viewed' | 'messaged' | 'favorited';
}

const RECENTLY_VIEWED_STORAGE_KEY = 'mamacitos_recently_viewed_v1';
const RECENTLY_VIEWED_EVENT = 'mamacitos_recently_viewed_updated';
const MAX_RECENTLY_VIEWED = 10;

// Read list safely from localStorage
export const getRecentlyViewedFromStorage = (): RecentlyViewedItem[] => {
  try {
    const data = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading recently viewed from storage:', err);
    return [];
  }
};

// Save list safely to localStorage and broadcast real-time event
export const saveRecentlyViewedToStorage = (items: RecentlyViewedItem[]) => {
  try {
    localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENTLY_VIEWED)));
    window.dispatchEvent(new CustomEvent(RECENTLY_VIEWED_EVENT, { detail: { count: items.length } }));
  } catch (err) {
    console.error('Error saving recently viewed to storage:', err);
  }
};

// Add or bump a profile in the recently viewed list
export const recordProfileInteraction = (
  profile: Profile,
  interactionType: 'viewed' | 'messaged' | 'favorited' = 'viewed'
) => {
  try {
    const current = getRecentlyViewedFromStorage();
    // Filter out existing occurrence if any
    const remaining = current.filter((item) => item.profile.id !== profile.id);

    const newItem: RecentlyViewedItem = {
      profile,
      interactedAt: new Date().toISOString(),
      interactionType,
    };

    // Prepend to top and enforce strict 10 item cap
    const updated = [newItem, ...remaining].slice(0, MAX_RECENTLY_VIEWED);
    saveRecentlyViewedToStorage(updated);
  } catch (err) {
    console.error('Error recording profile interaction:', err);
  }
};

// Remove a specific profile from recently viewed
export const removeRecentlyViewedItem = (profileId: number) => {
  try {
    const current = getRecentlyViewedFromStorage();
    const updated = current.filter((item) => item.profile.id !== profileId);
    saveRecentlyViewedToStorage(updated);
  } catch (err) {
    console.error('Error removing recently viewed profile:', err);
  }
};

// Clear all recently viewed profiles
export const clearAllRecentlyViewed = () => {
  try {
    saveRecentlyViewedToStorage([]);
  } catch (err) {
    console.error('Error clearing recently viewed history:', err);
  }
};

// Seed sample profiles for testing the 10-profile limit and interaction badges
export const seedDemoRecentlyViewed = () => {
  const sampleItems: RecentlyViewedItem[] = [
    {
      profile: {
        id: 101,
        userIdCode: 'MMC-7701',
        name: 'Camila & Valeria',
        age: 26,
        location: 'Roma Norte, CDMX',
        state: 'Ciudad de México',
        municipality: 'Cuauhtémoc',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        isProvider: true,
        bio: 'Dúo cómplice y apasionado. Sesiones exclusivas para caballeros distinguidos y parejas.',
        profileType: 'sex_worker',
        userType: 'Pareja',
        seeking: 'Encuentros exclusivos',
        isVerified: true,
        isAiVerified: true,
        aiVerificationScore: 99.4,
        verificationDoc: 'INE',
        role: 'Versátil',
        gender: 'Pareja Trans y Trans',
        isHighlyDiscreet: true,
        onlineStatus: 'online',
        lookingFor: ['Soy Escort / Scort', 'Tríos', 'Voyerismo'],
        sexualPreferences: ['Tríos', 'Morbo / Dirty talk', 'Lencería y tacones'],
        safetyPractices: ['Solo con condón', 'No drogas (Cero sustancias)'],
        logistics: ['Con lugar propio'],
        heightCategory: 'Media (1.60 m - 1.70 m)',
        eyeColor: 'Cafés / Castaños',
        hairColor: 'Castaño',
      },
      interactedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      interactionType: 'messaged',
    },
    {
      profile: {
        id: 102,
        userIdCode: 'MMC-9842',
        name: 'Grace Miller',
        age: 27,
        location: 'Juriquilla, Querétaro',
        state: 'Querétaro',
        municipality: 'Querétaro',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        isProvider: true,
        bio: 'Elegancia internacional, modelo y creadora de contenido. Citas de alto standing.',
        profileType: 'sex_worker',
        userType: 'Independiente',
        seeking: 'Caballeros de negocios',
        isVerified: true,
        isAiVerified: true,
        aiVerificationScore: 99.8,
        verificationDoc: 'Pasaporte',
        role: 'Pasivo',
        gender: 'Mujer Trans',
        isHighlyDiscreet: true,
        onlineStatus: 'online',
        lookingFor: ['Soy Escort / Scort', 'Trato de novios (GFE)', 'Discreción absoluta'],
        sexualPreferences: ['Oral apasionado', 'Lencería y tacones', 'Masajes eróticos'],
        safetyPractices: ['Solo con condón', 'Pruebas de salud al día'],
        logistics: ['Con lugar propio', 'Motel / Hotel'],
        heightCategory: 'Alta (> 1.80 m)',
        eyeColor: 'Verdes / Claros',
        hairColor: 'Negro',
      },
      interactedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      interactionType: 'viewed',
    },
    {
      profile: {
        id: 103,
        userIdCode: 'MMC-3312',
        name: 'Mateo & Alexa',
        age: 29,
        location: 'San Pedro Garza García, NL',
        state: 'Nuevo León',
        municipality: 'San Pedro Garza García',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        isProvider: false,
        bio: 'Pareja curiosa y de mente abierta explorando nuevas fantasías con chicas trans.',
        profileType: 'social',
        userType: 'Pareja mixta',
        seeking: 'Chicas trans para amistad y momentos íntimos',
        isVerified: true,
        role: 'Versátil',
        gender: 'Pareja H y Trans',
        isHighlyDiscreet: false,
        onlineStatus: 'online',
        lookingFor: ['No pago por sexo', 'Tríos', 'Citas y romance'],
        sexualPreferences: ['Tríos', 'Oral apasionado'],
        safetyPractices: ['Solo con condón'],
        logistics: ['Con lugar propio'],
        heightCategory: 'Media-Alta (1.70 m - 1.80 m)',
        eyeColor: 'Miel / Ámbar',
        hairColor: 'Castaño',
      },
      interactedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      interactionType: 'favorited',
    },
    {
      profile: {
        id: 104,
        userIdCode: 'MMC-6420',
        name: 'Dominique Royale',
        age: 31,
        location: 'Guadalajara, Jalisco',
        state: 'Jalisco',
        municipality: 'Guadalajara',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        isProvider: true,
        bio: 'Ama dominante, sesiones BDSM psicológico, feminización forzada y protocolo de sumisión.',
        profileType: 'dom_sub',
        userType: 'Mistress',
        seeking: 'Sumisos disciplinados',
        isVerified: true,
        verificationDoc: 'INE',
        role: 'Ama / Dominante',
        gender: 'Mujer Trans',
        isHighlyDiscreet: true,
        onlineStatus: 'offline',
        lookingFor: ['Soy Escort / Scort', 'Feminización', 'BDSM / Kink', 'Transformación'],
        sexualPreferences: ['Feminización', 'Transformación', 'BDSM / Dominación'],
        safetyPractices: ['No drogas (Cero sustancias)'],
        logistics: ['Con lugar propio'],
        heightCategory: 'Alta (> 1.80 m)',
        eyeColor: 'Negros',
        hairColor: 'Negro',
      },
      interactedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      interactionType: 'viewed',
    },
  ];
  saveRecentlyViewedToStorage(sampleItems);
};

// React Hook for real-time reactive sync across components
export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>(() =>
    getRecentlyViewedFromStorage()
  );

  const syncState = useCallback(() => {
    setRecentlyViewed(getRecentlyViewedFromStorage());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      syncState();
    };

    window.addEventListener(RECENTLY_VIEWED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(RECENTLY_VIEWED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [syncState]);

  const addRecentlyViewed = useCallback(
    (profile: Profile, interactionType: 'viewed' | 'messaged' | 'favorited' = 'viewed') => {
      recordProfileInteraction(profile, interactionType);
      syncState();
    },
    [syncState]
  );

  const removeRecentlyViewed = useCallback(
    (profileId: number) => {
      removeRecentlyViewedItem(profileId);
      syncState();
    },
    [syncState]
  );

  const clearHistory = useCallback(() => {
    clearAllRecentlyViewed();
    syncState();
  }, [syncState]);

  return {
    recentlyViewed,
    count: recentlyViewed.length,
    addRecentlyViewed,
    removeRecentlyViewed,
    clearHistory,
    maxLimit: MAX_RECENTLY_VIEWED,
  };
};

export default useRecentlyViewed;

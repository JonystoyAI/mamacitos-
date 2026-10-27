import { useState, useEffect } from 'react';
import { Profile } from '../../types';

const FAVORITES_STORAGE_KEY = 'mamacitos_user_favorites_v1';

export const getFavoritesFromStorage = (): Profile[] => {
  try {
    const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading favorites from localStorage:', err);
    return [];
  }
};

export const saveFavoritesToStorage = (favorites: Profile[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    // Dispatch custom event to sync state across components in real time
    window.dispatchEvent(new Event('mamacitos_favorites_updated'));
  } catch (err) {
    console.error('Error saving favorites to localStorage:', err);
  }
};

export const isProfileFavorited = (profileId: number): boolean => {
  const favorites = getFavoritesFromStorage();
  return favorites.some((p) => p.id === profileId);
};

export const toggleFavoriteProfile = (profile: Profile): boolean => {
  const favorites = getFavoritesFromStorage();
  const exists = favorites.some((p) => p.id === profile.id);

  let updated: Profile[];
  if (exists) {
    updated = favorites.filter((p) => p.id !== profile.id);
  } else {
    updated = [...favorites, { ...profile, savedAt: new Date().toISOString() }];
  }

  saveFavoritesToStorage(updated);
  return !exists; // Returns true if added, false if removed
};

// React hook to use favorites with real-time reactive sync
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Profile[]>(() => getFavoritesFromStorage());

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getFavoritesFromStorage());
    };

    window.addEventListener('mamacitos_favorites_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('mamacitos_favorites_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const toggleFavorite = (profile: Profile) => {
    return toggleFavoriteProfile(profile);
  };

  const isFavorited = (profileId: number) => {
    return favorites.some((p) => p.id === profileId);
  };

  const clearAllFavorites = () => {
    saveFavoritesToStorage([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorited,
    clearAllFavorites,
    count: favorites.length,
  };
};

import { useState, useEffect, useCallback } from 'react';
import { Profile } from '../../types';

const FAVORITES_STORAGE_KEY = 'mamacitos_user_favorites_v1';
const FAVORITES_NOTES_KEY = 'mamacitos_favorites_private_notes_v1';
const FAVORITES_EVENT_NAME = 'mamacitos_favorites_updated';

export interface FavoriteItem extends Profile {
  savedAt: string;
  privateNote?: string;
}

// Read favorites list safely from localStorage
export const getFavoritesFromStorage = (): Profile[] => {
  try {
    const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading favorites from localStorage:', err);
    return [];
  }
};

// Read private notes map safely from localStorage
export const getPrivateNotesMap = (): Record<number, string> => {
  try {
    const data = localStorage.getItem(FAVORITES_NOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error('Error reading notes from localStorage:', err);
    return {};
  }
};

// Save favorites list and dispatch custom event for reactive real-time updates
export const saveFavoritesToStorage = (favorites: Profile[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    // Broadcast event to other components in the same tab
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT_NAME, { detail: { count: favorites.length } }));
  } catch (err) {
    console.error('Error saving favorites to localStorage:', err);
  }
};

// Save private note for a specific profile ID
export const setProfilePrivateNote = (profileId: number, note: string) => {
  try {
    const notes = getPrivateNotesMap();
    if (!note || note.trim() === '') {
      delete notes[profileId];
    } else {
      notes[profileId] = note.trim();
    }
    localStorage.setItem(FAVORITES_NOTES_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT_NAME, { detail: { profileId } }));
  } catch (err) {
    console.error('Error saving private note:', err);
  }
};

export const getProfilePrivateNote = (profileId: number): string => {
  const notes = getPrivateNotesMap();
  return notes[profileId] || '';
};

// Check if a profile is currently bookmarked
export const isProfileFavorited = (profileId: number): boolean => {
  const favorites = getFavoritesFromStorage();
  return favorites.some((p) => p.id === profileId);
};

// Toggle a profile in/out of favorites
export const toggleFavoriteProfile = (profile: Profile): boolean => {
  const favorites = getFavoritesFromStorage();
  const existsIndex = favorites.findIndex((p) => p.id === profile.id);

  let updated: Profile[];
  let isNowSaved = false;

  if (existsIndex >= 0) {
    updated = favorites.filter((p) => p.id !== profile.id);
    isNowSaved = false;
  } else {
    // Preserve rich taxonomy tags and timestamp
    const enrichedProfile: Profile = {
      ...profile,
      landingSlug: profile.landingSlug || profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + `-${profile.id}`,
    };
    updated = [enrichedProfile, ...favorites];
    isNowSaved = true;
  }

  saveFavoritesToStorage(updated);
  return isNowSaved;
};

// Remove a profile directly by ID
export const removeFavoriteById = (profileId: number) => {
  const favorites = getFavoritesFromStorage();
  const updated = favorites.filter((p) => p.id !== profileId);
  saveFavoritesToStorage(updated);
};

// Hook with full reactive state management
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Profile[]>(() => getFavoritesFromStorage());
  const [notes, setNotes] = useState<Record<number, string>>(() => getPrivateNotesMap());

  const syncState = useCallback(() => {
    setFavorites(getFavoritesFromStorage());
    setNotes(getPrivateNotesMap());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      syncState();
    };

    window.addEventListener(FAVORITES_EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(FAVORITES_EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [syncState]);

  const toggleFavorite = useCallback((profile: Profile) => {
    const added = toggleFavoriteProfile(profile);
    syncState();
    return added;
  }, [syncState]);

  const removeFavorite = useCallback((profileId: number) => {
    removeFavoriteById(profileId);
    syncState();
  }, [syncState]);

  const isFavorited = useCallback(
    (profileId: number) => {
      return favorites.some((p) => p.id === profileId);
    },
    [favorites]
  );

  const clearAllFavorites = useCallback(() => {
    saveFavoritesToStorage([]);
    try {
      localStorage.removeItem(FAVORITES_NOTES_KEY);
    } catch (e) {
      // ignore
    }
    syncState();
  }, [syncState]);

  const updateNote = useCallback(
    (profileId: number, note: string) => {
      setProfilePrivateNote(profileId, note);
      syncState();
    },
    [syncState]
  );

  const getNote = useCallback(
    (profileId: number) => {
      return notes[profileId] || '';
    },
    [notes]
  );

  return {
    favorites,
    count: favorites.length,
    isFavorited,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
    updateNote,
    getNote,
  };
};

export default useFavorites;

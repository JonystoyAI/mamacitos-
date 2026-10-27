import { useState, useEffect, useCallback } from 'react';

export interface DiscretionSettings {
  enabled: boolean;
  blurSensitiveImagery: boolean;
  hidePublicActivity: boolean;
  camouflageTab: boolean;
  emergencyExitUrl: string;
  keyboardShortcutEnabled: boolean;
}

const DISCRETION_STORAGE_KEY = 'mamacitos_discretion_mode_v2';
const DISCRETION_EVENT_NAME = 'mamacitos_discretion_mode_changed';

const DEFAULT_SETTINGS: DiscretionSettings = {
  enabled: false,
  blurSensitiveImagery: true,
  hidePublicActivity: true,
  camouflageTab: true,
  emergencyExitUrl: 'https://www.google.com',
  keyboardShortcutEnabled: true,
};

// Original title backup
let originalDocumentTitle = typeof document !== 'undefined' ? document.title : 'Mamacitos';

// Safely read settings
export const getDiscretionSettings = (): DiscretionSettings => {
  try {
    const raw = localStorage.getItem(DISCRETION_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error reading discretion settings:', err);
    return DEFAULT_SETTINGS;
  }
};

// Apply side-effects (CSS classes and camouflage document title)
export const applyDiscretionSideEffects = (settings: DiscretionSettings) => {
  if (typeof document === 'undefined') return;

  if (settings.enabled) {
    document.documentElement.classList.add('discretion-mode-active');
    
    if (settings.camouflageTab) {
      if (!originalDocumentTitle || originalDocumentTitle === 'Hoja de Cálculo - Resumen' || originalDocumentTitle === 'Notas y Documentación') {
        originalDocumentTitle = 'Mamacitos - El lugar para assy4u';
      }
      document.title = 'Hoja de Cálculo - Resumen';
    } else if (originalDocumentTitle) {
      document.title = originalDocumentTitle;
    }
  } else {
    document.documentElement.classList.remove('discretion-mode-active');
    if (originalDocumentTitle) {
      document.title = originalDocumentTitle;
    }
  }
};

// Save settings and broadcast
export const saveDiscretionSettings = (settings: DiscretionSettings) => {
  try {
    localStorage.setItem(DISCRETION_STORAGE_KEY, JSON.stringify(settings));
    applyDiscretionSideEffects(settings);
    window.dispatchEvent(new CustomEvent(DISCRETION_EVENT_NAME, { detail: settings }));
  } catch (err) {
    console.error('Error saving discretion settings:', err);
  }
};

// Toggle master switch
export const toggleDiscretionModeGlobal = (): boolean => {
  const current = getDiscretionSettings();
  const updated: DiscretionSettings = {
    ...current,
    enabled: !current.enabled,
  };
  saveDiscretionSettings(updated);
  return updated.enabled;
};

// Immediate emergency exit
export const triggerEmergencyExit = (targetUrl?: string) => {
  const settings = getDiscretionSettings();
  const url = targetUrl || settings.emergencyExitUrl || 'https://www.google.com';
  
  // Wipe session traces if possible
  try {
    sessionStorage.clear();
  } catch (e) {
    // ignore
  }

  // Redirect immediately
  window.location.replace(url);
};

// Hook for components
export const useDiscretionMode = () => {
  const [settings, setSettings] = useState<DiscretionSettings>(() => getDiscretionSettings());

  const syncSettings = useCallback(() => {
    const current = getDiscretionSettings();
    setSettings(current);
    applyDiscretionSideEffects(current);
  }, []);

  useEffect(() => {
    // Initial side effects
    applyDiscretionSideEffects(settings);

    const handleUpdate = () => {
      syncSettings();
    };

    window.addEventListener(DISCRETION_EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(DISCRETION_EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [syncSettings]);

  // Keyboard shortcut listener (double Esc or Ctrl+Alt+D)
  useEffect(() => {
    if (!settings.keyboardShortcutEnabled) return;

    let lastEscPress = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Emergency Quick Exit on double Esc (within 400ms)
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscPress < 450) {
          e.preventDefault();
          triggerEmergencyExit(settings.emergencyExitUrl);
        }
        lastEscPress = now;
      }

      // Quick toggle Discretion Mode with Ctrl + Alt + D
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        toggleDiscretionMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.keyboardShortcutEnabled, settings.emergencyExitUrl]);

  const toggleDiscretionMode = useCallback(() => {
    return toggleDiscretionModeGlobal();
  }, []);

  const updateSettings = useCallback((partial: Partial<DiscretionSettings>) => {
    const current = getDiscretionSettings();
    const updated = { ...current, ...partial };
    saveDiscretionSettings(updated);
  }, []);

  const emergencyExit = useCallback(() => {
    triggerEmergencyExit(settings.emergencyExitUrl);
  }, [settings.emergencyExitUrl]);

  return {
    isDiscretionMode: settings.enabled,
    settings,
    toggleDiscretionMode,
    updateSettings,
    emergencyExit,
    shouldBlurMedia: settings.enabled && settings.blurSensitiveImagery,
    shouldHideActivity: settings.enabled && settings.hidePublicActivity,
  };
};

export default useDiscretionMode;

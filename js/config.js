/* ===== CONFIGURATION & CONSTANTS ===== */

export const CONFIG = {
    // API Endpoints (si nécessaire)
    DATA_PATH: 'data/',

    // Default Values
    DEFAULT_VOLUME: 70,
    DEFAULT_COLOR: '#667eea',

    // Time constants
    DAYS_OF_WEEK: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    MONTHS_OF_YEAR: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],

    // App IDs
    APPS: {
        HOME: 'home',
        MEMBRES: 'membres',
        CALENDRIER: 'calendrier',
        PARAMETRES: 'parametres',
        CHAT: 'chat',
        CHARACTER_DETAIL: 'characterDetail',
        EVENT_DETAIL: 'eventDetail',
        PROJECT_DETAIL: 'projectDetail',
        EA_NEXUS: 'eaNexus',
        LIEUX: 'lieux',
        LOCATION_DETAIL: 'locationDetail',
        FLASH: 'flash',
        CARTE: 'carte'
    },

    // LocalStorage Keys
    STORAGE_KEYS: {
        WALLPAPER: 'selectedWallpaper',
        WALLPAPER_LOCKED: 'wallpaperLocked',
        TEXT_COLOR: 'textColor',
        VOLUME: 'musicVolume'
    }
};

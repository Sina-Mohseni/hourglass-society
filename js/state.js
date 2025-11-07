/* ===== GLOBAL STATE MANAGEMENT ===== */

// Application State
export const state = {
    // Current active app
    currentApp: 'home',

    // Music Player State
    musicPlayer: {
        currentTrack: 0,
        isPlaying: false,
        playlist: [],
        repeatMode: false,
        shuffleMode: false,
        sequentialMode: true
    },

    // Data
    events: [],
    characters: [],
    projects: [],
    locations: [],
    flashNews: [],

    // Wallpaper
    wallpapers: [],
    currentWallpaper: 0,
    lockedWallpaper: false,
    lockedWallpaperUrl: null,

    // Chat
    chatHistory: {},
    currentChatCharacter: null,

    // Category tracking
    currentCategory: null,
    currentSubcategory: null
};

// DOM Elements Cache
export const elements = {
    audio: null,
    backgroundVideo: null,
    homeIcon: null,
    calendarIcon: null,
    settingsIcon: null,
    membresIcon: null,

    // Will be initialized when DOM is ready
    init() {
        this.audio = document.getElementById('globalAudio');
        this.backgroundVideo = document.getElementById('backgroundVideo');
        this.homeIcon = document.getElementById('homeIcon');
        this.calendarIcon = document.getElementById('calendarIcon');
        this.settingsIcon = document.getElementById('settingsIcon');
        this.membresIcon = document.getElementById('membresIcon');
    }
};

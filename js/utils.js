/* ===== UTILITY FUNCTIONS ===== */

import { CONFIG } from './config.js';

/**
 * Initialize and update real-time clock
 */
export function initializeTime() {
    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timeEl = document.getElementById('currentTime');
        if (timeEl) {
            timeEl.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Update date
        const dayName = CONFIG.DAYS_OF_WEEK[now.getDay()];
        const day = now.getDate();
        const monthName = CONFIG.MONTHS_OF_YEAR[now.getMonth()];
        const year = now.getFullYear();

        const dateEl = document.getElementById('currentDate');
        if (dateEl) {
            dateEl.textContent = `${dayName} ${day} ${monthName} ${year}`;
        }
    };

    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * Format time duration (seconds to MM:SS)
 */
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

/**
 * Check if wallpaper is locked
 */
export function checkLockedWallpaper() {
    const locked = localStorage.getItem(CONFIG.STORAGE_KEYS.WALLPAPER_LOCKED);
    const url = localStorage.getItem(CONFIG.STORAGE_KEYS.WALLPAPER);
    return { locked: locked === 'true', url };
}

/**
 * Save wallpaper preference
 */
export function saveWallpaper(url, locked = false) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.WALLPAPER, url);
    localStorage.setItem(CONFIG.STORAGE_KEYS.WALLPAPER_LOCKED, locked.toString());
}

/**
 * Get saved text color
 */
export function getSavedColor() {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.TEXT_COLOR) || CONFIG.DEFAULT_COLOR;
}

/**
 * Save text color
 */
export function saveColor(color) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.TEXT_COLOR, color);
    document.documentElement.style.setProperty('--accent-color', color);
}

/**
 * Debounce function for performance
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

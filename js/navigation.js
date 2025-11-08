/* ===== NAVIGATION SYSTEM ===== */

import { state, elements } from './state.js';
import { CONFIG } from './config.js';

/**
 * Open an application
 */
export function openApp(appId) {
    // Close all apps
    const appWindows = document.querySelectorAll('.app-window');
    appWindows.forEach(app => app.classList.remove('active'));

    // Open requested app
    const newWindow = document.getElementById(appId);
    if (newWindow) {
        newWindow.classList.add('active');
        state.currentApp = appId;
    }

    // Update page title in header
    updatePageTitle(appId);

    // Update icon states
    updateIconStates(appId);

    // Update floating buttons state
    updateFloatingButtons(appId);

    // Trigger app-specific initialization if needed
    triggerAppInit(appId);
}

/**
 * Close current app and return to home
 */
export function closeApp() {
    openApp(CONFIG.APPS.HOME);
}

/**
 * Update page title in header
 */
function updatePageTitle(appId) {
    const titleElement = document.getElementById('pageTitle');
    if (!titleElement) return;

    const titles = {
        [CONFIG.APPS.HOME]: 'EA Mobile',
        [CONFIG.APPS.CARTE]: 'MONDE',
        [CONFIG.APPS.CALENDRIER]: 'CHRONOLOGIE',
        [CONFIG.APPS.SAGAS]: 'SAGAS',
        [CONFIG.APPS.MEMBRES]: 'ELEMENTS',
        [CONFIG.APPS.CHARACTER_DETAIL]: 'ELEMENTS',
        [CONFIG.APPS.PARAMETRES]: 'Paramètres',
        [CONFIG.APPS.LIEUX]: 'ITEMLINE',
        [CONFIG.APPS.EA_NEXUS]: 'TIMELINE',
        [CONFIG.APPS.FLASH]: 'Flash',
        [CONFIG.APPS.CROSSLINE]: 'CROSSLINE'
    };

    titleElement.textContent = titles[appId] || '';
}

/**
 * Update header icon active states
 */
function updateIconStates(appId) {
    // Remove all active states from footer icons
    const worldIcon = document.getElementById('worldIcon');
    const chronologieIcon = document.getElementById('chronologieIcon');
    const sagasIcon = document.getElementById('sagasIcon');
    const elementsIcon = document.getElementById('elementsIcon');

    if (worldIcon) worldIcon.classList.remove('active');
    if (chronologieIcon) chronologieIcon.classList.remove('active');
    if (sagasIcon) sagasIcon.classList.remove('active');
    if (elementsIcon) elementsIcon.classList.remove('active');

    // Set active based on current app
    if (appId === CONFIG.APPS.CARTE) {
        if (worldIcon) worldIcon.classList.add('active');
    } else if (appId === CONFIG.APPS.CALENDRIER) {
        if (chronologieIcon) chronologieIcon.classList.add('active');
    } else if (appId === CONFIG.APPS.SAGAS) {
        if (sagasIcon) sagasIcon.classList.add('active');
    } else if (appId === CONFIG.APPS.MEMBRES || appId === CONFIG.APPS.CHARACTER_DETAIL) {
        if (elementsIcon) elementsIcon.classList.add('active');
    }
}

/**
 * Update floating buttons visibility
 */
function updateFloatingButtons(appId) {
    const lieuxBtn = document.querySelector('.floating-lieux-btn');
    const projetsBtn = document.querySelector('.floating-projets-btn');

    if (lieuxBtn && projetsBtn) {
        // Hide on certain apps
        const hideOn = [CONFIG.APPS.LIEUX, CONFIG.APPS.LOCATION_DETAIL, CONFIG.APPS.EA_NEXUS];
        const shouldHide = hideOn.includes(appId);

        lieuxBtn.style.display = shouldHide ? 'none' : 'flex';
        projetsBtn.style.display = shouldHide ? 'none' : 'flex';
    }
}

/**
 * Trigger app-specific initialization
 */
function triggerAppInit(appId) {
    switch (appId) {
        case CONFIG.APPS.CALENDRIER:
            // Initialize calendar if function exists
            if (typeof window.initializeCalendar === 'function') {
                window.initializeCalendar();
            }
            break;
        case CONFIG.APPS.MEMBRES:
            // Render characters if function exists
            if (typeof window.renderCharacters === 'function') {
                window.renderCharacters();
            }
            break;
        case CONFIG.APPS.EA_NEXUS:
            // Render EA Nexus if function exists
            if (typeof window.renderEANexus === 'function') {
                window.renderEANexus();
            }
            break;
        case CONFIG.APPS.LIEUX:
            // Render locations if function exists
            if (typeof window.renderLieux === 'function') {
                window.renderLieux();
            }
            break;
    }
}

// Export to window for onclick handlers
window.openApp = openApp;
window.closeApp = closeApp;

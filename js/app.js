/* ===== MAIN APPLICATION ENTRY POINT ===== */

import { elements } from './state.js';
import { initializeTime, getSavedColor, saveColor } from './utils.js';
import { loadAllData } from './data-loader.js';
import { openApp } from './navigation.js';

/**
 * Initialize the application
 */
async function initApp() {
    console.log('🚀 Initializing Hourglass Project...');

    // Initialize DOM elements cache
    elements.init();

    // Start real-time clock
    initializeTime();

    // Load all data
    await loadAllData();

    // Initialize saved preferences
    initializePreferences();

    // Initialize features
    initializeFeatures();

    // Open home app
    openApp('home');

    console.log('✅ Hourglass Project initialized successfully!');
}

/**
 * Initialize user preferences from localStorage
 */
function initializePreferences() {
    // Load saved color
    const savedColor = getSavedColor();
    saveColor(savedColor);

    // Initialize color picker if exists
    const colorPicker = document.getElementById('textColorPicker');
    if (colorPicker) {
        colorPicker.value = savedColor;
        colorPicker.addEventListener('change', (e) => {
            saveColor(e.target.value);
        });
    }
}

/**
 * Initialize application features
 */
function initializeFeatures() {
    // Features will be loaded from separate modules
    // This is where you can initialize:
    // - Music player
    // - Calendar
    // - Characters
    // - Projects
    // etc.

    console.log('Initializing features...');
}

/**
 * Reset text color to default
 */
window.resetTextColor = function() {
    const defaultColor = '#667eea';
    saveColor(defaultColor);
    const colorPicker = document.getElementById('textColorPicker');
    if (colorPicker) {
        colorPicker.value = defaultColor;
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

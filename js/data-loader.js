/* ===== DATA LOADING ===== */

import { CONFIG } from './config.js';
import { state } from './state.js';

/**
 * Load all application data
 */
export async function loadAllData() {
    try {
        // Load Events
        const eventsResponse = await fetch(`${CONFIG.DATA_PATH}events.json`);
        const eventsData = await eventsResponse.json();
        state.events = eventsData;
        window.events = eventsData; // For backward compatibility

        // Load Characters
        const charactersResponse = await fetch(`${CONFIG.DATA_PATH}characters.json`);
        state.characters = await charactersResponse.json();

        // Load Flash News
        const flashResponse = await fetch(`${CONFIG.DATA_PATH}flash.json`);
        const flashData = await flashResponse.json();
        state.flashNews = flashData.news || [];

        // Load Locations
        const locationsResponse = await fetch(`${CONFIG.DATA_PATH}locations.json`);
        const locationsData = await locationsResponse.json();
        state.locations = locationsData.locations || [];

        // Load Projects
        const projectsResponse = await fetch(`${CONFIG.DATA_PATH}projects-hierarchy.json`);
        const projectsData = await projectsResponse.json();
        state.projects = projectsData.categories || [];

        // Load Playlist
        const playlistResponse = await fetch(`${CONFIG.DATA_PATH}playlist.json`);
        const playlistData = await playlistResponse.json();
        state.musicPlayer.playlist = playlistData.tracks || [];

        // Load Commander Messages (if needed)
        try {
            const commanderResponse = await fetch(`${CONFIG.DATA_PATH}commander.json`);
            state.commanderData = await commanderResponse.json();
        } catch (e) {
            console.log('Commander data not loaded');
        }

        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}

/**
 * Load specific data file
 */
export async function loadDataFile(filename) {
    try {
        const response = await fetch(`${CONFIG.DATA_PATH}${filename}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

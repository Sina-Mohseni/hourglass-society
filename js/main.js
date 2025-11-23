// ==========================
// MAIN APPLICATION
// ==========================

// Application initialization
async function initApp() {
    console.log('🚀 Initializing Anim\'Connect...');

    try {
        // Load all data
        await loadAllData();
        console.log('✅ Data loaded successfully');

        // Initialize navigation
        initNavigation();
        console.log('✅ Navigation initialized');

        // Initialize animations
        initAnimations();
        console.log('✅ Animations initialized');

        // Set default page
        navigateToPage('pageAccueil');
        console.log('✅ App ready!');

    } catch (error) {
        console.error('❌ Error initializing app:', error);
    }
}

// Run app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Handle resize events
window.addEventListener('resize', () => {
    // Re-initialize animations if needed
    // Could add responsive adjustments here
});

// Prevent default form submissions
document.addEventListener('submit', (e) => {
    e.preventDefault();
});

// Handle browser back button
window.addEventListener('popstate', () => {
    // Handle navigation history if needed
});

// Utility: Log current app state (for debugging)
function logAppState() {
    console.log('Current App State:', {
        currentPage: NavigationState.currentPage,
        currentMonde: AppData.currentMonde,
        currentEpoque: AppData.currentEpoque,
        currentSaga: AppData.currentSaga,
        currentProjet: AppData.currentProjet,
        currentPersona: AppData.currentPersona
    });
}

// Expose to window for debugging
window.AnimConnect = {
    AppData,
    NavigationState,
    ChatState,
    logState: logAppState,
    navigateToPage,
    loadMondes,
    loadPersonas
};

console.log('Anim\'Connect loaded! Type AnimConnect.logState() in console for debugging.');

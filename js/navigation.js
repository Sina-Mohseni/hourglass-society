// ==========================
// NAVIGATION MANAGEMENT
// ==========================

const NavigationState = {
    currentPage: 'pageAccueil',
    history: []
};

// Initialize navigation
function initNavigation() {
    // Logo/Accueil click
    const logoHome = document.getElementById('logoHome');
    if (logoHome) {
        logoHome.addEventListener('click', () => {
            navigateToPage('pageAccueil');
            setActiveNav(null);
        });
    }

    // Concept nav
    const navConcept = document.getElementById('navConcept');
    if (navConcept) {
        navConcept.addEventListener('click', () => {
            navigateToPage('pageConcept');
            setActiveNav('navConcept');
        });
    }

    // Personas nav
    const navPersonas = document.getElementById('navPersonas');
    if (navPersonas) {
        navPersonas.addEventListener('click', () => {
            navigateToPage('pagePersonas');
            setActiveNav('navPersonas');
            loadPersonas();
        });
    }

    // Projets nav
    const navProjets = document.getElementById('navProjets');
    if (navProjets) {
        navProjets.addEventListener('click', () => {
            navigateToPage('pageProjets');
            setActiveNav('navProjets');
            loadMondes();
        });
    }

    // Back buttons
    const backToMondes = document.getElementById('backToMondes');
    if (backToMondes) {
        backToMondes.addEventListener('click', () => {
            navigateToPage('pageProjets');
            loadMondes();
        });
    }

    const backToEpoques = document.getElementById('backToEpoques');
    if (backToEpoques) {
        backToEpoques.addEventListener('click', () => {
            navigateToPage('pageEpoques');
            loadEpoques(AppData.currentMonde);
        });
    }

    const backToSagas = document.getElementById('backToSagas');
    if (backToSagas) {
        backToSagas.addEventListener('click', () => {
            navigateToPage('pageSagas');
            loadSagas(AppData.currentEpoque);
        });
    }

    const backToProjets = document.getElementById('backToProjets');
    if (backToProjets) {
        backToProjets.addEventListener('click', () => {
            navigateToPage('pageProjetsList');
            loadProjetsList(AppData.currentSaga);
        });
    }

    const backToProjetDetail = document.getElementById('backToProjetDetail');
    if (backToProjetDetail) {
        backToProjetDetail.addEventListener('click', () => {
            navigateToPage('pageProjetDetail');
            loadProjetDetail(AppData.currentProjet);
        });
    }
}

// Navigate to a page
function navigateToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        NavigationState.currentPage = pageId;

        // Add to history
        NavigationState.history.push(pageId);

        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Set active navigation item
function setActiveNav(navId) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to current nav
    if (navId) {
        const activeNav = document.getElementById(navId);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    }
}

// Go back in navigation
function goBack() {
    if (NavigationState.history.length > 1) {
        NavigationState.history.pop(); // Remove current page
        const previousPage = NavigationState.history[NavigationState.history.length - 1];
        navigateToPage(previousPage);
    }
}

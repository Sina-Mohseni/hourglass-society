// ==========================
// DATA MANAGEMENT
// ==========================

const AppData = {
    mondes: [],
    epoques: {},
    sagas: {},
    projets: {},
    personas: [],
    currentMonde: null,
    currentEpoque: null,
    currentSaga: null,
    currentProjet: null,
    currentPersona: null
};

// Load all JSON data
async function loadAllData() {
    try {
        // Load Mondes
        const mondesResponse = await fetch('json/mondes.json');
        const mondesData = await mondesResponse.json();
        AppData.mondes = mondesData.mondes;

        // Load Epoques
        const epoquesResponse = await fetch('json/epoques.json');
        const epoquesData = await epoquesResponse.json();
        AppData.epoques = epoquesData.epoques;

        // Load Sagas
        const sagasResponse = await fetch('json/sagas.json');
        const sagasData = await sagasResponse.json();
        AppData.sagas = sagasData.sagas;

        // Load Projets
        const projetsResponse = await fetch('json/projets.json');
        const projetsData = await projetsResponse.json();
        AppData.projets = projetsData.projets;

        // Load Personas
        const personasResponse = await fetch('json/personas.json');
        const personasData = await personasResponse.json();
        AppData.personas = personasData.personas;

        // Update stats on home page
        updateHomeStats();

        console.log('All data loaded successfully:', AppData);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Update home page statistics
function updateHomeStats() {
    const totalMondes = AppData.mondes.length;
    let totalEpoques = 0;
    let totalProjets = 0;

    // Count epoques
    for (const monde in AppData.epoques) {
        totalEpoques += AppData.epoques[monde].length;
    }

    // Count projets
    for (const saga in AppData.projets) {
        totalProjets += AppData.projets[saga].length;
    }

    // Update DOM
    const mondesEl = document.getElementById('totalMondes');
    const epoquesEl = document.getElementById('totalEpoques');
    const projetsEl = document.getElementById('totalProjets');

    if (mondesEl) mondesEl.textContent = totalMondes;
    if (epoquesEl) epoquesEl.textContent = totalEpoques;
    if (projetsEl) projetsEl.textContent = totalProjets;
}

// Get monde by ID
function getMondeById(mondeId) {
    return AppData.mondes.find(m => m.id === mondeId);
}

// Get epoques by monde ID
function getEpoquesByMonde(mondeId) {
    return AppData.epoques[mondeId] || [];
}

// Get sagas by epoque ID
function getSagasByEpoque(epoqueId) {
    return AppData.sagas[epoqueId] || [];
}

// Get projets by saga ID
function getProjetsBySaga(sagaId) {
    return AppData.projets[sagaId] || [];
}

// Get projet by ID
function getProjetById(projetId) {
    for (const saga in AppData.projets) {
        const projet = AppData.projets[saga].find(p => p.id === projetId);
        if (projet) return projet;
    }
    return null;
}

// Get persona by ID
function getPersonaById(personaId) {
    return AppData.personas.find(p => p.id === personaId);
}

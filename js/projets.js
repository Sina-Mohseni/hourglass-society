// ==========================
// PROJETS MANAGEMENT
// ==========================

// Load and display mondes (worlds)
function loadMondes() {
    const mondesGrid = document.getElementById('mondesGrid');
    if (!mondesGrid) return;

    mondesGrid.innerHTML = '';

    AppData.mondes.forEach(monde => {
        const mondeCard = createMondeCard(monde);
        mondesGrid.appendChild(mondeCard);
    });
}

// Create monde card with rotating planet
function createMondeCard(monde) {
    const card = document.createElement('div');
    card.className = 'monde-card fade-in-up';
    card.innerHTML = `
        <div class="monde-planet">
            <div class="planet ${monde.planetType}"></div>
        </div>
        <h3 class="monde-name">${monde.name}</h3>
        <p class="monde-description">${monde.description}</p>
    `;

    card.addEventListener('click', () => {
        AppData.currentMonde = monde.id;
        navigateToPage('pageEpoques');
        loadEpoques(monde.id);
    });

    return card;
}

// Load and display epoques
function loadEpoques(mondeId) {
    const epoques = getEpoquesByMonde(mondeId);
    const epoquesGrid = document.getElementById('epoquesGrid');
    const epoquesTitle = document.getElementById('epoquesTitle');

    if (!epoquesGrid) return;

    const monde = getMondeById(mondeId);
    if (epoquesTitle && monde) {
        epoquesTitle.textContent = `Époques de ${monde.name}`;
    }

    epoquesGrid.innerHTML = '';

    epoques.forEach(epoque => {
        const epoqueCard = createEpoqueCard(epoque);
        epoquesGrid.appendChild(epoqueCard);
    });
}

// Create epoque card
function createEpoqueCard(epoque) {
    const card = document.createElement('div');
    card.className = 'epoque-card fade-in-up';
    card.innerHTML = `
        <div class="epoque-icon">${epoque.icon}</div>
        <h3 class="epoque-name">${epoque.name}</h3>
        <p class="epoque-description">${epoque.description}</p>
    `;

    card.addEventListener('click', () => {
        AppData.currentEpoque = epoque.id;
        navigateToPage('pageSagas');
        loadSagas(epoque.id);
    });

    return card;
}

// Load and display sagas
function loadSagas(epoqueId) {
    const sagas = getSagasByEpoque(epoqueId);
    const sagasGrid = document.getElementById('sagasGrid');
    const sagasTitle = document.getElementById('sagasTitle');

    if (!sagasGrid) return;

    if (sagasTitle) {
        sagasTitle.textContent = 'Sagas Disponibles';
    }

    sagasGrid.innerHTML = '';

    sagas.forEach(saga => {
        const sagaCard = createSagaCard(saga);
        sagasGrid.appendChild(sagaCard);
    });
}

// Create saga card
function createSagaCard(saga) {
    const card = document.createElement('div');
    card.className = 'saga-card fade-in-up';
    card.innerHTML = `
        <div class="saga-icon">${saga.icon}</div>
        <h3 class="saga-name">${saga.name}</h3>
        <p class="saga-description">${saga.description}</p>
    `;

    card.addEventListener('click', () => {
        AppData.currentSaga = saga.id;
        navigateToPage('pageProjetsList');
        loadProjetsList(saga.id);
    });

    return card;
}

// Load and display projets list
function loadProjetsList(sagaId) {
    const projets = getProjetsBySaga(sagaId);
    const projetsCards = document.getElementById('projetsCards');
    const projetsListTitle = document.getElementById('projetsListTitle');

    if (!projetsCards) return;

    if (projetsListTitle) {
        projetsListTitle.textContent = 'Projets & Aventures';
    }

    projetsCards.innerHTML = '';

    if (projets.length === 0) {
        projetsCards.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Aucun projet disponible pour cette saga.</p>';
        return;
    }

    projets.forEach(projet => {
        const projetCard = createProjetCard(projet);
        projetsCards.appendChild(projetCard);
    });
}

// Create projet card
function createProjetCard(projet) {
    const card = document.createElement('div');
    card.className = 'projet-card fade-in-up';
    card.innerHTML = `
        <div class="projet-card-icon">${projet.icon}</div>
        <h3 class="projet-card-title">${projet.name}</h3>
        <p class="projet-card-description">${projet.description}</p>
    `;

    card.addEventListener('click', () => {
        AppData.currentProjet = projet.id;
        navigateToPage('pageProjetDetail');
        loadProjetDetail(projet);
    });

    return card;
}

// Load projet detail page
function loadProjetDetail(projet) {
    const projetDetailContent = document.getElementById('projetDetailContent');
    if (!projetDetailContent) return;

    projetDetailContent.innerHTML = `
        <div class="projet-detail-header">
            <h2 class="projet-detail-title">${projet.icon} ${projet.name}</h2>
            <p class="projet-detail-description">${projet.longDescription}</p>
        </div>

        <div class="choix-section">
            <h3 class="choix-title">Personnalisez votre Aventure</h3>

            <div class="choix-group">
                <div class="choix-label">🎯 Difficulté</div>
                <div class="choix-options">
                    <button class="choix-btn" data-type="difficulte" data-value="facile">Facile</button>
                    <button class="choix-btn active" data-type="difficulte" data-value="normal">Normal</button>
                    <button class="choix-btn" data-type="difficulte" data-value="difficile">Difficile</button>
                </div>
            </div>

            <div class="choix-group">
                <div class="choix-label">👥 Comportement du Groupe</div>
                <div class="choix-options">
                    <button class="choix-btn active" data-type="comportement" data-value="coop">Coopératif</button>
                    <button class="choix-btn" data-type="comportement" data-value="competitif">Compétitif</button>
                    <button class="choix-btn" data-type="comportement" data-value="semi">Semi-Coop</button>
                </div>
            </div>

            <div class="choix-group">
                <div class="choix-label">📍 Zone de Jeu</div>
                <div class="choix-options">
                    <button class="choix-btn active" data-type="zone" data-value="table">Assis à Table</button>
                    <button class="choix-btn" data-type="zone" data-value="piece">Dans la Pièce</button>
                    <button class="choix-btn" data-type="zone" data-value="multi">Dans N Pièces</button>
                </div>
            </div>
        </div>

        <div class="sections-buttons">
            <button class="section-btn" onclick="showSection('fiche')">
                <div class="section-btn-icon">📋</div>
                <div>Fiche Technique</div>
            </button>
            <button class="section-btn" onclick="showSection('reunion')">
                <div class="section-btn-icon">💬</div>
                <div>Réunion Persona</div>
            </button>
            <button class="section-btn" onclick="showSection('scenario')">
                <div class="section-btn-icon">📖</div>
                <div>Scénario</div>
            </button>
            <button class="section-btn" onclick="showSection('intro')">
                <div class="section-btn-icon">🎬</div>
                <div>Vidéo Intro</div>
            </button>
            <button class="section-btn" onclick="showSection('mise')">
                <div class="section-btn-icon">🛠️</div>
                <div>Mise en Place</div>
            </button>
            <button class="section-btn" onclick="showSection('regles')">
                <div class="section-btn-icon">📜</div>
                <div>Règles Spécifiques</div>
            </button>
        </div>

        <div id="sectionContentContainer"></div>
    `;

    // Add event listeners to choix buttons
    const choixBtns = projetDetailContent.querySelectorAll('.choix-btn');
    choixBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            const group = this.closest('.choix-group');
            group.querySelectorAll('.choix-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show section content
function showSection(sectionType) {
    const projet = getProjetById(AppData.currentProjet);
    if (!projet) return;

    const container = document.getElementById('sectionContentContainer');
    if (!container) return;

    let content = '';

    switch(sectionType) {
        case 'fiche':
            content = `
                <div class="section-content active">
                    <h3>📋 Fiche Technique</h3>
                    <p><strong>Durée :</strong> ${projet.fiche.duree}</p>
                    <p><strong>Nombre de joueurs :</strong> ${projet.fiche.joueurs}</p>
                    <p><strong>Matériel nécessaire :</strong> ${projet.fiche.materiel}</p>
                </div>
            `;
            break;
        case 'reunion':
            content = `
                <div class="section-content active">
                    <h3>💬 Réunion avec un Persona</h3>
                    <p>Choisissez un persona pour discuter de ce projet :</p>
                    <div id="personaSelector" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;"></div>
                </div>
            `;
            break;
        case 'scenario':
            content = `
                <div class="section-content active">
                    <h3>📖 Scénario</h3>
                    <p>${projet.scenario}</p>
                </div>
            `;
            break;
        case 'intro':
            content = `
                <div class="section-content active">
                    <h3>🎬 Vidéo d'Introduction</h3>
                    <p><em>Vidéo : ${projet.intro}</em></p>
                    <p style="color: var(--text-secondary);">La vidéo d'introduction sera disponible prochainement.</p>
                </div>
            `;
            break;
        case 'mise':
            content = `
                <div class="section-content active">
                    <h3>🛠️ Mise en Place</h3>
                    <ul style="list-style: none; padding-left: 0;">
                        ${projet.miseEnPlace.map(item => `<li style="margin-bottom: 10px;">✓ ${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            break;
        case 'regles':
            content = `
                <div class="section-content active">
                    <h3>📜 Règles Spécifiques</h3>
                    <ul style="list-style: none; padding-left: 0;">
                        ${projet.regles.map(item => `<li style="margin-bottom: 10px;">• ${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            break;
    }

    container.innerHTML = content;

    // If reunion section, load personas selector
    if (sectionType === 'reunion') {
        loadPersonaSelector();
    }
}

// Load persona selector for chat
function loadPersonaSelector() {
    const personaSelector = document.getElementById('personaSelector');
    if (!personaSelector) return;

    personaSelector.innerHTML = '';

    AppData.personas.forEach(persona => {
        const personaBtn = document.createElement('button');
        personaBtn.className = 'persona-card';
        personaBtn.style.cursor = 'pointer';
        personaBtn.innerHTML = `
            <div class="persona-avatar">
                <img src="${persona.avatar}" alt="${persona.name}">
            </div>
            <h3 class="persona-name">${persona.name}</h3>
            <p class="persona-skill">${persona.skill}</p>
        `;
        personaBtn.addEventListener('click', () => selectPersona(persona.id));
        personaSelector.appendChild(personaBtn);
    });
}

// ==========================
// PERSONAS MANAGEMENT
// ==========================

// Load and display personas
function loadPersonas() {
    const personasGrid = document.getElementById('personasGrid');
    if (!personasGrid) return;

    personasGrid.innerHTML = '';

    AppData.personas.forEach(persona => {
        const personaCard = createPersonaCard(persona);
        personasGrid.appendChild(personaCard);
    });
}

// Create persona card element
function createPersonaCard(persona) {
    const card = document.createElement('div');
    card.className = 'persona-card fade-in-up';
    card.innerHTML = `
        <div class="persona-avatar">
            <img src="${persona.avatar}" alt="${persona.name}">
        </div>
        <h3 class="persona-name">${persona.name}</h3>
        <p class="persona-skill">${persona.skill}</p>
        <p class="persona-description">${persona.description}</p>
        <span class="persona-gender">${persona.gender}</span>
    `;
    return card;
}

// Select persona for chat
function selectPersona(personaId) {
    const persona = getPersonaById(personaId);
    if (!persona) return;

    AppData.currentPersona = persona;
    navigateToPage('pageChat');
    initChat(persona);
}

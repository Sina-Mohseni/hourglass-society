// ==========================
// CHAT MANAGEMENT
// ==========================

const ChatState = {
    messages: [],
    currentPersona: null
};

// Initialize chat with persona
function initChat(persona) {
    ChatState.currentPersona = persona;
    ChatState.messages = [];

    // Update chat header
    const chatHeader = document.getElementById('chatHeader');
    if (chatHeader) {
        chatHeader.innerHTML = `
            <div class="persona-avatar" style="width: 50px; height: 50px; margin-right: 15px;">
                <img src="${persona.avatar}" alt="${persona.name}">
            </div>
            <div>
                <h3 style="margin: 0; font-size: 1.2rem;">${persona.name}</h3>
                <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">${persona.skill}</p>
            </div>
        `;
    }

    // Clear messages
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }

    // Add greeting message
    addMessage(persona.greeting, 'persona');

    // Setup chat input
    setupChatInput();
}

// Setup chat input event listeners
function setupChatInput() {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    if (chatInput && chatSend) {
        // Send on button click
        chatSend.addEventListener('click', sendChatMessage);

        // Send on Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

// Send chat message
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;

    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    chatInput.value = '';

    // Simulate persona response
    setTimeout(() => {
        const response = generatePersonaResponse(message);
        addMessage(response, 'persona');
    }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.style.cssText = `
        margin-bottom: 15px;
        padding: 12px 18px;
        border-radius: 18px;
        max-width: 80%;
        ${sender === 'user' ?
            'background: var(--gradient-purple); margin-left: auto; text-align: right;' :
            'background: var(--card-bg); border: 1px solid var(--card-border); margin-right: auto;'}
        animation: chatBubble 0.3s ease-out;
    `;
    messageDiv.textContent = text;

    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add to state
    ChatState.messages.push({ text, sender, timestamp: Date.now() });
}

// Generate persona response (simple AI simulation)
function generatePersonaResponse(userMessage) {
    const persona = ChatState.currentPersona;
    if (!persona) return "Désolé, je ne peux pas répondre pour le moment.";

    const projet = getProjetById(AppData.currentProjet);
    const lowerMessage = userMessage.toLowerCase();

    // Context-aware responses
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
        return `${persona.greeting} Comment puis-je vous aider pour ce projet ?`;
    }

    if (lowerMessage.includes('difficulté') || lowerMessage.includes('difficile')) {
        return `En tant que ${persona.skill}, je vous recommande de commencer en mode Normal pour ce type d'aventure. La difficulté Facile est idéale pour les débutants, tandis que Difficile offre un vrai défi pour les experts.`;
    }

    if (lowerMessage.includes('équipe') || lowerMessage.includes('groupe') || lowerMessage.includes('joueurs')) {
        return `Pour ${projet.name}, je suggère un groupe de ${projet.fiche.joueurs} joueurs. La cohésion d'équipe sera essentielle. En mode Coopératif, vous devrez vraiment travailler ensemble pour réussir.`;
    }

    if (lowerMessage.includes('conseil') || lowerMessage.includes('astuce') || lowerMessage.includes('tips')) {
        return `Mon conseil principal : prenez le temps de bien lire les règles avant de commencer. ${persona.skill === 'Stratège & Tacticien' ? 'Une bonne préparation fait toute la différence !' : 'L\'improvisation est importante, mais la préparation l\'est tout autant.'}`;
    }

    if (lowerMessage.includes('durée') || lowerMessage.includes('temps') || lowerMessage.includes('combien')) {
        return `Cette aventure dure environ ${projet.fiche.duree}. Prévoyez un peu plus de temps pour la mise en place et le débriefing final.`;
    }

    if (lowerMessage.includes('matériel') || lowerMessage.includes('besoin') || lowerMessage.includes('nécessaire')) {
        return `Vous aurez besoin de : ${projet.fiche.materiel}. Je peux vous aider à organiser tout ça si vous voulez !`;
    }

    if (lowerMessage.includes('scénario') || lowerMessage.includes('histoire') || lowerMessage.includes('contexte')) {
        return `Le scénario est passionnant ! ${projet.scenario.substring(0, 150)}... Je vous recommande de consulter la section Scénario complète pour plus de détails.`;
    }

    // Default responses based on persona personality
    const defaultResponses = [
        `En tant que ${persona.skill}, je pense que ce projet est une excellente opportunité d'apprentissage. Qu'aimeriez-vous savoir de plus spécifique ?`,
        `Excellente question ! Pour ${projet.name}, je vous suggère de bien vous concentrer sur ${persona.skill === 'Stratège & Tacticien' ? 'la planification' : persona.skill === 'Énigmes & Cryptographie' ? 'la résolution d\'énigmes' : 'votre rôle dans l\'équipe'}.`,
        `${persona.personality.split('.')[0]}. Je suis là pour vous guider dans cette aventure. Avez-vous des questions spécifiques sur le déroulement ?`,
        `D'après mon expérience en ${persona.skill}, je peux vous assurer que cette aventure sera mémorable. Que voulez-vous approfondir ?`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Add CSS for chat messages
const chatStyle = document.createElement('style');
chatStyle.textContent = `
    .chat-container {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 150px);
        padding: 20px;
    }

    .chat-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: var(--card-bg);
        border: 2px solid var(--card-border);
        border-radius: 20px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
    }

    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: var(--card-bg);
        border: 2px solid var(--card-border);
        border-radius: 20px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
    }

    .chat-input-container {
        display: flex;
        gap: 10px;
        padding: 15px;
        background: var(--card-bg);
        border: 2px solid var(--card-border);
        border-radius: 20px;
        backdrop-filter: blur(10px);
    }

    .chat-input-container input {
        flex: 1;
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--card-border);
        border-radius: 25px;
        color: var(--text-primary);
        font-size: 1rem;
        outline: none;
    }

    .chat-input-container input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
    }

    .chat-input-container button {
        padding: 12px 24px;
        background: var(--gradient-purple);
        border: none;
        border-radius: 25px;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .chat-input-container button:hover {
        transform: scale(1.1);
        box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
    }
`;
document.head.appendChild(chatStyle);

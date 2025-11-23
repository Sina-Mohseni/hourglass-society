// ==========================
// ANIMATIONS MANAGEMENT
// ==========================

// Initialize animations
function initAnimations() {
    // Add fade-in animation to cards as they appear
    observeElements();

    // Add floating animation to certain elements
    addFloatingAnimations();

    // Initialize planet animations
    initPlanetAnimations();
}

// Observe elements for scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe cards
    const cards = document.querySelectorAll('.card, .stat-card, .concept-card, .persona-card, .monde-card, .epoque-card, .saga-card, .projet-card');
    cards.forEach(card => observer.observe(card));
}

// Add floating animation to specific elements
function addFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.logo-icon, .stat-icon');
    floatingElements.forEach(el => {
        el.classList.add('float');
    });
}

// Initialize planet animations
function initPlanetAnimations() {
    const planets = document.querySelectorAll('.planet');

    planets.forEach((planet, index) => {
        // Different rotation speeds for different planets
        const speed = 15 + (index * 5); // 15s, 20s, 25s, etc.
        planet.style.animationDuration = `${speed}s`;
    });
}

// Add particle effect to background
function addParticleEffect() {
    const particleCount = 50;
    const body = document.body;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
        `;
        body.appendChild(particle);
    }
}

// Animate element entrance
function animateEntrance(element, animationType = 'fade-in-up') {
    if (element) {
        element.classList.add(animationType);
    }
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add pulse animation to button
function pulseButton(button) {
    button.classList.add('pulse');
    setTimeout(() => {
        button.classList.remove('pulse');
    }, 1000);
}

// Initialize all animations on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initAnimations();
        addParticleEffect();
    }, 100);
});

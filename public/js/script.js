// FRET GPS LANDING PAGE - JAVASCRIPT PROFESIONAL
// =================================================

// CONFIGURACIÓN GLOBAL
const config = {
    animationDuration: 600,
    scrollThreshold: 0.1,
    hoverDelay: 100
};

// ANIMACIONES AL SCROLL
const observerOptions = {
    threshold: config.scrollThreshold,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// INICIALIZACIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeHeaderEffects();
    initializeHoverEffects();
    initializeProgressiveLoading();
    initializeConversionTracking();
    initializeVideoPlaceholders();
});

// ANIMACIONES DE ELEMENTOS
function initializeAnimations() {
    const elements = document.querySelectorAll(
        '.benefit-card, .testimonial-card, .include-card, .option-card, .step-card, .pain-card, .solution-card'
    );
    
    elements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// EFECTOS DEL HEADER DINÁMICO
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(15, 20, 25, 0.98)';
            header.style.boxShadow = 'var(--shadow-soft)';
            header.style.borderBottomColor = 'var(--accent-blue-primary)';
        } else {
            header.style.background = 'rgba(15, 20, 25, 0.95)';
            header.style.boxShadow = 'none';
            header.style.borderBottomColor = 'var(--primary-light)';
        }
    });
}

// EFECTOS DE HOVER PROFESIONALES
function initializeHoverEffects() {
    // Cards principales con glow effect
    const cards = document.querySelectorAll('.benefit-card, .include-card, .testimonial-card, .step-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = 'var(--shadow-strong), var(--glow-blue)';
            card.style.borderColor = 'var(--accent-blue-primary)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-soft)';
            card.style.borderColor = 'rgba(74, 144, 226, 0.1)';
        });
    });

    // Botones con efectos específicos
    const buttons = document.querySelectorAll('.btn, .btn-offer');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (btn.classList.contains('btn-primary')) {
                btn.style.boxShadow = 'var(--shadow-medium), var(--glow-blue)';
            } else if (btn.classList.contains('btn-secondary')) {
                btn.style.boxShadow = 'var(--glow-gold)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (btn.classList.contains('btn-primary')) {
                btn.style.boxShadow = 'var(--shadow-soft)';
            } else {
                btn.style.boxShadow = 'none';
            }
        });
    });

    // Opciones del usuario con efectos diferenciados
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('option-best')) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(72, 187, 120, 0.3)';
            } else {
                card.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-soft)';
        });
    });
}

// CARGA PROGRESIVA DE ELEMENTOS
function initializeProgressiveLoading() {
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('loaded');
            }, index * 100); // Efecto cascada
        });
    }, 200);
}

// MANEJO DE PLACEHOLDERS DE VIDEO
function initializeVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // Simular click en video placeholder
            placeholder.style.background = 'var(--accent-blue-primary)';
            placeholder.style.color = 'white';
            placeholder.innerHTML = 'Video cargando...<br><small>Proximamente disponible</small>';
            
            setTimeout(() => {
                placeholder.style.background = 'var(--primary-light)';
                placeholder.style.color = 'var(--neutral-medium)';
                placeholder.innerHTML = 'Video explicativo del método FRET GPS<br><small>(Insertar video de YouTube)</small>';
            }, 2000);
        });
    });
}

// TRACKING DE CONVERSIONES PROFESIONAL
function trackConversion(action, location, additionalData = {}) {
    const eventData = {
        action: action,
        location: location,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        page: 'fret-gps-landing',
        ...additionalData
    };
    
    console.log('Conversión FRET GPS:', eventData);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'FRET GPS Landing',
            event_label: location,
            custom_parameter_1: 'guitarrista_intermedio',
            custom_parameter_2: additionalData.section || 'unknown'
        });
    }
    
    // Facebook Pixel (opcional)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: `FRET GPS ${action}`,
            content_category: location
        });
    }
    
    // Enviar a backend si existe
    if (window.analytics && typeof window.analytics.track === 'function') {
        window.analytics.track(action, eventData);
    }
}

// TRACKING DE CONVERSIONES
function initializeConversionTracking() {
    // WhatsApp tracking con ubicaciones específicas
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach((link, index) => {
        const locations = ['header', 'hero', 'final_whatsapp', 'floating'];
        const location = locations[index] || 'unknown';
        
        link.addEventListener('click', () => {
            trackConversion('whatsapp_click', location, {
                section: getElementSection(link),
                buttonText: link.textContent.trim()
            });
        });
    });

    // Calendly tracking con ubicaciones específicas
    const calendlyLinks = document.querySelectorAll('a[href*="calendly"]');
    calendlyLinks.forEach((link, index) => {
        const locations = ['hero', 'offer', 'final_calendly'];
        const location = locations[index] || 'unknown';
        
        link.addEventListener('click', () => {
            trackConversion('calendly_click', location, {
                section: getElementSection(link),
                buttonText: link.textContent.trim()
            });
        });
    });

    // Scroll engagement tracking
    initializeScrollTracking();
    
    // Time on page tracking
    initializeTimeTracking();
    
    // Element visibility tracking
    initializeVisibilityTracking();
}

// TRACKING DE SCROLL
function initializeScrollTracking() {
    let maxScroll = 0;
    let scrollMilestones = [25, 50, 75, 90];
    
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollMilestones.forEach(milestone => {
                if (maxScroll >= milestone && !window[`scroll_${milestone}_tracked`]) {
                    window[`scroll_${milestone}_tracked`] = true;
                    trackConversion(`scroll_${milestone}`, 'engagement', {
                        scrollPercent: milestone
                    });
                }
            });
        }
    });
}

// TRACKING DE TIEMPO EN PÁGINA
function initializeTimeTracking() {
    let timeOnPage = 0;
    const timeMilestones = [30, 60, 120, 300]; // segundos
    
    setInterval(() => {
        timeOnPage += 10;
        
        timeMilestones.forEach(milestone => {
            if (timeOnPage >= milestone && !window[`time_${milestone}_tracked`]) {
                window[`time_${milestone}_tracked`] = true;
                trackConversion(`time_${milestone}s`, 'engagement', {
                    timeSpent: milestone
                });
            }
        });
    }, 10000); // Cada 10 segundos
}

// TRACKING DE VISIBILIDAD DE SECCIONES
function initializeVisibilityTracking() {
    const sections = [
        { selector: '.hero', name: 'hero' },
        { selector: '.benefits-grid', name: 'benefits' },
        { selector: '.testimonials-grid', name: 'testimonials' },
        { selector: '.pain-section', name: 'pain_points' },
        { selector: '.solution-section', name: 'solution' },
        { selector: '.includes-grid', name: 'includes' },
        { selector: '.instructor-section', name: 'instructor' },
        { selector: '.options-grid', name: 'options' },
        { selector: '.special-offer', name: 'offer' }
    ];
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.dataset.section;
                if (!window[`section_${sectionName}_viewed`]) {
                    window[`section_${sectionName}_viewed`] = true;
                    trackConversion('section_view', sectionName, {
                        viewTime: new Date().toISOString()
                    });
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element) {
            element.dataset.section = section.name;
            sectionObserver.observe(element);
        }
    });
}

// UTILIDADES
function getElementSection(element) {
    // Determinar en qué sección está el elemento
    const sections = ['hero', 'steps', 'benefits', 'testimonials', 'pain', 'solution', 'includes', 'instructor', 'options', 'offer', 'final'];
    
    for (let section of sections) {
        const sectionElement = document.querySelector(`.${section}`) || 
                              document.querySelector(`[data-section="${section}"]`) ||
                              element.closest(`.${section}`);
        if (sectionElement && sectionElement.contains(element)) {
            return section;
        }
    }
    
    return 'unknown';
}

// EFECTOS ESPECIALES
function addSpecialEffects() {
    // Efecto de pulsación en ofertas especiales
    const specialOffer = document.querySelector('.special-offer');
    if (specialOffer) {
        setInterval(() => {
            specialOffer.classList.add('pulse-glow');
            setTimeout(() => {
                specialOffer.classList.remove('pulse-glow');
            }, 1000);
        }, 5000);
    }
    
    // Efectos de parallax sutil
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    });
}

// MANEJO DE FORMULARIOS (si se agregan)
function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formObject = Object.fromEntries(formData);
            
            trackConversion('form_submit', 'lead_generation', {
                formData: formObject,
                formId: form.id || 'unknown'
            });
            
            // Aquí iría la lógica de envío del formulario
            console.log('Formulario enviado:', formObject);
        });
    });
}

// ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('Error en FRET GPS Landing:', e.error);
    
    // Tracking de errores
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// PERFORMANCE MONITORING
function initializePerformanceMonitoring() {
    // Medir tiempo de carga
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        
        trackConversion('page_load', 'performance', {
            loadTime: Math.round(loadTime),
            loadTimeCategory: loadTime < 1000 ? 'fast' : loadTime < 3000 ? 'medium' : 'slow'
        });
    });
    
    // Medir interacción más larga
    let maxInteractionTime = 0;
    
    ['mouseenter', 'click', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, () => {
            const interactionTime = performance.now();
            if (interactionTime > maxInteractionTime) {
                maxInteractionTime = interactionTime;
            }
        });
    });
}

// EFECTOS VISUALES AVANZADOS
function initializeAdvancedEffects() {
    // Efecto de typing en títulos principales
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i > text.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    });
    
    // Efectos de partículas sutiles (opcional)
    createSubtleParticles();
}

// PARTÍCULAS SUTILES DE FONDO
function createSubtleParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
    `;
    
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent-blue-primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle 10s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Crear partículas ocasionalmente
    setInterval(createParticle, 3000);
}

// SMOOTH SCROLLING PARA ENLACES INTERNOS
function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                trackConversion('internal_navigation', targetId);
            }
        });
    });
}

// DETECCIÓN DE SALIDA DE PÁGINA
function initializeExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            
            trackConversion('exit_intent', 'page_abandonment', {
                timeOnPage: Math.round(performance.now() / 1000),
                scrollPosition: Math.round((window.scrollY / document.body.scrollHeight) * 100)
            });
            
            // Aquí podrías mostrar un modal de retención
            // showExitIntentModal();
        }
    });
}

// LAZY LOADING DE IMÁGENES
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// INICIALIZAR EFECTOS ADICIONALES DESPUÉS DE CARGA
window.addEventListener('load', () => {
    addSpecialEffects();
    initializePerformanceMonitoring();
    initializeAdvancedEffects();
    initializeSmoothScrolling();
    initializeExitIntent();
    initializeLazyLoading();
});

// CSS DINÁMICO PARA ANIMACIONES
const dynamicCSS = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10%, 90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: var(--glow-blue);
        }
        50% {
            box-shadow: var(--glow-blue), var(--glow-gold);
        }
    }
`;

// Inyectar CSS dinámico
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicCSS;
document.head.appendChild(styleSheet);
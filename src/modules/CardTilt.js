/**
 * CardTilt Module
 * 3D tilt effect for project cards using Vanilla-tilt
 */

import VanillaTilt from 'vanilla-tilt';

export const CardTilt = {
    init() {
        this.initProjectCards();
        this.initSkillCards();
        this.initTestimonialCards();
    },

    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            VanillaTilt.init(card, {
                max: 10, // Maximum tilt angle
                speed: 400, // Animation speed
                glare: true, // Enable glare effect
                'max-glare': 0.3, // Maximum glare opacity
                scale: 1.05, // Scale on hover
                perspective: 1000, // Perspective value
                transition: true, // Smooth transition
                easing: 'cubic-bezier(.03,.98,.52,.99)',
                reset: true, // Reset on mouse leave
                gyroscope: false // Disable gyroscope on mobile
            });

            // Add shine effect layer
            this.addShineEffect(card);
        });
    },

    initSkillCards() {
        const skillCards = document.querySelectorAll('.skill-category, .soft-skill-item');
        
        skillCards.forEach(card => {
            VanillaTilt.init(card, {
                max: 8,
                speed: 500,
                glare: true,
                'max-glare': 0.2,
                scale: 1.03,
                perspective: 1200,
                transition: true,
                easing: 'cubic-bezier(.03,.98,.52,.99)'
            });
        });
    },

    initTestimonialCards() {
        const testimonialCards = document.querySelectorAll('.testimonial-item');
        
        testimonialCards.forEach(card => {
            VanillaTilt.init(card, {
                max: 6,
                speed: 450,
                glare: true,
                'max-glare': 0.15,
                scale: 1.02,
                perspective: 1500,
                transition: true
            });
        });
    },

    addShineEffect(element) {
        // Create shine overlay
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(shine);

        // Track mouse movement for shine effect
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`;
            shine.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            shine.style.opacity = '0';
        });
    },

    destroy() {
        // Remove all vanilla-tilt instances
        document.querySelectorAll('[data-tilt]').forEach(el => {
            if (el.vanillaTilt) {
                el.vanillaTilt.destroy();
            }
        });
    }
};

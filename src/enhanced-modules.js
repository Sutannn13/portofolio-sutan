/**
 * Enhanced Modules Initializer
 * Loads and initializes all premium enhancements
 */

import { CustomCursor } from './modules/CustomCursor.js';
import { CardTilt } from './modules/CardTilt.js';
import { ThreeBackground } from './modules/ThreeBackground.js';
import { TextReveal } from './modules/TextReveal.js';
import { PageTransitions } from './modules/PageTransitions.js';

// Initialize when DOM is ready and GSAP is loaded
const initEnhancements = () => {
    // Wait for GSAP to be available (loaded from CDN)
    const checkGSAP = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(checkGSAP);

            console.log('🚀 Initializing Premium Enhancements...');

            // Initialize in order
            setTimeout(() => {
                console.log('✨ Custom Cursor');
                CustomCursor.init();
            }, 100);

            setTimeout(() => {
                console.log('✨ Three.js Background');
                ThreeBackground.init();
            }, 300);

            setTimeout(() => {
                console.log('✨ Card Tilt Effects');
                CardTilt.init();
            }, 500);

            setTimeout(() => {
                console.log('✨ Text Reveal Animations');
                TextReveal.init();
            }, 700);

            setTimeout(() => {
                console.log('✨ Page Transitions');
                PageTransitions.init();
            }, 900);

            setTimeout(() => {
                console.log('🎉 All enhancements loaded!');
            }, 1200);
        }
    }, 100);

    // Timeout after 10 seconds if GSAP not loaded
    setTimeout(() => {
        clearInterval(checkGSAP);
    }, 10000);
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
    initEnhancements();
}

// Export for manual control if needed
export {
    CustomCursor,
    CardTilt,
    ThreeBackground,
    TextReveal,
    PageTransitions
};

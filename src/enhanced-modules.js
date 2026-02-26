/**
 * Enhanced Modules Initializer
 * Loads and initializes all premium enhancements
 *
 * NOTE: PageTransitions and TextReveal are intentionally DISABLED.
 * - PageTransitions.initPageLoadAnimation() calls gsap.from('body > *', {opacity:0})
 *   which re-hides <main> ~1.4s after load, wiping out the hero entrance animation
 *   and causing the ID card + profile to be invisible on first visit.
 * - TextReveal.initHeroText() duplicates the hero title animations already handled
 *   by script.js HeroAnimations.entrance(), causing conflicts.
 * All other animations are handled exclusively by script.js.
 */

import { CustomCursor } from './modules/CustomCursor.js';
import { CardTilt } from './modules/CardTilt.js';
import { ThreeBackground } from './modules/ThreeBackground.js';

// Initialize when DOM is ready and GSAP is loaded
const initEnhancements = () => {
    // Wait for GSAP to be available (loaded from CDN)
    const checkGSAP = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(checkGSAP);

            console.log('🚀 Initializing Premium Enhancements...');

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
                console.log('🎉 All enhancements loaded!');
            }, 700);
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
};

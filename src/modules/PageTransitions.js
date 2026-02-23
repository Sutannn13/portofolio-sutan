/**
 * PageTransitions Module
 * Smooth page and section transitions using GSAP
 */

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const PageTransitions = {
    overlay: null,
    isTransitioning: false,

    init() {
        this.createOverlay();
        this.initNavigationTransitions();
        this.initSectionTransitions();
        this.initPageLoadAnimation();
    },

    createOverlay() {
        // Create transition overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        document.body.appendChild(this.overlay);

        // Create multiple layers for liquid effect
        for (let i = 0; i < 3; i++) {
            const layer = document.createElement('div');
            layer.className = 'transition-layer';
            layer.style.background = i === 0 ? '#6366f1' :
                i === 1 ? '#8b5cf6' : '#a855f7';
            this.overlay.appendChild(layer);
        }
    },

    initPageLoadAnimation() {
        // Initial page load animation
        const layers = this.overlay.querySelectorAll('.transition-layer');

        gsap.set(this.overlay, { display: 'flex' });
        gsap.set(layers, { scaleY: 1 });

        gsap.to(layers, {
            scaleY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.inOut',
            onComplete: () => {
                gsap.set(this.overlay, { display: 'none' });
            }
        });

        // Fade in content
        gsap.from('body > *:not(.page-transition-overlay):not(#main-header):not(#loader):not(.animated-background)', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
        });
    },

    initNavigationTransitions() {
        // Smooth scroll to sections with transition
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href === '') return;

                e.preventDefault();

                const target = document.querySelector(href);
                if (!target) return;

                this.transitionToSection(target);
            });
        });
    },

    transitionToSection(target) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const layers = this.overlay.querySelectorAll('.transition-layer');

        // Transition in
        gsap.set(this.overlay, { display: 'flex' });

        const timeline = gsap.timeline({
            onComplete: () => {
                this.isTransitioning = false;
            }
        });

        // Slide layers down
        timeline.to(layers, {
            scaleY: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.inOut',
            transformOrigin: 'top'
        });

        // Scroll to target
        timeline.call(() => {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                duration: 0.1
            });
        });

        // Slide layers up
        timeline.to(layers, {
            scaleY: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.inOut',
            transformOrigin: 'bottom'
        });

        // Hide overlay
        timeline.set(this.overlay, { display: 'none' });
    },

    initSectionTransitions() {
        // Fade sections on scroll
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            gsap.set(section, { opacity: 0, y: 50 });

            gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        });
    },

    // Morphing transition effect
    morphTransition(from, to) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const timeline = gsap.timeline({
            onComplete: () => {
                this.isTransitioning = false;
            }
        });

        // Morph out current content
        timeline.to(from, {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in'
        });

        // Morph in new content
        timeline.fromTo(to, {
            scale: 0.95,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out'
        });

        return timeline;
    },

    // Ripple transition effect
    rippleTransition(clickX, clickY) {
        const ripple = document.createElement('div');
        ripple.className = 'transition-ripple';
        ripple.style.left = clickX + 'px';
        ripple.style.top = clickY + 'px';
        document.body.appendChild(ripple);

        gsap.fromTo(ripple, {
            width: 0,
            height: 0,
            opacity: 1
        }, {
            width: window.innerWidth * 2,
            height: window.innerWidth * 2,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                ripple.remove();
            }
        });
    },

    // Page exit animation (for SPAs or page changes)
    exitAnimation(callback) {
        const layers = this.overlay.querySelectorAll('.transition-layer');

        gsap.set(this.overlay, { display: 'flex' });

        gsap.to(layers, {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power4.inOut',
            transformOrigin: 'top',
            onComplete: callback
        });
    },

    destroy() {
        if (this.overlay) {
            this.overlay.remove();
        }
    }
};

/**
 * TextReveal Module
 * Advanced text reveal animations using SplitType and GSAP
 */

import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TextReveal = {
    splitInstances: [],

    init() {
        this.initHeroText();
        this.initSectionTitles();
        this.initParagraphs();
        this.initStaggeredLists();
    },

    initHeroText() {
        // Hero title - words reveal
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            const split = new SplitType(heroTitle, { types: 'words' });
            this.splitInstances.push(split);

            gsap.from(split.words, {
                opacity: 0,
                y: 100,
                rotateX: -90,
                stagger: 0.1,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: heroTitle,
                    start: 'top 80%'
                }
            });
        }

        // Hero subtitle - characters wave
        const heroSubtitle = document.querySelector('.hero-section .hero-subtitle, .hero-section p');
        if (heroSubtitle) {
            const split = new SplitType(heroSubtitle, { types: 'chars' });
            this.splitInstances.push(split);

            gsap.from(split.chars, {
                opacity: 0,
                y: 50,
                rotateZ: () => gsap.utils.random(-10, 10),
                stagger: 0.02,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.5
            });
        }
    },

    initSectionTitles() {
        const sectionTitles = document.querySelectorAll('.section-title, h2[id$="-title"]');
        
        sectionTitles.forEach(title => {
            // Skip if already processed
            if (title.dataset.textReveal === 'processed') return;
            title.dataset.textReveal = 'processed';

            const split = new SplitType(title, { types: 'words,chars' });
            this.splitInstances.push(split);

            // Clip-path reveal effect
            gsap.set(split.words, {
                clipPath: 'inset(0 100% 0 0)',
                opacity: 1
            });

            ScrollTrigger.create({
                trigger: title,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(split.words, {
                        clipPath: 'inset(0 0% 0 0)',
                        stagger: 0.08,
                        duration: 0.8,
                        ease: 'power4.out'
                    });

                    // Character color fade
                    gsap.from(split.chars, {
                        color: 'rgba(99, 102, 241, 0.3)',
                        stagger: 0.03,
                        duration: 0.5,
                        delay: 0.2
                    });
                },
                once: true
            });
        });
    },

    initParagraphs() {
        const paragraphs = document.querySelectorAll('.animate-on-scroll p, .timeline-content p, .about-text');
        
        paragraphs.forEach((para, index) => {
            // Skip if already processed or too short
            if (para.dataset.textReveal === 'processed' || para.textContent.length < 10) return;
            para.dataset.textReveal = 'processed';

            const split = new SplitType(para, { types: 'lines' });
            this.splitInstances.push(split);

            // Wrap lines in overflow container
            split.lines.forEach(line => {
                const wrapper = document.createElement('div');
                wrapper.style.overflow = 'hidden';
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            gsap.set(split.lines, {
                y: 100,
                opacity: 0
            });

            ScrollTrigger.create({
                trigger: para,
                start: 'top 90%',
                onEnter: () => {
                    gsap.to(split.lines, {
                        y: 0,
                        opacity: 1,
                        stagger: 0.05,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        });
    },

    initStaggeredLists() {
        // Skill badges, project tags, etc.
        const lists = document.querySelectorAll('.skill-grid, .tech-stack, .badge-container');
        
        lists.forEach(list => {
            const items = list.querySelectorAll('.skill-badge, .badge, .tech-badge, .tool-badge');
            
            if (items.length === 0) return;

            gsap.set(items, {
                opacity: 0,
                scale: 0,
                rotate: () => gsap.utils.random(-15, 15)
            });

            ScrollTrigger.create({
                trigger: list,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(items, {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        stagger: {
                            each: 0.04,
                            from: 'random'
                        },
                        duration: 0.6,
                        ease: 'back.out(1.5)'
                    });
                },
                once: true
            });
        });
    },

    // Utility: Reveal text on demand
    revealText(element, options = {}) {
        const defaults = {
            type: 'words', // 'words', 'chars', 'lines'
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out',
            from: { opacity: 0, y: 50 }
        };

        const config = { ...defaults, ...options };
        const split = new SplitType(element, { types: config.type });
        this.splitInstances.push(split);

        const targets = config.type === 'words' ? split.words : 
                       config.type === 'chars' ? split.chars : split.lines;

        gsap.from(targets, {
            ...config.from,
            stagger: config.stagger,
            duration: config.duration,
            ease: config.ease
        });
    },

    // Re-initialize on window resize
    handleResize() {
        // Debounced resize handler
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.splitInstances.forEach(instance => {
                if (instance.revert) {
                    instance.revert();
                }
            });
            this.splitInstances = [];
            ScrollTrigger.refresh();
            this.init();
        }, 300);
    },

    destroy() {
        this.splitInstances.forEach(instance => {
            if (instance.revert) {
                instance.revert();
            }
        });
        this.splitInstances = [];
    }
};

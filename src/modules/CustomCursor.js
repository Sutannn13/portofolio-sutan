/**
 * CustomCursor Module - Enhanced Design v2.0
 * Interactive cursor with trail, glow, and magnetic effects
 * Enhanced with velocity tracking and smoother animations
 */

export const CustomCursor = {
    cursor: null,
    cursorDot: null,
    cursorTrail: [],
    trailLength: 8,
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    lastX: 0,
    lastY: 0,
    velocity: 0,
    isHovering: false,

    init() {
        // Only initialize on desktop (pointer device)
        if (window.matchMedia('(pointer: fine)').matches) {
            this.createCursor();
            this.setupEventListeners();
            this.animate();
            console.log('🖱️ Enhanced Custom Cursor Initialized');
        }
    },

    createCursor() {
        // Main cursor circle
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        // Cursor dot (center)
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(this.cursorDot);

        // Create trail particles with staggered animation
        for (let i = 0; i < this.trailLength; i++) {
            const trail = document.createElement('div');
            trail.className = 'custom-cursor-trail';
            trail.style.opacity = (1 - i / this.trailLength) * 0.6;
            trail.style.transform = 'scale(' + (1 - i / this.trailLength * 0.3) + ')';
            trail.style.animationDelay = (i * 0.1) + 's';
            document.body.appendChild(trail);
            this.cursorTrail.push({
                element: trail,
                x: 0,
                y: 0
            });
        }

        // Hide default cursor
        document.body.style.cursor = 'none';
    },

    setupEventListeners() {
        // Track mouse movement with throttling for performance
        let rafId = null;
        document.addEventListener('mousemove', (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                this.updateMousePosition(e.clientX, e.clientY);
                rafId = null;
            });
        });

        // Enhanced hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"], .project-card, .skill-category');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.cursor.classList.add('cursor-hover');
                this.cursorDot.classList.add('cursor-hover');
                
                // Add ripple effect on hover
                this.addRippleEffect(el);
            });

            el.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.cursor.classList.remove('cursor-hover');
                this.cursorDot.classList.remove('cursor-hover');
            });

            // Enhanced magnetic effect for buttons and cards
            if (el.matches('button, .btn, [role="button"], .project-card, .skill-category')) {
                el.addEventListener('mousemove', (e) => this.magneticEffect(e, el));
                el.addEventListener('mouseleave', () => this.resetMagnetic(el));
            }
        });

        // Enhanced click effects with ripple animation
        document.addEventListener('mousedown', (e) => {
            this.cursor.classList.add('cursor-click');
            this.cursorDot.classList.add('cursor-click');
            this.createClickRipple(e.clientX, e.clientY);
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('cursor-click');
            this.cursorDot.classList.remove('cursor-click');
        });

        // Scroll detection for additional effects
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                this.cursor.style.mixBlendMode = 'normal';
                isScrolling = true;
            }
            
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                this.cursor.style.mixBlendMode = 'difference';
                isScrolling = false;
            }, 150);
        });
    },

    updateMousePosition(x, y) {
        // Calculate velocity for dynamic effects
        const deltaX = x - this.lastX;
        const deltaY = y - this.lastY;
        this.velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        this.lastX = this.mouseX;
        this.lastY = this.mouseY;
        this.mouseX = x;
        this.mouseY = y;
        
        // Apply velocity-based scaling to cursor
        this.applyVelocityEffects();
    },

    applyVelocityEffects() {
        const maxVelocity = 50;
        const normalizedVelocity = Math.min(this.velocity / maxVelocity, 1);
        
        // Dynamic cursor scaling based on velocity
        if (normalizedVelocity > 0.3) {
            const scale = 1 + normalizedVelocity * 0.3;
            this.cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
            this.cursorDot.style.transform = `translate(-50%, -50%) scale(${scale * 0.8})`;
        } else {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
        
        // Update CSS custom properties for advanced animations
        document.documentElement.style.setProperty('--cursor-velocity', normalizedVelocity);
    },

    addRippleEffect(element) {
        // Add subtle ripple effect to hovered elements
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.appendChild(ripple);
        setTimeout(() => ripple.style.opacity = '1', 10);
        
        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.remove();
            }
        }, 500);
    },

    createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple-expand 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 9997;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    },

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const maxDistance = 120; // Increased magnetic field
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.4;
            const deltaX = (e.clientX - centerX) * force;
            const deltaY = (e.clientY - centerY) * force;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${1 + force * 0.05})`;
            element.style.transition = 'transform 0.1s ease-out';
        }
    },

    resetMagnetic(element) {
        element.style.transform = '';
        element.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    },

    animate() {
        // Enhanced smooth cursor movement with adaptive easing
        const baseEase = 0.12;
        const velocityEase = Math.min(this.velocity * 0.001, 0.05);
        const ease = baseEase + velocityEase;
        
        this.cursorX += (this.mouseX - this.cursorX) * ease;
        this.cursorY += (this.mouseY - this.cursorY) * ease;

        // Update main cursor position
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';

        // Update dot position (faster follow with slight delay)
        const dotEase = 0.2;
        this.cursorDot.style.left = this.cursorX + 'px';
        this.cursorDot.style.top = this.cursorY + 'px';

        // Update trail positions with enhanced staggered animation
        this.cursorTrail.forEach((trail, index) => {
            const delay = (index + 1) * 0.04;
            const trailEase = ease - delay;
            
            trail.x += (this.cursorX - trail.x) * Math.max(trailEase, 0.02);
            trail.y += (this.cursorY - trail.y) * Math.max(trailEase, 0.02);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            
            // Dynamic trail opacity based on velocity
            const velocityOpacity = Math.min(this.velocity / 30, 1);
            const baseOpacity = (1 - index / this.trailLength) * 0.6;
            trail.element.style.opacity = baseOpacity * (0.3 + velocityOpacity * 0.7);
        });

        requestAnimationFrame(() => this.animate());
    },

    destroy() {
        if (this.cursor) this.cursor.remove();
        if (this.cursorDot) this.cursorDot.remove();
        this.cursorTrail.forEach(trail => trail.element.remove());
        document.body.style.cursor = '';
        console.log('🖱️ Enhanced Custom Cursor Destroyed');
    }
};
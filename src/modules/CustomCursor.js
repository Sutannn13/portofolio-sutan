/**
 * CustomCursor Module
 * Interactive cursor with trail, glow, and magnetic effects
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
    isHovering: false,

    init() {
        // Only initialize on desktop (pointer device)
        if (window.matchMedia('(pointer: fine)').matches) {
            this.createCursor();
            this.setupEventListeners();
            this.animate();
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

        // Create trail particles
        for (let i = 0; i < this.trailLength; i++) {
            const trail = document.createElement('div');
            trail.className = 'custom-cursor-trail';
            trail.style.opacity = (1 - i / this.trailLength) * 0.5;
            trail.style.transform = 'scale(' + (1 - i / this.trailLength * 0.5) + ')';
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
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.cursor.classList.add('cursor-hover');
                this.cursorDot.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.cursor.classList.remove('cursor-hover');
                this.cursorDot.classList.remove('cursor-hover');
            });

            // Magnetic effect for buttons
            if (el.matches('button, .btn, [role="button"]')) {
                el.addEventListener('mousemove', (e) => this.magneticEffect(e, el));
                el.addEventListener('mouseleave', () => this.resetMagnetic(el));
            }
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('cursor-click');
            this.cursorDot.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('cursor-click');
            this.cursorDot.classList.remove('cursor-click');
        });
    },

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },

    resetMagnetic(element) {
        element.style.transform = '';
    },

    animate() {
        // Smooth cursor movement with easing
        const ease = 0.15;
        this.cursorX += (this.mouseX - this.cursorX) * ease;
        this.cursorY += (this.mouseY - this.cursorY) * ease;

        // Update main cursor position
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';

        // Update dot position (faster follow)
        const dotEase = 0.25;
        const dotX = this.cursorX;
        const dotY = this.cursorY;
        this.cursorDot.style.left = dotX + 'px';
        this.cursorDot.style.top = dotY + 'px';

        // Update trail positions with delay
        this.cursorTrail.forEach((trail, index) => {
            const delay = (index + 1) * 0.05;
            trail.x += (this.cursorX - trail.x) * (ease - delay);
            trail.y += (this.cursorY - trail.y) * (ease - delay);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });

        requestAnimationFrame(() => this.animate());
    },

    destroy() {
        if (this.cursor) this.cursor.remove();
        if (this.cursorDot) this.cursorDot.remove();
        this.cursorTrail.forEach(trail => trail.element.remove());
        document.body.style.cursor = '';
    }
};

/**
 * ThreeBackground Module
 * 3D geometric particles background using Three.js
 * Replaces particles.js with interactive 3D floating shapes
 */

import * as THREE from 'three';

export const ThreeBackground = {
    scene: null,
    camera: null,
    renderer: null,
    particles: [],
    mouse: { x: 0, y: 0 },
    targetMouse: { x: 0, y: 0 },
    container: null,
    animationFrame: null,

    init() {
        this.container = document.getElementById('particles-js') || document.querySelector('.hero-section');
        if (!this.container) return;

        this.setupScene();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    },

    setupScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a1a, 1, 1000);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.z = 500;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0); // Transparent background

        // Clear existing canvas if any
        const existingCanvas = this.container.querySelector('canvas');
        if (existingCanvas) existingCanvas.remove();

        this.container.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.zIndex = '0';
        this.renderer.domElement.style.pointerEvents = 'none';
    },

    createParticles() {
        const geometries = [
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.SphereGeometry(5, 8, 8),
            new THREE.TetrahedronGeometry(6),
            new THREE.OctahedronGeometry(6),
            new THREE.IcosahedronGeometry(5)
        ];

        const particleCount = 80;
        const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x06b6d4, 0xa855f7];

        for (let i = 0; i < particleCount; i++) {
            // Random geometry
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            
            // Create material with glow
            const color = colors[Math.floor(Math.random() * colors.length)];
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.7,
                wireframe: Math.random() > 0.5
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.x = (Math.random() - 0.5) * 1500;
            mesh.position.y = (Math.random() - 0.5) * 1500;
            mesh.position.z = (Math.random() - 0.5) * 1000;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI * 2;
            mesh.rotation.y = Math.random() * Math.PI * 2;

            // Store velocity for animation
            mesh.userData = {
                velocity: {
                    x: (Math.random() - 0.5) * 0.3,
                    y: (Math.random() - 0.5) * 0.3,
                    z: (Math.random() - 0.5) * 0.3
                },
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                }
            };

            this.scene.add(mesh);
            this.particles.push(mesh);
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Add point lights for glow effect
        const pointLight1 = new THREE.PointLight(0x6366f1, 1, 500);
        pointLight1.position.set(200, 200, 200);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xec4899, 1, 500);
        pointLight2.position.set(-200, -200, -200);
        this.scene.add(pointLight2);
    },

    setupEventListeners() {
        // Mouse movement for parallax
        document.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Pause animation when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }
            } else {
                this.animate();
            }
        });
    },

    animate() {
        this.animationFrame = requestAnimationFrame(() => this.animate());

        // Smooth mouse following
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Parallax camera movement
        this.camera.position.x = this.mouse.x * 50;
        this.camera.position.y = this.mouse.y * 50;
        this.camera.lookAt(this.scene.position);

        // Animate each particle
        this.particles.forEach(particle => {
            // Float movement
            particle.position.x += particle.userData.velocity.x;
            particle.position.y += particle.userData.velocity.y;
            particle.position.z += particle.userData.velocity.z;

            // Rotation
            particle.rotation.x += particle.userData.rotationSpeed.x;
            particle.rotation.y += particle.userData.rotationSpeed.y;
            particle.rotation.z += particle.userData.rotationSpeed.z;

            // Boundary check - wrap around
            const boundary = 750;
            if (Math.abs(particle.position.x) > boundary) {
                particle.position.x = -particle.position.x;
            }
            if (Math.abs(particle.position.y) > boundary) {
                particle.position.y = -particle.position.y;
            }
            if (Math.abs(particle.position.z) > 500) {
                particle.position.z = -particle.position.z;
            }

            // Pulse opacity based on distance from camera
            const distance = particle.position.distanceTo(this.camera.position);
            particle.material.opacity = Math.max(0.3, 1 - distance / 1000);
        });

        this.renderer.render(this.scene, this.camera);
    },

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Dispose geometries and materials
        this.particles.forEach(particle => {
            particle.geometry.dispose();
            particle.material.dispose();
        });
        
        // Remove renderer
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
    }
};

/**
 * Modern Fluid Background System v2.0  
 * Interactive particle flow with cursor magnetic field and fluid dynamics
 * Enhanced with shader materials and advanced particle physics
 */

import * as THREE from 'three';

export const ThreeBackground = {
    // Core Three.js components
    scene: null,
    camera: null,
    renderer: null,
    
    // Particle systems
    flowParticles: null,
    geometricParticles: [],
    connectionLines: [],
    
    // Interaction system
    mouse: { x: 0, y: 0 },
    targetMouse: { x: 0, y: 0 },
    mouseVelocity: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    
    // Animation state
    container: null,
    animationFrame: null,
    clock: new THREE.Clock(),
    
    // Configuration
    config: {
        particleCount: 200,
        flowSpeed: 0.5,
        mouseInfluence: 150,
        magneticStrength: 0.3,
        connectionDistance: 120,
        flowField: true,
        geometricShapes: true
    },

    init() {
        console.log('🌊 Initializing Modern Fluid Background...');
        
        this.container = document.getElementById('hero-particles') || 
                        document.getElementById('particles-js') || 
                        document.querySelector('.hero-section');
        
        if (!this.container) {
            console.warn('No container found for background particles');
            return;
        }

        this.setupScene();
        this.createFluidParticleSystem();
        this.createGeometricElements();
        this.createShaderMaterials();
        this.setupEventListeners();
        this.animate();
        
        console.log('✅ Modern Fluid Background Initialized');
    },

    setupScene() {
        // Create scene with enhanced fog
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0a0e1a, 0.0008);

        // Setup camera with better FOV
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            3000
        );
        this.camera.position.set(0, 0, 1000);

        // Enhanced renderer with better settings
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Clear existing canvas and append new one
        const existingCanvas = this.container.querySelector('canvas');
        if (existingCanvas) existingCanvas.remove();

        this.container.appendChild(this.renderer.domElement);
        
        // Style the canvas
        Object.assign(this.renderer.domElement.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '0',
            pointerEvents: 'none'
        });
    },

    createFluidParticleSystem() {
        const particleCount = this.config.particleCount;
        const geometry = new THREE.BufferGeometry();
        
        // Create particle positions and attributes
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const life = new Float32Array(particleCount);
        
        const colorPalette = [
            new THREE.Color(0x6366f1), // Indigo
            new THREE.Color(0x8b5cf6), // Purple  
            new THREE.Color(0xec4899), // Pink
            new THREE.Color(0x06b6d4), // Cyan
            new THREE.Color(0xa855f7), // Violet
            new THREE.Color(0x22d3ee)  // Light cyan
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions in 3D space
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 1000;
            
            // Initial velocities
            velocities[i3] = (Math.random() - 0.5) * 2;
            velocities[i3 + 1] = (Math.random() - 0.5) * 2;
            velocities[i3 + 2] = (Math.random() - 0.5) * 1;
            
            // Random colors from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Varying sizes
            sizes[i] = Math.random() * 4 + 1;
            
            // Life cycle
            life[i] = Math.random();
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('life', new THREE.BufferAttribute(life, 1));
        
        // Enhanced particle material with shader
        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        // Add glow texture
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.height = 64;
        
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        material.map = new THREE.CanvasTexture(canvas);
        
        this.flowParticles = new THREE.Points(geometry, material);
        this.scene.add(this.flowParticles);
    },

    createGeometricElements() {
        if (!this.config.geometricShapes) return;
        
        const geometries = [
            new THREE.TetrahedronGeometry(8, 0),
            new THREE.OctahedronGeometry(6, 0),
            new THREE.IcosahedronGeometry(7, 0),
            new THREE.DodecahedronGeometry(6, 0)
        ];
        
        const count = 15;
        const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x06b6d4, 0xa855f7];
        
        for (let i = 0; i < count; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Enhanced material with better glow
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.2,
                transparent: true,
                opacity: 0.4,
                wireframe: Math.random() > 0.7,
                shininess: 100
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Position in 3D space
            mesh.position.set(
                (Math.random() - 0.5) * 1800,
                (Math.random() - 0.5) * 1800,
                (Math.random() - 0.5) * 800
            );
            
            // Random initial rotation
            mesh.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );
            
            // Enhanced user data for animation
            mesh.userData = {
                originalPosition: mesh.position.clone(),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.2
                ),
                rotationSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.015
                ),
                magneticForce: new THREE.Vector3(0, 0, 0),
                scale: 1,
                targetScale: 1
            };
            
            this.scene.add(mesh);
            this.geometricParticles.push(mesh);
        }
    },

    createShaderMaterials() {
        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Dynamic point lights that follow mouse
        const pointLight1 = new THREE.PointLight(0x6366f1, 1.5, 800);
        pointLight1.position.set(300, 300, 300);
        pointLight1.castShadow = true;
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xec4899, 1.5, 800);
        pointLight2.position.set(-300, -300, -300);
        pointLight2.castShadow = true;
        this.scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0x06b6d4, 1.2, 600);
        pointLight3.position.set(0, 0, 400);
        this.scene.add(pointLight3);
        
        // Store lights for animation
        this.lights = [pointLight1, pointLight2, pointLight3];
        
        // Create connection lines system
        this.createConnectionSystem();
    },

    createConnectionSystem() {
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        this.connectionLines = [];
        this.lineMaterial = lineMaterial;
    },

    setupEventListeners() {
        let rafId = null;
        
        // Enhanced mouse tracking with velocity calculation
        document.addEventListener('mousemove', (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                const newX = (e.clientX / window.innerWidth) * 2 - 1;
                const newY = -(e.clientY / window.innerHeight) * 2 + 1;
                
                // Calculate mouse velocity
                this.mouseVelocity.x = newX - this.targetMouse.x;
                this.mouseVelocity.y = newY - this.targetMouse.y;
                
                this.targetMouse.x = newX;
                this.targetMouse.y = newY;
                
                rafId = null;
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Performance optimization - pause when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }
            } else {
                this.animate();
            }
        });

        // Click interaction for burst effect
        document.addEventListener('click', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.createBurstEffect(x, y);
        });
    },

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    createBurstEffect(x, y) {
        // Create burst of particles at click position
        const burstCount = 20;
        const positions = this.flowParticles.geometry.attributes.position.array;
        const velocities = this.flowParticles.geometry.attributes.velocity.array;
        
        for (let i = 0; i < burstCount && i < positions.length / 3; i++) {
            const i3 = i * 3;
            
            // Set position near click
            positions[i3] = x * 500 + (Math.random() - 0.5) * 100;
            positions[i3 + 1] = y * 500 + (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;
            
            // Set explosive velocity
            const angle = Math.random() * Math.PI * 2;
            const speed = 5 + Math.random() * 10;
            velocities[i3] = Math.cos(angle) * speed;
            velocities[i3 + 1] = Math.sin(angle) * speed;
            velocities[i3 + 2] = (Math.random() - 0.5) * speed;
        }
        
        this.flowParticles.geometry.attributes.position.needsUpdate = true;
        this.flowParticles.geometry.attributes.velocity.needsUpdate = true;
    },

    animate() {
        this.animationFrame = requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        
        this.updateMouse(deltaTime);
        this.updateFluidParticles(deltaTime, elapsedTime);
        this.updateGeometricParticles(deltaTime, elapsedTime);
        this.updateLights(elapsedTime);
        this.updateConnections();
        this.updateCamera(deltaTime);
        
        this.renderer.render(this.scene, this.camera);
    },

    updateMouse(deltaTime) {
        // Smooth mouse interpolation
        const ease = 1 - Math.pow(0.001, deltaTime);
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * ease;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * ease;
    },

    updateFluidParticles(deltaTime, elapsedTime) {
        if (!this.flowParticles) return;
        
        const positions = this.flowParticles.geometry.attributes.position.array;
        const velocities = this.flowParticles.geometry.attributes.velocity.array;
        const life = this.flowParticles.geometry.attributes.life.array;
        
        const mouseInfluence = this.config.mouseInfluence;
        const mouseX = this.mouse.x * 500;
        const mouseY = this.mouse.y * 500;
        
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // Calculate distance to mouse
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Apply magnetic field influence
            if (distance < mouseInfluence) {
                const force = (1 - distance / mouseInfluence) * this.config.magneticStrength;
                velocities[i] += dx * force * 0.01;
                velocities[i + 1] += dy * force * 0.01;
            }
            
            // Add flow field (Perlin noise-like effect)
            if (this.config.flowField) {
                const flowX = Math.sin(x * 0.01 + elapsedTime * 0.5) * 0.5;
                const flowY = Math.cos(y * 0.01 + elapsedTime * 0.3) * 0.5;
                velocities[i] += flowX * 0.1;
                velocities[i + 1] += flowY * 0.1;
            }
            
            // Apply velocity with damping
            positions[i] += velocities[i] * this.config.flowSpeed;
            positions[i + 1] += velocities[i + 1] * this.config.flowSpeed;
            positions[i + 2] += velocities[i + 2] * this.config.flowSpeed * 0.5;
            
            // Apply damping
            velocities[i] *= 0.99;
            velocities[i + 1] *= 0.99;
            velocities[i + 2] *= 0.99;
            
            // Boundary conditions - wrap around
            const boundary = 1000;
            if (Math.abs(positions[i]) > boundary) {
                positions[i] = -positions[i] * 0.8;
                velocities[i] *= -0.5;
            }
            if (Math.abs(positions[i + 1]) > boundary) {
                positions[i + 1] = -positions[i + 1] * 0.8;
                velocities[i + 1] *= -0.5;
            }
            if (Math.abs(positions[i + 2]) > 500) {
                positions[i + 2] = -positions[i + 2] * 0.8;
                velocities[i + 2] *= -0.5;
            }
            
            // Update life cycle
            life[i / 3] += deltaTime * 0.5;
            if (life[i / 3] > 1) {
                life[i / 3] = 0;
                // Reset particle
                positions[i] = (Math.random() - 0.5) * 1000;
                positions[i + 1] = (Math.random() - 0.5) * 1000;
                positions[i + 2] = (Math.random() - 0.5) * 500;
            }
        }
        
        this.flowParticles.geometry.attributes.position.needsUpdate = true;
        this.flowParticles.geometry.attributes.velocity.needsUpdate = true;
        this.flowParticles.geometry.attributes.life.needsUpdate = true;
    },

    updateGeometricParticles(deltaTime, elapsedTime) {
        const mouseInfluence = this.config.mouseInfluence * 1.5;
        const mousePos = new THREE.Vector3(this.mouse.x * 500, this.mouse.y * 500, 0);
        
        this.geometricParticles.forEach((particle, index) => {
            const userData = particle.userData;
            
            // Calculate distance to mouse for magnetic effect
            const distance = particle.position.distanceTo(mousePos);
            
            if (distance < mouseInfluence) {
                const force = (1 - distance / mouseInfluence) * 0.02;
                userData.magneticForce.copy(mousePos).sub(particle.position).normalize().multiplyScalar(force);
                userData.targetScale = 1.2 + force * 2;
            } else {
                userData.magneticForce.multiplyScalar(0.95);
                userData.targetScale = 1;
            }
            
            // Apply forces
            userData.velocity.add(userData.magneticForce);
            userData.velocity.multiplyScalar(0.98); // Damping
            
            // Update position
            particle.position.add(userData.velocity);
            
            // Enhanced rotation with mouse influence
            particle.rotation.x += userData.rotationSpeed.x * (1 + Math.abs(this.mouseVelocity.x) * 5);
            particle.rotation.y += userData.rotationSpeed.y * (1 + Math.abs(this.mouseVelocity.y) * 5);
            particle.rotation.z += userData.rotationSpeed.z;
            
            // Smooth scale transition
            userData.scale += (userData.targetScale - userData.scale) * 0.1;
            particle.scale.setScalar(userData.scale);
            
            // Boundary wrap with smooth transition
            const boundary = 900;
            ['x', 'y'].forEach(axis => {
                if (Math.abs(particle.position[axis]) > boundary) {
                    particle.position[axis] = -particle.position[axis] * 0.9;
                    userData.velocity[axis] *= -0.3;
                }
            });
            
            if (Math.abs(particle.position.z) > 400) {
                particle.position.z = -particle.position.z * 0.9;
                userData.velocity.z *= -0.3;
            }
            
            // Dynamic opacity based on camera distance
            const cameraDistance = particle.position.distanceTo(this.camera.position);
            particle.material.opacity = Math.max(0.1, Math.min(0.6, 800 / cameraDistance));
        });
    },

    updateLights(elapsedTime) {
        if (!this.lights) return;
        
        // Animate lights to follow mouse and create dynamic lighting
        this.lights[0].position.x = this.mouse.x * 300 + Math.sin(elapsedTime * 0.5) * 200;
        this.lights[0].position.y = this.mouse.y * 300 + Math.cos(elapsedTime * 0.7) * 200;
        
        this.lights[1].position.x = -this.mouse.x * 400 + Math.cos(elapsedTime * 0.3) * 250;
        this.lights[1].position.y = -this.mouse.y * 400 + Math.sin(elapsedTime * 0.9) * 250;
        
        this.lights[2].position.x = this.mouse.x * 200;
        this.lights[2].position.y = this.mouse.y * 200;
        
        // Pulse light intensity
        this.lights.forEach((light, index) => {
            light.intensity = 1 + Math.sin(elapsedTime * (1 + index * 0.3)) * 0.3;
        });
    },

    updateConnections() {
        // Clear existing lines
        this.connectionLines.forEach(line => {
            this.scene.remove(line);
            line.geometry.dispose();
        });
        this.connectionLines = [];
        
        // Create new connections between nearby particles
        const maxConnections = 50; // Limit for performance
        let connectionCount = 0;
        
        for (let i = 0; i < this.geometricParticles.length && connectionCount < maxConnections; i++) {
            for (let j = i + 1; j < this.geometricParticles.length && connectionCount < maxConnections; j++) {
                const distance = this.geometricParticles[i].position.distanceTo(this.geometricParticles[j].position);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        this.geometricParticles[i].position,
                        this.geometricParticles[j].position
                    ]);
                    
                    const material = this.lineMaterial.clone();
                    material.opacity = opacity * 0.3;
                    
                    const line = new THREE.Line(geometry, material);
                    this.scene.add(line);
                    this.connectionLines.push(line);
                    connectionCount++;
                }
            }
        }
    },

    updateCamera(deltaTime) {
        // Enhanced camera movement with momentum
        const targetX = this.mouse.x * 30;
        const targetY = this.mouse.y * 30;
        
        this.camera.position.x += (targetX - this.camera.position.x) * 0.05;
        this.camera.position.y += (targetY - this.camera.position.y) * 0.05;
        
        // Subtle camera rotation based on mouse position
        this.camera.rotation.z = this.mouse.x * 0.02;
        
        this.camera.lookAt(this.scene.position);
    },

    destroy() {
        console.log('🌊 Destroying Modern Fluid Background...');
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Dispose geometries and materials
        this.geometricParticles.forEach(particle => {
            if (particle.geometry) particle.geometry.dispose();
            if (particle.material) particle.material.dispose();
        });
        
        this.connectionLines.forEach(line => {
            if (line.geometry) line.geometry.dispose();
            if (line.material) line.material.dispose();
        });
        
        if (this.flowParticles) {
            this.flowParticles.geometry.dispose();
            this.flowParticles.material.dispose();
        }
        
        // Clean up renderer
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
        
        // Reset state
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.flowParticles = null;
        this.geometricParticles = [];
        this.connectionLines = [];
        
        console.log('✅ Modern Fluid Background Destroyed');
    }
};
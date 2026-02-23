/*
================================================================================
| SCRIPT.JS - PORTOFOLIO SUTAN ARLIE JOHAN (REFACTOR v5.0)
| Libraries: GSAP + ScrollTrigger, Lenis Smooth Scroll
| AOS: REMOVED — GSAP handles all animations exclusively
| Loader: Real document-ready detection (no fake timer)
================================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       1. STATE & CONSTANTS
       ============================================= */
    const state = {
        blogCurrentPage: 1,
        blogPostsPerPage: 3,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        gsapReady: false,
    };

    /* =============================================
       2. DATA
       ============================================= */
    const projectData = {
        'Trash Point (HKI)': {
            type: 'project',
            title: 'Trash Point (Proyek Unggulan & Peraih HKI)',
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            description: 'Platform manajemen sampah berbasis IoT dengan sistem poin insentif. Memperoleh sertifikat HKI resmi dari Kemenkumham RI. Prototipe fungsional yang mengintegrasikan sensor MQTT dengan dashboard web real-time.',
            purpose: 'Mengurangi penumpukan sampah dan memberikan nilai ekonomis melalui sistem reward berbasis poin.',
            tech: ['React.js', 'Node.js', 'PostgreSQL', 'MQTT', 'IoT'],
            result: 'Prototipe fungsional dengan HKI resmi dari Kemenkumham RI.',
            liveLink: '#',
            repoLink: 'https://github.com/sutanarlie/trash-point',
        },
        'Fish Market': {
            type: 'project',
            title: 'Fish Market - Platform Jual Beli Ikan',
            image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            description: 'Platform jual beli ikan online yang menghubungkan penjual dan pembeli dengan sistem transaksi yang aman dan efisien. Menyediakan fitur katalog produk, manajemen pesanan, dan tracking pengiriman.',
            purpose: 'Memudahkan transaksi jual beli ikan secara online dengan sistem yang user-friendly dan terpercaya.',
            tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
            result: 'Platform marketplace yang memudahkan transaksi jual beli ikan secara online.',
            liveLink: '#',
            repoLink: 'https://github.com/Sutannn13/project-jual-ikan.git',
        },
    };

    const certificateData = {
        "Introduction to Cybersecurity": {
            type: "certificate",
            title: "Introduction to Cybersecurity",
            isPdf: true,
            issuer: "Cisco Networking Academy",
            date: "03 November 2025",
            description: "Sertifikasi kompetensi dasar keamanan siber yang mencakup pengenalan ancaman siber, perlindungan data pribadi, dan keamanan infrastruktur jaringan perusahaan.",
            fileUrl: "Sertifikat-Cisco.pdf",
        },
        "Juara 2 - IT Bootcamp Software Development": {
            type: "certificate",
            title: "Juara 2 - IT Bootcamp Software Development",
            isPdf: true,
            issuer: "Universitas Bina Sarana Informatika",
            date: "25 Juni 2025",
            description: "Penghargaan Juara 2 dalam kompetisi IT Bootcamp Software Development For Industry.",
            fileUrl: "Sertifikat-Bootcamp.pdf",
        },
        "Surat Pencatatan Ciptaan HKI": {
            type: "certificate",
            title: "Surat Pencatatan Ciptaan HKI",
            isPdf: true,
            issuer: "Kementerian Hukum dan HAM RI",
            date: "06 Agustus 2025",
            description: "Surat Pencatatan Ciptaan HKI resmi untuk Program Komputer Aplikasi Edukasi Dan Pengelolaan Sampah Berbasis Web Trash Point.",
            fileUrl: "Sertifikat-Bootcamp-Sutan-Arlie.pdf",
        },
        "MikroTik Certified Network Associate (MTCNA)": {
            type: "certificate",
            title: "MikroTik Certified Network Associate (MTCNA)",
            isPdf: true,
            issuer: "MikroTik",
            date: "17 Januari 2026",
            description: "Sertifikasi resmi MTCNA yang mencakup konfigurasi dasar RouterOS, manajemen bandwidth, firewall, dan routing.",
            fileUrl: "Sutan-Arlie-MTCNA.pdf",
        },
    };

    const blogPosts = [
        {
            id: 1,
            title: 'Memahami Asynchronous JavaScript',
            category: 'Teknologi',
            date: '10 Agustus 2025',
            excerpt: 'JavaScript modern sangat bergantung pada operasi asynchronous. Mari kita bedah perbedaan Promise vs Async/Await.',
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75'
        },
        {
            id: 2,
            title: 'Pengenalan IoT dengan MQTT Protocol',
            category: 'IoT',
            date: '25 September 2025',
            excerpt: 'MQTT adalah protokol ringan yang populer di dunia IoT. Pelajari cara kerja publish-subscribe dan implementasinya di proyek nyata.',
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75'
        },
        {
            id: 3,
            title: 'Tips Clean Code untuk Pemula',
            category: 'Best Practice',
            date: '5 November 2025',
            excerpt: 'Menulis kode yang bersih dan mudah dibaca adalah skill penting. Berikut prinsip-prinsip clean code yang wajib dipraktekkan sejak awal.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75'
        },
    ];

    /* =============================================
       3. MODULE: LOADER (Real Document-Ready)
       ============================================= */
    const Loader = (() => {
        const loaderEl = document.getElementById('loader');
        const fillEl = document.querySelector('.progress-bar-fill');
        const pctEl = document.querySelector('.progress-percentage');

        const hide = () => {
            if (!loaderEl) { document.body.classList.remove('loading'); return; }
            loaderEl.classList.add('fade-out');
            document.body.classList.remove('loading');
            // Trigger GSAP hero entrance after loader hides
            setTimeout(() => {
                HeroAnimations.entrance();
                // Refresh ScrollTrigger after hero animation completes (dynamic timing)
                if (typeof ScrollTrigger !== 'undefined') {
                    // Wait for actual animation duration (1.2s stagger + 0.3s buffer)
                    setTimeout(() => ScrollTrigger.refresh(), 1500);
                }
            }, 100);
        };

        const init = () => {
            if (!loaderEl) { document.body.classList.remove('loading'); return; }

            // Skip loader on certificate page (more robust detection)
            const pathname = window.location.pathname.toLowerCase();
            const isCertificatePage = pathname.includes('sertifikat') || 
                                      pathname.includes('certificate') || 
                                      document.querySelector('body[data-page="certificate"]') !== null;
            
            if (isCertificatePage) {
                hide();
                return;
            }

            // Use real document readiness + image loading
            let progress = 0;
            const images = Array.from(document.images);
            const total = images.length || 1;
            let loaded = 0;

            const updateProgress = (val) => {
                progress = Math.min(100, Math.round(val));
                if (fillEl) fillEl.style.width = progress + '%';
                if (pctEl) pctEl.textContent = progress + '%';
                if (progress >= 100) {
                    setTimeout(hide, 300);
                }
            };

            // Animate progress smoothly
            const tick = () => {
                const imgProgress = total > 0 ? (loaded / total) * 80 : 80;
                const docProgress = document.readyState === 'complete' ? 20 : 0;
                updateProgress(imgProgress + docProgress);
            };

            if (images.length === 0) {
                // No images — animate quickly
                let p = 0;
                const interval = setInterval(() => {
                    p += 8;
                    updateProgress(p);
                    if (p >= 100) clearInterval(interval);
                }, 40);
            } else {
                images.forEach(img => {
                    if (img.complete) {
                        loaded++;
                        tick();
                    } else {
                        img.addEventListener('load', () => { loaded++; tick(); });
                        img.addEventListener('error', () => { loaded++; tick(); });
                    }
                });
                tick();
            }

            // Fallback: ensure loader always hides
            window.addEventListener('load', () => updateProgress(100), { once: true });
            setTimeout(() => updateProgress(100), 3000);
        };

        return { init };
    })();

    /* =============================================
       4. MODULE: THEME
       ============================================= */
    const Theme = (() => {
        const toggle = document.getElementById('theme-toggle');

        const apply = (isDark) => {
            document.documentElement.classList.toggle('dark', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        const init = () => {
            const saved = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            apply(saved === 'dark' || (!saved && prefersDark));
            if (toggle) toggle.addEventListener('click', () => {
                apply(!document.documentElement.classList.contains('dark'));
            });
        };

        return { init };
    })();

    /* =============================================
       5. MODULE: LENIS SMOOTH SCROLL
       ============================================= */
    let lenis = null;
    const LenisScroll = (() => {
        const init = () => {
            if (typeof Lenis === 'undefined') return;
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
                touchMultiplier: 1.5,
            });

            // Sync with GSAP ScrollTrigger
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => { lenis.raf(time * 1000); });
                gsap.ticker.lagSmoothing(0);
            } else {
                // Fallback RAF loop
                const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
                requestAnimationFrame(raf);
            }
        };

        const scrollTo = (target, options = {}) => {
            if (lenis) {
                lenis.scrollTo(target, { offset: -80, duration: 1.5, ...options });
            } else {
                const el = typeof target === 'string' ? document.querySelector(target) : target;
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        return { init, scrollTo };
    })();

    /* =============================================
       6. MODULE: GSAP ANIMATIONS (replaces AOS entirely)
       ============================================= */
    const GSAPAnimations = (() => {
        const init = () => {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);
            state.gsapReady = true;

            // Generic fade-up for sections (.gsap-fade-up)
            document.querySelectorAll('.gsap-fade-up').forEach(el => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'top -10%',
                        toggleActions: 'play reverse play reverse',
                    }
                });
            });

            // ─── FIX: Legacy .animate-on-scroll elements ─────────────────────
            // These were previously hidden by CSS opacity:0 and revealed by AOS.
            // Now GSAP handles them via ScrollTrigger (AOS is fully removed).
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                // Skip elements already handled by specific GSAP modules:
                // - .hero-text / hero section → handled by HeroAnimations.entrance()
                // - .timeline items → handled by initTimeline()
                // - .stagger-container items → handled by stagger-item logic above
                // But DON'T skip stats cards - they need animation
                if ((el.closest('#hero') && !el.classList.contains('premium-stat-card')) || 
                    el.closest('.timeline') || 
                    el.classList.contains('stagger-item')) return;

                // Set initial state
                gsap.set(el, { opacity: 0, y: 40 });

                gsap.fromTo(el,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            end: 'top -10%',
                            toggleActions: 'play reverse play reverse',
                            onEnter: () => el.classList.add('is-visible'),
                            onLeave: () => el.classList.remove('is-visible'),
                            onEnterBack: () => el.classList.add('is-visible'),
                            onLeaveBack: () => el.classList.remove('is-visible'),
                        }
                    }
                );
            });

            // ─── FIX: Legacy .stagger-item elements ──────────────────────────
            // Group stagger-items by their parent .stagger-container
            document.querySelectorAll('.stagger-container').forEach(container => {
                const items = container.querySelectorAll('.stagger-item');
                if (!items.length) return;

                // Set initial state: items start hidden
                gsap.set(items, { opacity: 0, y: 40 });

                gsap.fromTo(items,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 85%',
                            end: 'top -10%',
                            toggleActions: 'play reverse play reverse',
                            onEnter: () => items.forEach(i => i.classList.add('is-visible')),
                            onLeave: () => items.forEach(i => i.classList.remove('is-visible')),
                            onEnterBack: () => items.forEach(i => i.classList.add('is-visible')),
                            onLeaveBack: () => items.forEach(i => i.classList.remove('is-visible')),
                        }
                    }
                );
            });

            // Standalone .stagger-item not inside .stagger-container
            document.querySelectorAll('.stagger-item:not(.stagger-container .stagger-item)').forEach(el => {
                // Set initial state
                gsap.set(el, { opacity: 0, y: 40 });

                gsap.fromTo(el,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            end: 'top -10%',
                            toggleActions: 'play reverse play reverse',
                            onEnter: () => el.classList.add('is-visible'),
                            onLeave: () => el.classList.remove('is-visible'),
                            onEnterBack: () => el.classList.add('is-visible'),
                            onLeaveBack: () => el.classList.remove('is-visible'),
                        }
                    }
                );
            });

            // Section titles
            document.querySelectorAll('.section-title').forEach(title => {
                gsap.from(title, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        end: 'top -10%',
                        toggleActions: 'play reverse play reverse',
                    }
                });
            });

            // Stagger cards (project, cert, skill)
            document.querySelectorAll('.gsap-stagger-parent').forEach(parent => {
                const children = parent.querySelectorAll('.gsap-stagger-child');
                if (!children.length) return;

                // Check if parent is already visible in viewport
                const rect = parent.getBoundingClientRect();
                const alreadyVisible = rect.top < window.innerHeight;

                if (alreadyVisible) {
                    // Animate immediately — no scroll trigger needed
                    gsap.fromTo(children,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
                    );
                } else {
                    gsap.fromTo(children,
                        { y: 60, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: parent,
                                start: 'top 95%',
                                end: 'top -10%',
                                toggleActions: 'play reverse play reverse',
                            }
                        }
                    );
                }
            });

            // Stat counters (improved with proper number formatting)
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target')) || 0;
                ScrollTrigger.create({
                    trigger: stat,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        let obj = { value: 0 };
                        gsap.to(obj, {
                            value: target,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: () => {
                                stat.textContent = Math.round(obj.value);
                            }
                        });
                    }
                });
            });

            // Skill progress bars
            document.querySelectorAll('.progress-bar').forEach(bar => {
                const level = bar.getAttribute('data-level') || '0';
                ScrollTrigger.create({
                    trigger: bar,
                    start: 'top 90%',
                    once: true,
                    onEnter: () => {
                        gsap.to(bar, {
                            width: level + '%',
                            duration: 1.5,
                            ease: 'power3.out',
                        });
                    }
                });
            });

            // Timeline items
            initTimeline();

            // About image tilt (desktop only)
            initAboutImageTilt();

            // Scroll-spy active nav
            initScrollSpy();

            // Refresh ScrollTrigger and mark as loaded
            ScrollTrigger.refresh();

            // Add gsap-loaded class AFTER all animations are set up
            // This prevents CSS from interfering with initial animation states
            requestAnimationFrame(() => {
                document.body.classList.add('gsap-loaded');
            });
        };

        const initTimeline = () => {
            const timeline = document.querySelector('.timeline');
            const progressBar = document.querySelector('.timeline-progress');
            const scrollDot = document.querySelector('.timeline-scroll-dot');
            const items = document.querySelectorAll('.timeline-item');
            if (!timeline || !progressBar || !scrollDot || !items.length) return;

            // DEBUG: Log positioning
            console.log('=== TIMELINE ITEMS DEBUG (margin-left approach) ===');
            items.forEach((item, i) => {
                const computed = window.getComputedStyle(item);
                const hasLeft = item.classList.contains('timeline-left');
                const hasRight = item.classList.contains('timeline-right');
                console.log(`Item ${i + 1}:`, {
                    classes: `${hasLeft ? 'LEFT' : ''} ${hasRight ? 'RIGHT' : ''}`,
                    marginLeft: computed.marginLeft,
                    width: computed.width,
                    paddingLeft: computed.paddingLeft,
                    paddingRight: computed.paddingRight,
                    textAlign: computed.textAlign,
                });
            });
            console.log('========================');

            // IMPORTANT: Clear any inline transforms that might override CSS positioning
            gsap.set(items, { 
                opacity: 0,
                clearProps: 'transform,x,y,left,translateX,translateY'
            });

            gsap.to(progressBar, {
                height: '100%',
                ease: 'none',
                scrollTrigger: { trigger: timeline, start: 'top 60%', end: 'bottom 40%', scrub: 0.3 }
            });
            gsap.to(scrollDot, {
                top: '100%',
                ease: 'none',
                scrollTrigger: { trigger: timeline, start: 'top 60%', end: 'bottom 40%', scrub: 0.3 }
            });

            items.forEach((item) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        // Only animate opacity and scale - NO positional transforms
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        // Clear any transform properties after animation completes
                        clearProps: 'transform,scale',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            end: 'top -10%',
                            toggleActions: 'play reverse play reverse',
                            onEnter: () => item.classList.add('is-active'),
                            onLeave: () => item.classList.remove('is-active'),
                            onEnterBack: () => item.classList.add('is-active'),
                            onLeaveBack: () => item.classList.remove('is-active'),
                        }
                    });
            });
        };

        const initAboutImageTilt = () => {
            const wrapper = document.querySelector('.about-image-wrapper');
            if (!wrapper || state.isTouchDevice) return;
            const img = wrapper.querySelector('.about-image');
            if (!img) return;

            wrapper.addEventListener('mousemove', (e) => {
                const { width, height, left, top } = wrapper.getBoundingClientRect();
                const x = e.clientX - left, y = e.clientY - top;
                const rotX = ((y - height / 2) / (height / 2)) * -6;
                const rotY = ((x - width / 2) / (width / 2)) * 6;
                gsap.to(img, { rotateX: rotX, rotateY: rotY, scale: 1.03, duration: 0.4, ease: 'power2.out', transformPerspective: 1000 });
            });
            wrapper.addEventListener('mouseleave', () => {
                gsap.to(img, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
            });
        };

        const initScrollSpy = () => {
            document.querySelectorAll('section[id]').forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    onToggle: ({ isActive }) => {
                        if (!isActive) return;
                        const id = section.getAttribute('id');
                        document.querySelectorAll('.nav-link').forEach(link => {
                            const href = link.getAttribute('href') || '';
                            link.classList.toggle('active', href.includes(id));
                        });
                    }
                });
            });
        };

        return { init };
    })();

    /* =============================================
       7. MODULE: HERO ANIMATIONS (GSAP)
       ============================================= */
    const HeroAnimations = (() => {
        const entrance = () => {
            if (typeof gsap === 'undefined') return;
            const heroText = document.querySelector('.hero-text');
            if (!heroText) return;

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('#hero-title', { y: 60, opacity: 0, duration: 1 })
                .from('.hero-text .subtitle', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
                .from('.hero-text .description', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
                .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
                .from('.id-card-wrapper', { y: 80, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=0.6');
        };

        return { entrance };
    })();

    /* =============================================
       8. MODULE: HERO PARTICLES (Canvas)
       ============================================= */
    const HeroParticles = (() => {
        const init = () => {
            const canvas = document.getElementById('hero-particles');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let particles = [], animId;
            let isVisible = true;
            let lastFrameTime = 0;
            const isMobile = window.innerWidth < 768;
            const targetFps = isMobile ? 30 : 60; // Lower FPS on mobile
            const frameInterval = 1000 / targetFps;

            const resize = () => {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            };
            resize();
            window.addEventListener('resize', resize, { passive: true });

            // Adaptive particle count: fewer on mobile
            const baseCount = isMobile ? 25 : 50;
            const count = Math.min(baseCount, Math.floor(canvas.width * canvas.height / 18000));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 2 + 0.5,
                    color: ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(236,72,153,'][Math.floor(Math.random() * 3)]
                });
            }

            const draw = (currentTime) => {
                if (!isVisible) return;
                
                // Frame rate limiting for better performance
                if (currentTime - lastFrameTime < frameInterval) {
                    animId = requestAnimationFrame(draw);
                    return;
                }
                lastFrameTime = currentTime;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach((p, i) => {
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color + '0.6)';
                    ctx.fill();
                    
                    // Only draw connections if not on mobile (performance)
                    if (!isMobile) {
                        for (let j = i + 1; j < particles.length; j++) {
                            const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 110) {
                                ctx.beginPath();
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.strokeStyle = p.color + (0.12 * (1 - dist / 110)) + ')';
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        }
                    }
                });
                animId = requestAnimationFrame(draw);
            };

            const start = () => {
                if (!animId) {
                    isVisible = true;
                    animId = requestAnimationFrame(draw);
                }
            };

            const stop = () => {
                if (animId) {
                    cancelAnimationFrame(animId);
                    animId = null;
                    isVisible = false;
                }
            };

            start();

            // Pause when hero not visible (IntersectionObserver)
            const heroSection = document.getElementById('hero');
            if (heroSection && typeof IntersectionObserver !== 'undefined') {
                new IntersectionObserver((entries) => {
                    entries[0].isIntersecting ? start() : stop();
                }, { threshold: 0.1 }).observe(heroSection);
            }

            // Pause when page is hidden (battery optimization)
            document.addEventListener('visibilitychange', () => {
                document.hidden ? stop() : start();
            });

            // Cleanup on page unload
            window.addEventListener('beforeunload', stop);
        };

        return { init };
    })();

    /* =============================================
       9. MODULE: ID CARD PHYSICS
       ============================================= */
    /* =============================================
       9. MODULE: ID CARD DRAG & FLIP (REBUILT)
       ============================================= */
    const IdCard = (() => {
        let wrapper, holder, container;
        let isFlipped = false;
        let isDragging = false;

        // Drag state
        let dragStartX = 0;
        let dragStartY = 0;
        let currentX = 0;
        let currentY = 0;
        let offsetX = 0;
        let offsetY = 0;
        let velocityX = 0;
        let velocityY = 0;
        let rotationAngle = 0;
        let angularVelocity = 0;

        // Physics constants
        const SPRING_STRENGTH = 0.1;
        const DAMPING = 0.88;
        const MAX_DISTANCE = 100;
        const ROTATION_FACTOR = 0.2;
        const CLICK_THRESHOLD = 5;

        const init = () => {
            wrapper = document.getElementById('id-card-wrapper');
            holder = document.getElementById('id-card');

            if (!wrapper || !holder) {
                console.warn('ID Card elements not found');
                return;
            }

            container = holder.querySelector('.id-card-container');
            if (!container) {
                console.warn('ID Card container not found');
                return;
            }

            setupEventListeners();
            startAnimationLoop();

            console.log('ID Card initialized successfully');
        };

        const setupEventListeners = () => {
            // Check if mobile/touch device
            const isMobile = state.isTouchDevice || window.innerWidth < 768;
            
            if (isMobile) {
                // Simple tap-to-flip on mobile
                wrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleFlip();
                });
                wrapper.style.cursor = 'pointer';
            } else {
                // Full drag physics on desktop
                wrapper.addEventListener('mousedown', handleDragStart);
                document.addEventListener('mousemove', handleDragMove);
                document.addEventListener('mouseup', handleDragEnd);
                wrapper.style.cursor = 'grab';
            }

            // Touch events with simple tap-to-flip
            wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
            wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
        };

        const handleDragStart = (e) => {
            isDragging = true;
            dragStartX = e.clientX - offsetX;
            dragStartY = e.clientY - offsetY;
            wrapper.style.cursor = 'grabbing';
            e.preventDefault();
        };

        const handleDragMove = (e) => {
            if (!isDragging) return;

            e.preventDefault();
            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;

            // Limit drag distance
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance > MAX_DISTANCE) {
                const angle = Math.atan2(deltaY, deltaX);
                offsetX = Math.cos(angle) * MAX_DISTANCE;
                offsetY = Math.max(0, Math.sin(angle) * MAX_DISTANCE); // Prevent upward drag
            } else {
                offsetX = deltaX;
                offsetY = Math.max(0, deltaY); // Prevent upward drag
            }

            currentX = offsetX;
            currentY = offsetY;
            rotationAngle = offsetX * ROTATION_FACTOR;
        };

        const handleDragEnd = (e) => {
            if (!isDragging) return;

            // Calculate if it was a click (small movement)
            const moveDistance = Math.sqrt(
                Math.pow(e.clientX - dragStartX, 2) +
                Math.pow(e.clientY - dragStartY, 2)
            );

            if (moveDistance < CLICK_THRESHOLD) {
                toggleFlip();
            }

            isDragging = false;
            wrapper.style.cursor = 'grab';
        };

        const handleTouchStart = (e) => {
            // Store initial touch position for tap detection
            const touch = e.touches[0];
            dragStartX = touch.clientX;
            dragStartY = touch.clientY;
        };

        const handleTouchEnd = (e) => {
            // Simple tap-to-flip: if touch moved less than threshold, it's a tap
            const touch = e.changedTouches[0];
            const moveDistance = Math.sqrt(
                Math.pow(touch.clientX - dragStartX, 2) +
                Math.pow(touch.clientY - dragStartY, 2)
            );

            if (moveDistance < CLICK_THRESHOLD) {
                toggleFlip();
            }
        };

        const toggleFlip = () => {
            isFlipped = !isFlipped;
            updateFlip();
        };

        const updateFlip = () => {
            if (container) {
                container.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
            }
        };

        const startAnimationLoop = () => {
            const animate = () => {
                if (!isDragging) {
                    // Apply spring physics to return to center
                    velocityX += -currentX * SPRING_STRENGTH;
                    velocityY += -currentY * SPRING_STRENGTH;

                    // Apply damping
                    velocityX *= DAMPING;
                    velocityY *= DAMPING;

                    // Update position
                    currentX += velocityX;
                    currentY += velocityY;

                    // Update rotation
                    angularVelocity += -rotationAngle * 0.05;
                    angularVelocity *= 0.9;
                    rotationAngle += angularVelocity;

                    // Update offset for smooth return
                    offsetX = currentX;
                    offsetY = currentY;

                    // Stop if movement is very small
                    if (Math.abs(velocityX) < 0.01 && Math.abs(velocityY) < 0.01) {
                        velocityX = 0;
                        velocityY = 0;
                    }
                }

                // Apply transform
                wrapper.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotationAngle}deg)`;

                requestAnimationFrame(animate);
            };

            animate();
        };

        return { init };
    })();

    /* =============================================
       10. MODULE: TYPING EFFECT
       ============================================= */
    const TypingEffect = (() => {
        const init = () => {
            const el = document.getElementById('typing-effect');
            if (!el) return;
            const words = ['Sutan Arlie Johan', 'Web Developer', 'IT Enthusiast', 'Backend Developer'];
            let wordIndex = 0, charIndex = 0, isDeleting = false;

            const type = () => {
                const current = words[wordIndex];
                el.textContent = current.substring(0, charIndex);
                const speed = isDeleting ? 70 : 140;

                if (!isDeleting && charIndex < current.length) charIndex++;
                else if (isDeleting && charIndex > 0) charIndex--;
                else {
                    isDeleting = !isDeleting;
                    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, isDeleting || charIndex === current.length ? (isDeleting ? speed : 2000) : speed);
            };
            type();
        };

        return { init };
    })();

    /* =============================================
       11. MODULE: NAVIGATION
       ============================================= */
    const Navigation = (() => {
        const header = document.getElementById('main-header');
        const hamburger = document.getElementById('hamburger-button');
        const navMenu = document.querySelector('.nav-menu');
        const scrollToTopBtn = document.getElementById('scroll-to-top');

        const handleScroll = () => {
            if (header) header.classList.toggle('scrolled', window.scrollY > 50);
            if (scrollToTopBtn) scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
            // Always call TextFade.handle() for word-by-word fade effect
            TextFade.handle();
        };

        const toggleMobileMenu = () => {
            if (!hamburger || !navMenu) return;
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Fix: use 'visible' instead of empty string for better browser compatibility
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
        };

        const init = () => {
            window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });

            if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

            // Nav link clicks
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href') || '';
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        LenisScroll.scrollTo(href);
                    }
                    if (navMenu && navMenu.classList.contains('active')) toggleMobileMenu();
                });
            });

            // Scroll to top
            if (scrollToTopBtn) {
                scrollToTopBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    LenisScroll.scrollTo(0);
                });
            }
        };

        return { init };
    })();

    /* =============================================
       12. MODULE: TEXT FADE ON SCROLL (word-by-word)
       ============================================= */
    const TextFade = (() => {
        const prepare = () => {
            document.querySelectorAll('.fade-on-scroll-text').forEach(p => {
                const words = p.innerText.split(' ');
                p.innerHTML = '';
                words.forEach(w => {
                    const span = document.createElement('span');
                    span.textContent = w + ' ';
                    p.appendChild(span);
                });
            });
        };

        const handle = () => {
            document.querySelectorAll('.fade-on-scroll-text').forEach(p => {
                const rect = p.getBoundingClientRect();
                const spans = p.querySelectorAll('span');
                const wh = window.innerHeight;
                const progress = Math.max(0, Math.min(1, (wh * 0.9 - rect.top) / (wh * 0.55)));
                const highlight = Math.floor(progress * spans.length);
                spans.forEach((s, i) => s.classList.toggle('highlight', i < highlight));
            });
        };

        return { prepare, handle };
    })();

    /* =============================================
       13. MODULE: MODAL
       ============================================= */
    const Modal = (() => {
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.getElementById('modal-close-btn');
        let previouslyFocusedElement = null;

        const getFocusableElements = (container) => {
            const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
            return Array.from(container.querySelectorAll(focusableSelectors));
        };

        const trapFocus = (e) => {
            if (!modal || !modal.classList.contains('open')) return;
            
            const focusableElements = getFocusableElements(modal);
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // Handle Tab key for focus trap
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        const open = (cardEl) => {
            if (!modal || !modalBody) return;
            const title = cardEl.querySelector('h3')?.textContent.trim();
            if (!title) return;

            const data = projectData[title] || certificateData[title];
            if (!data) return;

            let html = '';
            if (data.type === 'project') {
                html = `
                    <div class="modal-header"><h2>${data.title}</h2></div>
                    <div class="modal-content">
                        <img src="${data.image}" alt="${data.title}" class="modal-image" loading="lazy" decoding="async"/>
                        <p class="modal-description">${data.description}</p>
                        <p class="modal-purpose"><strong>Tujuan:</strong> ${data.purpose}</p>
                        <p class="modal-result"><strong>Hasil:</strong> ${data.result}</p>
                        <div class="modal-tech">
                            <strong>Tech Stack:</strong>
                            ${data.tech ? data.tech.map(t => `<span class="badge">${t}</span>`).join('') : ''}
                        </div>
                    </div>`;
            } else {
                const fileUrl = data.fileUrl;
                html = `
                    <div class="modal-header">
                        <h2>${data.title}</h2>
                        <p class="modal-meta">
                            <span><strong>Penyelenggara:</strong> ${data.issuer}</span><br>
                            <span><strong>Tanggal:</strong> ${data.date}</span>
                        </p>
                    </div>
                    <div class="modal-content">
                        <p class="modal-description">${data.description}</p>
                        <div class="modal-certificate-preview modal-cert-image-preview">
                            <div class="cert-pdf-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16 text-indigo-400 mx-auto mb-3"><path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z"/><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"/></svg>
                                <p class="text-gray-500 dark:text-gray-400 text-sm">Klik tombol di bawah untuk melihat atau mengunduh sertifikat PDF</p>
                            </div>
                        </div>
                        <div class="modal-actions">
                            <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Buka Sertifikat</a>
                            <a href="${fileUrl}" download class="btn btn-outline">Download PDF</a>
                        </div>
                    </div>`;
            }

            modalBody.innerHTML = html;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            if (lenis) lenis.stop();
            
            // Focus management: store current focus and focus close button
            previouslyFocusedElement = document.activeElement;
            setTimeout(() => {
                const focusableElements = getFocusableElements(modal);
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }, 100);
            
            // Add focus trap listener
            document.addEventListener('keydown', trapFocus);
        };

        const close = () => {
            if (!modal) return;
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            if (lenis) lenis.start();
            
            // Remove focus trap and restore previous focus
            document.removeEventListener('keydown', trapFocus);
            if (previouslyFocusedElement && previouslyFocusedElement.focus) {
                previouslyFocusedElement.focus();
                previouslyFocusedElement = null;
            }
        };

        const init = () => {
            if (closeBtn) closeBtn.addEventListener('click', close);
            if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal?.classList.contains('open')) close();
            });

            // Project cards
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    open(card);
                });
            });

            // Certificate cards
            document.querySelectorAll('.cert-card').forEach(card => {
                const viewBtn = card.querySelector('.cert-open-btn');
                const dlBtn = card.querySelector('.cert-download-btn');

                if (viewBtn) viewBtn.addEventListener('click', (e) => { e.stopPropagation(); open(card); });
                if (dlBtn) dlBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const title = card.querySelector('h3')?.textContent.trim();
                    const cert = certificateData[title];
                    if (!cert) return;
                    const a = document.createElement('a');
                    a.href = cert.fileUrl;
                    a.download = `${title} - Sertifikat.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                });
            });
        };

        return { init };
    })();

    /* =============================================
       14. MODULE: BLOG
       ============================================= */
    const Blog = (() => {
        const init = () => {
            const container = document.getElementById('blog-posts-container');
            const pagination = document.getElementById('blog-pagination');
            if (!container || !pagination) return;

            const render = () => {
                container.innerHTML = '';
                const start = (state.blogCurrentPage - 1) * state.blogPostsPerPage;
                blogPosts.slice(start, start + state.blogPostsPerPage).forEach((post, i) => {
                    const el = document.createElement('div');
                    el.className = 'blog-card gsap-stagger-child';
                    el.innerHTML = `
                        <img src="${post.image}" alt="${post.title}" class="blog-card-image" loading="lazy">
                        <div class="blog-card-content">
                            <span class="category">${post.category}</span>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <div class="blog-card-footer">
                                <span>${post.date}</span>
                                <a href="#" class="read-more">Baca &rarr;</a>
                            </div>
                        </div>`;
                    container.appendChild(el);
                });
                renderPagination();
            };

            const renderPagination = () => {
                pagination.innerHTML = '';
                const total = Math.ceil(blogPosts.length / state.blogPostsPerPage);
                if (total <= 1) return;
                const btn = (txt, page, disabled, active) => {
                    const b = document.createElement('button');
                    b.innerHTML = txt; b.disabled = disabled;
                    if (active) b.classList.add('active');
                    b.addEventListener('click', () => { 
                        state.blogCurrentPage = page; 
                        render(); 
                        // Use LenisScroll for consistent smooth scrolling
                        LenisScroll.scrollTo(container);
                    });
                    return b;
                };
                pagination.append(btn('&laquo;', state.blogCurrentPage - 1, state.blogCurrentPage === 1));
                for (let i = 1; i <= total; i++) pagination.append(btn(i, i, false, state.blogCurrentPage === i));
                pagination.append(btn('&raquo;', state.blogCurrentPage + 1, state.blogCurrentPage === total));
            };

            render();
        };

        return { init };
    })();

    /* =============================================
       15. MODULE: CONTACT FORM
       ============================================= */
    const ContactForm = (() => {
        const form = document.getElementById('contact-form');
        const statusEl = document.getElementById('form-status');

        const validateField = (field) => {
            const errEl = field.parentElement?.querySelector('.error-message');
            let ok = true, msg = '';

            if (field.required && !field.value.trim()) {
                ok = false; msg = 'Kolom ini wajib diisi.';
            } else if (field.type === 'email') {
                // Improved RFC 5322 compliant email validation
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (!emailRegex.test(field.value.trim())) {
                    ok = false; msg = 'Format email tidak valid. Contoh: nama@email.com';
                }
            } else if (field.minLength > 0 && field.value.length < field.minLength) {
                ok = false; msg = `Minimal ${field.minLength} karakter.`;
            }

            field.parentElement?.classList.toggle('error', !ok);
            if (errEl) errEl.textContent = msg;
            return ok;
        };

        const init = () => {
            if (!form) return;

            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('blur', (e) => validateField(e.target));
                input.addEventListener('input', (e) => {
                    if (e.target.parentElement?.classList.contains('error')) validateField(e.target);
                });
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const fields = Array.from(form.querySelectorAll('input, textarea'));
                const allValid = fields.every(f => validateField(f));
                if (!allValid) return;

                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Mengirim...'; }
                if (statusEl) { statusEl.textContent = ''; statusEl.className = ''; }

                try {
                    const response = await fetch(form.action, {
                        method: form.method || 'POST',
                        body: new FormData(form),
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        if (statusEl) { statusEl.textContent = '✓ Pesan berhasil terkirim! Terima kasih.'; statusEl.className = 'success'; }
                        form.reset();
                    } else {
                        throw new Error(`Server responded with ${response.status}`);
                    }
                } catch (err) {
                    console.error('Form submission error:', err);
                    if (statusEl) { statusEl.textContent = '✗ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email.'; statusEl.className = 'error'; }
                } finally {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Kirim Pesan'; }
                }
            });
        };

        return { init };
    })();

    /* =============================================
       16. MODULE: UTILITIES
       ============================================= */
    const throttle = (fn, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit); }
        };
    };

    const updateCopyrightYear = () => {
        const el = document.getElementById('copyright-year');
        if (el) el.textContent = new Date().getFullYear();
    };

    /* =============================================
       18. INITIALIZATION
       ============================================= */
    const init = () => {
        Theme.init();
        TextFade.prepare();
        Loader.init();
        LenisScroll.init();
        Navigation.init();
        GSAPAnimations.init();
        HeroParticles.init();
        IdCard.init();
        TypingEffect.init();
        Blog.init();
        Modal.init();
        ContactForm.init();
        updateCopyrightYear();
        // Initial TextFade call
        TextFade.handle();
        // Ensure scroll-to-top button starts hidden
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) scrollToTopBtn.classList.remove('show');
    };

    init();
});

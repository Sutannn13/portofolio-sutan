/*
================================================================================
| SCRIPT.JS - PORTOFOLIO SUTAN ARLIE JOHAN (OVERHAUL v4.0)
| Libraries: AOS, GSAP + ScrollTrigger, Lenis Smooth Scroll
================================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       1. STATE & CONSTANTS
       ============================================= */
    const state = {
        blogCurrentPage: 1,
        blogPostsPerPage: 3,
        testimonialCurrentIndex: 0,
        testimonialInterval: null,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    };

    const selectors = {
        loader: '#loader',
        progressBarFill: '.progress-bar-fill',
        progressPercentage: '.progress-percentage',
        header: '#main-header',
        navLinks: '.nav-link',
        sections: 'section[id]',
        themeToggle: '#theme-toggle',
        hamburger: '#hamburger-button',
        navMenu: '.nav-menu',
        animateOnScroll: '.animate-on-scroll',
        statNumbers: '.stat-number',
        progressBars: '.progress-bar',
        projectCards: '.project-card',
        projectFilters: '.project-filters',
        filterBtns: '.filter-btn',
        projectModal: '#project-modal',
        modalCloseBtn: '#modal-close-btn',
        modalBody: '#modal-body',
        testimonialCarousel: '#testimonial-carousel',
        testimonialSlides: '.testimonial-slide',
        testimonialIndicators: '#testimonial-indicators',
        testimonialPrevBtn: '#testimonial-prev-btn',
        testimonialNextBtn: '#testimonial-next-btn',
        blogPostsContainer: '#blog-posts-container',
        blogPagination: '#blog-pagination',
        contactForm: '#contact-form',
        formStatus: '#form-status',
        copyrightYear: '#copyright-year',
        scrollToTopBtn: '#scroll-to-top',
        heroSection: '.hero-section',
        typingEffect: '#typing-effect',
        revealTextElements: '.reveal-text',
        fadeOnScrollText: '.fade-on-scroll-text',
        staggerContainers: '.stagger-container',
        aboutImageWrapper: '.about-image-wrapper',
        timeline: '.timeline',
        timelineProgress: '.timeline-progress',
        timelineScrollDot: '.timeline-scroll-dot',
        timelineItems: '.timeline-item',
    };

    const dom = {};
    for (const key in selectors) {
        const elements = document.querySelectorAll(selectors[key]);
        if (elements.length > 0) {
            dom[key] = elements.length === 1 ? elements[0] : Array.from(elements);
        }
    }

    /* =============================================
       2. DATA
       ============================================= */
    const projectData = {
        'Trash Point (HKI)': {
            type: 'project',
            title: 'Trash Point (Proyek Unggulan & Peraih HKI)',
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
            description: 'Platform manajemen sampah berbasis IoT dengan sistem poin insentif. Memperoleh sertifikat HKI resmi dari Kemenkumham RI. Prototipe fungsional yang mengintegrasikan sensor MQTT dengan dashboard web real-time.',
            purpose: 'Mengurangi penumpukan sampah dan memberikan nilai ekonomis melalui sistem reward berbasis poin.',
            tech: ['React.js', 'Node.js', 'PostgreSQL', 'MQTT', 'PWA'],
            result: 'Prototipe fungsional dengan HKI resmi dari Kemenkumham RI.',
            liveLink: '#',
            repoLink: 'https://github.com/sutanarlie/trash-point',
        },
        'E-Learning UBSI': {
            type: 'project',
            title: 'Platform E-Learning UBSI',
            image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
            description: 'Platform pembelajaran online interaktif untuk mahasiswa dan dosen UBSI. Mendukung manajemen kelas, upload materi, dan quiz online.',
            purpose: 'Meningkatkan efektivitas belajar mengajar digital di lingkungan kampus.',
            tech: ['PHP (CodeIgniter)', 'JavaScript', 'MySQL', 'Bootstrap'],
            result: 'Berhasil diimplementasikan untuk beberapa mata kuliah di UBSI.',
            liveLink: '#',
            repoLink: 'https://github.com/sutanarlie/elearning-ubsi',
        },
        'Dashboard Analitik': {
            type: 'project',
            title: 'Dashboard Analitik Penjualan',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
            description: 'Dashboard visualisasi data penjualan interaktif dengan chart real-time. Mengolah data dari REST API dan menampilkan insight bisnis.',
            purpose: 'Membantu tim manajemen mengambil keputusan bisnis berdasarkan data.',
            tech: ['Vanilla JS', 'Chart.js', 'REST API'],
            result: 'Dashboard responsif dan cepat untuk mengolah data penjualan skala besar.',
            liveLink: '#',
            repoLink: 'https://github.com/sutanarlie/dashboard-analytics',
        },
        'Kuliner Depok': {
            type: 'project',
            title: 'Aplikasi PWA Resep Kuliner Depok',
            image: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
            description: 'Aplikasi Progressive Web App (offline-first) untuk menemukan dan menyimpan resep masakan khas Depok. Bekerja seperti native app dengan Service Worker.',
            purpose: 'Promosi kekayaan kuliner lokal Depok ke audiens yang lebih luas.',
            tech: ['PWA', 'Service Worker', 'Vanilla JS'],
            result: 'Aplikasi ringan offline-first yang berfungsi layaknya native app.',
            liveLink: '#',
            repoLink: 'https://github.com/sutanarlie/kuliner-depok',
        },
    };

    const certificateData = {
        "Introduction to Cybersecurity": {
            type: "certificate",
            title: "Introduction to Cybersecurity",
            image: "Sertifikat-Cisco.pdf",
            isPdf: true,
            issuer: "Cisco Networking Academy",
            date: "03 November 2025",
            description: "Sertifikasi kompetensi dasar keamanan siber yang mencakup pengenalan ancaman siber, perlindungan data pribadi, dan keamanan infrastruktur jaringan perusahaan.",
            fileUrl: "Sertifikat-Cisco.pdf",
        },
        "Juara 2 - IT Bootcamp Software Development": {
            type: "certificate",
            title: "Juara 2 - IT Bootcamp Software Development",
            image: "Sertifikat-Bootcamp.pdf",
            isPdf: true,
            issuer: "Universitas Bina Sarana Informatika",
            date: "25 Juni 2025",
            description: "Penghargaan Juara 2 dalam kompetisi IT Bootcamp Software Development For Industry.",
            fileUrl: "Sertifikat-Bootcamp.pdf",
        },
        "Surat Pencatatan Ciptaan HKI": {
            type: "certificate",
            title: "Surat Pencatatan Ciptaan HKI",
            image: "Sertifikat-Bootcamp-Sutan-Arlie.pdf",
            isPdf: true,
            issuer: "Kementerian Hukum dan HAM RI",
            date: "06 Agustus 2025",
            description: "Surat Pencatatan Ciptaan HKI resmi untuk Program Komputer Aplikasi Edukasi Dan Pengelolaan Sampah Berbasis Web Trash Point.",
            fileUrl: "Sertifikat-Bootcamp-Sutan-Arlie.pdf",
        },
        "MikroTik Certified Network Associate (MTCNA)": {
            type: "certificate",
            title: "MikroTik Certified Network Associate (MTCNA)",
            image: "Sutan-Arlie-MTCNA.pdf",
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
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
        },
    ];

    /* =============================================
       3. INITIALIZATION
       ============================================= */
    const init = () => {
        prepareTextReveal();
        setupEventListeners();
        initTheme();
        initLoader();
        initAOS();
        initLenis();
        initScrollSpy();
        initAnimations();
        initBlog();
        initTestimonialCarousel();
        initInteractiveEffects();
        initGSAPTimeline();
        updateCopyrightYear();
        prepareTextFadeWords();
        handleTextFadeOnScroll();
        initHeroParticles();
    };

    /* =============================================
       HERO PARTICLE CANVAS
       ============================================= */
    const initHeroParticles = () => {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const count = Math.min(60, Math.floor(canvas.width * canvas.height / 15000));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 2 + 1,
                color: ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(236,72,153,'][Math.floor(Math.random() * 3)]
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + '0.6)';
                ctx.fill();
                // connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = p.color + (0.15 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            animId = requestAnimationFrame(draw);
        };
        draw();

        // Pause when not visible
        const heroSection = document.getElementById('hero');
        if (heroSection && typeof IntersectionObserver !== 'undefined') {
            new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) { if (!animId) draw(); }
                else { cancelAnimationFrame(animId); animId = null; }
            }, { threshold: 0.1 }).observe(heroSection);
        }
    };

    /* =============================================
       4. AOS INITIALIZATION
       ============================================= */
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 80,
                delay: 0,
            });
        }
    };

    /* =============================================
       5. LENIS SMOOTH SCROLL
       ============================================= */
    let lenis = null;
    const initLenis = () => {
        if (typeof Lenis !== 'undefined') {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            // Connect Lenis to GSAP ScrollTrigger
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => { lenis.raf(time * 1000); });
                gsap.ticker.lagSmoothing(0);
            }
        }
    };

    /* =============================================
       6. GSAP TIMELINE ANIMATION
       ============================================= */
    const initGSAPTimeline = () => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            // Fallback: use existing JS animation
            handleTimelineScrollAnimation();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const timeline = document.querySelector('.timeline');
        const progressBar = document.querySelector('.timeline-progress');
        const scrollDot = document.querySelector('.timeline-scroll-dot');
        const timelineItems = document.querySelectorAll('.timeline-item');

        if (!timeline || !progressBar || !scrollDot || timelineItems.length === 0) return;

        // Animate the progress line
        gsap.to(progressBar, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: timeline,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 0.3,
            }
        });

        // Animate the scroll dot
        gsap.to(scrollDot, {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: timeline,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 0.3,
            }
        });

        // Animate each timeline item
        timelineItems.forEach((item, index) => {
            const isOdd = index % 2 === 0;

            // Set initial state explicitly
            gsap.set(item, { opacity: 0, x: isOdd ? -60 : 60, y: 20 });

            gsap.to(item, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    onEnter: () => item.classList.add('is-active'),
                }
            });
        });

        // Animate stat counters with GSAP
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(stat, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: 'power2.out',
                    });
                }
            });
        });

        // Animate skill progress bars
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
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

        // Refresh ScrollTrigger after setup to catch any visible items
        ScrollTrigger.refresh();

        // Mark that GSAP is loaded and active (disable CSS fallback)
        document.body.classList.add('gsap-loaded');

        // Hero entrance animation
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('#hero-title', { y: 60, opacity: 0, duration: 1, delay: 2.2 })
                .from('.hero-text .subtitle', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
                .from('.hero-text .description', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
                .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
                .from('.id-card-wrapper', { y: 80, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=0.6');
        }

        // Section heading reveal on scroll
        document.querySelectorAll('.section-title').forEach(title => {
            gsap.from(title, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            });
        });
    };

    /* =============================================
       7. EVENT LISTENERS
       ============================================= */
    const setupEventListeners = () => {
        if (dom.themeToggle) dom.themeToggle.addEventListener('click', toggleTheme);
        if (dom.hamburger) dom.hamburger.addEventListener('click', toggleMobileMenu);

        window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });

        // Mouse effects removed (custom cursor + spotlight deleted)

        if (dom.navLinks) {
            const navLinksArray = Array.isArray(dom.navLinks) ? dom.navLinks : [dom.navLinks];
            navLinksArray.forEach(link => {
                link.addEventListener('click', e => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        smoothScroll(e);
                    } else if (href.includes('.html')) {
                        return;
                    }
                    if (dom.navMenu && dom.navMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                });
            });
        }

        if (dom.projectFilters) {
            dom.projectFilters.addEventListener("click", handleProjectFilter);
        }

        // Cards (projects + certificates)
        const allCards = document.querySelectorAll(".project-card, .cert-card");
        if (allCards.length) {
            allCards.forEach(card => {
                card.addEventListener("click", e => {
                    if (card.classList.contains("cert-card")) return;
                    e.preventDefault();
                    e.stopPropagation();
                    openUniversalModal(card);
                });

                const viewBtn = card.querySelector(".cert-open-btn");
                const downloadBtn = card.querySelector(".cert-download-btn");

                if (viewBtn) {
                    viewBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openUniversalModal(card);
                    });
                }

                if (downloadBtn) {
                    downloadBtn.addEventListener("click", e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const title = card.querySelector("h3")?.textContent.trim();
                        const cert = certificateData[title];
                        if (!cert) return;
                        const a = document.createElement("a");
                        a.href = cert.fileUrl;
                        a.download = `${title} - sertifikat.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    });
                }
            });
        }

        if (dom.aboutImageWrapper && !state.isTouchDevice) {
            dom.aboutImageWrapper.addEventListener('mousemove', handleAboutImageTilt);
            dom.aboutImageWrapper.addEventListener('mouseleave', resetAboutImageTilt);
        }

        initIdCardPhysics();

        if (dom.projectModal) dom.projectModal.addEventListener('click', handleModalClick);
        if (dom.modalCloseBtn) dom.modalCloseBtn.addEventListener('click', closeProjectModal);
        document.addEventListener('keydown', handleKeyboardInput);

        if (dom.contactForm) {
            dom.contactForm.addEventListener('submit', handleFormSubmit);
            const formInputs = dom.contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', (e) => validateField(e.target));
                input.addEventListener('input', (e) => validateField(e.target));
            });
        }

        if (dom.testimonialPrevBtn && dom.testimonialNextBtn) {
            dom.testimonialPrevBtn.addEventListener('click', () => { prevTestimonialSlide(); resetTestimonialInterval(); });
            dom.testimonialNextBtn.addEventListener('click', () => { nextTestimonialSlide(); resetTestimonialInterval(); });
        }

        if (dom.scrollToTopBtn) {
            dom.scrollToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(0, { duration: 1.5 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    };

    /* =============================================
       8. HANDLER FUNCTIONS
       ============================================= */
    // handleGlobalMouseMove removed (cursor + spotlight deleted)

    const handleScroll = () => {
        if (dom.header) dom.header.classList.toggle('scrolled', window.scrollY > 50);
        if (dom.scrollToTopBtn) dom.scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
        initScrollSpy();
        handleTextFadeOnScroll();

        // Only use JS timeline animation if GSAP is not available
        if (typeof gsap === 'undefined') {
            handleTimelineScrollAnimation();
        }
    };

    const prepareTextFadeWords = () => {
        const elements = document.querySelectorAll('.fade-on-scroll-text');
        if (!elements.length) return;
        elements.forEach(paragraph => {
            const text = paragraph.innerText;
            const words = text.split(' ');
            paragraph.innerHTML = '';
            words.forEach(word => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                paragraph.appendChild(span);
            });
        });
    };

    const handleTextFadeOnScroll = () => {
        const elements = document.querySelectorAll('.fade-on-scroll-text');
        if (!elements.length) return;

        elements.forEach(paragraph => {
            const rect = paragraph.getBoundingClientRect();
            const spans = paragraph.querySelectorAll('span');
            const windowHeight = window.innerHeight;
            const startTrigger = windowHeight * 0.9;
            const endTrigger = windowHeight * 0.35;
            const elementTop = rect.top;

            let progress = (startTrigger - elementTop) / (startTrigger - endTrigger);
            progress = Math.max(0, Math.min(1, progress));

            const totalWords = spans.length;
            const wordsToHighlight = Math.floor(progress * totalWords);

            spans.forEach((span, index) => {
                span.classList.toggle('highlight', index < wordsToHighlight);
            });
        });
    };

    const handleTimelineScrollAnimation = () => {
        if (!dom.timeline || !dom.timelineProgress || !dom.timelineScrollDot || !dom.timelineItems) return;
        const timelineEl = dom.timeline;
        const timelineRect = timelineEl.getBoundingClientRect();
        const timelineHeight = timelineEl.offsetHeight;
        const triggerPoint = window.innerHeight * 0.4;
        const distanceToTrigger = triggerPoint - timelineRect.top;
        const scrollProgress = Math.min(Math.max(0, distanceToTrigger), timelineHeight);
        const progressPercentage = (scrollProgress / timelineHeight) * 100;

        dom.timelineProgress.style.height = `${progressPercentage}%`;
        dom.timelineScrollDot.style.top = `${progressPercentage}%`;

        const items = Array.isArray(dom.timelineItems) ? dom.timelineItems : [dom.timelineItems];
        items.forEach(item => {
            const itemCenterInTimeline = item.offsetTop + (item.offsetHeight / 2);
            if (scrollProgress >= itemCenterInTimeline) {
                item.classList.add('is-active');
            }
        });
    };

    /* =============================================
       9. CORE FUNCTIONS
       ============================================= */
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // Refresh AOS on theme change
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 300);
        }
    };

    const initLoader = () => {
        if (!dom.loader) {
            document.body.classList.remove("loading");
            return;
        }

        const isCertificatePage = window.location.pathname.includes("sertifikat");
        if (isCertificatePage) {
            dom.loader.classList.add("fade-out");
            document.body.classList.remove("loading");
            return;
        }

        let progress = 0;
        const updateUI = () => {
            if (dom.progressBarFill) dom.progressBarFill.style.width = `${progress}%`;
            if (dom.progressPercentage) dom.progressPercentage.textContent = progress;
        };

        const intervalId = setInterval(() => {
            progress += 5;
            updateUI();
            if (progress >= 100) {
                clearInterval(intervalId);
                dom.loader.classList.add("fade-out");
                document.body.classList.remove("loading");
                // Initialize AOS after loader
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => AOS.refresh(), 100);
                }
            }
        }, 40);
    };

    const initScrollSpy = () => {
        if (!dom.sections || dom.sections.length === 0) return;
        const scrollY = window.pageYOffset;
        const sections = Array.isArray(dom.sections) ? dom.sections : [dom.sections];
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (navLink) {
                navLink.classList.toggle('active', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
            }
        });
    };

    const toggleMobileMenu = () => {
        dom.hamburger.classList.toggle('active');
        dom.navMenu.classList.toggle('active');
        document.body.style.overflow = dom.navMenu.classList.contains('active') ? 'hidden' : '';
    };

    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (lenis) {
                lenis.scrollTo(targetElement, { offset: -80, duration: 1.5 });
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    /* =============================================
       10. ANIMATIONS
       ============================================= */
    const initAnimations = () => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.classList.contains('animate-on-scroll') || el.classList.contains('cert-card')) {
                        el.classList.add('is-visible');
                    }
                    // Only animate with JS if GSAP isn't handling it
                    if (typeof gsap === 'undefined') {
                        if (el.matches('.stat-number')) animateCounter(el);
                        if (el.matches('.progress-bar')) animateProgressBar(el);
                    }
                    if (el.matches('.stagger-container')) animateStaggeredChildren(el);
                    if (el.matches('.reveal-text')) el.classList.add('is-visible');
                    obs.unobserve(el);
                }
            });
        }, observerOptions);

        const elementsToObserve = [
            ...document.querySelectorAll(selectors.animateOnScroll),
            ...document.querySelectorAll('.cert-card'),
            ...document.querySelectorAll(selectors.statNumbers),
            ...document.querySelectorAll(selectors.progressBars),
            ...document.querySelectorAll(selectors.staggerContainers),
            ...document.querySelectorAll(selectors.revealTextElements)
        ];
        elementsToObserve.forEach(el => el && observer.observe(el));
    };

    const animateCounter = (element) => {
        const target = +element.getAttribute('data-target');
        const duration = 2000;
        let current = 0;
        const stepTime = Math.max(1, Math.floor(duration / target));
        const timer = setInterval(() => {
            current += 1;
            element.innerText = current;
            if (current >= target) { element.innerText = target; clearInterval(timer); }
        }, stepTime);
    };

    const animateProgressBar = (el) => { el.style.width = el.getAttribute('data-level') + '%'; };

    const animateStaggeredChildren = (container) => {
        const children = container.querySelectorAll('.stagger-item, .cert-card');
        children.forEach((child, index) => {
            setTimeout(() => { child.classList.add('is-visible'); }, index * 150);
        });
    };

    const prepareTextReveal = () => {
        const elements = document.querySelectorAll('.reveal-text');
        if (!elements.length) return;
        elements.forEach(el => {
            const text = el.textContent.trim();
            el.innerHTML = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${index * 30}ms`;
                el.appendChild(span);
            });
        });
    };

    /* =============================================
       11. INTERACTIVE EFFECTS
       ============================================= */
    const handleAboutImageTilt = (e) => {
        const wrapper = e.currentTarget;
        const image = wrapper.querySelector('.about-image');
        if (!image) return;
        const { width, height, left, top } = wrapper.getBoundingClientRect();
        const x = e.clientX - left, y = e.clientY - top;
        const intensity = 6;
        const rotateX = ((y - height / 2) / (height / 2)) * -intensity;
        const rotateY = ((x - width / 2) / (width / 2)) * intensity;
        image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const resetAboutImageTilt = (e) => {
        const image = e.currentTarget.querySelector('.about-image');
        if (image) image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    const initInteractiveEffects = () => {
        // Custom cursor and magnetic buttons removed
        initTypingEffect();
    };

    const initIdCardPhysics = () => {
        const wrapper = document.getElementById('id-card-wrapper');
        const holder = document.getElementById('id-card');
        if (!wrapper || !holder) return;

        let isDragging = false;
        let dragMoved = false;
        let startX, startY;
        let currentX = 0, currentY = 0;
        let velocityX = 0, velocityY = 0;
        let rotation = 0;
        let angularVelocity = 0;
        let isFlipped = false;

        const spring = 0.08;
        const friction = 0.85;
        const maxPull = 120;

        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragMoved = false;
            startX = e.clientX;
            startY = e.clientY;
            wrapper.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) dragMoved = true;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const scale = distance > maxPull ? maxPull / distance : 1;
            const targetX = deltaX * scale;
            const targetY = Math.max(0, deltaY * scale);
            currentX += (targetX - currentX) * 0.5;
            currentY += (targetY - currentY) * 0.5;
            rotation = currentX * 0.15;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('click', (e) => {
            e.preventDefault();
            if (!dragMoved) {
                isFlipped = !isFlipped;
            }
            dragMoved = false;
        });

        const animate = () => {
            if (!isDragging) {
                velocityX += -currentX * spring;
                velocityY += -currentY * spring;
                velocityX *= friction;
                velocityY *= friction;
                currentX += velocityX;
                currentY += velocityY;
                angularVelocity += -rotation * 0.04;
                angularVelocity *= 0.92;
                rotation += angularVelocity;
            } else {
                velocityX = 0;
                velocityY = 0;
                angularVelocity = 0;
            }

            wrapper.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

            const container = holder.querySelector('.id-card-container');
            if (container) {
                container.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
            }

            requestAnimationFrame(animate);
        };
        animate();
    };

    const initTypingEffect = () => {
        if (!dom.typingEffect) return;
        const words = ["Sutan Arlie Johan", "Web Developer", "IT Enthusiast"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            const typeSpeed = isDeleting ? 75 : 150;
            dom.typingEffect.textContent = currentWord.substring(0, charIndex);
            if (!isDeleting && charIndex < currentWord.length) charIndex++;
            else if (isDeleting && charIndex > 0) charIndex--;
            else { isDeleting = !isDeleting; if (!isDeleting) wordIndex = (wordIndex + 1) % words.length; }
            setTimeout(type, isDeleting || charIndex === currentWord.length ? (isDeleting ? typeSpeed : 2000) : typeSpeed);
        }
        type();
    };

    /* =============================================
       12. PROJECT FILTER & MODAL
       ============================================= */
    const handleProjectFilter = (e) => {
        if (!e.target.matches('.filter-btn')) return;
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    };

    const openUniversalModal = cardElement => {
        if (!dom.projectModal || !dom.modalBody) return;
        const titleText = cardElement.querySelector("h3")?.textContent.trim();
        if (!titleText) return;

        let data = projectData[titleText];
        let type = "project";
        if (!data && certificateData[titleText]) {
            data = certificateData[titleText];
            type = "certificate";
        }
        if (!data) return;

        let modalHTML = "";

        if (type === "project") {
            modalHTML = `
                <div class="modal-header">
                    <h2>${data.title}</h2>
                </div>
                <div class="modal-content">
                    <img src="${data.image}" alt="${data.title}" class="modal-image" />
                    <p class="modal-description">${data.description}</p>
                    <p class="modal-purpose"><strong>Tujuan:</strong> ${data.purpose}</p>
                    <p class="modal-result"><strong>Hasil:</strong> ${data.result}</p>
                    <div class="modal-tech">
                        <strong>Tech Stack:</strong>
                        ${data.tech ? data.tech.map(t => `<span class="badge">${t}</span>`).join("") : ""}
                    </div>
                </div>`;
        } else if (type === "certificate") {
            const fileUrl = data.fileUrl || data.image;
            modalHTML = `
                <div class="modal-header">
                    <h2>${data.title}</h2>
                    <p class="modal-meta">
                        <span><strong>Penyelenggara:</strong> ${data.issuer}</span><br>
                        <span><strong>Tanggal:</strong> ${data.date}</span>
                    </p>
                </div>
                <div class="modal-content">
                    <p class="modal-description">${data.description}</p>
                    <div class="modal-certificate-preview">
                        ${data.isPdf
                    ? `<embed src="${fileUrl}" type="application/pdf" class="modal-pdf-preview" />`
                    : `<img src="${data.image}" alt="${data.title}" class="modal-image" />`}
                    </div>
                    <div class="modal-actions">
                        <a href="${fileUrl}" download class="btn btn-primary">Download Sertifikat</a>
                        <a href="${fileUrl}" target="_blank" class="btn btn-outline">Buka di Tab Baru</a>
                    </div>
                </div>`;
        }

        dom.modalBody.innerHTML = modalHTML;
        dom.projectModal.classList.add("open");
        document.body.classList.add("modal-open");

        // Pause Lenis when modal is open
        if (lenis) lenis.stop();
    };

    const closeProjectModal = () => {
        dom.projectModal.classList.remove('open');
        document.body.classList.remove("modal-open");
        document.body.style.overflow = '';
        // Resume Lenis
        if (lenis) lenis.start();
    };

    const handleModalClick = (e) => {
        if (e.target === dom.projectModal) closeProjectModal();
    };

    /* =============================================
       13. TESTIMONIAL CAROUSEL
       ============================================= */
    const initTestimonialCarousel = () => {
        if (!dom.testimonialSlides || (Array.isArray(dom.testimonialSlides) && dom.testimonialSlides.length === 0)) return;
        const slides = Array.isArray(dom.testimonialSlides) ? dom.testimonialSlides : [dom.testimonialSlides];
        if (dom.testimonialIndicators) {
            dom.testimonialIndicators.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('indicator-dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => { goToTestimonialSlide(i); resetTestimonialInterval(); });
                dom.testimonialIndicators.appendChild(dot);
            });
        }
        startTestimonialInterval();

        if (dom.testimonialCarousel) {
            let touchstartX = 0;
            const carouselParent = dom.testimonialCarousel.parentElement;
            if (carouselParent) {
                carouselParent.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX; clearInterval(state.testimonialInterval); }, { passive: true });
                carouselParent.addEventListener('touchend', e => {
                    const touchendX = e.changedTouches[0].screenX;
                    if (touchendX < touchstartX) nextTestimonialSlide();
                    if (touchendX > touchstartX) prevTestimonialSlide();
                    resetTestimonialInterval();
                });
            }
        }
    };

    const updateTestimonialCarousel = () => {
        if (dom.testimonialCarousel) {
            dom.testimonialCarousel.style.transform = `translateX(-${state.testimonialCurrentIndex * 100}%)`;
        }
        if (dom.testimonialIndicators) {
            dom.testimonialIndicators.querySelectorAll('.indicator-dot').forEach((d, i) => d.classList.toggle('active', i === state.testimonialCurrentIndex));
        }
    };

    const nextTestimonialSlide = () => {
        const slides = Array.isArray(dom.testimonialSlides) ? dom.testimonialSlides : [dom.testimonialSlides];
        state.testimonialCurrentIndex = (state.testimonialCurrentIndex + 1) % slides.length;
        updateTestimonialCarousel();
    };

    const prevTestimonialSlide = () => {
        const slides = Array.isArray(dom.testimonialSlides) ? dom.testimonialSlides : [dom.testimonialSlides];
        state.testimonialCurrentIndex = (state.testimonialCurrentIndex - 1 + slides.length) % slides.length;
        updateTestimonialCarousel();
    };

    const goToTestimonialSlide = (index) => { state.testimonialCurrentIndex = index; updateTestimonialCarousel(); };
    const startTestimonialInterval = () => { state.testimonialInterval = setInterval(nextTestimonialSlide, 5000); };
    const resetTestimonialInterval = () => { clearInterval(state.testimonialInterval); startTestimonialInterval(); };

    /* =============================================
       14. BLOG
       ============================================= */
    const initBlog = () => {
        if (!dom.blogPostsContainer || !dom.blogPagination) return;
        const renderBlogPosts = () => {
            dom.blogPostsContainer.innerHTML = '';
            const start = (state.blogCurrentPage - 1) * state.blogPostsPerPage;
            const paginatedPosts = blogPosts.slice(start, start + state.blogPostsPerPage);
            paginatedPosts.forEach((post, i) => {
                const postEl = document.createElement('div');
                postEl.className = 'blog-card';
                postEl.setAttribute('data-aos', 'fade-up');
                postEl.setAttribute('data-aos-delay', `${i * 100}`);
                postEl.innerHTML = `<img src="${post.image}" alt="${post.title}" class="blog-card-image"><div class="blog-card-content"><span class="category">${post.category}</span><h3>${post.title}</h3><p>${post.excerpt}</p><div class="blog-card-footer"><span>${post.date}</span><a href="#" class="read-more">Baca &rarr;</a></div></div>`;
                dom.blogPostsContainer.appendChild(postEl);
            });
            if (typeof AOS !== 'undefined') AOS.refresh();
        };

        const renderBlogPagination = () => {
            dom.blogPagination.innerHTML = '';
            const totalPages = Math.ceil(blogPosts.length / state.blogPostsPerPage);
            if (totalPages <= 1) return;
            const createBtn = (txt, page, dis, act) => {
                const btn = document.createElement('button');
                btn.innerHTML = txt;
                btn.disabled = dis;
                if (act) btn.classList.add('active');
                btn.addEventListener('click', () => {
                    state.blogCurrentPage = page;
                    renderBlogPosts();
                    renderBlogPagination();
                    dom.blogPostsContainer.scrollIntoView({ behavior: 'smooth' });
                });
                return btn;
            };
            dom.blogPagination.append(createBtn('&laquo;', state.blogCurrentPage - 1, state.blogCurrentPage === 1));
            for (let i = 1; i <= totalPages; i++) dom.blogPagination.append(createBtn(i, i, false, state.blogCurrentPage === i));
            dom.blogPagination.append(createBtn('&raquo;', state.blogCurrentPage + 1, state.blogCurrentPage === totalPages));
        };

        renderBlogPosts();
        renderBlogPagination();
    };

    /* =============================================
       15. FORM
       ============================================= */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateAllFields()) return;
        const form = e.target;
        const statusEl = dom.formStatus;
        statusEl.textContent = 'Mengirim...';
        statusEl.className = '';
        try {
            const response = await fetch(form.action, { method: form.method, body: new FormData(form), headers: { 'Accept': 'application/json' } });
            if (response.ok) { statusEl.textContent = 'Pesan berhasil terkirim!'; statusEl.className = 'success'; form.reset(); }
            else { throw new Error('Server error'); }
        } catch (error) { statusEl.textContent = 'Gagal mengirim pesan. Coba lagi nanti.'; statusEl.className = 'error'; }
    };

    const validateField = (field) => {
        const errEl = field.nextElementSibling;
        let ok = true, msg = '';
        if (field.required && !field.value.trim()) { ok = false; msg = 'Wajib diisi.'; }
        else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) { ok = false; msg = 'Email tidak valid.'; }
        else if (field.minLength > 0 && field.value.length < field.minLength) { ok = false; msg = `Minimal ${field.minLength} karakter.`; }
        field.parentElement.classList.toggle('error', !ok);
        if (errEl) errEl.textContent = msg;
        return ok;
    };

    const validateAllFields = () => Array.from(dom.contactForm.querySelectorAll('input, textarea')).every(f => validateField(f));

    /* =============================================
       16. UTILITIES
       ============================================= */
    const handleKeyboardInput = (e) => { if (e.key === 'Escape' && dom.projectModal && dom.projectModal.classList.contains('open')) closeProjectModal(); };
    const updateCopyrightYear = () => { if (dom.copyrightYear) dom.copyrightYear.textContent = new Date().getFullYear(); };
    const throttle = (func, limit) => {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) { func.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); }
        };
    };

    /* =============================================
       LAUNCH
       ============================================= */
    init();
});

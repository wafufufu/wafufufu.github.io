// ============================================
// PORTFOLIO — EDITORIAL INTERACTIONS
// Smooth scroll-driven animations, parallax,
// text reveals, and premium interactions
// ============================================

(function () {
    'use strict';

    // ---- Page Loader ----
    const loader = document.getElementById('page-loader');
    let loaderHidden = false;
    function hideLoader() {
        if (!loader || loaderHidden) return;
        loaderHidden = true;
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, 300);
    }
    window.addEventListener('load', hideLoader);
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(hideLoader, 1400);
    });

    // ---- Scroll Progress Bar ----
    const scrollProgress = document.getElementById('scroll-progress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('back-to-top');
    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Combined Scroll Handler (throttled with rAF) ----
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateNavbar();
                updateBackToTop();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---- Mobile Menu Toggle ----
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Expand / Collapse Project Detail ----
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isExpanded = content.classList.contains('expanded');

            if (isExpanded) {
                content.classList.remove('expanded');
                content.classList.add('collapsed');
                btn.classList.remove('expanded');
                btn.querySelector('span:first-child').textContent =
                    document.documentElement.lang === 'vi' ? 'Xem Chi Tiết' : 'View Case Study';
            } else {
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                btn.classList.add('expanded');
                btn.querySelector('span:first-child').textContent =
                    document.documentElement.lang === 'vi' ? 'Thu Gọn' : 'Show Less';
            }
        });
    });

    // ---- Scroll Reveal Animations ----
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });

    // ---- Parallax Effect on Scroll ----
    function updateParallax() {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (heroContent && scrollY < window.innerHeight) {
            const progress = scrollY / window.innerHeight;
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - progress * 1.2;
        }

        if (scrollIndicator && scrollY < window.innerHeight) {
            scrollIndicator.style.opacity = 1 - (scrollY / (window.innerHeight * 0.3));
        }

        // Parallax on project images
        document.querySelectorAll('.project-image-wrapper').forEach(wrapper => {
            const rect = wrapper.getBoundingClientRect();
            const viewportH = window.innerHeight;
            if (rect.top < viewportH && rect.bottom > 0) {
                const progress = (viewportH - rect.top) / (viewportH + rect.height);
                const translateY = (progress - 0.5) * 20;
                const img = wrapper.querySelector('img') || wrapper.querySelector('.project-visual');
                if (img) {
                    img.style.transform = `translateY(${translateY}px) scale(1.02)`;
                }
            }
        });
    }

    // ---- Botanical Ink Canvas (Subtle Vine Tendrils) ----
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let vines = [];
        let animId;
        let startTime = performance.now();

        function resizeCanvas() {
            const hero = document.getElementById('hero');
            const ratio = window.devicePixelRatio || 1;
            canvas.width = hero.offsetWidth * ratio;
            canvas.height = hero.offsetHeight * ratio;
            canvas.style.width = hero.offsetWidth + 'px';
            canvas.style.height = hero.offsetHeight + 'px';
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function createVines() {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            vines = [];
            const count = width < 700 ? 6 : 10;
            for (let i = 0; i < count; i++) {
                const side = i % 2 === 0 ? 'left' : 'right';
                const baseX = side === 'left' ? -20 : width + 20;
                const direction = side === 'left' ? 1 : -1;
                vines.push({
                    side,
                    direction,
                    baseX,
                    y: height * (0.1 + Math.random() * 0.76),
                    length: width * (0.16 + Math.random() * 0.13),
                    lift: (Math.random() - 0.5) * 90,
                    curl: 34 + Math.random() * 44,
                    phase: Math.random() * Math.PI * 2,
                    leaves: 2 + Math.floor(Math.random() * 4),
                    alpha: 0.12 + Math.random() * 0.16
                });
            }
        }

        function drawLeaf(x, y, angle, size, alpha) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(size * 0.72, -size * 0.48, size * 1.45, 0);
            ctx.quadraticCurveTo(size * 0.72, size * 0.5, 0, 0);
            ctx.fillStyle = `rgba(17, 17, 15, ${alpha})`;
            ctx.fill();
            ctx.restore();
        }

        function drawVines() {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const time = (performance.now() - startTime) / 1000;
            ctx.clearRect(0, 0, width, height);

            vines.forEach(vine => {
                const sway = Math.sin(time * 0.32 + vine.phase) * 12;
                const endX = vine.baseX + vine.direction * vine.length;
                const endY = vine.y + vine.lift + sway;
                const cp1X = vine.baseX + vine.direction * vine.length * 0.34;
                const cp1Y = vine.y - vine.curl + sway * 0.35;
                const cp2X = vine.baseX + vine.direction * vine.length * 0.72;
                const cp2Y = vine.y + vine.curl * 0.66 - sway * 0.28;

                ctx.beginPath();
                ctx.moveTo(vine.baseX, vine.y);
                ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
                ctx.strokeStyle = `rgba(17, 17, 15, ${vine.alpha})`;
                ctx.lineWidth = 1.1;
                ctx.stroke();

                for (let i = 1; i <= vine.leaves; i++) {
                    const t = i / (vine.leaves + 1);
                    const x = vine.baseX + vine.direction * vine.length * t;
                    const y = vine.y + vine.lift * t + Math.sin(time * 0.42 + vine.phase + i) * 7;
                    const angle = vine.direction * (0.55 + Math.sin(vine.phase + i) * 0.35);
                    drawLeaf(x, y, angle, 9 + i * 1.6, vine.alpha * 1.35);
                }
            });

            animId = requestAnimationFrame(drawVines);
        }

        resizeCanvas();
        createVines();
        drawVines();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createVines();
        });

        // Stop the decorative canvas when hero is not visible.
        const heroObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (!animId) drawVines();
            } else {
                cancelAnimationFrame(animId);
                animId = null;
            }
        });
        heroObserver.observe(document.getElementById('hero'));
    }

    // ---- Active Nav Link Highlight ----
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(a => {
                    const spans = a.querySelectorAll('.nav-link-text span');
                    if (a.getAttribute('href') === `#${id}`) {
                        spans.forEach(s => s.style.color = '#f5f5f5');
                    } else {
                        spans.forEach(s => s.style.color = '');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(s => sectionObserver.observe(s));

    // ---- Console Banner ----
    console.log(
        '%cPhu Nguyen — Portfolio',
        'font-size:16px;font-weight:600;color:#f5f5f5;font-family:serif;'
    );
    console.log('%cDesigned & developed in Ho Chi Minh City', 'font-size:12px;color:#666;');

    // ---- Carousel Navigation ----
    document.querySelectorAll('.carousel-container').forEach(container => {
        const track = container.querySelector('.intellifix-banner');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if (track && prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -track.offsetWidth * 0.8, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: track.offsetWidth * 0.8, behavior: 'smooth' });
            });
        }
    });

})();

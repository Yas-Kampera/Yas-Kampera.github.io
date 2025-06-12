// ========================================
//              INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initScrollAnimations();
    initAnimatedText();
    initStatsAnimation();
    initContactForm();
    initSmoothScrolling();
});

// ========================================
//             LOADING SCREEN
// ========================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Animate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                document.body.style.overflow = 'visible';
                
                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
    
    // Ensure loading screen disappears after maximum time
    setTimeout(() => {
        if (!loadingScreen.classList.contains('fade-out')) {
            loadingScreen.classList.add('fade-out');
            document.body.style.overflow = 'visible';
        }
    }, 3000);
}

// ========================================
//              NAVIGATION
// ========================================
function initNavigation() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
//           ANIMATED TEXT SLIDER
// ========================================
function initAnimatedText() {
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;
    
    function switchText() {
        // Fade out current text
        textItems[currentIndex].classList.add('fade-out');
        textItems[currentIndex].classList.remove('active');
        
        // Switch to next text after fade out
        setTimeout(() => {
            textItems[currentIndex].classList.remove('fade-out');
            currentIndex = (currentIndex + 1) % textItems.length;
            
            // Fade in new text
            setTimeout(() => {
                textItems[currentIndex].classList.add('active');
            }, 100);
        }, 400);
    }
    
    // Start the animation cycle
    setInterval(switchText, 3000);
}

// ========================================
//           SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animatedElements = [
        '.section-header',
        '.about-text',
        '.about-visual',
        '.service-card',
        '.portfolio-item',
        '.contact-info',
        '.contact-form-container',
        '.feature-item'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
    
    // Special animations for specific elements
    const leftSlideElements = document.querySelectorAll('.about-text, .contact-info');
    leftSlideElements.forEach(el => {
        el.classList.remove('fade-in');
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    
    const rightSlideElements = document.querySelectorAll('.about-visual, .contact-form-container');
    rightSlideElements.forEach(el => {
        el.classList.remove('fade-in');
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
}

// ========================================
//             PARALLAX HERO
// ========================================
function initParallaxHero() {
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('mousemove', (e) => {
        const { innerWidth, innerHeight } = window;
        shapes.forEach((shape, idx) => {
            const offsetX = (e.clientX - innerWidth / 2) / (50 + idx * 10);
            const offsetY = (e.clientY - innerHeight / 2) / (50 + idx * 10);
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// ========================================
//           SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(el => observer.observe(el));
}

// ========================================
//          STAT NUMBERS COUNTER
// ========================================
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            stats.forEach(stat => animateNumber(stat));
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    let current = 0;
    const increment = target / 100;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// ========================================
//         CONTACT FORM ANIMATION
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.classList.add('loading');
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            form.reset();
            formSuccessMessage();
        }, 1500);
    });
}

function formSuccessMessage() {
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.innerHTML = `<div class="success-message fade-in">
        <h3>Merci pour votre demande !</h3>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
    </div>`;
}

// ========================================
//            SMOOTH SCROLL
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        });
    });
}

// ========================================
//            SCROLL SPY ACTIVE MENU
// ========================================
function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
}

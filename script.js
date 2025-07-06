// Dramatic Portfolio JavaScript - The Code Behind the Magic
// "Where boring things become legendary adventures"
// Joint Portfolio for Ojas & Anadi - The Code Athletes

class CodeAthlete {
    constructor() {
        this.isLoaded = false;
        this.currentTheme = 'dark';
        this.scrollPosition = 0;
        this.sections = [];
        this.skillBars = [];
        this.projectCards = [];
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startup());
        } else {
            this.startup();
        }
    }

    startup() {
        console.log('⚡ Initializing The Code Athletes...');
        
        // Initialize all components
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupNavigationEffects();
        this.setupFormValidation();
        this.setupThemeToggle();
        this.setupSkillAnimations();
        this.setupProjectInteractions();
        this.setupHeroAnimations();
        
        // Mark as loaded
        this.isLoaded = true;
        document.body.classList.add('loaded');
        
        console.log('🏆 The Code Athletes are ready for action!');
    }

    setupEventListeners() {
        // Navigation toggle for mobile
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.scrollToSection(target);
                
                // Close mobile menu
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Smooth scrolling for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                this.scrollToSection(target);
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.handleFormSubmission(e);
            });
        }
    }

    setupScrollAnimations() {
        // Setup intersection observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('skill-card')) {
                        this.animateSkillCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-fill')) {
                        this.animateStatBar(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animateElements = document.querySelectorAll(`
            .story-block,
            .skill-card,
            .sport-card,
            .project-card,
            .gallery-item,
            .contact-method,
            .stat-fill
        `);

        animateElements.forEach(el => {
            el.classList.add('fade-in');
            this.scrollObserver.observe(el);
        });
    }

    setupNavigationEffects() {
        const navbar = document.querySelector('.navbar');
        
        // Add scrolled class to navbar when scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });

        // Highlight active navigation link
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        const inputs = form?.querySelectorAll('input, textarea');
        
        inputs?.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('i');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        themeToggle?.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(this.currentTheme);
            
            // Update icon with animation
            themeIcon?.classList.add('fa-spin');
            setTimeout(() => {
                themeIcon?.classList.remove('fa-spin');
            }, 500);
        });
    }

    setupSkillAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const levelFill = card.querySelector('.level-fill');
            const level = levelFill?.getAttribute('data-level');
            
            if (levelFill && level) {
                levelFill.style.setProperty('--skill-level', `${level}%`);
            }
        });
    }

    setupProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, 'leave');
            });
        });
    }

    setupHeroAnimations() {
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-cta');
        
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.3}s`;
        });

        // Animate scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToSection('#about');
            });
        }

        // Animate matrix background
        this.animateMatrixBackground();
    }

    // Utility Methods
    scrollToSection(target) {
        const section = document.querySelector(target);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        this.scrollPosition = window.scrollY;
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const scrolled = this.scrollPosition * 0.5;
            heroBackground.style.transform = `translateY(${scrolled}px)`;
        }
        
        // Update scroll indicator visibility
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = this.scrollPosition > 100 ? '0' : '1';
        }
    }

    handleResize() {
        // Handle responsive changes
        console.log('🔄 Handling resize...');
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Your message has been sent successfully! ⚡', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Check if field is required
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Validate email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Show/hide error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
    }

    animateSkillCard(card) {
        card.classList.add('animate');
        
        const levelFill = card.querySelector('.level-fill');
        const level = levelFill?.getAttribute('data-level');
        
        if (levelFill && level) {
            setTimeout(() => {
                levelFill.style.width = `${level}%`;
            }, 300);
        }
    }

    animateStatBar(statBar) {
        const skill = statBar.getAttribute('data-skill');
        if (skill) {
            setTimeout(() => {
                statBar.style.width = `${skill}%`;
            }, 300);
        }
    }

    animateProjectCard(card, action) {
        const title = card.querySelector('.project-title');
        const badge = card.querySelector('.status-badge');
        
        if (action === 'enter') {
            title?.classList.add('highlight');
            badge?.classList.add('pulse');
        } else {
            title?.classList.remove('highlight');
            badge?.classList.remove('pulse');
        }
    }

    animateMatrixBackground() {
        const matrixLines = document.querySelectorAll('.matrix-line');
        
        matrixLines.forEach((line, index) => {
            setInterval(() => {
                this.updateMatrixLine(line);
            }, 5000 + (index * 1000));
        });
    }

    updateMatrixLine(line) {
        const binaryStrings = [
            '01001000 01100101 01101100 01101100 01101111',
            '01010111 01101111 01110010 01101100 01100100',
            '01000011 01101111 01100100 01100101 01110010',
            '01000001 01110100 01101000 01101100 01100101',
            '01000100 01110010 01100001 01101101 01100001',
            '01001100 01100101 01100111 01100101 01101110',
            '01010000 01101111 01110111 01100101 01110010',
            '01010110 01101001 01100011 01110100 01101111'
        ];
        
        const randomBinary = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
        line.textContent = randomBinary;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: var(--text-light);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow-heavy);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.closeNotification(notification);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            this.closeNotification(notification);
        }, 5000);
    }

    closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    // Debug method
    debug() {
        console.log('🔍 Debug Info:', {
            isLoaded: this.isLoaded,
            currentTheme: this.currentTheme,
            scrollPosition: this.scrollPosition,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }
}

// Global functions for button callbacks
function scrollToSection(target) {
    if (window.codeAthlete) {
        window.codeAthlete.scrollToSection(target);
    }
}

// Initialize the application
window.codeAthlete = new CodeAthlete();

// Add some CSS for error states and notifications
const additionalStyles = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff4444;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }
    
    .error-message {
        color: #ff4444;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        display: none;
    }
    
    .notification {
        font-family: var(--font-secondary);
        font-weight: 500;
        border-left: 4px solid rgba(255, 255, 255, 0.5);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #dc3545, #fd7e14);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .project-title.highlight {
        color: var(--primary-color);
        text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
    }
    
    .status-badge.pulse {
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

// Inject additional styles
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

// Add some console art for fun
console.log(`
⚡ ════════════════════════════════════════════════════════════════ ⚡
   
    ████████╗██╗  ██╗███████╗     ██████╗ ██████╗ ██████╗ ███████╗
    ╚══██╔══╝██║  ██║██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
       ██║   ███████║█████╗      ██║     ██║   ██║██║  ██║█████╗  
       ██║   ██╔══██║██╔══╝      ██║     ██║   ██║██║  ██║██╔══╝  
       ██║   ██║  ██║███████╗    ╚██████╗╚██████╔╝██████╔╝███████╗
       ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                                   
              ███████╗████████╗██╗  ██╗██╗     ███████╗████████╗███████╗
              ██╔════╝╚══██╔══╝██║  ██║██║     ██╔════╝╚══██╔══╝██╔════╝
              ███████╗   ██║   ███████║██║     █████╗     ██║   █████╗  
              ██╔══██║   ██║   ██╔══██║██║     ██╔══╝     ██║   ██╔══╝  
              ██║  ██║   ██║   ██║  ██║███████╗███████╗   ██║   ███████╗
              ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝
                                                                         
⚡ ════════════════════════════════════════════════════════════════ ⚡
      
      Welcome to Anadi's Portfolio - Where Boring Things Deserve Drama!
      
      🏆 Features Loaded:
      ✅ Dramatic Animations
      ✅ Smooth Scrolling
      ✅ Responsive Design
      ✅ Theme Toggle
      ✅ Form Validation
      ✅ Scroll Animations
      ✅ Project Interactions
      
      Type 'codeAthlete.debug()' to see debug info
      
⚡ ════════════════════════════════════════════════════════════════ ⚡
`);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .mindset-card, .why-card');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '5px solid #8B4513';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// Track scroll depth for analytics (optional)
let maxScrollDepth = 0;

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((window.pageYOffset / scrollHeight) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Log scroll milestones
        if (maxScrollDepth === 25 || maxScrollDepth === 50 || maxScrollDepth === 75 || maxScrollDepth === 100) {
            console.log(`User scrolled to ${maxScrollDepth}% of the page`);
            // You can send this to analytics service
        }
    }
});

// Update contact email (user should replace this)
const emailLinks = document.querySelectorAll('a[href^="mailto:your.email"]');
emailLinks.forEach(link => {
    // User should update this with their actual email
    link.addEventListener('click', function(e) {
        if (this.href.includes('your.email@example.com')) {
            e.preventDefault();
            alert('Please update the email address in index.html with your actual email!');
        }
    });
});

// Update LinkedIn and other social links
const socialLinks = document.querySelectorAll('a[href*="linkedin.com/in/yourprofile"]');
socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href.includes('yourprofile')) {
            e.preventDefault();
            alert('Please update the LinkedIn URL in index.html with your actual profile!');
        }
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for recruiters
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #8B4513;');
console.log('%cThanks for checking out my portfolio code!', 'font-size: 14px; color: #5C4033;');
console.log('%cI built this to showcase my product thinking and technical skills.', 'font-size: 14px; color: #5C4033;');
console.log('%cLet\'s build something amazing together! 🚀', 'font-size: 14px; color: #CD853F;');

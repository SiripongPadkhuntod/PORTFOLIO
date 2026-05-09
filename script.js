// Typing Animation
const typingElement = document.querySelector('.typing');
const roles = ['Software Engineer', 'Full Stack Developer', 'Siripong Padkhuntod'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
        }
    });
}

// Navigation Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-dim)';
        if (link.getAttribute('href').includes(current)) {
            link.style.color = 'var(--primary)';
        }
    });
}

// Initial Calls
document.addEventListener('DOMContentLoaded', () => {
    type();
    checkReveal();
    window.addEventListener('scroll', () => {
        checkReveal();
        highlightNav();
    });
});

// Form Submission Mockup
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Project Modal
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const modalFeatures = document.getElementById('modal-features');

document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
        // Populate modal
        modalImg.style.backgroundImage = `url('${card.dataset.img}')`;
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;

        // Tags
        modalTags.innerHTML = card.dataset.tags.split(',')
            .map(t => `<span class="tag">${t.trim()}</span>`)
            .join('');

        // Features
        modalFeatures.innerHTML = card.dataset.features.split(',')
            .map(f => `<li>${f.trim()}</li>`)
            .join('');

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const root = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    root.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    root.classList.toggle('light-mode');
    const isLight = root.classList.contains('light-mode');
    
    // Update icon
    if (isLight) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Language Toggle Mockup
const langToggle = document.getElementById('lang-toggle');
let isTH = false;
langToggle.addEventListener('click', () => {
    isTH = !isTH;
    langToggle.textContent = isTH ? 'TH / EN' : 'EN / TH';
    // Here you would normally swap content
});

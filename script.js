/* ============================================================
   GOKULRAJ PORTFOLIO — JAVASCRIPT
   ============================================================ */

'use strict';

/* ==================== THEME TOGGLE ==================== */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  
  // Animate toggle button
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 300);
});

/* ==================== NAVBAR ==================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Scrolled state
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleBackToTop();
}, { passive: true });

// Active nav link on scroll
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

/* ==================== MOBILE MENU ==================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ==================== TYPED TEXT EFFECT ==================== */
const typedEl = document.getElementById('typedText');
const strings = [
  'Full-Stack Web Developer',
  'B.Tech AI & DS Student',
  'Python Enthusiast',
  'Problem Solver',
  'UI/UX Curious'
];

let strIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const currentStr = strings[strIndex];
  
  if (isDeleting) {
    typedEl.textContent = currentStr.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typedEl.textContent = currentStr.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }
  
  if (!isDeleting && charIndex === currentStr.length) {
    isDeleting = true;
    typingSpeed = 1800; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    strIndex = (strIndex + 1) % strings.length;
    typingSpeed = 400; // Pause before typing next
  }
  
  setTimeout(type, typingSpeed);
}

setTimeout(type, 600);

/* ==================== CURSOR GLOW ==================== */
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
}, { passive: true });

/* ==================== SCROLL ANIMATIONS (AOS-style) ==================== */
const aosElements = document.querySelectorAll('[data-aos]');
const aosDelays = {};

aosElements.forEach(el => {
  const delay = el.getAttribute('data-aos-delay');
  if (delay) {
    el.style.transitionDelay = delay + 'ms';
  }
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      
      // Animate skill bars when skills section is visible
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) {
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 200);
        }
      });
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

aosElements.forEach(el => observer.observe(el));

// Also observe skill categories directly
document.querySelectorAll('.skill-category').forEach(cat => {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((fill, i) => {
          const width = fill.getAttribute('data-width');
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 300 + i * 150);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillObserver.observe(cat);
});

/* ==================== BACK TO TOP ==================== */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==================== CONTACT FORM ==================== */
const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('formSubmit');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  
  if (!name || !email || !message) {
    shakeForm();
    return;
  }
  
  if (!isValidEmail(email)) {
    document.getElementById('formEmail').style.borderColor = '#ef4444';
    setTimeout(() => {
      document.getElementById('formEmail').style.borderColor = '';
    }, 2000);
    return;
  }
  
  // Simulate form submission
  formSubmit.querySelector('.btn-text').classList.add('hidden');
  formSubmit.querySelector('.btn-loader').classList.remove('hidden');
  formSubmit.disabled = true;
  
  setTimeout(() => {
    formSubmit.querySelector('.btn-text').classList.remove('hidden');
    formSubmit.querySelector('.btn-loader').classList.add('hidden');
    formSubmit.disabled = false;
    formSuccess.classList.remove('hidden');
    contactForm.reset();
    
    setTimeout(() => {
      formSuccess.classList.add('hidden');
    }, 4000);
  }, 1800);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm() {
  contactForm.style.animation = 'shake 0.4s ease';
  setTimeout(() => { contactForm.style.animation = ''; }, 400);
}

/* ==================== SMOOTH ANCHOR SCROLLING ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ==================== PROJECT CARD TILT EFFECT ==================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transformStyle = 'preserve-3d';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transformStyle = '';
  });
});

/* ==================== DYNAMIC CSS INJECTION (shake animation) ==================== */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(styleSheet);

/* ==================== COUNTER ANIMATION FOR STATS ==================== */
function animateCounter(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
      requestAnimationFrame(update);
    } else {
      el.textContent = target + (el.dataset.suffix || '');
    }
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text);
      const suffix = text.replace(num, '');
      el.dataset.suffix = suffix;
      animateCounter(el, num, 1000);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ==================== INIT ==================== */
window.addEventListener('load', () => {
  updateActiveNav();
  toggleBackToTop();
  
  // Trigger hero section animations
  document.querySelectorAll('.hero [data-aos]').forEach(el => {
    setTimeout(() => el.classList.add('aos-animate'), 200);
  });
});

console.log('%c🚀 Gokulraj Portfolio', 'font-size:16px;font-weight:bold;color:#7c3aed;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color:#94a3b8;');

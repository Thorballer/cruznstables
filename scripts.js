/* ============================================
   Cruz N' Stables — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // === Mobile Navigation Toggle ===
  const navToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }
  
  // === Sticky Nav Shadow on Scroll ===
  const nav = document.querySelector('.nav');
  
  const updateNavShadow = () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', updateNavShadow, { passive: true });
  updateNavShadow();
  
  // === Scroll Animations ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Elements to animate
  const animateElements = document.querySelectorAll('.service-card, .area-card, .about-images, .about-content, .contact-info, .contact-cta');
  animateElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
  });
  
  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === Service Card Hover Effects ===
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(-5deg)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
  
  // === Contact Method Cards Hover ===
  const contactMethods = document.querySelectorAll('.contact-method');
  contactMethods.forEach(method => {
    method.addEventListener('mouseenter', () => {
      const icon = method.querySelector('.method-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
        icon.style.background = 'var(--forest)';
        icon.style.color = 'white';
      }
    });
    
    method.addEventListener('mouseleave', () => {
      const icon = method.querySelector('.method-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
        icon.style.background = 'var(--sage-light)';
        icon.style.color = 'var(--forest)';
      }
    });
  });
  
  // === Area Cards Hover Effect ===
  const areaCards = document.querySelectorAll('.area-card');
  areaCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('area-primary')) {
        card.style.transform = 'translateY(-4px) scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // === Counter Animation for Trust Bar ===
  const trustNumbers = document.querySelectorAll('.trust-number');
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const match = text.match(/(\d+)([%+]?)/);
        
        if (match) {
          const targetNum = parseInt(match[1]);
          const suffix = match[2] || '';
          let current = 0;
          const increment = targetNum / 40;
          const duration = 1500;
          const stepTime = duration / 40;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              target.textContent = text;
              clearInterval(counter);
            } else {
              target.textContent = Math.floor(current) + suffix;
            }
          }, stepTime);
        }
        
        trustObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  trustNumbers.forEach(num => trustObserver.observe(num));
  
  // === Button Ripple Effect ===
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        width: 20px;
        height: 20px;
        left: ${e.clientX - rect.left - 10}px;
        top: ${e.clientY - rect.top - 10}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // === Active Nav Link Highlighting ===
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  
  const highlightNav = () => {
    let current = '';
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksAll.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', highlightNav, { passive: true });
  
  // === Testimonial Scroll (if multiple) ===
  console.log('Cruz N\' Stables website loaded successfully');
});

// === Add Ripple Keyframes via JS ===
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
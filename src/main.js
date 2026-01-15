import { setupChat } from './chat.js';


// Initialize Chat Widget
setupChat(document.body);

// Inject Aesthetic Scroll Blur
const blurStrip = document.createElement('div');
blurStrip.className = 'top-scroll-blur';
document.body.prepend(blurStrip);

// Global Interactivity (e.g. Navigation active states)
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');

  // Active State
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Mobile Menu Injection
  const navbarContent = document.querySelector('.navbar-content');
  if (navbarContent && !document.querySelector('.mobile-menu-btn')) {
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.innerHTML = '<i class="ph ph-list"></i>';

    // Insert before logo or somewhere visible?
    // Typically hamburger is right side, logo left.
    // Our existing layout: Logo - Links - Button
    // We want: Logo - [Space] - Hamburger (on mobile)
    // Adjust flex order or position.

    navbarContent.insertBefore(hamburger, navbarContent.querySelector('.nav-links'));

    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-active');
      const isOpen = navLinksContainer.classList.contains('mobile-active');
      hamburger.innerHTML = isOpen ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    });

    // Close menu/reset on link click
    navLinksContainer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
        hamburger.innerHTML = '<i class="ph ph-list"></i>';
      });
    });
  }

  // Observer for fade-up animations if they weren't triggered by CSS load
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  });

  document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el));

  // Hero Word Rotator
  const words = ["Solutions", "Agents", "SDR", "Marketer", "Employee"];
  let wordIndex = 0;
  const wordRotator = document.getElementById('word-rotator');

  if (wordRotator) {
    setInterval(() => {
      // Fade out
      wordRotator.classList.add('word-fade-out');

      setTimeout(() => {
        // Change text
        wordIndex = (wordIndex + 1) % words.length;
        wordRotator.textContent = words[wordIndex];

        // Reset and Fade in
        wordRotator.classList.remove('word-fade-out');
        wordRotator.classList.add('word-fade-in');

        // Cleanup after fade in animation
        setTimeout(() => {
          wordRotator.classList.remove('word-fade-in');
        }, 400);
      }, 400);
    }, 3000);
  }
});


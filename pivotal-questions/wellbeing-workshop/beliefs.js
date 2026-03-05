// Beliefs Page - Collapsible Context Sections
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Generic toggle handler for all collapsible sections
    function setupToggle(toggleSelector) {
      const toggleButtons = document.querySelectorAll(toggleSelector);

      toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          const contentDiv = document.getElementById(targetId);

          if (contentDiv) {
            const isOpen = contentDiv.classList.contains('open');

            if (isOpen) {
              contentDiv.classList.remove('open');
              this.classList.remove('open');
            } else {
              contentDiv.classList.add('open');
              this.classList.add('open');
            }
          }
        });
      });
    }

    // Set up all toggle types
    setupToggle('.pq-context-toggle');
    setupToggle('.definition-toggle');
    setupToggle('.subordinate-toggle');

    // Handle hash links to collapsed sections - open and scroll to them
    function handleHashNavigation() {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target && target.classList.contains('definition-content')) {
          // Open the collapsed section
          target.classList.add('open');
          // Also open the toggle button
          const toggle = document.querySelector('[data-target="' + target.id + '"]');
          if (toggle) toggle.classList.add('open');
          // Scroll to it after a brief delay for rendering
          setTimeout(function() {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }

    // Handle initial page load with hash
    handleHashNavigation();

    // Handle clicking links to anchors within the page
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target && target.classList.contains('definition-content')) {
          e.preventDefault();
          target.classList.add('open');
          const toggle = document.querySelector('[data-target="' + targetId + '"]');
          if (toggle) toggle.classList.add('open');
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Store name in sessionStorage for thank-you page
    const form = document.getElementById('beliefsForm');
    const nameInput = document.getElementById('name');

    if (form && nameInput) {
      form.addEventListener('submit', function() {
        sessionStorage.setItem('beliefsSubmitterName', nameInput.value.trim());
      });
    }
  });
})();

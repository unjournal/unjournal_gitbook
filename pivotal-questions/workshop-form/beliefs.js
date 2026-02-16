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

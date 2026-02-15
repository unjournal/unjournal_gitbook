// Beliefs Page - Collapsible Context Sections
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Handle context toggle buttons
    const toggleButtons = document.querySelectorAll('.pq-context-toggle');

    toggleButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const contextDiv = document.getElementById(targetId);

        if (contextDiv) {
          const isOpen = contextDiv.classList.contains('open');

          if (isOpen) {
            contextDiv.classList.remove('open');
            this.classList.remove('open');
          } else {
            contextDiv.classList.add('open');
            this.classList.add('open');
          }
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

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

    // Handle beliefs form submission with fetch
    const form = document.getElementById('beliefsForm');
    const nameInput = document.getElementById('name');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (form && nameInput) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Store name in sessionStorage for thank-you page
        sessionStorage.setItem('beliefsSubmitterName', nameInput.value.trim());

        // Show submitting state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
        }

        // Encode form data
        const formData = new FormData(form);

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        })
        .then(response => {
          if (response.ok) {
            window.location.href = '/beliefs-thanks.html';
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Your Beliefs';
          }
          alert('There was an error submitting the form. Please try again.');
        });
      });
    }
  });
})();

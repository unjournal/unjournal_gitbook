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

    // Download responses as text file
    var downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        var form = document.getElementById('beliefsForm');
        if (!form) return;
        var fd = new FormData(form);
        var lines = ['CM Workshop — Your Beliefs Responses', 'Downloaded: ' + new Date().toISOString(), ''];
        var labels = {
          'name': 'Name', 'email': 'Email', 'affiliation': 'Affiliation',
          'metaculus_username': 'Metaculus Username', 'expertise': 'Expertise',
          'cm01_cost_2036': 'CM_01: Cost estimate 2036 ($/kg)',
          'cm01_reasoning': 'CM_01: Reasoning',
          'cm02_assessment': 'CM_02: Overall AW investment assessment',
          'cm02_benefit_low': 'CM_02: Benefit share — lower 10th %ile',
          'cm02_benefit_median': 'CM_02: Benefit share — median',
          'cm02_benefit_high': 'CM_02: Benefit share — upper 90th %ile',
          'cm02_reasoning': 'CM_02: What would change your assessment',
          'cm10_probability': 'CM_10: P(CM funding > best AW alternative)',
          'cm10_reasoning': 'CM_10: Reasoning',
          'cm12_probability': 'CM_12: P(hydrolysates by 2036)',
          'cm12_comment': 'CM_12: Comment',
          'cm13_cost': 'CM_13: Growth factor cost ($/g)',
          'cm13_comment': 'CM_13: Comment',
          'cm14_cost': 'CM_14: Cell media cost ($/kg output)',
          'cm14_comment': 'CM_14: Comment',
          'cm16_density': 'CM_16: Cell density (g/L or cells/mL)',
          'cm16_comment': 'CM_16: Comment',
          'cm17_percentage': 'CM_17: % food-grade media',
          'cm17_comment': 'CM_17: Comment',
          'cm20_percentage': 'CM_20: % companies building own bioreactors',
          'cm20_comment': 'CM_20: Comment',
          'other_thoughts': 'Other thoughts'
        };
        fd.forEach(function(val, key) {
          if (key === 'form-name' || key === 'bot-field') return;
          var label = labels[key] || key;
          if (val) lines.push(label + ': ' + val);
        });
        var blob = new Blob([lines.join('\n')], {type: 'text/plain'});
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        var name = (fd.get('name') || 'responses').replace(/\s+/g, '_');
        a.download = 'cm-beliefs-' + name + '.txt';
        a.click();
        URL.revokeObjectURL(a.href);
      });
    }

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

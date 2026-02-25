// Workshop Scheduling Form - JavaScript
// Handles availability grid, form validation, and interactivity

(function() {
  'use strict';

  // Configuration
  // Extended time slots to accommodate more time zones
  const HOUR_BLOCKS = [
    { id: '09-11', label: '9–11 AM', tz: '2–4 PM UK · 3–5 PM CET', highlighted: false },
    { id: '11-13', label: '11 AM–1 PM', tz: '4–6 PM UK · 5–7 PM CET', highlighted: true },
    { id: '13-15', label: '1–3 PM', tz: '6–8 PM UK · 7–9 PM CET', highlighted: true },
    { id: '15-17', label: '3–5 PM', tz: '8–10 PM UK · 9–11 PM CET', highlighted: true },
    { id: '17-19', label: '5–7 PM', tz: '10 PM–12 AM UK', highlighted: false }
  ];

  // Likely coordination window: Mon-Thu, Mar 16-27, 11am-5pm ET
  // Based on responses so far, but we show all times and let people select
  const LIKELY_DATES_START = new Date(2026, 2, 16); // Mar 16
  const LIKELY_DATES_END = new Date(2026, 2, 27);   // Mar 27
  const LIKELY_DAYS = [1, 2, 3, 4]; // Mon-Thu

  function isLikelySlot(date, blockId) {
    const block = HOUR_BLOCKS.find(b => b.id === blockId);
    if (!block || !block.highlighted) return false;

    const day = date.getDay();
    if (!LIKELY_DAYS.includes(day)) return false;

    if (date < LIKELY_DATES_START || date > LIKELY_DATES_END) return false;

    return true;
  }

  // Generate Mon-Fri from Mar 9 to Mar 27, 2026 (wider range)
  function generateDates() {
    const dates = [];
    const start = new Date(2026, 2, 9);  // Mar 9, 2026
    const end = new Date(2026, 2, 27);   // Mar 27, 2026

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      // Mon-Fri (1-5), exclude Sat/Sun
      if (day >= 1 && day <= 5) {
        dates.push(new Date(d));
      }
    }
    return dates;
  }

  const DATE_OPTIONS = generateDates();

  // State
  const gridAvailability = {};

  // Utility functions
  function formatDate(d) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr'];
    return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
  }

  function formatDateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getWeekStart(d) {
    const date = new Date(d);
    date.setDate(date.getDate() - date.getDay() + 1); // Monday
    return formatDateKey(date);
  }

  // Group dates by week
  function groupDatesByWeek(dates) {
    const groups = {};
    dates.forEach(d => {
      const weekKey = getWeekStart(d);
      if (!groups[weekKey]) groups[weekKey] = [];
      groups[weekKey].push(d);
    });
    return groups;
  }

  // Update hidden input with grid data
  function updateGridInput() {
    const selected = Object.keys(gridAvailability).filter(k => gridAvailability[k]);
    document.getElementById('gridAvailabilityInput').value = JSON.stringify(selected);
  }

  // Check if all blocks for a date are selected
  function isDateFullySelected(dateKey) {
    return HOUR_BLOCKS.every(b => gridAvailability[`${dateKey}_${b.id}`]);
  }

  // Toggle a single cell
  function toggleCell(dateKey, blockId) {
    const key = `${dateKey}_${blockId}`;
    gridAvailability[key] = !gridAvailability[key];

    const cell = document.querySelector(`[data-cell="${key}"]`);
    if (cell) {
      cell.classList.toggle('selected', gridAvailability[key]);
      cell.innerHTML = gridAvailability[key] ? '<span class="checkmark">✓</span>' : '';
    }

    // Update date button state
    const dateBtn = document.querySelector(`[data-date="${dateKey}"]`);
    if (dateBtn) {
      dateBtn.classList.toggle('all-selected', isDateFullySelected(dateKey));
    }

    updateGridInput();
  }

  // Toggle entire date row
  function toggleDate(dateKey) {
    const allSelected = isDateFullySelected(dateKey);

    HOUR_BLOCKS.forEach(b => {
      const key = `${dateKey}_${b.id}`;
      gridAvailability[key] = !allSelected;

      const cell = document.querySelector(`[data-cell="${key}"]`);
      if (cell) {
        cell.classList.toggle('selected', !allSelected);
        cell.innerHTML = !allSelected ? '<span class="checkmark">✓</span>' : '';
      }
    });

    const dateBtn = document.querySelector(`[data-date="${dateKey}"]`);
    if (dateBtn) {
      dateBtn.classList.toggle('all-selected', !allSelected);
    }

    updateGridInput();
  }

  // Toggle entire week
  function toggleWeek(weekDates) {
    const allSelected = weekDates.every(d => isDateFullySelected(formatDateKey(d)));

    weekDates.forEach(d => {
      const dateKey = formatDateKey(d);
      HOUR_BLOCKS.forEach(b => {
        const key = `${dateKey}_${b.id}`;
        gridAvailability[key] = !allSelected;

        const cell = document.querySelector(`[data-cell="${key}"]`);
        if (cell) {
          cell.classList.toggle('selected', !allSelected);
          cell.innerHTML = !allSelected ? '<span class="checkmark">✓</span>' : '';
        }
      });

      const dateBtn = document.querySelector(`[data-date="${dateKey}"]`);
      if (dateBtn) {
        dateBtn.classList.toggle('all-selected', !allSelected);
      }
    });

    updateGridInput();
  }

  // Check if all dates for a time block are selected
  function isColumnFullySelected(blockId) {
    return DATE_OPTIONS.every(d => gridAvailability[`${formatDateKey(d)}_${blockId}`]);
  }

  // Toggle entire column (time block across all dates)
  function toggleColumn(blockId) {
    const allSelected = isColumnFullySelected(blockId);

    DATE_OPTIONS.forEach(d => {
      const dateKey = formatDateKey(d);
      const key = `${dateKey}_${blockId}`;
      gridAvailability[key] = !allSelected;

      const cell = document.querySelector(`[data-cell="${key}"]`);
      if (cell) {
        cell.classList.toggle('selected', !allSelected);
        cell.innerHTML = !allSelected ? '<span class="checkmark">✓</span>' : '';
      }

      const dateBtn = document.querySelector(`[data-date="${dateKey}"]`);
      if (dateBtn) {
        dateBtn.classList.toggle('all-selected', isDateFullySelected(dateKey));
      }
    });

    const colHeader = document.querySelector(`[data-block="${blockId}"]`);
    if (colHeader) {
      colHeader.classList.toggle('all-selected', !allSelected);
    }

    updateGridInput();
  }

  // Build the availability grid
  function buildGrid() {
    const container = document.getElementById('availabilityGrid');
    if (!container) return;

    let html = '';

    // Time headers
    html += '<div class="grid-time-headers">';
    html += '<div class="grid-tz-label">US Eastern →</div>';
    HOUR_BLOCKS.forEach(block => {
      html += `<button type="button" class="grid-time-cell" data-block="${block.id}" title="Click to select all ${block.label} slots · ${block.tz}">
        <div>${block.label}</div>
        <div class="tz-sub">${block.tz.split('·')[0].trim()}</div>
      </button>`;
    });
    html += '</div>';

    // Rows by week
    const weekGroups = groupDatesByWeek(DATE_OPTIONS);

    Object.entries(weekGroups).forEach(([weekKey, dates]) => {
      html += `<button type="button" class="grid-week-label" data-week="${weekKey}" title="Click to select/deselect entire week">Week of ${formatDate(dates[0])}</button>`;

      dates.forEach(d => {
        const dateKey = formatDateKey(d);

        html += '<div class="grid-row">';
        html += `<button type="button" class="grid-date-btn" data-date="${dateKey}">${formatDate(d)}</button>`;

        HOUR_BLOCKS.forEach(block => {
          const cellKey = `${dateKey}_${block.id}`;
          const isHighlighted = isLikelySlot(d, block.id);
          const highlightClass = isHighlighted ? ' grid-cell-highlighted' : '';
          html += `<div class="grid-cell${highlightClass}" data-cell="${cellKey}" title="${formatDate(d)} ${block.label} ET (${block.tz})${isHighlighted ? ' — likely coordination window' : ''}"></div>`;
        });

        html += '</div>';
      });
    });

    container.innerHTML = html;

    // Add event listeners for time column headers
    container.querySelectorAll('.grid-time-cell').forEach(btn => {
      btn.addEventListener('click', () => toggleColumn(btn.dataset.block));
    });

    // Add event listeners for week labels
    container.querySelectorAll('.grid-week-label').forEach(btn => {
      const weekDates = weekGroups[btn.dataset.week];
      btn.addEventListener('click', () => toggleWeek(weekDates));
    });

    // Add event listeners for date rows
    container.querySelectorAll('.grid-date-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleDate(btn.dataset.date));
    });

    container.querySelectorAll('.grid-cell').forEach(cell => {
      const [dateKey, blockId] = cell.dataset.cell.split('_');
      cell.addEventListener('click', () => toggleCell(dateKey, blockId));
    });
  }

  // Handle segment row highlighting
  function setupSegmentHighlighting() {
    const rows = document.querySelectorAll('.segment-row');

    rows.forEach(row => {
      const select = row.querySelector('.segment-select');

      if (select) {
        function updateRowState() {
          const hasValue = select.value !== '';
          row.classList.toggle('active', hasValue);
        }

        select.addEventListener('change', updateRowState);
      }
    });
  }

  // Handle segment star (priority) clicks - cycles 0 → 1 → 2 → 0
  function setupSegmentStars() {
    const container = document.getElementById('segmentsList');
    const priorityInput = document.getElementById('segmentPriorityOrder');
    if (!container || !priorityInput) return;

    const segmentStars = {}; // segment -> 0, 1, or 2

    function updatePriorityInput() {
      // Format: segment:count,segment:count (only non-zero)
      const entries = Object.entries(segmentStars)
        .filter(([_, count]) => count > 0)
        .map(([seg, count]) => `${seg}:${count}`);
      priorityInput.value = entries.join(',');
    }

    container.querySelectorAll('.segment-star').forEach(star => {
      const segment = star.dataset.segment;
      segmentStars[segment] = 0;

      star.addEventListener('click', () => {
        const row = star.closest('.segment-row');
        const current = segmentStars[segment] || 0;
        const next = (current + 1) % 3; // 0 → 1 → 2 → 0
        segmentStars[segment] = next;

        // Update display
        if (next === 0) {
          star.textContent = '☆';
          star.classList.remove('starred', 'starred-2');
          row.classList.remove('starred', 'starred-2');
        } else if (next === 1) {
          star.textContent = '★';
          star.classList.add('starred');
          star.classList.remove('starred-2');
          row.classList.add('starred');
          row.classList.remove('starred-2');
        } else {
          star.textContent = '★★';
          star.classList.add('starred', 'starred-2');
          row.classList.add('starred', 'starred-2');
        }

        updatePriorityInput();
      });
    });
  }

  // Handle recording preference notes visibility
  function setupRecordingNotes() {
    const radios = document.querySelectorAll('input[name="recordingPref"]');
    const notesField = document.getElementById('recordingNotesField');

    if (!notesField) return;

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        const showNotes = radio.value === 'public_except' || radio.value === 'no_recording';
        notesField.style.display = showNotes ? 'block' : 'none';
      });
    });
  }

  // Form validation
  function setupValidation() {
    const form = document.getElementById('workshopForm');
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (!form || !submitBtn) return;

    function validateForm() {
      const nameValid = nameInput.value.trim().length > 0;
      const emailValid = emailInput.value.trim().length > 0 && emailInput.validity.valid;
      submitBtn.disabled = !(nameValid && emailValid);
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);

    // Initial state
    validateForm();

    // On submit, pass name to thank you page
    form.addEventListener('submit', (e) => {
      // Store name in sessionStorage for thank you page
      sessionStorage.setItem('workshopSubmitterName', nameInput.value.trim());

      // Show submitting state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    });

    // Handle form submission errors (Netlify)
    form.addEventListener('error', () => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Availability & Preferences';
      alert('There was an error submitting the form. Please try again.');
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    setupSegmentHighlighting();
    setupSegmentStars();
    setupRecordingNotes();
    setupValidation();
  });
})();

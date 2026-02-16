// Workshop Scheduling Form - JavaScript
// Handles availability grid, form validation, and interactivity

(function() {
  'use strict';

  // Configuration
  const HOUR_BLOCKS = [
    { id: '9-11', label: '9–11 AM', tz: '2–4 PM UK · 3–5 PM CET' },
    { id: '11-13', label: '11 AM–1 PM', tz: '4–6 PM UK · 5–7 PM CET' },
    { id: '13-15', label: '1–3 PM', tz: '6–8 PM UK · 7–9 PM CET' },
    { id: '15-17', label: '3–5 PM', tz: '8–10 PM UK · 9–11 PM CET' }
  ];

  // Generate weekdays from Mar 2 to Apr 3, 2026
  function generateDates() {
    const dates = [];
    const start = new Date(2026, 2, 2); // Mar 2, 2026
    const end = new Date(2026, 3, 3);   // Apr 3, 2026

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) { // Exclude weekends
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

  // Build the availability grid
  function buildGrid() {
    const container = document.getElementById('availabilityGrid');
    if (!container) return;

    let html = '';

    // Time headers
    html += '<div class="grid-time-headers">';
    html += '<div class="grid-tz-label">US Eastern →</div>';
    HOUR_BLOCKS.forEach(block => {
      html += `<div class="grid-time-cell" title="${block.tz}">
        <div>${block.label}</div>
        <div class="tz-sub">${block.tz.split('·')[0].trim()}</div>
      </div>`;
    });
    html += '</div>';

    // Rows by week
    const weekGroups = groupDatesByWeek(DATE_OPTIONS);

    Object.entries(weekGroups).forEach(([weekKey, dates]) => {
      html += `<div class="grid-week-label">Week of ${formatDate(dates[0])}</div>`;

      dates.forEach(d => {
        const dateKey = formatDateKey(d);

        html += '<div class="grid-row">';
        html += `<button type="button" class="grid-date-btn" data-date="${dateKey}">${formatDate(d)}</button>`;

        HOUR_BLOCKS.forEach(block => {
          const cellKey = `${dateKey}_${block.id}`;
          html += `<div class="grid-cell" data-cell="${cellKey}" title="${formatDate(d)} ${block.label} ET (${block.tz})"></div>`;
        });

        html += '</div>';
      });
    });

    container.innerHTML = html;

    // Add event listeners
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

  // Handle segment drag-and-drop reordering
  function setupSegmentDragAndDrop() {
    const container = document.getElementById('segmentsList');
    const orderInput = document.getElementById('segmentPriorityOrder');
    if (!container || !orderInput) return;

    let draggedEl = null;

    function updateOrderInput() {
      const rows = container.querySelectorAll('.segment-row');
      const order = Array.from(rows).map(row => row.dataset.segment);
      orderInput.value = order.join(',');
    }

    container.querySelectorAll('.segment-row').forEach(row => {
      row.addEventListener('dragstart', (e) => {
        draggedEl = row;
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', row.dataset.segment);
      });

      row.addEventListener('dragend', () => {
        row.classList.remove('dragging');
        container.querySelectorAll('.segment-row').forEach(r => r.classList.remove('drag-over'));
        draggedEl = null;
        updateOrderInput();
      });

      row.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (draggedEl && draggedEl !== row) {
          row.classList.add('drag-over');
        }
      });

      row.addEventListener('dragleave', () => {
        row.classList.remove('drag-over');
      });

      row.addEventListener('drop', (e) => {
        e.preventDefault();
        row.classList.remove('drag-over');
        if (draggedEl && draggedEl !== row) {
          // Insert dragged element before or after current row based on position
          const allRows = Array.from(container.querySelectorAll('.segment-row'));
          const draggedIdx = allRows.indexOf(draggedEl);
          const targetIdx = allRows.indexOf(row);

          if (draggedIdx < targetIdx) {
            row.parentNode.insertBefore(draggedEl, row.nextSibling);
          } else {
            row.parentNode.insertBefore(draggedEl, row);
          }
        }
      });
    });

    // Initialize order
    updateOrderInput();
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
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    setupSegmentHighlighting();
    setupSegmentDragAndDrop();
    setupRecordingNotes();
    setupValidation();
  });
})();

import { useState, useEffect, useCallback } from "react";

const WORKSHOP_TITLE = "Wellbeing Measures: Research & Policy Discussion";
const WORKSHOP_SUBTITLE = "An Unjournal Online Workshop on WELLBY Measurement, Scale-Use Heterogeneity, and DALY–WELLBY Interconvertibility";

const SEGMENTS = [
  { id: "stakeholder", label: "Stakeholder Problem Statement", desc: "How funders currently navigate WELLBY vs DALY", time: "~15 min" },
  { id: "paper", label: "Paper Presentation: Benjamin et al.", desc: "Scale-use heterogeneity findings & implications", time: "~25 min" },
  { id: "evaluator", label: "Evaluator Responses & Discussion", desc: "Key critiques, suggestions, author reaction", time: "~25 min" },
  { id: "pq1", label: "WELLBY Reliability: Discussion", desc: "Is the linear WELLBY reliable enough for cross-intervention comparison?", time: "~25 min" },
  { id: "pq2", label: "DALY↔WELLBY Conversion: Discussion", desc: "Approaches to interconvertibility — what works, what's missing?", time: "~25 min" },
  { id: "beliefs", label: "Beliefs Elicitation", desc: "We'll guide you through a short form to state your priors on operationalized pivotal questions", time: "~15 min" },
  { id: "practitioner", label: "Practitioner Panel & Open Discussion", desc: "How should funders navigate this now? What research would change minds?", time: "~30 min" },
];

const DATE_OPTIONS = (() => {
  const dates = [];
  const start = new Date(2026, 2, 2); // Mar 2
  const end = new Date(2026, 3, 3); // Apr 3
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(d));
    }
  }
  return dates;
})();

const HOUR_BLOCKS = [
  { id: "9-11", label: "9–11 AM", tz: "2–4 PM UK · 3–5 PM CET" },
  { id: "11-13", label: "11 AM–1 PM", tz: "4–6 PM UK · 5–7 PM CET" },
  { id: "13-15", label: "1–3 PM", tz: "6–8 PM UK · 7–9 PM CET" },
  { id: "15-17", label: "3–5 PM", tz: "8–10 PM UK · 9–11 PM CET" },
];

const RECORDING_OPTIONS = [
  { id: "full_public", label: "Comfortable with full public recording, publication, and AI-queryable transcript" },
  { id: "public_except", label: "Comfortable with the above except for specific segments (specify below)" },
  { id: "internal_only", label: "Prefer recording shared only with participants (not publicly)" },
  { id: "no_recording", label: "Prefer my segments not be recorded" },
];

const formatDate = (d) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
};

const formatDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

function FormView({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [role, setRole] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [gridAvailability, setGridAvailability] = useState({}); // key: "2026-03-02_9-11"
  const [segmentJoin, setSegmentJoin] = useState({}); // interested in joining
  const [segmentPresent, setSegmentPresent] = useState({}); // interested in presenting/discussing
  const [recordingPref, setRecordingPref] = useState("");
  const [recordingNotes, setRecordingNotes] = useState("");
  const [asyncInterest, setAsyncInterest] = useState(false);
  const [freeAvailability, setFreeAvailability] = useState("");
  const [segmentSuggestions, setSegmentSuggestions] = useState("");
  const [discussionSpaceSuggestions, setDiscussionSpaceSuggestions] = useState("");
  const [presentNotes, setPresentNotes] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [otherNotes, setOtherNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleGridCell = (dateKey, blockId) => {
    const key = `${dateKey}_${blockId}`;
    setGridAvailability(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

  const toggleFullDate = (dateKey) => {
    const allBlocks = HOUR_BLOCKS.map(b => `${dateKey}_${b.id}`);
    const allSelected = allBlocks.every(k => gridAvailability[k]);
    setGridAvailability(prev => {
      const next = { ...prev };
      allBlocks.forEach(k => {
        if (allSelected) delete next[k];
        else next[k] = true;
      });
      return next;
    });
  };

  const toggleSegmentJoin = (id) => {
    setSegmentJoin(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleSegmentPresent = (id) => {
    setSegmentPresent(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setSaving(true);
    const data = {
      name: name.trim(),
      email: email.trim(),
      affiliation: affiliation.trim(),
      role,
      availableDates: Object.keys(selectedDates),
      gridAvailability: Object.keys(gridAvailability).filter(k => gridAvailability[k]),
      segmentJoin: Object.keys(segmentJoin).filter(k => segmentJoin[k]),
      segmentPresent: Object.keys(segmentPresent).filter(k => segmentPresent[k]),
      presentNotes: presentNotes.trim(),
      recordingPref,
      recordingNotes: recordingNotes.trim(),
      freeAvailability: freeAvailability.trim(),
      segmentSuggestions: segmentSuggestions.trim(),
      discussionSpaceSuggestions: discussionSpaceSuggestions.trim(),
      asyncInterest,
      suggestions: suggestions.trim(),
      otherNotes: otherNotes.trim(),
      submittedAt: new Date().toISOString(),
    };
    await onSubmit(data);
    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8f6f1", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Serif 4', 'Georgia', serif" }}>
        <div style={{ maxWidth: 560, padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: "#1a1a1a", marginBottom: 12 }}>Thank you, {name.split(" ")[0]}!</h2>
          <p style={{ fontSize: 17, color: "#555", lineHeight: 1.6 }}>
            Your availability and preferences have been recorded. We'll be in touch soon with a confirmed date and detailed agenda.
          </p>
          <p style={{ fontSize: 15, color: "#888", marginTop: 24 }}>
            In the meantime, feel free to explore the{" "}
            <a href="https://unjournal.pubpub.org/pub/evalsumheterogenity" style={{ color: "#8b5e3c" }}>evaluation package</a>{" "}
            and the{" "}
            <a href="https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH" style={{ color: "#8b5e3c" }}>Pivotal Questions</a>.
          </p>
        </div>
      </div>
    );
  }

  const weekGroups = {};
  DATE_OPTIONS.forEach(d => {
    const weekStart = new Date(d);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const key = formatDateKey(weekStart);
    if (!weekGroups[key]) weekGroups[key] = [];
    weekGroups[key].push(d);
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f1", fontFamily: "'Source Serif 4', 'Georgia', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#1a1a1a", color: "#f8f6f1", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", color: "#b8a88a", marginBottom: 16 }}>
          The Unjournal · Pivotal Questions Initiative
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 auto 12px", maxWidth: 640, lineHeight: 1.2 }}>
          {WORKSHOP_TITLE}
        </h1>
        <p style={{ fontSize: 15, color: "#aaa", maxWidth: 580, margin: "0 auto", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
          {WORKSHOP_SUBTITLE}
        </p>
        <div style={{ marginTop: 20, fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
          Target: March 2026 · Online · ~3.5 hours total. Scheduled segments — join for only the ones you're interested in
        </div>
      </div>

      {/* Context bar */}
      <div style={{ background: "#e8e2d8", padding: "16px 24px 20px", textAlign: "center", borderBottom: "1px solid #d4cec4" }}>
        <p style={{ fontSize: 14, color: "#555", maxWidth: 700, margin: "0 auto", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          Following our{" "}
          <a href="https://unjournal.pubpub.org/pub/evalsumheterogenity/" style={linkStyle} target="_blank" rel="noopener">evaluation of Benjamin et al.'s</a>{" "}
          "<em>Adjusting for Scale-Use Heterogeneity in Self-Reported Well-Being</em>," this workshop explores implications for the WELLBY measure and DALY–WELLBY interconvertibility — questions raised by Founders Pledge that affect how we compare interventions across health, mental health, and consumption.
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
          <a href="https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/pivotal-questions" style={pillLinkStyle} target="_blank" rel="noopener">
            Pivotal Questions Initiative →
          </a>
          <a href="https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH" style={pillLinkStyle} target="_blank" rel="noopener">
            Wellbeing PQ Formulations →
          </a>
          <a href="https://forum.effectivealtruism.org/posts/kftzYdmZf4nj2ExN7/the-unjournal-s-pivotal-questions-initiative" style={pillLinkStyle} target="_blank" rel="noopener">
            EA Forum Post →
          </a>
          <a href="https://unjournal.pubpub.org/pub/evalsumheterogenity/" style={pillLinkStyle} target="_blank" rel="noopener">
            Benjamin et al. Evaluation →
          </a>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Section: About You */}
        <Section number="1" title="About You">
          <div style={{ display: "grid", gap: 16 }}>
            <InputField label="Name *" value={name} onChange={setName} placeholder="Your full name" />
            <InputField label="Email *" value={email} onChange={setEmail} placeholder="your@email.com" type="email" />
            <InputField label="Affiliation" value={affiliation} onChange={setAffiliation} placeholder="e.g., University of X / Founders Pledge / Independent" optional />
            <div>
              <label style={labelStyle}>Your primary role in this conversation <span style={optionalStyle}>(optional)</span></label>
              <select value={role} onChange={e => setRole(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Select...</option>
                <option value="author">Author (Benjamin et al.)</option>
                <option value="evaluator">Unjournal Evaluator</option>
                <option value="stakeholder">Stakeholder / Funder (FP, GW, OP, HLI, etc.)</option>
                <option value="researcher">Academic Researcher</option>
                <option value="practitioner">Practitioner / Policy</option>
                <option value="uj_team">Unjournal Team</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Section: Availability */}
        <Section number="2" title="When Could You Join?" subtitle="All fields in this section are optional — use whichever is easiest. Even a rough sense of your availability helps.">

          {/* Free-text first */}
          <div style={{ padding: "20px 20px", background: "#fff", border: "2px solid #d4cec4", borderRadius: 10, marginBottom: 24 }}>
            <label style={{ ...labelStyle, fontSize: 14, color: "#333", marginBottom: 4 }}>Tell us your availability in your own words</label>
            <p style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif", margin: "0 0 10px 0" }}>
              This is the easiest option — just describe when you're free in March. We'll use AI to find the best overlap across everyone. Include your time zone if it's not obvious.
            </p>
            <textarea value={freeAvailability} onChange={e => setFreeAvailability(e.target.value)}
              placeholder='e.g., "Most weekday mornings ET work for me in March, except the week of Mar 16. I could stay for 2-3 hours if it starts before 11 AM ET." or "Available Tue/Thu afternoons UK time throughout March."'
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
          </div>

          {/* Grid — optional refinement */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <label style={{ ...labelStyle, marginBottom: 0, color: "#333" }}>Or mark your availability on the grid</label>
              <span style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>(optional)</span>
            </div>
            <p style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif", margin: "0 0 14px 0" }}>
              Click cells for any time blocks you could join — even for part of the session. Click a date label to select the whole row. All times shown in US Eastern; hover for UK/CET.
            </p>

            {/* Grid header */}
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 520 }}>
                <div style={{ display: "grid", gridTemplateColumns: "100px repeat(4, 1fr)", gap: 2, marginBottom: 2 }}>
                  <div style={{ padding: "8px 4px", fontSize: 11, fontFamily: "'DM Sans', sans-serif", color: "#999" }}>
                    US Eastern →
                  </div>
                  {HOUR_BLOCKS.map(block => (
                    <div key={block.id} title={block.tz} style={{
                      padding: "6px 4px", textAlign: "center", fontSize: 12, fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif", color: "#555", background: "#e8e2d8", borderRadius: 4,
                      cursor: "default",
                    }}>
                      <div>{block.label}</div>
                      <div style={{ fontSize: 10, fontWeight: 400, color: "#888", marginTop: 2 }}>{block.tz.split("·")[0].trim()}</div>
                    </div>
                  ))}
                </div>

                {/* Grid rows by week */}
                {Object.entries(weekGroups).map(([weekKey, dates]) => (
                  <div key={weekKey}>
                    <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Sans', sans-serif", margin: "10px 0 4px 4px", fontWeight: 500 }}>
                      Week of {formatDate(dates[0])}
                    </div>
                    {dates.map(d => {
                      const dateKey = formatDateKey(d);
                      const allSelected = HOUR_BLOCKS.every(b => gridAvailability[`${dateKey}_${b.id}`]);
                      return (
                        <div key={dateKey} style={{ display: "grid", gridTemplateColumns: "100px repeat(4, 1fr)", gap: 2, marginBottom: 2 }}>
                          <button
                            onClick={() => toggleFullDate(dateKey)}
                            style={{
                              padding: "8px 8px", textAlign: "left", fontSize: 13, border: "1px solid #ddd",
                              borderRadius: 4, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                              background: allSelected ? "#dce8dc" : "#fafaf7", color: allSelected ? "#3a5a3a" : "#555",
                              fontWeight: 500, transition: "all 0.1s",
                            }}
                          >
                            {formatDate(d)}
                          </button>
                          {HOUR_BLOCKS.map(block => {
                            const cellKey = `${dateKey}_${block.id}`;
                            const selected = gridAvailability[cellKey];
                            return (
                              <button
                                key={cellKey}
                                onClick={() => toggleGridCell(dateKey, block.id)}
                                title={`${formatDate(d)} ${block.label} ET (${block.tz})`}
                                style={{
                                  padding: 6, border: "1px solid #ddd", borderRadius: 4,
                                  background: selected ? "#5a7a5a" : "#fff",
                                  cursor: "pointer", transition: "all 0.1s",
                                  minHeight: 32,
                                }}
                              >
                                {selected && <span style={{ color: "#fff", fontSize: 14 }}>✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginTop: 8, fontStyle: "italic" }}>
              Tip: You don't need to fill in the grid if you've described your availability above — either or both is fine.
            </p>
          </div>
        </Section>

        {/* Section: Interest */}
        <Section number="3" title="Which Segments Interest You?" subtitle="All fields in this section are optional. You don't need to attend the full session — for each segment, let us know if you'd like to join and/or if you'd be interested in presenting or actively contributing.">

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: 8, marginBottom: 8, paddingRight: 4 }}>
            <div />
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#888", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>Join /<br/>Listen</div>
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#888", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>Present /<br/>Discuss</div>
          </div>

          {SEGMENTS.map(seg => (
            <div key={seg.id} style={{
              display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: 8, marginBottom: 6, alignItems: "center",
              padding: "10px 12px", background: (segmentJoin[seg.id] || segmentPresent[seg.id]) ? "#f4f8f4" : "#fff",
              border: (segmentJoin[seg.id] || segmentPresent[seg.id]) ? "1px solid #b8d4b8" : "1px solid #e8e2d8",
              borderRadius: 8, transition: "all 0.15s",
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", color: "#333" }}>{seg.label}</div>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{seg.desc} ({seg.time})</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <input type="checkbox" checked={segmentJoin[seg.id] || false} onChange={() => toggleSegmentJoin(seg.id)}
                  style={{ width: 18, height: 18, accentColor: "#5a7a5a", cursor: "pointer" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <input type="checkbox" checked={segmentPresent[seg.id] || false} onChange={() => toggleSegmentPresent(seg.id)}
                  style={{ width: 18, height: 18, accentColor: "#8b5e3c", cursor: "pointer" }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Brief notes on what you'd like to present or discuss <span style={optionalStyle}>(optional)</span></label>
            <textarea value={presentNotes} onChange={e => setPresentNotes(e.target.value)}
              placeholder="e.g., 'I could present 5 min on our experience using WELLBYs for mental health CEA' or 'I'd like to raise the question of whether ordinal measures are sufficient'"
              style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Suggest a topic or segment we should add <span style={optionalStyle}>(optional)</span></label>
            <textarea value={segmentSuggestions} onChange={e => setSegmentSuggestions(e.target.value)}
              placeholder="e.g., 'A segment on stated-preference methods for DALY↔WELLBY conversion' or 'Discussion of HLI's approach to WELLBY CEA'"
              style={{ ...inputStyle, minHeight: 64, resize: "vertical" }} />
          </div>
        </Section>

        {/* Section: Recording */}
        <Section number="4" title="Recording & Publication" subtitle="We plan to record the workshop and make it publicly available by default. We also plan to make the transcript available for AI-assisted queries (e.g., so researchers and funders can ask questions about the discussion). Your preferences:">
          <div style={{ display: "grid", gap: 8 }}>
            {RECORDING_OPTIONS.map(opt => (
              <label key={opt.id} style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px",
                background: recordingPref === opt.id ? "#e8f0e8" : "#fff",
                border: recordingPref === opt.id ? "2px solid #5a7a5a" : "1px solid #ddd",
                borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
              }}>
                <input type="radio" name="recording" checked={recordingPref === opt.id} onChange={() => setRecordingPref(opt.id)}
                  style={{ marginTop: 2, accentColor: "#5a7a5a" }} />
                <span style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#333" }}>{opt.label}</span>
              </label>
            ))}
          </div>
          {(recordingPref === "public_except" || recordingPref === "no_recording") && (
            <textarea value={recordingNotes} onChange={e => setRecordingNotes(e.target.value)}
              placeholder="Please specify which segments or any additional notes..."
              style={{ ...inputStyle, marginTop: 12, minHeight: 80, resize: "vertical" }} />
          )}
        </Section>

        {/* Section: Async & More */}
        <Section number="5" title="Async Discussion & Suggestions" subtitle="All fields in this section are optional.">
          <CheckboxCard
            checked={asyncInterest}
            onChange={() => setAsyncInterest(!asyncInterest)}
            label="I would participate in the async discussion space"
            desc="A shared document for structured comments and contributions before, during, and after the workshop"
          />
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Suggestions for the discussion space <span style={optionalStyle}>(optional)</span></label>
            <textarea value={discussionSpaceSuggestions} onChange={e => setDiscussionSpaceSuggestions(e.target.value)}
              placeholder="Questions you'd like seeded, format preferences, topics that deserve async treatment, resources to include..."
              style={{ ...inputStyle, minHeight: 64, resize: "vertical" }} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Suggestions for other invitees <span style={optionalStyle}>(optional)</span></label>
            <textarea value={suggestions} onChange={e => setSuggestions(e.target.value)}
              placeholder="Researchers, practitioners, or funders who should be part of this conversation..."
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Anything else? <span style={optionalStyle}>(optional)</span></label>
            <textarea value={otherNotes} onChange={e => setOtherNotes(e.target.value)}
              placeholder="Questions, topics you'd like covered, constraints, or other thoughts..."
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
          </div>
        </Section>

        {/* Submit */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button onClick={handleSubmit} disabled={!name.trim() || !email.trim() || saving}
            style={{
              padding: "16px 48px", background: (!name.trim() || !email.trim()) ? "#ccc" : "#1a1a1a",
              color: "#f8f6f1", border: "none", borderRadius: 8, fontSize: 16,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: (!name.trim() || !email.trim()) ? "default" : "pointer",
              transition: "all 0.2s",
            }}>
            {saving ? "Saving..." : "Submit Availability & Preferences"}
          </button>
          <p style={{ fontSize: 13, color: "#999", marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
            Your responses help us find the best date and structure for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminView({ responses, onBack }) {
  if (!responses.length) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8f6f1", fontFamily: "'DM Sans', sans-serif", padding: 40 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <button onClick={onBack} style={backBtnStyle}>← Back to form</button>
        <h2 style={{ textAlign: "center", marginTop: 60, color: "#888" }}>No responses yet</h2>
      </div>
    );
  }

  // Grid cell frequency analysis (date + time block combos)
  const cellCounts = {};
  const dateCounts = {};
  responses.forEach(r => {
    const seenDates = new Set();
    (r.gridAvailability || []).forEach(cell => {
      cellCounts[cell] = (cellCounts[cell] || 0) + 1;
      const date = cell.split("_")[0];
      seenDates.add(date);
    });
    seenDates.forEach(d => { dateCounts[d] = (dateCounts[d] || 0) + 1; });
  });
  const sortedDates = Object.entries(dateCounts).sort((a, b) => b[1] - a[1]);

  // Best date+block combos
  const sortedCells = Object.entries(cellCounts).sort((a, b) => b[1] - a[1]);

  // Block totals across all dates
  const blockTotals = {};
  HOUR_BLOCKS.forEach(b => { blockTotals[b.id] = 0; });
  Object.entries(cellCounts).forEach(([cell, count]) => {
    const block = cell.split("_")[1];
    if (blockTotals[block] !== undefined) blockTotals[block] += count;
  });

  // Free-text responses
  const freeTexts = responses.filter(r => r.freeAvailability).map(r => ({ name: r.name, text: r.freeAvailability }));

  // Segment interest (dual: join vs present)
  const segJoinCounts = {};
  const segPresentCounts = {};
  responses.forEach(r => {
    (r.segmentJoin || []).forEach(s => { segJoinCounts[s] = (segJoinCounts[s] || 0) + 1; });
    (r.segmentPresent || []).forEach(s => { segPresentCounts[s] = (segPresentCounts[s] || 0) + 1; });
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f1", fontFamily: "'DM Sans', sans-serif", padding: "24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <button onClick={onBack} style={backBtnStyle}>← Back to form</button>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: "24px 0 8px" }}>Workshop Responses Dashboard</h1>
        <p style={{ color: "#666", marginBottom: 32 }}>{responses.length} response{responses.length !== 1 ? "s" : ""} received</p>

        {/* Best date+time combos */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Best Date + Time Blocks (from grid responses)</h3>
          {sortedCells.slice(0, 10).map(([cell, count]) => {
            const [date, block] = cell.split("_");
            const d = new Date(date + "T12:00:00");
            const blockLabel = HOUR_BLOCKS.find(b => b.id === block)?.label || block;
            const pct = Math.round((count / responses.length) * 100);
            return (
              <div key={cell} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ width: 180, fontSize: 13, fontWeight: 500 }}>{formatDate(d)} · {blockLabel} ET</span>
                <div style={{ flex: 1, height: 22, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#5a7a5a", borderRadius: 4, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: 13, color: "#666", width: 70, textAlign: "right" }}>{count}/{responses.length} ({pct}%)</span>
              </div>
            );
          })}
          {sortedCells.length === 0 && <p style={{ color: "#999", fontSize: 14 }}>No grid selections yet — check free-text responses below.</p>}
        </div>

        {/* Best dates overall */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Best Dates (any time block)</h3>
          {sortedDates.slice(0, 8).map(([date, count]) => {
            const d = new Date(date + "T12:00:00");
            const pct = Math.round((count / responses.length) * 100);
            return (
              <div key={date} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ width: 110, fontSize: 14, fontWeight: 500 }}>{formatDate(d)}</span>
                <div style={{ flex: 1, height: 24, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#5a7a5a", borderRadius: 4, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: 13, color: "#666", width: 70, textAlign: "right" }}>{count}/{responses.length} ({pct}%)</span>
              </div>
            );
          })}
        </div>

        {/* Time block totals */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Time Block Popularity (aggregated across all dates)</h3>
          {HOUR_BLOCKS.map(block => {
            const count = blockTotals[block.id] || 0;
            const maxPossible = responses.length * DATE_OPTIONS.length;
            const pct = maxPossible > 0 ? Math.round((count / maxPossible) * 100) : 0;
            return (
              <div key={block.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ width: 140, fontSize: 13 }}>{block.label} ET</span>
                <div style={{ flex: 1, height: 20, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(pct * 3, 100)}%`, height: "100%", background: "#7a6a5a", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 13, color: "#666", width: 80, textAlign: "right" }}>{count} selections</span>
              </div>
            );
          })}
        </div>

        {/* Free-text availability */}
        {freeTexts.length > 0 && (
          <div style={cardStyle}>
            <h3 style={cardTitle}>Free-Text Availability (needs AI resolution)</h3>
            {freeTexts.map((ft, i) => (
              <div key={i} style={{ padding: "10px 14px", background: "#fafaf7", borderRadius: 6, marginBottom: 8, border: "1px solid #e8e2d8" }}>
                <strong style={{ fontSize: 13 }}>{ft.name}:</strong>
                <span style={{ fontSize: 13, color: "#555", marginLeft: 8 }}>{ft.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Segment interest */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Segment Interest</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 4, marginBottom: 8 }}>
            <div />
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#888" }}>Join</div>
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#888" }}>Present</div>
          </div>
          {SEGMENTS.map(seg => (
            <div key={seg.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 4, padding: "6px 0", borderBottom: "1px solid #eee" }}>
              <span style={{ fontSize: 14 }}>{seg.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#5a7a5a", textAlign: "center" }}>{segJoinCounts[seg.id] || 0}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#8b5e3c", textAlign: "center" }}>{segPresentCounts[seg.id] || 0}</span>
            </div>
          ))}
        </div>

        {/* Individual responses */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Individual Responses</h3>
          {responses.map((r, i) => (
            <div key={i} style={{ padding: 16, background: "#fafaf7", borderRadius: 8, marginBottom: 12, border: "1px solid #e8e2d8" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong style={{ fontSize: 15 }}>{r.name}</strong>
                <span style={{ fontSize: 12, color: "#888", background: "#e8e2d8", padding: "2px 8px", borderRadius: 4 }}>{r.role || "—"}</span>
              </div>
              <div style={{ fontSize: 13, color: "#666" }}>
                <div><strong>Email:</strong> {r.email}</div>
                {r.affiliation && <div><strong>Affiliation:</strong> {r.affiliation}</div>}
                <div><strong>Available dates:</strong> {(r.gridAvailability || []).length ? [...new Set((r.gridAvailability || []).map(c => c.split("_")[0]))].sort().join(", ") : "None selected"}</div>
                <div><strong>Grid cells:</strong> {(r.gridAvailability || []).length} blocks selected</div>
                <div><strong>Segments (join):</strong> {(r.segmentJoin || []).join(", ") || "None specified"}</div>
                <div><strong>Segments (present/discuss):</strong> {(r.segmentPresent || []).join(", ") || "None"}</div>
                {r.presentNotes && <div style={{ marginTop: 4 }}><strong>Present/discuss notes:</strong> {r.presentNotes}</div>}
                <div><strong>Recording:</strong> {r.recordingPref || "—"} {r.recordingNotes ? `(${r.recordingNotes})` : ""}</div>
                {r.freeAvailability && <div style={{ marginTop: 4 }}><strong>Availability (free text):</strong> {r.freeAvailability}</div>}
                <div><strong>Async interest:</strong> {r.asyncInterest ? "Yes" : "No"}</div>
                {r.discussionSpaceSuggestions && <div style={{ marginTop: 4 }}><strong>Discussion space suggestions:</strong> {r.discussionSpaceSuggestions}</div>}
                {r.segmentSuggestions && <div style={{ marginTop: 4 }}><strong>Segment suggestions:</strong> {r.segmentSuggestions}</div>}
                {r.suggestions && <div style={{ marginTop: 4 }}><strong>Suggested invitees:</strong> {r.suggestions}</div>}
                {r.otherNotes && <div style={{ marginTop: 4 }}><strong>Other notes:</strong> {r.otherNotes}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Export */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button onClick={() => {
            const blob = new Blob([JSON.stringify(responses, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "workshop-responses.json"; a.click();
          }} style={{ ...backBtnStyle, background: "#1a1a1a", color: "#fff" }}>
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, subtitle, children }) {
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: subtitle ? 4 : 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#b8a88a", fontFamily: "'DM Sans', sans-serif" }}>{number}</span>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontSize: 14, color: "#777", marginBottom: 16, fontFamily: "'DM Sans', sans-serif", paddingLeft: 26 }}>{subtitle}</p>}
      <div style={{ paddingLeft: 0 }}>{children}</div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", optional }) {
  return (
    <div>
      <label style={labelStyle}>{label} {optional && <span style={optionalStyle}>(optional)</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} style={inputStyle} />
    </div>
  );
}

function CheckboxCard({ checked, onChange, label, desc }) {
  return (
    <label style={{
      display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px",
      background: checked ? "#e8f0e8" : "#fff",
      border: checked ? "2px solid #5a7a5a" : "1px solid #ddd",
      borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
    }}>
      <input type="checkbox" checked={checked || false} onChange={onChange}
        style={{ marginTop: 3, accentColor: "#5a7a5a" }} />
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", color: "#333" }}>{label}</div>
        {desc && <div style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{desc}</div>}
      </div>
    </label>
  );
}

const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" };
const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: "#fff", boxSizing: "border-box", outline: "none" };
const cardStyle = { background: "#fff", border: "1px solid #e0dbd3", borderRadius: 12, padding: 24, marginBottom: 20 };
const cardTitle = { fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginTop: 0, marginBottom: 16 };
const backBtnStyle = { padding: "8px 16px", border: "1px solid #ccc", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" };
const linkStyle = { color: "#8b5e3c", textDecoration: "underline", textUnderlineOffset: 2 };
const pillLinkStyle = { fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#8b5e3c", textDecoration: "none", padding: "6px 14px", border: "1px solid #c4b8a8", borderRadius: 20, background: "rgba(255,255,255,0.5)", transition: "all 0.15s", whiteSpace: "nowrap" };
const optionalStyle = { fontWeight: 400, color: "#aaa", fontSize: 12 };

export default function App() {
  const [view, setView] = useState("form");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("workshop-responses");
        if (result && result.value) {
          setResponses(JSON.parse(result.value));
        }
      } catch (e) {
        // No responses yet
      }
      setLoading(false);
    })();
  }, []);

  const handleSubmit = useCallback(async (data) => {
    const updated = [...responses, data];
    setResponses(updated);
    try {
      await window.storage.set("workshop-responses", JSON.stringify(updated));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [responses]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f6f1" }}>
        <div style={{ color: "#888" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin toggle - subtle, top right */}
      <div style={{ position: "fixed", top: 12, right: 12, zIndex: 999 }}>
        <button onClick={() => setView(v => v === "form" ? "admin" : "form")}
          style={{ padding: "6px 12px", background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 4, fontSize: 11, cursor: "pointer", color: "#999", fontFamily: "'DM Sans', sans-serif" }}>
          {view === "form" ? `Admin (${responses.length})` : "Form View"}
        </button>
      </div>

      {view === "form" ? (
        <FormView onSubmit={handleSubmit} />
      ) : (
        <AdminView responses={responses} onBack={() => setView("form")} />
      )}
    </div>
  );
}

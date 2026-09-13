#!/usr/bin/env python3
"""
Generate team.html from Coda team data CSV.

This script reads team data from the Coda export and generates a formatted
team.html landing page with all team members, their roles, affiliations, and links.

Usage:
    python3 generate_team_html.py [--output team.html]

Data source:
    ~/githubs/coda_org_unjournal/coda_content/hub_internal/tables/our_team_-_table_view.csv
"""

import csv
import json
import re
import argparse
from pathlib import Path
from datetime import datetime
from collections import defaultdict

# Paths
SCRIPT_DIR = Path(__file__).parent
CODA_REPO = Path.home() / "githubs" / "coda_org_unjournal"
TEAM_CSV = CODA_REPO / "coda_content" / "hub_internal" / "tables" / "our_team_-_table_view.csv"
DEFAULT_OUTPUT = SCRIPT_DIR / "team.html"


# Spelling fixes for names that are wrong in Coda. Fix the Coda row when you
# can; this keeps the public page right in the meantime.
NAME_CORRECTIONS = {
    'Shobit Kulshreshtha': 'Shobhit Kulshreshtha',
}

# Affiliations that are out of date in Coda. Fix the Coda row when you can;
# this keeps the public page right in the meantime.
ORG_CORRECTIONS = {
    'Bob Kubinec': 'Texas A&M University',
}


def _management_rank(member):
    """Directors first (founding, then co-), then the rest, then former roles."""
    role = member.get('role', '')
    if role == 'Founding Director':
        return 0
    if role == 'Co-Director':
        return 1
    if 'Former' in role:
        return 3
    return 2

# People listed on the live page who have no row in the Coda team table, so
# the generator cannot see them. Without this bridge, regenerating would
# quietly delete them. Each entry is a question to resolve, not a permanent
# home — once the Coda row exists, delete the entry here.
#
#   Eliana Hadjiandreou — has an Onboarding row tagged Field Specialist but was
#     never welcomed, i.e. she was published before onboarding finished.
#   Masyhur Hilmy — only in Researchers & Evaluators, flagged
#     "Nonresponse/unavailable" since 2024-04. Still listed publicly; confirm
#     whether he is still a field specialist.
MANUAL_MEMBERS = [
    {'name': 'Eliana Hadjiandreou', 'url': None,
     'organization': 'Computational Affective and Social Cognition',
     'category': 'Psychology, Behavioral Science, Attitudes',
     'status': 'Field Specialist'},
    {'name': 'Masyhur Hilmy', 'url': 'https://sites.google.com/view/masyhurhilmy',
     'organization': 'Boston University',
     'category': 'Development Economics', 'status': 'Field Specialist'},
]


PHOTOS_PATH = Path(__file__).parent / 'team_photos.json'


def load_photos():
    """name -> Squarespace CDN photo URL.

    Photos are not in Coda; they were curated by hand on unjournal.org and
    were the main reason regenerating this page used to be destructive. They
    now live in team_photos.json so the generator can reproduce them. To add
    one, put the CDN URL in that file under the person's name.
    """
    if not PHOTOS_PATH.is_file():
        return {}
    with open(PHOTOS_PATH, encoding='utf-8') as f:
        return json.load(f)


def lookup_photo(photos, name):
    if name in photos:
        return photos[name]
    key = _dedupe_key(name)
    for pname, url in photos.items():
        if _dedupe_key(pname) == key:
            return url
    return None


def initials(name):
    parts = [p for p in re.split(r"[\s'-]+", name) if p and p[0].isalpha()]
    return ''.join(p[0].upper() for p in parts[:2]) or '?'


def _dedupe_key(name):
    """Match duplicate Coda rows for one person.

    Uses first + last token so a middle name doesn't create a second entry
    ("Elizabeth Kasujja" vs "Elizabeth Mumbejja Kasujja").
    """
    # Normalise curly apostrophes first: Coda holds both "O'Diana" and
    # "O’Diana" for the same person, under one email.
    name = name.replace('’', "'").replace('ʼ', "'")
    parts = re.sub(r"[^\w\s'-]", '', name.casefold()).split()
    if len(parts) >= 2:
        return (parts[0], parts[-1])
    return (name.casefold(),)


def parse_team_csv(csv_path):
    """Parse team CSV and return categorized team members."""
    management = []
    advisory = []
    field_specialists = defaultdict(list)  # By category

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        seen_names = {}          # normalised name -> member dict already kept
        for row in reader:
            name = row.get('Name', '').strip()
            if not name or name.startswith('#') or '@' in name:  # Skip blanks, IDs, and email-only entries
                continue
            if name.casefold() == 'deleted row':
                continue         # Coda's stub for a removed linked row
            name = NAME_CORRECTIONS.get(name, name)

            status = row.get('Status', '')
            url = row.get('URL', '').strip()
            # Organization is a Coda lookup; people added through the plain
            # Affiliation text column have it empty (see
            # coda_org_unjournal/code/add_onboarded_to_team.py).
            org = (row.get('Organization', '') or row.get('Affiliation', '')).strip()
            org = ORG_CORRECTIONS.get(name, org)
            engagement = row.get('Engagement', '').strip()
            monitoring_cat = row.get("monitoring 'outcome' category (main)", '').strip()

            # "Temporarily unavailable" people are still team members and have
            # always been listed on the live page; dropping them here was the
            # single biggest reason this generator's output diverged from
            # team.html (it silently removed 7 field specialists).
            del engagement

            # Normalize URL - add https:// if it starts with www.
            if url and url.startswith('www.'):
                url = 'https://' + url

            member = {
                'name': name,
                'url': url if url and url.startswith('http') else None,
                'organization': org,
                'category': monitoring_cat
            }

            # Coda holds duplicate rows for some people (e.g. "Elizabeth
            # Kasujja" / "Elizabeth Mumbejja Kasujja", both kasujjaelizabeth@).
            # Keep the richer row rather than emitting the person twice.
            key = _dedupe_key(name)
            if key in seen_names:
                kept = seen_names[key]
                for field in ('url', 'organization', 'category'):
                    if not kept.get(field) and member.get(field):
                        kept[field] = member[field]
                if len(name) > len(kept['name']):
                    kept['name'] = name
                continue
            seen_names[key] = member

            # Categorize by status
            if 'Management' in status:
                # Determine role
                if 'Founding Director' in name or name == 'David Reinstein':
                    member['role'] = 'Founding Director'
                elif 'Co-Director' in status or name == 'Bob Kubinec':
                    member['role'] = 'Co-Director'
                elif 'Former' in status or 'former' in status.lower():
                    member['role'] = 'Former Co-Director'
                else:
                    member['role'] = 'Management Team'
                management.append(member)
            elif 'Advisory Board' in status:
                advisory.append(member)
            elif 'Field Specialist' in status:
                # Categorize by monitoring category
                cat = categorize_field_specialist(monitoring_cat)
                field_specialists[cat].append(member)

    # Bridge in people the Coda table doesn't know about yet (see above)
    for extra in MANUAL_MEMBERS:
        if _dedupe_key(extra['name']) in seen_names:
            continue
        member = {k: v for k, v in extra.items() if k != 'status'}
        if 'Field Specialist' in extra['status']:
            field_specialists[categorize_field_specialist(extra['category'])].append(member)
        elif 'Advisory Board' in extra['status']:
            advisory.append(member)
        elif 'Management' in extra['status']:
            management.append(member)

    # Sort by name within each category
    management.sort(key=lambda x: (_management_rank(x), x['name']))
    advisory.sort(key=lambda x: x['name'])
    for cat in field_specialists:
        field_specialists[cat].sort(key=lambda x: x['name'])

    return management, advisory, dict(field_specialists)


def categorize_field_specialist(monitoring_cat):
    """Map monitoring category to display category."""
    cat_lower = monitoring_cat.lower() if monitoring_cat else ''

    if 'animal welfare' in cat_lower:
        return 'Animal Welfare'
    elif 'catastrophic' in cat_lower or 'existential' in cat_lower or 'forecasting' in cat_lower:
        return 'Catastrophic & Existential Risk'
    elif 'development' in cat_lower or 'lmic' in cat_lower:
        return 'Development Economics & Global Health'
    elif 'environment' in cat_lower or 'climate' in cat_lower:
        return 'Environmental Economics & Climate'
    elif 'innovation' in cat_lower or 'meta-science' in cat_lower:
        return 'Innovation & Meta-Science'
    elif 'health' in cat_lower and 'well-being' in cat_lower:
        return 'Health & Well-being'
    elif 'attitude' in cat_lower or 'behavior' in cat_lower:
        return 'Behavioral Science & Psychology'
    elif 'economics' in cat_lower or 'welfare' in cat_lower or 'growth' in cat_lower:
        return 'Economics, Welfare & Governance'
    elif 'tech' in cat_lower or 'ai' in cat_lower or 'emerging' in cat_lower:
        return 'AI Governance & Technology Policy'
    else:
        return 'Other Research Areas'


def generate_html(management, advisory, field_specialists):
    """Generate the complete HTML page."""

    # Generate management section
    management_html = generate_team_grid(management, show_role=True)

    # Generate advisory section
    advisory_html = generate_team_grid(advisory, show_role=False)

    # Generate field specialists section
    specialists_html = generate_specialists_section(field_specialists)

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
  new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  }})(window,document,'script','dataLayer','GTM-P9XSTK8T');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Team — The Unjournal</title>
  <meta name="description" content="Meet The Unjournal's management team, advisory board, and field specialists advancing open evaluation of impactful research.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap">
  <meta property="og:title" content="Our Team — The Unjournal">
  <meta property="og:description" content="Meet the people behind The Unjournal's mission to advance open science.">
  <meta property="og:type" content="website">
  <style>
    :root {{
      --primary: #1a3a5c;
      --accent: #2e86c1;
      --light-bg: #f7f9fb;
      --text: #2c3e50;
      --text-light: #5d6d7e;
      --border: #d5dbdb;
      --white: #ffffff;
      --max-width: 1000px;
    }}

    * {{ margin: 0; padding: 0; box-sizing: border-box; }}

    body {{
      font-family: Georgia, 'Times New Roman', serif;
      color: var(--text);
      line-height: 1.7;
      font-size: 17px;
    }}

    header {{
      background: linear-gradient(135deg, var(--primary) 0%, #1a4a6c 100%);
      color: var(--white);
      padding: 3rem 1.5rem 2.5rem;
      text-align: center;
    }}

    header .org-label {{
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.8;
      margin-bottom: 0.75rem;
    }}

    header .org-label a {{ color: inherit; text-decoration: none; }}

    header h1 {{
      font-family: 'Libre Baskerville', Georgia, serif;
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }}

    header p.subtitle {{
      font-size: 1.15rem;
      opacity: 0.9;
      max-width: 680px;
      margin: 0 auto;
    }}

    nav {{
      background: var(--white);
      border-bottom: 1px solid var(--border);
      padding: 0.75rem 1.5rem;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 10;
    }}

    nav a {{
      color: var(--accent);
      text-decoration: none;
      margin: 0 0.7rem;
      font-size: 0.92rem;
      font-weight: 500;
    }}

    nav a:hover {{ text-decoration: underline; }}

    main {{
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }}

    section {{ margin-bottom: 3rem; }}

    h2 {{
      font-family: 'Libre Baskerville', Georgia, serif;
      font-size: 1.5rem;
      color: var(--primary);
      margin-bottom: 1rem;
      padding-bottom: 0.3rem;
      border-bottom: 2px solid var(--accent);
      display: inline-block;
    }}

    h3 {{
      font-size: 1.15rem;
      color: var(--primary);
      margin-bottom: 0.75rem;
      margin-top: 1.5rem;
    }}

    p {{ margin-bottom: 1rem; }}

    a {{ color: var(--accent); }}
    a:hover {{ text-decoration: underline; }}

    /* Team grid */
    .team-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
      margin: 1.5rem 0;
    }}

    .team-member {{
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      transition: box-shadow 0.2s, border-color 0.2s;
    }}

    .team-member:hover {{
      box-shadow: 0 3px 12px rgba(0,0,0,0.07);
      border-color: var(--accent);
    }}

    .team-member .name {{
      font-weight: 700;
      color: var(--primary);
      font-size: 1.05rem;
      margin-bottom: 0.25rem;
    }}

    .team-member .name a {{
      color: inherit;
      text-decoration: none;
    }}

    .team-member .name a:hover {{
      color: var(--accent);
    }}

    .team-member .role {{
      color: var(--accent);
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.35rem;
    }}

    .team-member .affiliation {{
      color: var(--text-light);
      font-size: 0.88rem;
      font-style: italic;
    }}

    /* Specialist cards - more compact */
    .specialist-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 0.75rem;
      margin: 1rem 0;
    }}

    .specialist {{
      padding: 0.6rem 0.9rem;
      background: var(--light-bg);
      border-radius: 5px;
      font-size: 0.92rem;
    }}

    .specialist .name {{
      font-weight: 600;
      color: var(--text);
    }}

    .specialist .name a {{
      color: inherit;
      text-decoration: none;
    }}

    .specialist .name a:hover {{
      color: var(--accent);
    }}

    .specialist .affiliation {{
      color: var(--text-light);
      font-size: 0.85rem;
    }}

    /* Category sections */
    .category-section {{
      background: var(--light-bg);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }}

    .category-section h3 {{
      margin-top: 0;
      font-size: 1rem;
      color: var(--accent);
    }}

    /* CTA section */
    .cta-section {{
      text-align: center;
      padding: 2rem 1.5rem;
      background: var(--primary);
      color: var(--white);
      border-radius: 8px;
      margin: 2rem 0;
    }}

    .cta-section h2 {{
      color: var(--white);
      border-bottom-color: #85c1e9;
      margin-bottom: 0.75rem;
    }}

    .cta-section p {{
      opacity: 0.9;
      max-width: 560px;
      margin: 0 auto 1.25rem;
    }}

    .cta-button {{
      display: inline-block;
      background: var(--accent);
      color: var(--white);
      padding: 0.75rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.05rem;
      margin: 0.35rem;
      transition: background 0.2s;
    }}

    .cta-button:hover {{ background: #1a6ea0; color: var(--white); text-decoration: none; }}

    footer {{
      background: var(--primary);
      color: var(--white);
      text-align: center;
      padding: 1.5rem;
      font-size: 0.9rem;
    }}

    footer a {{ color: #85c1e9; }}

    @media (max-width: 700px) {{
      header h1 {{ font-size: 1.6rem; }}
      header p.subtitle {{ font-size: 1rem; }}
      nav a {{ margin: 0 0.4rem; font-size: 0.82rem; }}
      .team-grid {{ grid-template-columns: 1fr; }}
      .specialist-grid {{ grid-template-columns: 1fr; }}
    }}


    /* Natural info-page polish: quieter than the older ad-page treatment. */
        :root {{
          --accent: #2e6f85;
          --warm: #8b5e3c;
          --paper: #fbfaf7;
          --highlight: #2e6f85;
        }}

        body {{
          background: var(--paper, #fbfaf7);
        }}

        header {{
          background: #f1eee7 !important;
          color: var(--text, #2c3e50) !important;
          border-bottom: 1px solid #ded8cd;
          box-shadow: none !important;
        }}

        header::before,
        header::after,
        .cta-section::before,
        .cta-section::after {{
          display: none !important;
        }}

        header a {{
          color: var(--accent, #2e6f85) !important;
        }}

        header .cta-button.donate {{
          color: var(--white, #fff) !important;
        }}

        header .secondary,
        header .cta-button.secondary,
        header .btn.secondary,
        header .button.secondary,
        header .cta-button.hero-outline {{
          color: var(--primary, #1a3a5c) !important;
          border-color: #cfc7b8 !important;
          background: rgba(255,255,255,0.35) !important;
        }}

        header h1 {{
          color: var(--primary, #1a3a5c) !important;
        }}

        header p,
        header p.subtitle,
        header .org-label {{
          color: var(--text, #2c3e50) !important;
          opacity: 1 !important;
        }}

        header .org-label {{
          color: var(--text-light, #5d6d7e) !important;
        }}

        main {{
          background: var(--white, #fff);
        }}

        nav {{
          box-shadow: none !important;
        }}

        nav a,
        a {{
          color: var(--accent, #2e6f85);
        }}

        h2,
        .section-header h2 {{
          border-bottom-color: var(--accent, #2e6f85) !important;
        }}

        .highlight-box,
        .source-link {{
          border-left-color: var(--accent, #2e6f85) !important;
          background: var(--light-bg, #f7f9fb) !important;
        }}

        .benefit-card,
        .what-card,
        .contact-card,
        .news-item,
        .role-card,
        .output-card,
        .eval-card,
        .faq-item,
        .card {{
          border-radius: 6px !important;
          box-shadow: none !important;
        }}

        .benefit-card:hover,
        .what-card:hover,
        .contact-card:hover,
        .news-item:hover,
        .role-card:hover,
        .output-card:hover,
        .eval-card:hover,
        .card:hover {{
          box-shadow: 0 3px 12px rgba(0,0,0,0.06) !important;
          border-color: var(--accent, #2e6f85) !important;
          transform: none !important;
        }}

        .cta-section,
        .site-nav-section {{
          background: var(--primary, #1a3a5c) !important;
          color: var(--white, #fff) !important;
          border-radius: 6px !important;
          box-shadow: none !important;
        }}

        .cta-section h2,
        .site-nav-section h2 {{
          color: var(--white, #fff) !important;
          border-bottom-color: rgba(255,255,255,0.4) !important;
        }}

        .cta-button,
        .follow-links a,
        .action-link {{
          border-radius: 5px !important;
        }}

        footer {{
          background: var(--primary, #1a3a5c) !important;
        }}

    </style>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9XSTK8T"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<header>
  <a href="https://unjournal.org"><img src="/unjournal-logo.jpg" alt="The Unjournal" style="height: 56px; margin-bottom: 0.5rem;"></a>
  <div class="org-label"><a href="https://unjournal.org">The Unjournal</a></div>
  <h1>Our Team</h1>
  <p class="subtitle">The researchers, advisors, and field specialists advancing open evaluation of impactful research.</p>
</header>

<nav>
  <a href="#management">Management</a>
  <a href="#advisory">Advisory Board</a>
  <a href="#specialists">Field Specialists</a>
  <a href="#join">Join Us</a>
  <a href="index.html#explore" style="border-left: 1px solid #d5dbdb; padding-left: 0.9rem; margin-left: 0.2rem;">All Pages</a>
</nav>

<main>

  <section id="management">
    <h2>Management Team</h2>
    <p>The core team coordinating The Unjournal's operations, research prioritization, and evaluator network.</p>
{management_html}
  </section>

  <section id="advisory">
    <h2>Advisory Board</h2>
    <p>Distinguished researchers providing strategic guidance on evaluation standards, research priorities, and organizational direction.</p>
{advisory_html}
  </section>

  <section id="specialists">
    <h2>Field Specialists &amp; Research Affiliates</h2>
    <p>Over 50 researchers across multiple domains help us identify, prioritize, and evaluate impactful research.</p>
{specialists_html}
  </section>

  <div class="cta-section" id="join">
    <h2>Join Our Team</h2>
    <p>We're always looking for researchers who share our commitment to rigorous, open evaluation of impactful research.</p>
    <a href="https://coda.io/form/Join-the-Unjournal_dc3NLlpa-eq" class="cta-button">Become an Evaluator</a>
    <a href="mailto:contact@unjournal.org" class="cta-button" style="background: transparent; border: 2px solid #85c1e9;">Get in Touch</a>
  </div>

</main>

<footer>
  <p>&copy; {datetime.now().year} The Unjournal &nbsp;|&nbsp; <a href="https://unjournal.org">unjournal.org</a> &nbsp;|&nbsp; <a href="https://bsky.app/profile/unjournal.bsky.social">Bluesky</a> &nbsp;|&nbsp; <a href="mailto:contact@unjournal.org">contact@unjournal.org</a></p>
  <p style="font-size: 0.78rem; opacity: 0.6; margin-top: 0.75rem;">See also our <a href="org-chart.html">public organizational chart</a>. Last updated: {datetime.now().strftime('%Y-%m-%d')}.</p>
</footer>

</body>
</html>
'''
    return html


def generate_team_grid(members, show_role=False):
    """Generate HTML for team member grid."""
    if not members:
        return '<p><em>No team members listed.</em></p>'

    photos = load_photos()
    html = '\n    <div class="team-grid">'
    for m in members:
        name_html = f'<a href="{m["url"]}" target="_blank">{m["name"]}</a>' if m.get('url') else m['name']
        role = m.get('role', '')
        role_cls = ' director' if 'Director' in role else ''
        role_html = f'\n          <div class="role{role_cls}">{role}</div>' if show_role and role else ''
        org_html = f'\n          <div class="affiliation">{m["organization"]}</div>' if m.get('organization') else ''

        # Photos are curated (Squarespace CDN), not in Coda — see
        # team_photos.json. Anyone without one gets the initials placeholder,
        # matching what the page has always shown.
        url = lookup_photo(photos, m['name'])
        if url:
            photo_html = f'<div class="photo"><img src="{url}" alt="{m["name"]}"></div>'
        else:
            photo_html = f'<div class="photo"><span class="initials">{initials(m["name"])}</span></div>'

        html += f'''
      <div class="team-member">
        {photo_html}
        <div class="info">
          <div class="name">{name_html}</div>{role_html}{org_html}
        </div>
      </div>'''

    html += '\n    </div>'
    return html


def generate_specialists_section(field_specialists):
    """Generate HTML for field specialists organized by category."""
    if not field_specialists:
        return '<p><em>No field specialists listed.</em></p>'

    # Order categories
    category_order = [
        'Development Economics & Global Health',
        'Environmental Economics & Climate',
        'Behavioral Science & Psychology',
        'AI Governance & Technology Policy',
        'Animal Welfare',
        'Catastrophic & Existential Risk',
        'Innovation & Meta-Science',
        'Health & Well-being',
        'Economics, Welfare & Governance',
        'Other Research Areas'
    ]

    html = ''
    for cat in category_order:
        if cat not in field_specialists or not field_specialists[cat]:
            continue

        members = field_specialists[cat]
        html += f'''
    <div class="category-section">
      <h3>{cat}</h3>
      <div class="specialist-grid">'''

        for m in members:
            name_html = f'<a href="{m["url"]}" target="_blank">{m["name"]}</a>' if m.get('url') else m['name']
            org_html = f' <span class="affiliation">({m["organization"]})</span>' if m.get('organization') else ''

            html += f'''
        <div class="specialist">
          <span class="name">{name_html}</span>{org_html}
        </div>'''

        html += '''
      </div>
    </div>'''

    return html


def main():
    parser = argparse.ArgumentParser(description='Generate team.html from Coda data')
    parser.add_argument('--output', '-o', type=Path, default=DEFAULT_OUTPUT,
                       help='Output HTML file path')
    parser.add_argument('--csv', type=Path, default=TEAM_CSV,
                       help='Path to team CSV file')
    args = parser.parse_args()

    if not args.csv.exists():
        print(f"Error: Team CSV not found at {args.csv}")
        print("Run the Coda content pull first:")
        print("  cd ~/githubs/coda_org_unjournal && python3 code/pull_content.py")
        return 1

    print(f"Reading team data from {args.csv}")
    management, advisory, field_specialists = parse_team_csv(args.csv)

    print(f"  Management: {len(management)} members")
    print(f"  Advisory: {len(advisory)} members")
    total_specialists = sum(len(v) for v in field_specialists.values())
    print(f"  Field Specialists: {total_specialists} members across {len(field_specialists)} categories")

    html = generate_html(management, advisory, field_specialists)

    args.output.write_text(html, encoding='utf-8')
    print(f"Generated {args.output}")

    return 0


if __name__ == '__main__':
    exit(main())

#!/usr/bin/env python3
"""
Fetch news from unjournal.org RSS feed and update the follow page.
Run periodically (e.g., daily cron) to keep news items current.

Usage:
    python3 update-news.py [path-to-follow.html]

Default path: /var/www/info.unjournal.org/follow/index.html
"""

import sys
import re
import xml.etree.ElementTree as ET
from urllib.request import urlopen
from html import escape
from datetime import datetime

RSS_URL = "https://www.unjournal.org/news?format=rss"
DEFAULT_HTML_PATH = "/var/www/info.unjournal.org/follow/index.html"
MAX_ITEMS = 5
MAX_EXCERPT_LEN = 140


def fetch_rss(url):
    with urlopen(url) as response:
        return response.read()


def strip_html(text):
    """Remove HTML tags and get plain text."""
    clean = re.sub(r'<[^>]+>', '', text)
    clean = re.sub(r'\s+', ' ', clean).strip()
    # Decode common HTML entities
    clean = clean.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    clean = clean.replace('&#8217;', "'").replace('&#8220;', '"').replace('&#8221;', '"')
    clean = clean.replace('&nbsp;', ' ').replace('&#160;', ' ')
    return clean


def truncate(text, max_len):
    if len(text) <= max_len:
        return text
    return text[:max_len].rsplit(' ', 1)[0] + '...'


def format_date(date_str):
    """Parse RSS date and format as 'd Mon YYYY'."""
    try:
        dt = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %z")
        return dt.strftime("%-d %b %Y")
    except (ValueError, TypeError):
        try:
            dt = datetime.strptime(date_str[:25], "%a, %d %b %Y %H:%M:%S")
            return dt.strftime("%-d %b %Y")
        except (ValueError, TypeError):
            return date_str[:11] if date_str else ""


def build_news_html(items):
    """Build the HTML for the news list."""
    lines = []
    lines.append('      <ul class="news-list">')
    for item in items[:MAX_ITEMS]:
        title = escape(item['title'])
        date = escape(item['date'])
        excerpt = escape(item['excerpt'])
        link = escape(item['link'])
        lines.append('        <li class="news-item">')
        lines.append(f'          <span class="date">{date}</span>')
        lines.append('          <div class="news-content">')
        lines.append(f'            <div class="news-title"><a href="{link}" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">{title}</a></div>')
        lines.append(f'            <p class="news-excerpt">{excerpt}</p>')
        lines.append('          </div>')
        lines.append('        </li>')
    lines.append('      </ul>')
    return '\n'.join(lines)


def main():
    html_path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_HTML_PATH

    # Fetch and parse RSS
    print(f"Fetching RSS from {RSS_URL}...")
    xml_data = fetch_rss(RSS_URL)
    root = ET.fromstring(xml_data)

    items = []
    for item_el in root.findall('.//item'):
        title = item_el.findtext('title', '').strip()
        link = item_el.findtext('link', '').strip()
        pub_date = item_el.findtext('pubDate', '').strip()
        description = item_el.findtext('description', '').strip()

        excerpt = strip_html(description)
        excerpt = truncate(excerpt, MAX_EXCERPT_LEN)

        items.append({
            'title': title,
            'link': link,
            'date': format_date(pub_date),
            'excerpt': excerpt,
        })

    if not items:
        print("No items found in RSS feed. Aborting.")
        sys.exit(1)

    print(f"Found {len(items)} items, using top {MAX_ITEMS}.")

    # Read existing HTML
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace the news list between markers
    new_news = build_news_html(items)
    pattern = r'(<ul class="news-list">).*?(</ul>)'
    replacement = new_news
    updated_html, count = re.subn(pattern, replacement, html, flags=re.DOTALL)

    if count == 0:
        print("ERROR: Could not find news-list in HTML. Check the file structure.")
        sys.exit(1)

    # Write updated HTML
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(updated_html)

    print(f"Updated {html_path} with {min(len(items), MAX_ITEMS)} news items.")
    for item in items[:MAX_ITEMS]:
        print(f"  - [{item['date']}] {item['title']}")


if __name__ == '__main__':
    main()

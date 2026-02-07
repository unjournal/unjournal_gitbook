#!/usr/bin/env python3
"""Helper script to set up and test dlvr.it integration.

Usage:
    # List your routes and accounts to find IDs:
    python scripts/dlvrit_setup.py --api-key YOUR_KEY list

    # Test posting to a route:
    python scripts/dlvrit_setup.py --api-key YOUR_KEY --route-id 123 test

    # Post a real evaluation announcement:
    python scripts/dlvrit_setup.py --api-key YOUR_KEY --route-id 123 post \
        --paper "Paper Title" --eval-url "https://doi.org/..."
"""

import argparse
import sys
from pathlib import Path

# Add src to path for local development
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from unjournal_forum_bot.social.dlvrit import (
    DlvritClient,
    DlvritConfig,
    format_evaluation_post,
)


def list_config(client: DlvritClient) -> None:
    """List all routes and accounts."""
    print("=== Routes ===")
    routes = client.list_routes()
    if not routes:
        print("  (no routes found)")
    for r in routes:
        print(f"  ID: {r.get('id'):>6}  Name: {r.get('name', 'unnamed')}")

    print("\n=== Accounts ===")
    accounts = client.list_accounts()
    if not accounts:
        print("  (no accounts found)")
    for a in accounts:
        print(
            f"  ID: {a.get('id'):>6}  "
            f"Service: {a.get('service', '?'):>10}  "
            f"URL: {a.get('url', '')}"
        )


def test_post(client: DlvritClient, route_id: int) -> None:
    """Send a test post."""
    message = (
        "🧪 Test post from Unjournal forum-bot integration.\n\n"
        "If you see this, the dlvr.it API is working correctly!"
    )
    print(f"Posting test message to route {route_id}...")
    result = client.post_to_route(message, route_id=route_id)
    print(f"Success! Response: {result}")


def real_post(
    client: DlvritClient,
    route_id: int,
    paper_title: str,
    eval_url: str,
    forum_url: str | None,
) -> None:
    """Post a real evaluation announcement."""
    message = format_evaluation_post(paper_title, eval_url, forum_url)
    print(f"Message ({len(message)} chars):\n{message}\n")
    print(f"Posting to route {route_id}...")
    result = client.post_to_route(message, route_id=route_id)
    print(f"Success! Response: {result}")


def main():
    parser = argparse.ArgumentParser(description="dlvr.it setup and testing")
    parser.add_argument("--api-key", required=True, help="dlvr.it API key")
    parser.add_argument("--route-id", type=int, help="Route ID for posting")

    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("list", help="List routes and accounts")
    subparsers.add_parser("test", help="Send a test post")

    post_parser = subparsers.add_parser("post", help="Post an evaluation")
    post_parser.add_argument("--paper", required=True, help="Paper title")
    post_parser.add_argument("--eval-url", required=True, help="Evaluation URL")
    post_parser.add_argument("--forum-url", help="Optional EA Forum comment URL")

    args = parser.parse_args()

    config = DlvritConfig(api_key=args.api_key, route_id=args.route_id)
    client = DlvritClient(config)

    try:
        if args.command == "list":
            list_config(client)
        elif args.command == "test":
            if not args.route_id:
                print("Error: --route-id required for test", file=sys.stderr)
                sys.exit(1)
            test_post(client, args.route_id)
        elif args.command == "post":
            if not args.route_id:
                print("Error: --route-id required for post", file=sys.stderr)
                sys.exit(1)
            real_post(
                client, args.route_id, args.paper, args.eval_url, args.forum_url
            )
    finally:
        client.close()


if __name__ == "__main__":
    main()

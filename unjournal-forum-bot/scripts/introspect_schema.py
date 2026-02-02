#!/usr/bin/env python3
"""Standalone script to introspect the EA Forum GraphQL schema.

Usage:
    python scripts/introspect_schema.py --token YOUR_LOGIN_TOKEN

This validates your auth token and prints the CreateCommentDataInput fields,
so you can verify the comment mutation shape before using the bot.
"""

import argparse
import asyncio
import json
import sys

import httpx

ENDPOINT = "https://forum.effectivealtruism.org/graphql"


async def main(token: str) -> None:
    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        cookies = {"loginToken": token} if token else {}

        # Check auth
        print("Checking authentication...")
        resp = await client.post(
            ENDPOINT,
            json={"query": "{ currentUser { _id displayName slug } }"},
            cookies=cookies,
        )
        data = resp.json()
        user = data.get("data", {}).get("currentUser")
        if user:
            print(f"  Authenticated as: {user['displayName']} (@{user['slug']})")
        else:
            print("  WARNING: Not authenticated. Token may be invalid.")
            print(f"  Response: {json.dumps(data, indent=2)}")

        # Introspect CreateCommentDataInput
        print("\nIntrospecting CreateCommentDataInput...")
        resp = await client.post(
            ENDPOINT,
            json={
                "query": """
                {
                    __type(name: "CreateCommentDataInput") {
                        inputFields {
                            name
                            type { name kind ofType { name kind } }
                        }
                    }
                }
                """
            },
            cookies=cookies,
        )
        data = resp.json()
        type_info = data.get("data", {}).get("__type")
        if type_info:
            fields = type_info.get("inputFields", [])
            print(f"  Found {len(fields)} fields:")
            for f in fields:
                t = f["type"]
                type_name = t.get("name") or (t.get("ofType", {}).get("name", "?"))
                print(f"    {f['name']}: {type_name} ({t['kind']})")
        else:
            print("  Could not find CreateCommentDataInput type")
            print(f"  Response: {json.dumps(data, indent=2)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Introspect EA Forum GraphQL schema")
    parser.add_argument("--token", default="", help="loginToken cookie value")
    args = parser.parse_args()
    asyncio.run(main(args.token))

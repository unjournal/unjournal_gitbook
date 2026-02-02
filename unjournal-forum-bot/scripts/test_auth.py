#!/usr/bin/env python3
"""Quick script to test if your EA Forum auth token is valid.

Usage:
    python scripts/test_auth.py --token YOUR_LOGIN_TOKEN
"""

import argparse
import asyncio

import httpx

ENDPOINT = "https://forum.effectivealtruism.org/graphql"


async def main(token: str) -> None:
    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        resp = await client.post(
            ENDPOINT,
            json={"query": "{ currentUser { _id displayName slug } }"},
            cookies={"loginToken": token},
        )
        data = resp.json()
        user = data.get("data", {}).get("currentUser")
        if user:
            print(f"OK: Authenticated as {user['displayName']} (@{user['slug']})")
        else:
            print("FAIL: Not authenticated. Check your token.")
            print(f"Response: {data}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--token", required=True, help="loginToken cookie value")
    asyncio.run(main(parser.parse_args().token))

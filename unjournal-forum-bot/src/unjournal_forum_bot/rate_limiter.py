"""Simple token-bucket rate limiter for API calls."""

from __future__ import annotations

import asyncio
import time


class RateLimiter:
    """Token-bucket rate limiter.

    Allows up to `max_per_minute` calls per 60-second window.
    """

    def __init__(self, max_per_minute: int = 10):
        self.max_per_minute = max_per_minute
        self._timestamps: list[float] = []

    async def acquire(self) -> None:
        """Wait until a request slot is available."""
        while True:
            now = time.monotonic()
            # Purge timestamps older than 60 seconds
            self._timestamps = [t for t in self._timestamps if now - t < 60.0]

            if len(self._timestamps) < self.max_per_minute:
                self._timestamps.append(now)
                return

            # Wait until the oldest timestamp expires
            wait_time = 60.0 - (now - self._timestamps[0])
            if wait_time > 0:
                await asyncio.sleep(wait_time)

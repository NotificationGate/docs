---
id: bounce-handling
title: Bounce Handling
---

NotificationGate automatically handles bounces and complaints:

- **Hard bounce** → Address suppressed immediately
- **Soft bounce** → Logged, retried after 30 minutes
- **Complaint** → Address suppressed immediately

If your bounce rate exceeds **2.5%** or complaint rate exceeds **0.05%**, sending is automatically paused to protect your reputation.

You receive real-time events via webhooks. Suppressed addresses are visible in your dashboard under **Suppressions**.

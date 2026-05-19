---
id: python
title: Python
---

```bash
pip install notificationgate
```

```python
from notificationgate import NotificationGate

ng = NotificationGate("ng_live_...")
ng.send(
    from_="hello@yourdomain.com",
    to="user@example.com",
    subject="Welcome!",
    stream="transactional",
    html="<p>Your account is ready.</p>",
)
```

Async:

```python
from notificationgate import AsyncNotificationGate

async with AsyncNotificationGate("ng_live_...") as ng:
    await ng.send(...)
```

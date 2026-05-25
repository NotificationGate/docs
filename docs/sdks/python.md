---
id: python
title: Python
---

Official Python SDK for NotificationGate. Supports both sync and async usage.

**GitHub:** [github.com/NotificationGate/sdk-python](https://github.com/NotificationGate/sdk-python)

## Installation

```bash
pip install notificationgate
```

## Initialization

```python
from notificationgate import NotificationGate

ng = NotificationGate("ng_live_...")
```

Use an `ng_sandbox_` key in development and CI to avoid sending real emails.

## Send an email

```python
result = ng.emails.send(
    from_="hello@yourdomain.com",
    to="user@example.com",
    subject="Welcome!",
    stream="transactional",
    html="<p>Your account is ready.</p>",
    text="Your account is ready.",
)

print(result.id, result.status)
# 01234567-89ab-cdef-... sent
```

## Batch send

```python
result = ng.emails.send_batch(emails=[
    {
        "from_": "hello@yourdomain.com",
        "to": "alice@example.com",
        "subject": "Welcome, Alice!",
        "stream": "transactional",
        "html": "<p>Hi Alice!</p>",
    },
    {
        "from_": "hello@yourdomain.com",
        "to": "bob@example.com",
        "subject": "Welcome, Bob!",
        "stream": "transactional",
        "html": "<p>Hi Bob!</p>",
    },
])

print(f"Sent: {result.sent}, Failed: {result.failed}")
```

## Attachments

```python
import base64

with open("invoice.pdf", "rb") as f:
    content = base64.b64encode(f.read()).decode()

ng.emails.send(
    from_="billing@yourdomain.com",
    to="user@example.com",
    subject="Your invoice",
    stream="transactional",
    html="<p>Please find your invoice attached.</p>",
    attachments=[
        {
            "filename": "invoice.pdf",
            "content_type": "application/pdf",
            "content": content,
        }
    ],
)
```

## Async usage

```python
from notificationgate import AsyncNotificationGate

async def send_welcome(email: str):
    async with AsyncNotificationGate("ng_live_...") as ng:
        result = await ng.emails.send(
            from_="hello@yourdomain.com",
            to=email,
            subject="Welcome!",
            stream="transactional",
            html="<p>Your account is ready.</p>",
        )
        return result.id
```

## Error handling

```python
from notificationgate import NotificationGate, APIError

ng = NotificationGate("ng_live_...")

try:
    ng.emails.send(...)
except APIError as e:
    print(e.code)     # e.g. "domain_not_verified"
    print(e.status)   # HTTP status code
    print(e.message)  # Human-readable message
```

## Domain management

```python
# Add a domain
domain = ng.domains.add("yourdomain.com")

# Verify DKIM records
status = ng.domains.verify(domain.id)

# List all domains
result = ng.domains.list()

# Remove a domain
ng.domains.delete(domain.id)
```

## Suppressions

```python
# List suppressed addresses
result = ng.suppressions.list(limit=50, search="example.com")

# Remove a suppression
ng.suppressions.delete("user@example.com")
```

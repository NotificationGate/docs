---
id: authentication
title: Authentication
---

All API requests require an `Authorization` header:

```
Authorization: Bearer ng_live_a8x2kR...
```

| Type | Prefix | Usage |
|------|--------|-------|
| Live | `ng_live_` | Production |
| Sandbox | `ng_sandbox_` | Testing only |

Sandbox keys skip real sending and return `status: sandbox`. Use in CI/CD.

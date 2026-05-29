---
id: suppressions
title: Suppressions
---

Suppressed addresses are blocked from receiving emails. Hard bounces and spam complaints are suppressed automatically.

## List suppressions

**GET** `/v1/suppressions`

| Param | Default | Description |
|-------|---------|-------------|
| `limit` | 50 | Max results (max 100) |
| `offset` | 0 | Pagination offset |
| `search` | | Filter by email address |

```json
{
  "data": [
    {
      "email": "user@example.com",
      "reason": "bounce",
      "created_at": "2026-05-19T10:00:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

| Reason | Cause |
|--------|-------|
| `bounce` | Hard bounce |
| `complaint` | Spam complaint |
| `manual` | Manually added via dashboard |
| `unsubscribe` | User clicked unsubscribe (marketing) |

## Remove suppression

**DELETE** `/v1/suppressions/:email`

Returns `204 No Content`. The address is eligible to receive emails again.

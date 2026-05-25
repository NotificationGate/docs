---
id: suppressions
title: Suppressions
---

Suppressed addresses are blocked from receiving emails. Hard bounces and spam complaints are suppressed automatically. You can also manage suppressions manually.

## List suppressions

**GET** `https://notificationgate.com/api/v1/suppressions`

Query parameters:

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | int | 50 | Max results (max 100) |
| `offset` | int | 0 | Pagination offset |
| `search` | string | | Filter by email address |

**Response:**

```json
{
  "suppressions": [
    {
      "email": "user@example.com",
      "reason": "bounce",
      "created_at": "2026-05-19T10:00:00Z"
    }
  ],
  "total": 1
}
```

| Reason | Cause |
|--------|-------|
| `bounce` | Hard bounce detected |
| `complaint` | Spam complaint received |
| `manual` | Manually added |
| `unsubscribe` | User unsubscribed (marketing) |

## Add suppression

**POST** `https://notificationgate.com/api/v1/suppressions`

```json
{ "email": "user@example.com", "reason": "manual" }
```

Returns `201 Created` on success.

## Remove suppression

**DELETE** `https://notificationgate.com/api/v1/suppressions/:email`

Returns `204 No Content` on success. The address will be eligible to receive emails again.

Use this when a user reports they aren't receiving emails and the issue has been resolved (e.g. a temporary bounce that has since been fixed).

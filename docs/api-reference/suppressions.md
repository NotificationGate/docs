---
id: suppressions
title: Suppressions
---

Suppressed addresses are blocked from receiving emails.

## List suppressions

**GET** `/v1/suppressions?limit=50&offset=0&search=...`

## Remove suppression

**DELETE** `/v1/suppressions/:email`

Hard bounces and spam complaints automatically add addresses to the suppression list. You can remove them manually.

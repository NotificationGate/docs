---
id: domain-setup
title: Domain Setup
---

## 1. Add your domain

Go to **Domains** in your dashboard and enter your sending domain (e.g., `mail.yourdomain.com` or `yourdomain.com`).

## 2. Add CNAME records

You'll receive 3 CNAME records. Add them to your DNS provider:

| Name | Type | Value |
|------|------|-------|
| `token1._domainkey.yourdomain.com` | CNAME | `token1.dkim.amazonses.com` |
| `token2._domainkey.yourdomain.com` | CNAME | `token2.dkim.amazonses.com` |
| `token3._domainkey.yourdomain.com` | CNAME | `token3.dkim.amazonses.com` |

## 3. Verify

Click **Verify** in the dashboard. DNS propagation can take up to 48 hours.

## Custom MAIL FROM (optional)

Add MX and TXT records to set `Return-Path` to your domain instead of `amazonses.com`.

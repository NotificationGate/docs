---
id: domain-setup
title: Domain Setup
---

You must verify a sending domain before you can send emails. Verification adds DKIM signatures that improve deliverability and prevent spoofing.

## 1. Add your domain

Go to **Domains** in your dashboard and enter your sending domain (e.g. `yourdomain.com` or `mail.yourdomain.com`).

Tip: Use a subdomain like `mail.yourdomain.com` if you want to keep your root domain's DNS clean.

## 2. Add CNAME records for DKIM

After adding your domain you'll receive 3 CNAME records. Add them at your DNS provider:

| Name | Type | Value |
|------|------|-------|
| `token1._domainkey.yourdomain.com` | CNAME | `token1.dkim.amazonses.com` |
| `token2._domainkey.yourdomain.com` | CNAME | `token2.dkim.amazonses.com` |
| `token3._domainkey.yourdomain.com` | CNAME | `token3.dkim.amazonses.com` |

DNS changes can take up to 48 hours to propagate worldwide, though it typically completes within a few minutes.

## 3. Verify

Click **Verify** in the dashboard. Once all 3 CNAME records are detected, the domain status changes to **Verified** and you can start sending.

## SPF record (recommended)

Add an SPF TXT record to authorize SES to send on your behalf:

```
v=spf1 include:amazonses.com ~all
```

Add this as a TXT record at your root domain (`yourdomain.com`).

## DMARC record (recommended)

DMARC protects your domain from spoofing and provides aggregate delivery reports:

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com
```

Add this as a TXT record at `_dmarc.yourdomain.com`.

## Custom MAIL FROM (optional)

By default, the `Return-Path` header shows `amazonses.com`. To use your own domain instead, add these records:

**MX record** at `mail.yourdomain.com`:
```
10 feedback-smtp.eu-central-1.amazonses.com
```

**TXT record** at `mail.yourdomain.com`:
```
v=spf1 include:amazonses.com ~all
```

Then enable **Custom MAIL FROM** in your domain settings.

## Troubleshooting

**Domain stuck in "Pending"** — DNS changes can take up to 48 hours. Use a tool like [dnschecker.org](https://dnschecker.org) to confirm your CNAME records are visible globally.

**CNAME conflict** — Some DNS providers don't allow CNAME records on the root domain. Use a subdomain like `mail.yourdomain.com` instead.

**Multiple domains** — You can add as many domains as you need. Each domain must be verified separately.

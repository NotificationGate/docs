---
id: go
title: Go
---

Official Go SDK for NotificationGate.

**GitHub:** [github.com/NotificationGate/sdk-go](https://github.com/NotificationGate/sdk-go)

## Installation

```bash
go get github.com/NotificationGate/sdk-go
```

## Initialization

```go
import ng "github.com/NotificationGate/sdk-go"

client := ng.New("ng_live_...")
```

Use an `ng_sandbox_` key in development and CI to avoid sending real emails.

## Send an email

```go
result, err := client.Emails.Send(ctx, ng.SendEmailRequest{
    From:    "hello@yourdomain.com",
    To:      "user@example.com",
    Subject: "Welcome!",
    Stream:  "transactional",
    HTML:    "<p>Your account is ready.</p>",
    Text:    "Your account is ready.",
})
if err != nil {
    log.Fatal(err)
}

fmt.Println(result.ID, result.Status)
// 01234567-89ab-cdef-... sent
```

## Batch send

```go
result, err := client.Emails.SendBatch(ctx, ng.BatchSendRequest{
    Emails: []ng.SendEmailRequest{
        {
            From:    "hello@yourdomain.com",
            To:      "alice@example.com",
            Subject: "Welcome, Alice!",
            Stream:  "transactional",
            HTML:    "<p>Hi Alice!</p>",
        },
        {
            From:    "hello@yourdomain.com",
            To:      "bob@example.com",
            Subject: "Welcome, Bob!",
            Stream:  "transactional",
            HTML:    "<p>Hi Bob!</p>",
        },
    },
})
if err != nil {
    log.Fatal(err)
}

fmt.Printf("Sent: %d, Failed: %d\n", result.Sent, result.Failed)
```

## Attachments

```go
content, err := os.ReadFile("invoice.pdf")
if err != nil {
    log.Fatal(err)
}

result, err := client.Emails.Send(ctx, ng.SendEmailRequest{
    From:    "billing@yourdomain.com",
    To:      "user@example.com",
    Subject: "Your invoice",
    Stream:  "transactional",
    HTML:    "<p>Please find your invoice attached.</p>",
    Attachments: []ng.Attachment{
        {
            Filename:    "invoice.pdf",
            ContentType: "application/pdf",
            Content:     base64.StdEncoding.EncodeToString(content),
        },
    },
})
```

## Error handling

```go
import (
    ng "github.com/NotificationGate/sdk-go"
    "errors"
)

result, err := client.Emails.Send(ctx, req)
if err != nil {
    var apiErr *ng.APIError
    if errors.As(err, &apiErr) {
        fmt.Println(apiErr.Code)    // e.g. "domain_not_verified"
        fmt.Println(apiErr.Status)  // HTTP status code
        fmt.Println(apiErr.Message) // Human-readable message
    }
    log.Fatal(err)
}
```

## Domain management

```go
// Add a domain
domain, err := client.Domains.Add(ctx, "yourdomain.com")

// Verify DKIM records
status, err := client.Domains.Verify(ctx, domain.ID)

// List all domains
result, err := client.Domains.List(ctx)

// Remove a domain
err = client.Domains.Delete(ctx, domain.ID)
```

## Suppressions

```go
// List suppressed addresses
result, err := client.Suppressions.List(ctx, ng.ListSuppressionsParams{
    Limit:  50,
    Search: "example.com",
})

// Remove a suppression
err = client.Suppressions.Delete(ctx, "user@example.com")
```

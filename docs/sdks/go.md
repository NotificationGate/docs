---
id: go
title: Go
---

```bash
go get github.com/notificationgate/notificationgate-go
```

```go
import ng "github.com/notificationgate/notificationgate-go"

client := ng.New("ng_live_...")

result, err := client.Emails.Send(ctx, ng.SendEmailRequest{
    From:    "hello@yourdomain.com",
    To:      "user@example.com",
    Subject: "Welcome!",
    Stream:  "transactional",
    HTML:    "<p>Your account is ready.</p>",
})
```

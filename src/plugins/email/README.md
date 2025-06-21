# emailPlugin

Exports a `sendMail` function that acts as core logic for actual message delivery.

```ts
const smtpConfig = {
    port: 1025,
};

const template =
    '<!DOCTYPE html>\
<html>\
    <head>\
        <meta charset="UTF-8" />\
        <title>My company</title>\
    </head>\
    <body>\
        Hello {{{username}}}!\
    </body>\
</html>\
';

const send = emailPlugin.sendEmail(smtpConfig);
await send(
    template,
    "from@example.com",
    "to@example.com",
    "Hello {{username}}",
    {
        body: { username: "jonhdoe" },
        title: { username: "jonhdoe" },
    }
);
```

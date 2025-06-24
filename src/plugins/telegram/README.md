# telegramPlugin

It exports a `sendTelegramMessage` function that acts as core logic for actual message delivery.

```ts
const botToken = "dump_token";

const send = telegramPlugin.sendTelegramMessage(botToken);
await send(
    "123456789", // chat ID
    "Hello <b>{{username}}</b>!", // message content
    {
        // replacements
        message: { username: "jonhdoe" },
    }
);
```

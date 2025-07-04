# notifx

**NotifX** is a lightweight, pluggable notification dispatching system for Node.js. Registers notification channels (like Email, Telegram, ...) using built-in dispatcher functions or provide your own to handle a actual message delivery.

## Features

-   Register custom notification channels with dispatcher functions
-   Built-in plugins: Email (via Nodemailer), Telegram,... more to come
-   Send notifications by name with flexible arguments
-   Supports both synchronous and asynchronous dispatchers
-   Type-safe in TypeScript

## Installation

```bash
npm install notifx
```

## Usage

```ts
import notifx, { emailPlugin } from "notifx";

const channel = "email";
const template =
    '<!DOCTYPE html>\
<html>\
    <head>\
        <meta charset="UTF-8" />\
        <title>My company</title>\
    </head>\
    <body>\
        {{{username}}}\
    </body>\
</html>\
';

// Register a channel using the built-in email plugin
notifx.registerChannel(
    channel, // channel name
    emailPlugin.sendEmail({
        // returns actual function that send emails
        host: "smtp.example.com",
        port: 587,
        auth: { user: "me@example.com", pass: "secret" },
    })
);

// Register a notification to send a welcome email
notifx.registerNotification(
    "welcomeEmail", // notification name
    channel, // channel name
    [
        // The array will be spread as arguments of Email dispatcher to send email
        template, // HTML body (can be a file path)
        "me@example.com", // from
        "user@example.com", // to
        "Welcome {{username}}!", // subject
        {
            // replacements
            body: { username: "jonhdoe" },
            title: { username: "jonhdoe" },
        },
    ]
);

// Send the registered notification
await notifx.send("welcomeEmail");
```

## Plugin System

### Email Plugin (via Nodemailer)

[How to use](./src/plugins/email/README.md)

```ts
import { emailPlugin } from "notifx";

const send = emailPlugin.sendEmail(mailerOptions);
await send(body, from, to, title, replacements, attachments?);
```

### Telegram Plugin (via Nodemailer)

[How to use](./src/plugins/telegram/README.md)

```ts
import { telegramPlugin } from "notifx";

const send = telegramPlugin.sendTelegramMessage(botToken);
await send(chatId, messageTemplate, { message: { username: "jonhdoe" } });
```

### Using Custom Dispatchers

NotifX is designed to be flexible and extensible. Beyond the built-in plugins, you can register your own custom dispatcher functions to handle message delivery any way you want.

A dispatcher function is simply a function that accepts a fixed set of arguments (matching the array you provided when registerering a notification) and performs the actual delivery logic — it can be synchronous or asynchronous.
See below how to register a custom dispatcher.

This code will log: `Sending message to user@example.com: Hello there!`.

```ts
// Define your custom dispatcher function.
const myDispatcher = async (recipient: string, message: string) => {
    // Implement your custom delivery logic here
    console.log(`Sending message to ${recipient}: ${message}`);
    // For example, call an external API, send SMS, log to a database, etc.
    return true;
};

const recipient = "user@example.com";
const message = "Hello there!";

// Register your custom channel
notifx.registerChannel("customChannel", myDispatcher);

// Register a notification using your custom channel
notifx.registerNotification("myNotification", "customChannel", [
    // The array will be spread as  arguments of myDispatch when calling it
    recipient,
    message,
]);

// Send the notification
await notifx.send("myNotification");
```

#### Important

-   The dispatcher function's parameters must match the array you provide when registering the notification.
-   NotifX will invoke the dispatcher with the registered arguments unless you override them during send() passing additional arguments after the notification name.

## API

### notifx.registerChannel(name, dispatcher)

`Registers a dispatcher function for a given channel name.`

### notifx.registerNotification(name, channel, dispatcherArgs)

`Binds a notification name to a channel with specific arguments.`

### notifx.send(notificationName, ...overrideArgs?)

`Dispatches a notification through its associated channel, optionally overriding arguments.`

## To Do

-   [ ] Retry logic
-   [ ] Monitoring
-   [ ] More plugins

## Contributions

Contributions are welcome. See `CONTRIBUTING.md`.

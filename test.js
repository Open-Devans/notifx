import notifx, { emailPlugin } from "./dist/index.esm.js";

const mailerOptions = {
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
        {{{injectedHTML}}}\
    </body>\
</html>\
';
const from = "a@example.com";
const to = "b@example.com";
const subject = "Hello {{username}}";
const replacements = {
    title: {
        username: "john",
    },
    body: { injectedHTML: "Hello world!" },
};

(async function () {
    const channel = "email";
    await notifx.registerChannel(channel, emailPlugin.sendEmail(mailerOptions));
    await notifx.registerNotification(
        "hello",
        channel,
        template,
        from,
        to,
        subject,
        replacements
    );
    await notifx.send("hello");
})();

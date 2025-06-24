/**
 * Email plugin.
 */
declare const emailPlugin: {
    /**
     * Creates an email sender function that can be used as a notifx channel dispatcher.
     *
     * @param {object} mailerOptions - Nodemailer transport configuration (SMTP options).
     * @returns {Function} An async function that sends an email using provided parameters.
     *
     * @example
     * const send = emailPlugin.sendEmail(smtpConfig);
     * await send("template.html", "from@example.com", "to@example.com", "Hello {{username}}", {
     *   body: { username: "jonhdoe" },
     *   title: { username: "jonhdoe" },
     * });
     */
    sendEmail: (mailerOptions: any) => (body: string, from: string, to: string, title: string, replacements: {
        body: Record<string, any>;
        title: Record<string, any>;
    }, attachments?: any[]) => Promise<import("nodemailer/lib/smtp-pool").SentMessageInfo>;
};
export default emailPlugin;

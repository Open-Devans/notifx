import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { isFilePath, readFile } from "../../utils";

/**
 * Creates a nodemailer transporter.
 * @param {object} options - Nodemailer transport configuration object.
 * @returns {nodemailer.Transporter} A nodemailer transporter.
 */
const setTransporter = (options: any) => {
    return nodemailer.createTransport(options);
};

/**
 * Email plugin.
 */
const emailPlugin = {
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
    sendEmail:
        (mailerOptions: any) =>
        /**
         * Sends an email with HTML body and subject, using handlebars templates.
         *
         * @param {string} body - HTML body content or file path to HTML template.
         * @param {string} from - Sender email address.
         * @param {string} to - Recipient email address.
         * @param {string} title - Subject line template (can contain handlebars variables).
         * @param {{ body: Object, title: Object }} replacements - Data for handlebars templates.
         * @param {Array} [attachments=[]] - Optional list of email attachments.
         * @returns {Promise<any>} Resolves with the Nodemailer `info` object.
         * @throws Will throw an error if email sending fails.
         */
        async (
            body: string,
            from: string,
            to: string,
            title: string,
            replacements: {
                body: Record<string, any>;
                title: Record<string, any>;
            },
            attachments: any[] = []
        ) => {
            const transporter = setTransporter(mailerOptions);

            // Check if body is a file path and read it if necessary
            body = (await isFilePath(body)) ? await readFile(body) : body;

            // Compile the body and title templates using Handlebars
            const bodyTemplate = handlebars.compile(body);
            const titleTemplate = handlebars.compile(title);

            const html = bodyTemplate(replacements.body);
            const subject = titleTemplate(replacements.title);

            const mailOptions = {
                from,
                to,
                subject,
                html,
                attachments,
            };

            try {
                // Send the email using the transporter
                const info = await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${to}: ${info.messageId}`);
                return info;
            } catch (error) {
                console.error("Email send error:", error);
                throw error;
            }
        },
};

export default emailPlugin;

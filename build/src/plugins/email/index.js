var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { isFilePath, readFile } from "../../utils";
/**
 * Creates a nodemailer transporter.
 * @param {object} options - Nodemailer transport configuration object.
 * @returns {nodemailer.Transporter} A nodemailer transporter.
 */
const setTransporter = (options) => {
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
    sendEmail: (mailerOptions) => 
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
    (body_1, from_1, to_1, title_1, replacements_1, ...args_1) => __awaiter(void 0, [body_1, from_1, to_1, title_1, replacements_1, ...args_1], void 0, function* (body, from, to, title, replacements, attachments = []) {
        const transporter = setTransporter(mailerOptions);
        // Check if body is a file path and read it if necessary
        body = (yield isFilePath(body)) ? yield readFile(body) : body;
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
            const info = yield transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}: ${info.messageId}`);
            return info;
        }
        catch (error) {
            console.error("Email send error:", error);
            throw error;
        }
    }),
};
export default emailPlugin;

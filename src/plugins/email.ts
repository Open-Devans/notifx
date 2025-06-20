import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { isFilePath, readFile } from "../utils";

const setTransporter = (options: any) => {
    return nodemailer.createTransport(options);
};

const emailPlugin = {
    sendEmail:
        (mailerOptions: any) =>
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

            body = (await isFilePath(body)) ? await readFile(body) : body;

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

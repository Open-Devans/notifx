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
import { isFilePath, readFile } from "../utils";
const setTransporter = (options) => {
    return nodemailer.createTransport(options);
};
const emailPlugin = {
    sendEmail: (mailerOptions) => (body_1, from_1, to_1, title_1, replacements_1, ...args_1) => __awaiter(void 0, [body_1, from_1, to_1, title_1, replacements_1, ...args_1], void 0, function* (body, from, to, title, replacements, attachments = []) {
        const transporter = setTransporter(mailerOptions);
        body = (yield isFilePath(body)) ? yield readFile(body) : body;
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

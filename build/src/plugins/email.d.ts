declare const emailPlugin: {
    sendEmail: (mailerOptions: any) => (body: string, from: string, to: string, title: string, replacements: {
        body: Record<string, any>;
        title: Record<string, any>;
    }, attachments?: any[]) => Promise<import("nodemailer/lib/smtp-pool").SentMessageInfo>;
};
export default emailPlugin;

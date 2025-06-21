import nodemailer from "nodemailer";
import emailPlugin from "../../src/plugins/email";
import * as utils from "../../src/utils";

jest.mock("nodemailer");
const sendMailMock = jest.fn();

jest.mock("../../../src/utils", () => ({
    isFilePath: jest.fn(),
    readFile: jest.fn(),
}));

const mockTransporter = { sendMail: sendMailMock };

(nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

describe("emailPlugin.sendEmail", () => {
    const mailerOptions = {
        host: "smtp.test.com",
        port: 587,
        auth: { user: "u", pass: "p" },
    };
    const from = "from@example.com";
    const to = "to@example.com";
    const title = "Hello {{name}}!";
    const body = "<b>Welcome {{name}}</b>";
    const replacements = {
        title: { name: "Cedrick" },
        body: { name: "Cedrick" },
    };

    beforeEach(() => {
        sendMailMock.mockReset();
        (utils.isFilePath as jest.Mock).mockReset();
        (utils.readFile as jest.Mock).mockReset();
    });

    test("sends email with inline template", async () => {
        (utils.isFilePath as jest.Mock).mockResolvedValue(false);
        sendMailMock.mockResolvedValue({ messageId: "abc123" });

        const send = emailPlugin.sendEmail(mailerOptions);
        const result = await send(body, from, to, title, replacements);

        expect(sendMailMock).toHaveBeenCalledWith({
            from,
            to,
            subject: "Hello Cedrick!",
            html: "<b>Welcome Cedrick</b>",
            attachments: [],
        });

        expect(result.messageId).toBe("abc123");
    });

    test("loads body from file when isFilePath is true", async () => {
        (utils.isFilePath as jest.Mock).mockResolvedValue(true);
        (utils.readFile as jest.Mock).mockResolvedValue("<i>Hi {{name}}</i>");
        sendMailMock.mockResolvedValue({ messageId: "file123" });

        const send = emailPlugin.sendEmail(mailerOptions);
        const result = await send(
            "path/to/template.html",
            from,
            to,
            title,
            replacements
        );

        expect(utils.readFile).toHaveBeenCalledWith("path/to/template.html");
        expect(sendMailMock).toHaveBeenCalledWith({
            from,
            to,
            subject: "Hello Cedrick!",
            html: "<i>Hi Cedrick</i>",
            attachments: [],
        });

        expect(result.messageId).toBe("file123");
    });

    test("throws if sendMail fails", async () => {
        (utils.isFilePath as jest.Mock).mockResolvedValue(false);
        const error = new Error("SMTP down");
        sendMailMock.mockRejectedValue(error);

        const send = emailPlugin.sendEmail(mailerOptions);

        await expect(send(body, from, to, title, replacements)).rejects.toThrow(
            "SMTP down"
        );
    });
});

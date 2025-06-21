import axios from "axios";
import telegramPlugin from "../../src/plugins/telegram";

jest.mock("axios");
const mockedAxiosPost = axios.post as jest.Mock;

describe("telegramPlugin.sendTelegramMessage", () => {
    const botToken = "123:ABC";
    const chatId = "987654321";
    const messageTemplate = "Hello <b>{{name}}</b>!";
    const replacements = {
        message: { name: "Cedrick" },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("sends a telegram message with parsed template", async () => {
        mockedAxiosPost.mockResolvedValue({
            data: { ok: true, result: { message_id: 123 } },
        });

        const send = telegramPlugin.sendTelegramMessage(botToken);
        const result = await send(chatId, messageTemplate, replacements);

        expect(mockedAxiosPost).toHaveBeenCalledWith(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                chat_id: chatId,
                text: "Hello <b>Cedrick</b>!",
                parse_mode: "HTML",
            }
        );

        expect(result).toEqual({ ok: true, result: { message_id: 123 } });
    });

    test("throws and logs error if telegram API fails", async () => {
        const errorMessage = "Unauthorized";

        mockedAxiosPost.mockRejectedValue({
            response: {
                data: { error_code: 401, description: errorMessage },
            },
        });

        const send = telegramPlugin.sendTelegramMessage(botToken);

        await expect(
            send(chatId, messageTemplate, replacements)
        ).rejects.toEqual({
            response: {
                data: { error_code: 401, description: errorMessage },
            },
        });

        expect(mockedAxiosPost).toHaveBeenCalledTimes(1);
    });
});

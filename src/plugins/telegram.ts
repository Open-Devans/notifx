import axios from "axios";
import handlebars from "handlebars";

const telegramPlugin = {
    sendTelegramMessage:
        (botToken: string) =>
        async (
            chatId: string,
            message: string,
            replacements: {
                message: Record<string, any>;
            }
        ) => {
            const messageTemplate = handlebars.compile(message);
            const parsedMessage = messageTemplate(replacements.message);

            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            try {
                const response = await axios.post(url, {
                    chat_id: chatId,
                    text: parsedMessage,
                    parse_mode: "HTML",
                });

                console.log(`Telegram message sent to ${chatId}`);
                return response.data;
            } catch (error: any) {
                console.error(
                    "Telegram send error:",
                    error.response?.data || error.message
                );
                throw error;
            }
        },
};

export default telegramPlugin;

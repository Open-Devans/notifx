import axios from "axios";
import handlebars from "handlebars";

/**
 * Telegram plugin for sending messages using the Telegram Bot API.
 */
const telegramPlugin = {
    /**
     * Creates a Telegram message sender function that can be used as a notifx channel dispatcher.
     *
     * @param {string} botToken - The Telegram bot token.
     * @returns {Function} An async function that sends a message via Telegram.
     *
     * @example
     * const send = telegramPlugin.sendTelegramMessage(botToken);
     * await send("123456789", "Hello <b>{{username}}</b>!", {
     *   message: { username: "jonhdoe" }
     * });
     */
    sendTelegramMessage:
        (botToken: string) =>
        /**
         * Sends a formatted message to a Telegram user or group.
         *
         * @param {string} chatId - Telegram `chat_id` (user, group, or channel).
         * @param {string} message - Message template string using handlebars syntax.
         * @param {{ message: Object }} replacements - Data for handlebars template.
         * @returns {Promise<any>} Resolves with the Telegram API response data.
         * @throws Will throw an error if the API call fails.
         */
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

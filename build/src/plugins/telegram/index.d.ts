/**
 * Telegram plugin for sending messages using the Telegram Bot API.
 */
declare const telegramPlugin: {
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
    sendTelegramMessage: (botToken: string) => (chatId: string, message: string, replacements: {
        message: Record<string, any>;
    }) => Promise<any>;
};
export default telegramPlugin;

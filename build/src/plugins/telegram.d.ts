interface TelegramReplacements {
    message: Record<string, any>;
}
declare const telegramPlugin: {
    sendTelegramMessage: (botToken: string) => (chatId: string, message: string, replacements: TelegramReplacements) => Promise<any>;
};
export default telegramPlugin;

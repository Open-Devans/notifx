var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import handlebars from "handlebars";
const telegramPlugin = {
    sendTelegramMessage: (botToken) => (chatId, message, replacements) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const messageTemplate = handlebars.compile(message);
        const parsedMessage = messageTemplate(replacements.message);
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        try {
            const response = yield axios.post(url, {
                chat_id: chatId,
                text: parsedMessage,
                parse_mode: "HTML", // Allows formatting with <b>, <i>, etc.
            });
            console.log(`📨 Telegram message sent to ${chatId}`);
            return response.data;
        }
        catch (error) {
            console.error("Telegram send error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw error;
        }
    })
};
export default telegramPlugin;

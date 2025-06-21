import notifx from "./notifx";
import emailPlugin from "./plugins/email";
import telegramPlugin from "./plugins/telegram";
/**
 * Built-in plugins for the notifx notification system.
 *
 * @module
 * @example
 * import notifx, { emailPlugin, telegramPlugin } from 'notifx';
 *
 * notifx.registerChannel('email', emailPlugin.sendEmail(smtpConfig));
 * notifx.registerChannel('telegram', telegramPlugin.sendTelegramMessage(botToken));
 *
 * await notifx.send('welcomeEmail');
 */
export { emailPlugin, telegramPlugin };
/**
 * The default NotifX dispatcher instance.
 *
 * @see {@link ./notifx}
 */
export default notifx;

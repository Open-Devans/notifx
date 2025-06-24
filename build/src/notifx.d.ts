import { Dispatcher, Notification } from "../types/index";
/**
 * NotifX notification manager.
 *
 * Responsible for:
 * - Registering notification channels (e.g., email, SMS, Telegram)
 * - Registering named notifications using those channels
 * - Dispatching notifications dynamically with support for sync/async channels
 */
export declare class Notifx {
    /**
     * Registered dispatch channels, indexed by name.
     * @private
     */
    _channels: {
        [key: string]: Dispatcher;
    };
    /**
     * Registered notifications, each mapped to a channel and its arguments.
     * @private
     */
    _notifications: {
        [key: string]: Notification;
    };
    /**
     * Registers a named dispatch channel.
     *
     * The dispatcher function must have a fixed signature, meaning:
     * - It must accept the same number and order of arguments as those provided when registering notifications for this channel.
     * - It must be a function that is either synchronous or asynchronous.
     *
     * @param {string} name - Unique name for the channel.
     * @param {Dispatcher} dispatcher - The dispatcher function to call when sending.
     * @throws {TypeError} If the name is not a string or dispatcher is not a function.
     */
    registerChannel(name: string, dispatcher: Dispatcher): void;
    /**
     * Registers a named notification to be sent through a channel.
     *
     * The arguments must match the expected signature of the channel's dispatcher function.
     *
     * @param {string} notificationName - Unique name for this notification.
     * @param {string} channelName - Name of the registered channel to use.
     * @param {...any[]} args - Arguments that will be passed to the dispatcher when the notification is sent.
     * @throws {TypeError} If names are not strings.
     * @throws {Error} If the channel is not registered.
     */
    registerNotification(notificationName: string, channelName: string, args: any[]): void;
    /**
     * Sends a previously registered notification via its associated channel by invoking the channel's dispatcher function.
     *
     * The dispatcher will be called with the same arguments provided when registering the notification,
     * unless additional arguments are provided at send-time.
     *
     * @param {string} notificationName - Name of the registered notification.
     * @param {...any[]} args - Optional override of arguments to pass to the dispatcher.
     * @returns {Promise<any>} The return value from the dispatcher function.
     * @throws {Error} If notification or channel is missing, or argument count mismatches.
     */
    send(notificationName: string, ...args: any[]): Promise<any>;
}
declare const notifx: Notifx;
export default notifx;

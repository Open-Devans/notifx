import { Dispatcher, Notification } from "../types/index";
declare class Notifx {
    _channels: {
        [key: string]: Dispatcher;
    };
    _notifications: {
        [key: string]: Notification;
    };
    registerChannel(name: string, dispatcher: Dispatcher): void;
    registerNotification(notificationName: string, channelName: string, ...args: any[]): void;
    send(notificationName: string, ...args: any[]): Promise<any>;
}
declare const notifx: Notifx;
export default notifx;

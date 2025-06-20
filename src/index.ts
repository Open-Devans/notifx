import { Dispatcher, Notification } from "./../types/index";

class Notifx {
    _channels: {
        [key: string]: Dispatcher;
    } = {};
    _notifications: { [key: string]: Notification } = {};

    registerChannel(name: string, dispatcher: Dispatcher) {
        if (typeof name !== "string") {
            throw new TypeError("Channel name must be a string");
        }
        if (typeof dispatcher !== "function") {
            throw new TypeError("Channel dispatcher must be a function");
        }

        if (!this._channels.hasOwnProperty(name)) {
            this._channels[name] = dispatcher;
        }
    }

    registerNotification(
        notificationName: string,
        channelName: string,
        ...args: any[]
    ) {
        if (
            typeof notificationName !== "string" ||
            typeof channelName !== "string"
        ) {
            throw new TypeError(
                "Notification or channel name must be a  string"
            );
        }
        if (!this._channels.hasOwnProperty(channelName)) {
            throw new Error(`Channel "${channelName}" is not registered`);
        }

        if (!this._notifications.hasOwnProperty(notificationName)) {
            this._notifications[notificationName] = {
                channel: channelName,
                args,
            };
        }
    }

    async send(notificationName: string, ...args: any[]) {
        if (!this._notifications.hasOwnProperty(notificationName)) {
            throw new Error(
                `Notification "${notificationName}" is not registered`
            );
        }

        const notif = this._notifications[notificationName];
        const channel = notif.channel;
        const dispatch = this._channels[channel];

        if (typeof dispatch !== "function") {
            throw new TypeError(`Channel "${channel}" is not a function`);
        }

        const funcArgs = args.length > 0 ? args : notif.args;
        if (dispatch.length !== funcArgs.length) {
            throw new Error(
                `Channel "${channel}" expects ${dispatch.length} arguments but got ${funcArgs.length}`
            );
        }

        try {
            const result = dispatch(...funcArgs);
            return result && typeof result.then === "function"
                ? await result
                : result;
        } catch (err) {
            throw err;
        }
    }
}

const notifx = new Notifx();
export default notifx;

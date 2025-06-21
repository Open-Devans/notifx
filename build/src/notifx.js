var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Notifx {
    constructor() {
        this._channels = {};
        this._notifications = {};
    }
    registerChannel(name, dispatcher) {
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
    registerNotification(notificationName, channelName, ...args) {
        if (typeof notificationName !== "string" ||
            typeof channelName !== "string") {
            throw new TypeError("Notification or channel name must be a  string");
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
    send(notificationName, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._notifications.hasOwnProperty(notificationName)) {
                throw new Error(`Notification "${notificationName}" is not registered`);
            }
            const notif = this._notifications[notificationName];
            const channel = notif.channel;
            const dispatch = this._channels[channel];
            if (typeof dispatch !== "function") {
                throw new TypeError(`Channel "${channel}" is not a function`);
            }
            const funcArgs = args.length > 0 ? args : notif.args;
            if (dispatch.length !== funcArgs.length) {
                throw new Error(`Channel "${channel}" expects ${dispatch.length} arguments but got ${funcArgs.length}`);
            }
            try {
                const result = dispatch(...funcArgs);
                return result && typeof result.then === "function"
                    ? yield result
                    : result;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
const notifx = new Notifx();
export default notifx;

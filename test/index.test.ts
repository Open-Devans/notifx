import notifx from "../src";
import { Dispatcher } from "../types";

describe("Notifx", () => {
    beforeEach(() => {
        // @ts-ignore - Reset private properties for isolated tests
        notifx._channels = {};
        // @ts-ignore
        notifx._notifications = {};
    });

    test("should register a channel", () => {
        const mockDispatcher: Dispatcher = jest.fn();
        notifx.registerChannel("email", mockDispatcher);

        // @ts-ignore
        expect(notifx._channels["email"]).toBe(mockDispatcher);
    });

    test("should not allow duplicate channel registration", () => {
        const mockDispatcher: Dispatcher = jest.fn();
        notifx.registerChannel("email", mockDispatcher);

        const newDispatcher: Dispatcher = jest.fn();
        notifx.registerChannel("email", newDispatcher);

        // @ts-ignore
        expect(notifx._channels["email"]).toBe(mockDispatcher);
    });

    test("should throw on invalid channel name or dispatcher", () => {
        expect(() => notifx.registerChannel(123 as any, () => {})).toThrow(
            TypeError
        );
        expect(() =>
            notifx.registerChannel("sms", "not a function" as any)
        ).toThrow(TypeError);
    });

    test("should register a notification", () => {
        const mockDispatcher: Dispatcher = jest.fn();
        notifx.registerChannel("email", mockDispatcher);
        notifx.registerNotification(
            "welcomeEmail",
            "email",
            "user@example.com",
            "Hello"
        );

        // @ts-ignore
        expect(notifx._notifications["welcomeEmail"]).toEqual({
            channel: "email",
            args: ["user@example.com", "Hello"],
        });
    });

    test("should throw if registering notification for unknown channel", () => {
        expect(() =>
            notifx.registerNotification("notif1", "unknown", "data")
        ).toThrow('Channel "unknown" is not registered');
    });

    test("should send a notification with correct arguments", async () => {
        const dispatcher = jest.fn(
            (to: string, msg: string) => `Sent to ${to}: ${msg}`
        );
        notifx.registerChannel("email", dispatcher);
        notifx.registerNotification(
            "notif",
            "email",
            "user@example.com",
            "Hello"
        );

        const result = await notifx.send("notif");

        expect(result).toBe("Sent to user@example.com: Hello");
        expect(dispatcher).toHaveBeenCalledWith("user@example.com", "Hello");
    });

    test("should override registered args if custom args are passed", async () => {
        const dispatcher = jest.fn(
            (to: string, msg: string) => `Sent ${msg} to ${to}`
        );
        notifx.registerChannel("email", dispatcher);
        notifx.registerNotification(
            "notif",
            "email",
            "user@example.com",
            "Hello"
        );

        const result = await notifx.send("notif", "other@example.com", "Hi");

        expect(dispatcher).toHaveBeenCalledWith("other@example.com", "Hi");
        expect(result).toBe("Sent Hi to other@example.com");
    });

    test("should throw if argument count does not match", async () => {
        const dispatcher = jest.fn((a: string, b: string) => {});
        notifx.registerChannel("email", dispatcher);
        notifx.registerNotification("notif", "email", "onlyOneArg");

        await expect(notifx.send("notif")).rejects.toThrow(
            'Channel "email" expects 2 arguments but got 1'
        );
    });

    test("should support async dispatchers", async () => {
        const dispatcher = jest.fn(async (user: string) => {
            return `Welcome ${user}`;
        });

        notifx.registerChannel("push", dispatcher);
        notifx.registerNotification("asyncNotif", "push", "John");

        const result = await notifx.send("asyncNotif");
        expect(result).toBe("Welcome John");
    });

    test("should throw if notification is not registered", async () => {
        await expect(notifx.send("nonexistent")).rejects.toThrow(
            'Notification "nonexistent" is not registered'
        );
    });
});

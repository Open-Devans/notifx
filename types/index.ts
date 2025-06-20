export type Dispatcher = (...arg) => any;

export type Notification = {
    channel: string;
    args: any[];
};

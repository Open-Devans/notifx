export type Dispatcher = (...arg: any[]) => any;

export type Notification = {
    channel: string;
    args: any[];
};

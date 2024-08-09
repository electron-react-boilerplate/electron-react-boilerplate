import {ipcMain, IpcMainEvent} from 'electron';
import {IPCChannelEnum} from "../../../shared/enums/ipc-channel.enum";

export function IpcListener(channel: IPCChannelEnum) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__ipcEvents) {
            target.__ipcEvents = [];
        }

        const eventKey = `${channel}_${propertyKey}`;

        // Prevent duplicate event binding
        if (!target.__ipcEvents.includes(eventKey)) {
            target.__ipcEvents.push(eventKey);

            const originalOnAppReady = target.onAppReady;

            target.onAppReady = function (...args: any[]) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }

                // Listen to the IPC event
                ipcMain.on(channel, (event: IpcMainEvent, ...eventArgs: any[]) => {
                    if (typeof this[propertyKey] === 'function') {
                        this[propertyKey](event, ...eventArgs);
                    }
                });
            };
        }
    };
}

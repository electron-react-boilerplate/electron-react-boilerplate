import { Tray } from 'electron';
import {TrayEventEnum} from "../enums/tray-listener.enum";
import {TrayEventType} from "../types/tray-listener.type";

export function TrayListener<T extends TrayEventEnum>(eventName: T) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__trayEvents) {
            target.__trayEvents = [];
        }

        const eventKey = `${eventName}_${propertyKey}`;

        // Prevent duplicate event binding
        if (!target.__trayEvents.includes(eventKey)) {
            target.__trayEvents.push(eventKey);

            const originalOnAppReady = target.onAppReady;

            target.onAppReady = function (...args: any[]) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }

                const tray = this.tray as Tray;

                if (tray) {
                    tray.on(eventName as any, (...eventArgs: any[]) => {
                        // Ensure the method signature matches the event's arguments
                        if (typeof this[propertyKey] === 'function') {
                            const expectedArgs = eventArgs as TrayEventType[T];
                            this[propertyKey](expectedArgs);
                        }
                    });
                }
            };
        }
    };
}

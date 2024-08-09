import {BrowserWindow} from "electron";
import {WindowEventEnum} from "../enums/window-listener.enum";
import {WindowEventType} from "../types/window-listener.type";

export function WindowListener<T extends WindowEventEnum>(eventName: T) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__windowEvents) {
            target.__windowEvents = [];
        }

        const eventKey = `${eventName}_${propertyKey}`;

        // Prevent duplicate event binding
        if (!target.__windowEvents.includes(eventKey)) {
            target.__windowEvents.push(eventKey);

            const originalOnAppReady = target.onAppReady;

            target.onAppReady = function (...args: any[]) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }

                const window = this.window as BrowserWindow;

                if (window) {
                    window.on(eventName as any, (...eventArgs: any[]) => {
                        // Ensure the method signature matches the event's arguments
                        if (typeof this[propertyKey] === 'function') {
                            const expectedArgs = eventArgs as WindowEventType[T];
                            this[propertyKey](expectedArgs);
                        }
                    });
                }
            };
        }
    };
}

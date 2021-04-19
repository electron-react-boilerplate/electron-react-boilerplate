/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    dev: {
      /**
       * Denotes whether or not the program is running in `development` mode.
       */
      isRunning: boolean | undefined;
      /**
       * Denotes the port the webpack server is running in. Defaults to `1212` if undefined.
       */
      port: string | undefined;
    };
    api: {
      /**
       * Increments a number from main thread.
       */
      incrementNumber(val: number): void;
      /**
       * Decrements a number from main thread.
       */
      decrementNumber(val: number): void;
      /**
       * Listens to `channel`, when a new message arrives `listener` would be called with
       * `listener(event, args...)`.
       */
      onResponse(channel: string, fn: (...args: any[]) => void): void;
      /**
       * Removes the specified `listener` from the listener array for the specified
       * `channel`.
       */
      removeResponseChannel(channel: string): void;
    };
  }
}

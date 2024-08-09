import { ipcRenderer } from "electron";
import * as childProcess from "child_process";
import { useEffect, useState } from "react";

type ElectronWindow = typeof window & { require: (arg: string) => any }

export function useElectronService() {
    const [electronService, setElectronService] = useState<{
        ipcRenderer?: typeof ipcRenderer;
        childProcess?: typeof childProcess;
    }>({});
    const isElectron = (): boolean => !!(window && window.process && window.process.type);

    useEffect(() => {
        if (isElectron()) {
            const options = {
                ipcRenderer: (window as ElectronWindow).require("electron").ipcRenderer,
                childProcess: (window as ElectronWindow).require("child_process")
            };
            setElectronService(options);

            // Example of using childProcess
            options.childProcess.exec("node -v", (error: Error | null, stdout: string, stderr: string) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout:\n${stdout}`);
            });
        }
    }, []);


    return {
        ...electronService
    };
}

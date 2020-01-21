import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';
export default class MenuBuilder {
    mainWindow: BrowserWindow;
    constructor(mainWindow: BrowserWindow);
    buildMenu(): Menu;
    setupDevelopmentEnvironment(): void;
    buildDarwinTemplate(): MenuItemConstructorOptions[];
    buildDefaultTemplate(): ({
        label: string;
        submenu: ({
            label: string;
            accelerator: string;
            click?: undefined;
        } | {
            label: string;
            accelerator: string;
            click: () => void;
        })[];
    } | {
        label: string;
        submenu: {
            label: string;
            click(): void;
        }[];
    })[];
}
//# sourceMappingURL=menu.d.ts.map
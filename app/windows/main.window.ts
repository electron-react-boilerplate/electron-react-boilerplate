import { BrowserWindow, IpcMainEvent, Menu, Tray } from "electron";
import { inject, injectable } from "inversify";
import "reflect-metadata"; // Import reflect-metadata
import * as path from "node:path";

import { OnAppReady } from "../utils/interfaces/on-app-ready.interface";
import { FileService } from "../utils/services/file.service";
import { MainWindowBaseClass } from "../utils/base-classes/main-window.base-class";
import { TrayListener } from "../utils/decorators/tray-listener.decorator";
import { TrayEventEnum } from "../utils/enums/tray-listener.enum";
import { TrayEventType } from "../utils/types/tray-listener.type";
import { WindowEventEnum } from "../utils/enums/window-listener.enum";
import { WindowListener } from "../utils/decorators/window-listener.decorator";
import { IPCChannelEnum } from "../../shared/enums/ipc-channel.enum";
import { IpcListener } from "../utils/decorators/ipc-listener.decorator";
import { IPCChannelType } from "../../shared/types/ipc-channel.type";

@injectable()
export class MainWindow extends MainWindowBaseClass implements OnAppReady {
    private readonly TRAY_ICON_PATH = "/assets/icons/electron.png";
     private mainWindowBounds = {
        width: 1000,
        height: 600
    };

    constructor(@inject(FileService) private readonly fileService: FileService) {
        super();

    }


    onAppReady() {
        this.createMainWindow();
        this.createTray();
        console.log("app raady");
    }

    private createMainWindow() {
        const window = new BrowserWindow({
            x: 0,
            y: 0,
            width: this.mainWindowBounds.width,
            height: this.mainWindowBounds.height,
            show: true,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: process.env.NODE_ENV === 'development',
                contextIsolation: false,
                backgroundThrottling: false
            }
        });
        this.loadUrl(window, this.fileService.rootPath);
    }

    private createTray() {
        this.tray = new Tray(path.join(this.fileService.rootPath, this.TRAY_ICON_PATH));
     }


    @TrayListener(TrayEventEnum.CLICK)
    @TrayListener(TrayEventEnum.DOUBLE_CLICK)
    onTrayClick([event, bounds]: TrayEventType[TrayEventEnum.CLICK]): void {
        if (this.window) {
            const newBounds = {
                x: bounds.x - (this.mainWindowBounds.width / 2),
                y: bounds.y - this.mainWindowBounds.height - 10,
                width: this.mainWindowBounds.width,
                height: this.mainWindowBounds.height
            };
            this.window.setBounds(newBounds);
            this.window.show();
        }
    }

   /*  @TrayListener(TrayEventEnum.RIGHT_CLICK)
    onTrayRightClick(event: TrayEventType[TrayEventEnum.RIGHT_CLICK]): void {
        const trayMenuConfig = Menu.buildFromTemplate([
            {
                label: "quit",
                click: () => {
                    this.app.quit();
                }
            },
            {
                label: "show",
                click: () => {
                    this.window?.show();
                }
            },
            {
                label: "hide",
                click: () => {
                    this.window?.hide();
                }
            }
        ]);
        this.tray?.popUpContextMenu(trayMenuConfig);
    }

    @WindowListener(WindowEventEnum.BLUR)
    onWindowBlur() {
        this.window?.hide();
    } */
    @IpcListener(IPCChannelEnum.UPDATE_TRAY_TEXT)
    onUpdateText(event: IpcMainEvent, timeLeft: IPCChannelType[IPCChannelEnum.UPDATE_TRAY_TEXT]): void {
        console.log(timeLeft)
        this.tray?.setToolTip(timeLeft);
    }
}



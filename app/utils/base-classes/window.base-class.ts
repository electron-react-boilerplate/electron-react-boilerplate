import { app, BrowserWindow, Tray } from "electron";
import * as fs from "node:fs";
import * as path from "node:path";
import { injectable } from "inversify";
import "reflect-metadata"; // Required for InversifyJS to work properly
import { Observable, ReplaySubject } from "rxjs";
import { URL } from "url";
import { OnAppReady } from "../interfaces/on-app-ready.interface";
  function resolveHtmlPath(htmlFileName: string) {
    if (process.env.NODE_ENV === "development") {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
}
@injectable()
export abstract class WindowBaseClass implements OnAppReady {
    protected window: BrowserWindow | null = null;
    protected tray: Tray | null = null;
    protected readonly app = app;
    private _window$: ReplaySubject<BrowserWindow> = new ReplaySubject<BrowserWindow>();

    constructor() {
        app.whenReady().then(() => this.onAppReady());
    }

    abstract onAppReady(): void;

    protected loadUrl(window: BrowserWindow, absolutePath: string) {
        this.window = window;
        this._window$.next(window);
        this._window$.complete();
        let pathIndex = "./index.html";

        if (fs.existsSync(path.join(absolutePath, "../dist/index.html"))) {
            pathIndex = "../dist/index.html";
        }

        const url = new URL(path.join( resolveHtmlPath(pathIndex)));
        this.window.loadURL(url.href);
    }

    public getWindow(): Observable<BrowserWindow> {
        return this._window$.asObservable();
    }

    /*

        @WindowListener(WindowEventEnum.CLOSED)
        onWindowClose() {
            this.window = null;
        }
    */

}




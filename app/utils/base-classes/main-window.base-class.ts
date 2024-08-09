import {Tray} from "electron";
import "reflect-metadata"; // Required for InversifyJS to work properly
import {injectable} from "inversify";
import {WindowBaseClass} from "./window.base-class";

@injectable()
export abstract class MainWindowBaseClass extends WindowBaseClass {
    protected tray: Tray | null = null;
}

import {Event as ElectronEvent, Rectangle} from 'electron';
import {TrayEventEnum} from "../enums/tray-listener.enum";

export type TrayEventType = {
    [TrayEventEnum.CLICK]: [event: ElectronEvent, bounds: Rectangle];
    [TrayEventEnum.RIGHT_CLICK]: [event: ElectronEvent, bounds: Rectangle];
    [TrayEventEnum.DOUBLE_CLICK]: [event: ElectronEvent, bounds: Rectangle];
    [TrayEventEnum.MOUSE_ENTER]: [];
    [TrayEventEnum.MOUSE_LEAVE]: [];
    [TrayEventEnum.MOUSE_MOVE]: [event: ElectronEvent, bounds: Rectangle];
    [TrayEventEnum.BALLOON_SHOW]: [];
    [TrayEventEnum.BALLOON_CLICK]: [];
    [TrayEventEnum.BALLOON_CLOSED]: [];
    [TrayEventEnum.DROP]: [event: ElectronEvent];
    [TrayEventEnum.DROP_FILES]: [event: ElectronEvent, files: string[]];
    [TrayEventEnum.DROP_TEXT]: [event: ElectronEvent, text: string];
    [TrayEventEnum.DRAG_ENTER]: [event: ElectronEvent];
    [TrayEventEnum.DRAG_LEAVE]: [event: ElectronEvent];
    [TrayEventEnum.DRAG_END]: [event: ElectronEvent];
};

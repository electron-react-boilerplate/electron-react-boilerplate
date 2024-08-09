 

# **React with Electron**
### ***Coding Electron with Structure: Class-Based, Decorators, and Dependency Injection***
## Handling Tray Events with Decorators

Using decorators, you can efficiently manage Tray events. Here’s how you can listen to Tray events using the `@TrayListener` decorator:
### Example: Listening for `click` and `double-click` Events

```typescript
@TrayListener(TrayEventEnum.CLICK)
onTrayClick(event: TrayEventType[TrayEventEnum.CLICK]) { 
    if (this.window?.isVisible()) {
        this.window?.hide();
    } else {
        this.window?.show();
    }
    console.log('Tray clicked');
}

@TrayListener(TrayEventEnum.DOUBLE_CLICK)
onTrayDoubleClick(event: TrayEventType[TrayEventEnum.DOUBLE_CLICK]) {
    console.log('Tray double-clicked');
}
```
## Handling BrowserWindow Events with Decorators

Similarly, you can use decorators to handle BrowserWindow events effectively. For instance, to manage the `close` event, use the `@WindowListener` decorator:
### Example: Listening for the `close` Event

```typescript
@WindowListener(WindowEventEnum.CLOSED)
onWindowClose(event: WindowEventType[WindowEventEnum.CLOSED]) {
    this.window = null;
    console.log('Window closed');
}
```
## Handling IPC Events with Decorators

You can also use decorators to manage IPC events effectively. For example, to handle the `UPDATE_TRAY_TEXT` event from the main process, you can use the `@IpcListener` decorator:

### Listening for the `UPDATE_TRAY_TEXT` IPC Event

```typescript
@IpcListener(IPCChannelEnum.UPDATE_TRAY_TEXT)
onUpdateText(event: IpcMainEvent, timeLeft: IPCChannelType[IPCChannelEnum.UPDATE_TRAY_TEXT]): void {
    console.log(timeLeft);
}

```

## Using ipc hook  

Use the `useElectronService` hook to get ipcRenderer.

### Example: sending a text with `UPDATE_TRAY_TEXT` Event

```typescript 
const { ipcRenderer } = useElectronService();

if (ipcRenderer) {
    ipcRenderer?.send(IPCChannelEnum.UPDATE_TRAY_TEXT, "hello");
}
```

## Dependency Injection

### Define a Service

Use the `@injectable` decorator to mark your classes for dependency injection.

```typescript
import { injectable } from 'inversify';

@injectable()
export class FileService {
    // Implementation
}
```
### Inject Dependencies into Classes

Inject dependencies into your classes using the `@inject` decorator.

```typescript 
@injectable()
export class MainWindow extends MainWindowBaseClass implements OnAppReady {
    private readonly TRAY_ICON_PATH = '/src/assets/icons/favicon.256x256.png';

    constructor(@inject(FileService) protected readonly fileService: FileService) {
        super();
    }

    // Other methods and properties
}
```
### Set Up the DI Container

Configure the DI container with the services you need.

```typescript
const container = useProvide([FileService]);
```
### Resolve the MainWindow Class with Dependencies

Resolve your main class with its dependencies from the container.

```typescript
const mainWindowWithDependencies = container.resolve(MainWindow);
``` 

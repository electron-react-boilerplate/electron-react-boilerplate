import {
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: MenuItemConstructorOptions = { role: 'appMenu' };
    const subMenuEdit: MenuItemConstructorOptions = { role: 'editMenu' };
    const subMenuWindow: MenuItemConstructorOptions = { role: 'windowMenu' };
    const subMenuView: MenuItemConstructorOptions = {
      label: 'View',
      submenu: this.buildViewTemplate(),
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme',
            );
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    };

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildViewTemplate(): MenuItemConstructorOptions[] {
    const development =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true';
    return [
      ...(development
        ? ([
            { role: 'reload' },
            { role: 'toggleDevTools' },
          ] as MenuItemConstructorOptions[])
        : []),
      { role: 'togglefullscreen' },
    ];
  }

  buildDefaultTemplate(): MenuItemConstructorOptions[] {
    const templateDefault: MenuItemConstructorOptions[] = [
      {
        label: '&File',
        submenu: [{ role: 'close' }],
      },
      { role: 'editMenu' },
      {
        label: '&View',
        submenu: this.buildViewTemplate(),
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://electronjs.org');
            },
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/electron/electron/tree/main/docs#readme',
              );
            },
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://www.electronjs.org/community');
            },
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/electron/electron/issues');
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}

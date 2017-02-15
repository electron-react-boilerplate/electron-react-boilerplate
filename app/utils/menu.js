import { openFilePicker, newFile, saveFile } from './nativeDialogs';
import jes from './jesFtp';
const { app } = require('electron').remote;

export default function generateMenuTemplate() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: "CmdOrCtrl+N",
          click() {
            newFile();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Open File',
          accelerator: "CmdOrCtrl+O",
          click() {
            openFilePicker();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save',
          accelerator: "CmdOrCtrl+S",
          click() {
            saveFile(true);
          }
        },
        {
          label: 'Save As',
          accelerator: "Shift+CmdOrCtrl+S",
          click() {
            saveFile(false);
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'minimize'
        },
        {
          label: 'Close Window',
          role: 'close',
          accelerator: "Shift+CmdOrCtrl+W",
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'pasteandmatchstyle'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'View on GitHub',
          click() { require('electron').shell.openExternal('https://github.com/spmcbride1201/keypunch-electron') }
        },
        {
          label: 'Kill FTP',
          click() {jes.disconnect() }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })
    // Edit menu.
    template[1].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Speech',
        submenu: [
          {
            role: 'startspeaking'
          },
          {
            role: 'stopspeaking'
          }
        ]
      }
    )
    // Window menu.
    template[3].submenu = [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Zoom',
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    ]
  }
  return template;
}
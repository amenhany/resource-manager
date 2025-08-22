import { app, BrowserWindow, Menu } from 'electron';
import { ipcWebContentsSend, isDev } from './util.js';

export function createMenu(mainWindow: BrowserWindow) {
    Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            {
                label: process.platform === 'darwin' ? undefined : 'App',
                type: 'submenu',
                submenu: [
                    {
                        label: 'Minimize',
                        accelerator: 'CmdOrCtrl+M',
                        click: () => mainWindow.minimize(),
                    },
                    {
                        label: 'Close Window',
                        accelerator: 'CmdOrCtrl+W',
                        click: () => mainWindow.close(),
                    },
                    {
                        label: 'Quit',
                        accelerator: 'CmdOrCtrl+Q',
                        click: app.quit,
                    },
                ],
            },
            {
                label: 'View',
                type: 'submenu',
                submenu: [
                    {
                        label: 'CPU',
                        accelerator: 'CmdOrCtrl+1',
                        click: () =>
                            ipcWebContentsSend(
                                'changeView',
                                mainWindow.webContents,
                                'CPU'
                            ),
                    },
                    {
                        label: 'RAM',
                        accelerator: 'CmdOrCtrl+2',
                        click: () =>
                            ipcWebContentsSend(
                                'changeView',
                                mainWindow.webContents,
                                'RAM'
                            ),
                    },
                    {
                        label: 'STORAGE',
                        accelerator: 'CmdOrCtrl+3',
                        click: () =>
                            ipcWebContentsSend(
                                'changeView',
                                mainWindow.webContents,
                                'STORAGE'
                            ),
                    },
                    {
                        label: 'DevTools',
                        accelerator: 'CmdOrCtrl+I',
                        click: () => mainWindow.webContents.openDevTools(),
                        visible: isDev(),
                        enabled: isDev(),
                    },
                ],
            },
        ])
    );
}

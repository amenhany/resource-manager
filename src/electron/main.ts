import { app, BrowserWindow, Tray } from 'electron';

import { ipcMainHandle, ipcMainOn, isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath, getUiPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        frame: false,
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(getUiPath());
    }

    pollResources(mainWindow);
    ipcMainHandle('getStaticData', getStaticData);
    ipcMainOn('sendFrameAction', (payload) => {
        switch (payload) {
            case 'CLOSE':
                mainWindow.close();
                break;
            case 'MAXIMIZE':
                mainWindow.maximize();
                break;
            case 'MINIMIZE':
                mainWindow.minimize();
                break;
        }
    });

    createTray(mainWindow);
    createMenu(mainWindow);
    handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
    let willClose = false;

    mainWindow.on('close', (e) => {
        if (willClose) return;
        e.preventDefault();
        mainWindow.hide();
        app.dock?.hide();
    });

    app.on('before-quit', () => {
        willClose = true;
    });

    mainWindow.on('show', () => {
        willClose = false;
    });
}

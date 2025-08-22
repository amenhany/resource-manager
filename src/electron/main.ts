import { app, BrowserWindow, Tray } from 'electron';

import { ipcMainHandle, isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getAssetPath, getPreloadPath, getUiPath } from './pathResolver.js';
import path from 'node:path';
import { createTray } from './tray.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(getUiPath());
    }

    pollResources(mainWindow);
    ipcMainHandle('getStaticData', getStaticData);

    createTray(mainWindow);
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

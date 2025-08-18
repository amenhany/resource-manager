import { ipcMain, WebContents, WebFrameMain } from 'electron';
import { pathToFileURL } from 'node:url';
import { getUiPath } from './pathResolver.js';

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key: Key,
    handler: () => EventPayloadMapping[Key]
) {
    ipcMain.handle(key, (event) => {
        validateEventFrame(event.senderFrame);
        return handler();
    });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    webContents: WebContents,
    payload: EventPayloadMapping[Key]
) {
    webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain | null) {
    if (frame && isDev() && new URL(frame.url).host === 'localhost:5123')
        return;
    if (frame?.url === pathToFileURL(getUiPath()).toString()) return;
    throw new Error('Malicious Event');
}

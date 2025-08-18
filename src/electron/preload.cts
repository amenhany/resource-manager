const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) =>
        ipcRendererOn('statistics', (stats) => {
            callback(stats);
        }),
    getStaticData: () => ipcRendererInvoke('getStaticData'),
} satisfies Window['electron']);

export function ipcRendererInvoke<Key extends keyof EventPayloadMapping>(
    key: Key
): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

export function ipcRendererOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    callback: (payload: EventPayloadMapping[Key]) => void
) {
    const cb = (
        _: Electron.IpcRendererEvent,
        payload: EventPayloadMapping[Key]
    ) => callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}

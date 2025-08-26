import { test, expect, _electron } from '@playwright/test';
import electronPath from 'electron';

let electronApp: Awaited<ReturnType<typeof _electron.launch>>;
let mainPage: Awaited<ReturnType<typeof electronApp.firstWindow>>;

async function waitForPreloadScript() {
    return new Promise((resolve) => {
        const interval = setInterval(async () => {
            const electronBridge = await mainPage.evaluate(
                () => (window as Window & { electron?: any }).electron
            );
            if (electronBridge) {
                clearInterval(interval);
                resolve(true);
            }
        }, 100);
    });
}

test.beforeEach(async () => {
    electronApp = await _electron.launch({
        env: { NODE_ENV: 'development' },
        executablePath: electronPath as unknown as string,
        args: ['.', '--no-sandbox', '--disable-setuid-sandbox'],
    });
    mainPage = await electronApp.firstWindow();
    await waitForPreloadScript();
});

test.afterEach(async () => {
    if (electronApp) await electronApp.close();
});

test('Custom frame should minimize', async () => {
    await mainPage.click('#minimize');
    const isMinimized = await electronApp.evaluate((electron) => {
        return electron.BrowserWindow.getAllWindows()[0].isMinimized();
    });
    expect(isMinimized).toBeTruthy();
});

test('Custom frame should maximize', async () => {
    await mainPage.click('#maximize');
    const isMaximized = await electronApp.evaluate((electron) => {
        return electron.BrowserWindow.getAllWindows()[0].isMaximized();
    });
    expect(isMaximized).toBeTruthy();
});

test('Custom frame should close', async () => {
    await mainPage.click('#close');
    const isVisible = await electronApp.evaluate((electron) => {
        return electron.BrowserWindow.getAllWindows()[0].isVisible();
    });
    expect(isVisible).toBeFalsy();
});

test('Should create a custom menu bar', async () => {
    const menu = await electronApp.evaluate((electron) => {
        return electron.Menu.getApplicationMenu();
    });
    expect(menu).not.toBeNull();
    expect(menu?.items).toHaveLength(2);
    expect(menu?.items[0].submenu?.items).toHaveLength(3);
    expect(menu?.items[1].submenu?.items).toHaveLength(4);
    expect(menu?.items[1].label).toBe('View');
});

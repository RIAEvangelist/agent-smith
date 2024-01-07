import { app, BrowserWindow } from 'electron';
import {dev_mode} from './config_ui.js';

function createWindow() {
    // Create the browser window


    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker:true,
            nodeIntegrationInSubFrames:false,

            disableBlinkFeatures: 'Extensions',

            webgl:false,
            enableWebSQL:false,
        },
    });

    // Load the index.html of the app
    win.loadFile('./ui/smith.html');

    win.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith('file:///')) {
            event.preventDefault(); // Prevent navigation
            console.log('Blocked navigation to:', url);
        }
    });

    win.webContents.on('did-finish-load', () => {
        console.log('Window is loaded!');
        // Perform actions here

        win
    });

    // Open the DevTools if DevTools is enabled
    if (dev_mode) {
        win.webContents.openDevTools();
    }
}

// This method is called when Electron has finished initializing

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Activate the app on a MacOS dock click
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
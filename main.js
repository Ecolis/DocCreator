const path = require ( 'path');
const url = require('url');
const { BrowserWindow, app } = require('electron');
const { ipcMain } = require('electron');

ipcMain.on('restart-app', () => {
    app.relaunch(); // Перезапускаем приложение
    app.exit(0);    // Завершаем текущий процесс
});

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: __dirname + "./img/icon.png",
        autoHideMenuBar: true, 
        webPreferences: {
            preload: path.join(__dirname, 'scripts/preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'html', 'index.html'));

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', ()=>{
        win = null;   
    });
});

app.on('window-all-closed',()=>{
    app.quit();
});



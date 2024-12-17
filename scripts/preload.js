const { contextBridge, ipcRenderer } = require('electron');

// Экспонируем функцию showAlertSync в глобальную область
contextBridge.exposeInMainWorld('electron', {
    showAlertSync: (message) => ipcRenderer.invoke('show-alert-sync', message)
});

contextBridge.exposeInMainWorld('electronAPI', {
    restartApp: () => ipcRenderer.send('restart-app') // Вызываем перезапуск приложения
});
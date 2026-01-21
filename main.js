const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // إذا لم تستخدم، يمكن حذفه
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false
  });

  win.loadFile('index.html');

  win.once('ready-to-show', () => {
    win.show();
  });

  // افتح DevTools إذا أردت تصحيح الأخطاء
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

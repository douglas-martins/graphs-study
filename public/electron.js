const { app, BrowserWindow, shell, ipcMain } = require('electron');
const { platform } = require('os')
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;
const winURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`

const [WINDOW_WIDTH, WINDOW_HEIGHT] = [1200, 720];
// TODO vai ser util para setar aqui o tamanho do canvas
const [MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT] = [300, 180];


const createWindow = () => {

  let mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    minHeight: MIN_WINDOW_HEIGHT,
    show: false,
    alwaysOnTop:true,
    frame: platform() !== 'win32',
    titleBarStyle: 'hiddenInset',
    useContentSize: false,
    resizable: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    }
  });

  mainWindow.setSkipTaskbar(true);
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    ipcMain.on('open-external-window', (event, arg) => {
      shell.openExternal(arg);
    });
  });
};

if (app.dock) app.dock.hide();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('load-page', (event, arg) => {
  mainWindow.loadURL(arg);
});
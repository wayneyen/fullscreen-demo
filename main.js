const electron = require('electron')
const { app, BrowserWindow, screen } = electron
const { ipcMain } = electron
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  win.webContents.openDevTools()
  win.setMenu(null)
  win.loadFile('index.html')

  const displays = screen.getAllDisplays()
  ipcMain.on('getDisplays', (event) => {
    event.reply('displays', displays);
  });

  ipcMain.on('playFullScreen', (event, display, args) => {
    const view = new electron.BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.size.width,
      height: display.size.height,
    })
    view.setFullScreen(true)
    view.setMenu(null)
    view.loadURL(args + '?autoplay=1')
  })
}

app.whenReady().then(() => {
  createWindow()
})

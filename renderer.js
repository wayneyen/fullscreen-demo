const { BrowserView, ipcRenderer } = require('electron')

let displays

ipcRenderer.send('getDisplays');
ipcRenderer.on('displays', (event, ds) => {
  displays = ds

  if (displays[0]) {
    document.getElementById('play-first').disabled = false
  }

  if (displays[1]) {
    document.getElementById('play-second').disabled = false
  }
})

document.getElementById('play-first').addEventListener('click', () => {
  playFullScreen(displays[0])
})

document.getElementById('play-second').addEventListener('click', () => {
  playFullScreen(displays[1])
})

const playFullScreen = (display) => {
  ipcRenderer.send('playFullScreen', display, document.getElementById('yt').src)
}

import path from 'path'
import electron, { Menu, shell } from 'electron'
import trayIcon from 'iconTemplate@2x.png'
import lightTrayIcon from 'iconLightTemplate@2x.png'

export default class Tray extends electron.Tray {
  constructor(app) {
    const icon = process.platform === 'darwin' ? trayIcon : lightTrayIcon
    super(path.resolve(__dirname, icon))
    this.app = app
    this.setToolTip(CONFIG.name)
    this.setContextMenu(this.menu())
  }

  menu() {
    return Menu.buildFromTemplate([
      { label: 'Open Swifty', click: () => this.app.window.show() },
      
      { type: 'separator' },
      { label: 'Quit', role: 'quit' }
    ])
  }
}

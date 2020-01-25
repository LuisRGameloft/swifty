import { Cryptor } from '@swiftyapp/cryptor'
import { ipcMain, dialog } from 'electron'

export const onBackupSelect = function() {
  ipcMain.on('backup:select', () => {
    dialog
      .showOpenDialog({ properties: ['openFile'] })
      .then(({ filePaths, canceled }) => {
        if (canceled) return

        ipcMain.on('backup:password', (event, hashedSecret) => {
          this.cryptor = new Cryptor(hashedSecret)
          if (this.vault.import(filePaths[0], this.cryptor)) {
            this.vault.updateStorageVault(filePaths[0])
            this.sync.initialize(this.vault, this.cryptor)
            return this.authSuccess()
          }
          this.window.webContents.send('backup:password:fail')
        })
        this.window.webContents.send('backup:loaded')
      })
      .catch(() => {})
  })
}

export const onSetupDone = function() {
  ipcMain.on('setup:done', (event, hashedSecret, file) => {
    this.cryptor = new Cryptor(hashedSecret)
    this.vault.updateStorageVault(file)
    this.vault.setup(this.cryptor)
    this.sync.initialize(this.vault, this.cryptor)
    return this.authSuccess()
  })
}

export const onSelectFile = function() {
  ipcMain.on('database:selectFile', (event) => {
    dialog
      .showOpenDialog({ properties: ['promptToCreate'] })
      .then(({ filePaths, canceled }) => {
        if (canceled) return
        
        // reply event
        event.reply('database:selectFilePath', filePaths[0])
      })
      .catch(() => {})
  })
}

export default { onBackupSelect, onSetupDone, onSelectFile }

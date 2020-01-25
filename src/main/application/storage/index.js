import fs from 'fs-extra'
import path from 'path'
import { app } from 'electron'

const appDir = () => {
  return app.getPath('desktop')
}

export default class Storage {
  constructor(file) {
    if (file == null) { 
      return 
    }
    
    this.path = !path.isAbsolute(file) ? path.join(appDir(), file) : file
    fs.ensureFileSync(this.path)
  }

  read() {
    return this.import(this.path)
  }

  write(data) {
    try {
      fs.writeFileSync(this.path, data, { flag: 'w' })
      return true
    } catch (error) {
      return false
    }
  }

  import(path) {
    try {
      return fs.readFileSync(path).toString('utf8')
    } catch (e) {
      return ''
    }
  }

  export(path) {
    //const destination = !path.match(/\.swftx$/) ? `${path}.swftx` : path
    //return fs.copyFileSync(this.path, destination)
    return undefined
  }
}

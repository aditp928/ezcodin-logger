const fs = require('fs')
const chalk = require('chalk')
const EZ = require('./ez-logger')
const config = require('./config').config

class Logger extends EZ{
    constructor() {
        super()

        this.debugColors = {
            error: config.debugColors.error,
            warning: config.debugColors.warning,
            info: config.debugColors.info
        }
        this.filePaths = {
            error: config.filePaths.error,
            warning: config.filePaths.warning,
            info: config.filePaths.info
        }
        this.cb = null; 

        //check for options: debug colors, file paths, and callback
        let args = [...arguments]
        args.map((arg, i) => {
            if (arg.colors) Object.assign(this.debugColors, arg.colors)
            if (arg.paths) Object.assign(this.filePaths, arg.paths)
            if (typeof arg === 'function') this.cb = arg
        })

        if (config.colors.includes(this.debugColors.info) && config.colors.includes(this.debugColors.warning) && config.colors.includes(this.debugColors.error)) {

            //logging event listeners
            this.on(config.events.cError, this.cError)
            this.on(config.events.cWarning, this.cWarning)
            this.on(config.events.cInfo, this.cInfo)
            this.on(config.events.cError, this.lError)
            this.on(config.events.cWarning, this.lWarning)
            this.on(config.events.cInfo, this.lInfo)

            //color code dubug errors
            this.e = chalk.bold[this.debugColors.error]
            this.w = chalk.bold[this.debugColors.warning]
            this.i = chalk.bold[this.debugColors.info]

            //create log files if do not exist
            this.checkFile(this.filePaths.error)
            this.checkFile(this.filePaths.warning)
            this.checkFile(this.filePaths.info)

            //callback with configuration
            this.cb('ezcodin-logger initialized')
            
        } else {
            //callback with error
            if (this.cb) return this.cb({error: 'Please use supported debug colors', ...config.colors})
            return process.stdout.write('Please use supported debug colors: \n', config.colors)
        }

    }
    debug(msg) {
        process.stdout.write(msg + '\n')
    }
    log(path, text, type) {
        this.checkFile(path)
        .then(this.appendFile(path, `${type} ${Date()} ${text} \n`))
        .catch(err=>{ return err })
    }
    debugError(msg){
        this.debug(this.e(`[DEBUG ERROR] ${Date()} ${msg}`))
    }
    debugWarning(msg){
        this.debug(this.w(`[DEBUG WARN] ${Date()} ${msg}`))
    }
    debugInfo(msg){
        this.debug(this.i(`[DEBUG INFO] ${Date()} ${msg}`))
    }
    logError(msg) {
        this.log(this.filePaths.error, msg, config.types.error)
    }
    logWarning(msg) {
        this.log(this.filePaths.warning, msg, config.types.warning)
    }
    logInfo(msg) {
        this.log(this.filePaths.info, msg, config.types.info)
    }
    checkFile(filePath){
        return new Promise((resolve, reject) => {
            fs.exists(filePath, (result) => {
                if (result) return resolve(result)
                fs.writeFile(filePath, `[${filePath}] Created: ${Date()}  \n ez-logger \n \n`, function (err) {
                    if(err) console.log(err)
                    resolve()
                })
                
            })
        }).catch(err => { return err })
    }
    appendFile(filename, text){
        return new Promise((reject, resolve) => {
            fs.appendFile(filename, text, function (err) {
                if (err) return reject(err)
                return Promise.resolve()
            });
        }).catch(err => { return err })
      
    }
}
let log = new Logger({ colors: { error: 'blue' } }, (result) => {
    console.log(result)
})

module.exports = Logger

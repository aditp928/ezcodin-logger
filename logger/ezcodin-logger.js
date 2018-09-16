const EventEmitter  = require('events')


class EZ extends EventEmitter {
    constructor() {
        super()
    }
    //Event Emitters 
    debugError(msg) {
        this.emit('consoleError', msg)
    }
    debugWarning(msg){
        this.emit('consoleWarning', msg)
    }
    debugInfo(msg){
        this.emit('consoleInfo', msg)
    }
    logError(msg){
        this.emit('logError', msg)
    }
    logWarning(msg) {
        this.emit('logWarning', msg)
    }
    logInfo(msg){
        this.emit('logInfo', msg)
    }
}

module.exports = EZ



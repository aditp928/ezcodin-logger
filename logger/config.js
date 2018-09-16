exports.config = {
    colors: ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'],
    debugColors:{
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    },
    filePaths: {
        error: './ez.error.log',
        warning: './ez.warning.log',
        info: './ez.info.log'
    },
    events: {
        cError:     'consoleError',
        cWarning:   'consoleWarning',
        cInfo:      'consoleInfo',
        lError:     'logError',
        lWarning:   'logWarning', 
        lInfo:      'logInfo',
    },
    types: {
        error: '[ERROR]',
        warning: '[WARNING]',
        info: '[INFO]'
    }
}
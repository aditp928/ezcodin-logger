#EZ-LOGGER
This is a very simple logger, that will allow you to console color coded debug statements, in addition to writing to logs to files. Currently three files are created info, warning, and error. Will be adding features over time, collaboraters welcome. 

##Install
```bash
> npm install ezcodin-logger
```
## Log to Console
```javascript
const Log = require('ezcodin-logger')

//without callback or Options
let log = new Log()

//Optional Callback
let log = new Log( result => console.log(result))

//Optional Options object
let options = {
     colors:{
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    },
    filePaths: {
        error: './logs/ez.error.log',
        warning: './logs/ez.warning.log',
        info: './logs/ez.info.log'
    }

}
let log = new Log( options, result => console.log(result))

//With Options object and Callback
let log = new Log( options, result => console.log(result))

log.debugError('debug error')
log.debugWarning('debug warning')
log.debugInfo('debug info')
```
![alt text](./images/console.png)
## Log to File
Log files are created automatically in the root directory, if a logging event is fired.
```javascript
const Log = require('ezcodin-logger')

let log = new Log( result => console.log(result))

log.debugError('console Error')
log.debugWarning('console Warning')
log.debugInfo('Console Info')
```
 **./ez.warning.log**

![alt text](./images/log.png)

## Options Object
Options Object allows for modification of log file paths and names, and debug colors.
```javascript 
let options = {
     colors:{
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    },
    filePaths: {
        error: './logs/ez.error.log',
        warning: './logs/ez.warning.log',
        info: './logs/ez.info.log'
    }

}
let log = new Log( options, result => console.log(result))
```

```bash
# available colors: 
'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright',
'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'
```

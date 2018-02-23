const Config = require('../app.config');
const logPath = '../' + Config.LogInfo.LogLocation;

const fs = require('fs');
const moment = require('moment');

let getCurrentDateFileName = function() {

    let logsLocation = Config.LogInfo.LogLocation;

    if (!fs.existsSync(logsLocation)) {
        fs.mkdirSync(logsLocation);
    }

    return logsLocation + 'Logs_' + moment().format('YYYY_MM_D') + '.log';
}

let loggerService = {
    /***************************************************************************
     * Authenticate the user to check if email password combo exists
     * @param {string} serviceName - Name of the service
     * @param {string} methodName - Name of the method
     * @param {string} errorMessage - Short error message
     * @param {any} errorDetails - Additional data related to the error
     **************************************************************************/
    LogInfo: function(serviceName, methodName, errorMessage, errorDetails = null) {
        let fileName = getCurrentDateFileName();
        let errorLine = 'Service Name: ' + serviceName + ' | ' + 'Method Name: ' + methodName + ' | '
                + "Error Message: " + errorMessage;

        if(errorDetails) {
            errorLine += '\n' + JSON.stringify(errorDetails) + '\n';
        }

        fs.appendFile(fileName, errorLine, (err) => {
            if (err) throw err;
            console.log(err);
        });
    }
}

module.exports = loggerService;
/**********************************************************************
 * Contains all the configuration
 *********************************************************************/

module.exports = {
    // Logger options
    loggerOptions: {
        timeZone: 'Asia/Kolkata',
        folderPath: './logs/',      
        dateBasedFileNaming: true,
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss.SSS',
        logLevel: 'debug',
        onlyFileLogging: false
    },

    // Port number
    portNumber: 5000,

    // PaymentAPI
    paymentAPI: {
        BaseURL: 'http://52.187.24.61:8081/api/'
    },

    // Response source
    responseSource: 'webhook-turbo-chat'
}
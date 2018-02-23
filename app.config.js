/**********************************************************************
 * Contains all the configuration
 *********************************************************************/

// Log errors in file system
const logInfo = {
    LogLocation : './logs/'
};

const paymentAPI = {
    BaseURL: ''
};

// Exported configuration object
const appConfig = {
    LogInfo: logInfo,
    PaymentAPI: paymentAPI
};

module.exports = appConfig;
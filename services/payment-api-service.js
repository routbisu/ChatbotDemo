// Get app configuration
const config            = require('../app.config');
const nodeRest          = require('node-rest-client').Client;
const nodeRestClient    = new nodeRest();
const commonServices    = require('./common');
const log               = require('node-file-logger');

const turboAPIBaseURL = config.paymentAPI.BaseURL;

module.exports = {

    /**
     * @param {*} params params sent from dialog flow
     */
    ProcessRequest: function(res, params) {

        // Default speech.
        let defaultSpeech = 'I am not able to find the information currently. Please try again.';
        let policyNotFound = 'I was not able to find any data for this policy number. Please try again.';

        if(params['policynumber']) {
            let url = turboAPIBaseURL + 'Chatbot/GetPolicyDetails?PolicyNumber=' 
                + params['policynumber'];

            nodeRestClient.get(url, function (data, response) {

                if(data) {
                    log.Info(data);
                    if(data.Error == 0) {
                        let customerName = false;
                        if(data.CustomerContactDetails) {
                            customerName = data.CustomerContactDetails.FirstName;
                        } 

                        let speech;

                        if(data.CustomerID) {
                            speech = customerName ? ('Hi ' + customerName + '.') : '';
                            speech += data.ProductType = ' Policy ' + data.PolicyNumber + ' is valid till ' 
                                + data.PolicyEndDate + ' with total premium $' + data.TotalPremium; 
                        } else {
                            speech = policyNotFound;
                        }                       

                        commonServices.SendResponse(res, speech);

                    } else {
                        commonServices.SendResponse(res, policyNotFound);
                    }
                } else {
                    commonServices.SendResponse(res, policyNotFound);               
                }
            });
        } else {
            commonServices.SendResponse(res, defaultSpeech);
        }
    }
}
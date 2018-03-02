// Get app configuration
const config = require('../app.config');

module.exports = {


    /**
     * Send a response from webhook
     * @param {*} res Response object
     * @param {*} speech Speech text
     * @param {*} contextOut Out context (default = null)
     * @param {*} displayText Display text (default = speech)
     */
    SendResponse(res, speech, contextOut = null, displayText) {
        let response = {
            speech: speech,
            displayText: displayText || speech,
            source: config.responseSource
        };

        if(contextOut) response.contextOut = contextOut;

        return res.json(response);
    }

}
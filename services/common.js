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
    SendResponse(res, speech, contextOut = null, followupEvent = null, displayText) {
        let response = {
            speech: speech,
            displayText: displayText || speech,
            source: config.responseSource
        };

        if(contextOut) response.contextOut = contextOut;
        if(followupEvent) response.followupEvent = followupEvent;

        return res.json(response);
    },

    /**
     * Check if user is already logged in
     * @param {*} result 
     */
    FindSessionPolicyNumber(result) {
        // Find a context called sessionInfo to check if policy number is already provided
        let sessionPolicyNumber = null;

        if(result.contexts) {
            for(i = 0; i < result.contexts.length; i++) {
                if(result.contexts[i].name == 'sessioninfo') {
                    let context = result.contexts[i];
                    if(context.parameters) {
                        if(context.parameters.policynumber) {
                            sessionPolicyNumber = context.parameters.sessionPolicyNumber;
                            break;
                        }
                    }
                }
            }
        }

        return sessionPolicyNumber;
    },

    /**
     * Find context object with a context name
     * @param {*} result 
     * @param {*} contextName 
     */
    FindContext(result, contextName) {
        let context = null;

        if(result.contexts) {
            for(i = 0; i < result.contexts.length; i++) {
                if(result.contexts[i].name == contextName) {
                    context = result.contexts[i];
                    break;
                }
            }
        }

        return context;
    }

}
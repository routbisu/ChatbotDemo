// Get app configuration
const config = require('../app.config');

module.exports = {



    // Return response
    SendResponse(res, speech, displayText) {
        return res.json({
            speech: speech,
            displayText: displayText || speech,
            source: config.responseSource
        });
    }

}
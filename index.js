// =================================================================================
// Dialogflow Chatbot Webhook - Base Setup
// Author  : Biswaranjan Rout
// Date    : 20-Feb-2018
// =================================================================================
"use strict";

// Node Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const nodeRest      = require('node-rest-client').Client;
const log           = require('node-file-logger');

// Get app configuration
const config = require('./app.config');

// Get services
const commonServices = require('./services/common');
const enableCORS = require('./middlewares/enable-cors');

// Get port number
const port = process.env.PORT || config.portNumber;

// Instantiate node modules
const app               = express();
const nodeRestClient    = new nodeRest();
log.SetUserOptions(config.loggerOptions);

try {

  // Configure body parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // CORS Enable all origins
  
  app.use(enableCORS);

  // Main Webhook controller
  app.post("/turbo", function(req, res) {
    // Capture params
    let params = req && req.body && req.body.result && req.body.result.parameters;
    commonServices.SendResponse(res, 'This is a standard response');
  });

  app.listen(port, function() {
    console.log("Server started at port: ", port);
  });

} catch(err) {
  // Fatal error logging
  log.Fatal(err, 'Index')
}

  
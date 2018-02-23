// =================================================================================
// Dialogflow Chatbot Webhook - Base Setup
// Author  : Biswaranjan Rout
// Date    : 20-Feb-2018
// =================================================================================
"use strict";

// Node Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const path          = require('path');
const nodeRest      = require('node-rest-client').Client;

// Get port number
const port = process.env.PORT || 5000;

// Instantiate node modules
const app               = express();
const nodeRestClient    = new nodeRest();

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// CORS Enable all origins
app.use(enableCORS);

// Main Controller
app.post("/turbo", function(req, res) {
  console.log(req.body.result.parameters.Name);
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.Name
      ? req.body.result.parameters.Name
      : "I am not able to get you. Can you say again?";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

app.listen(port, function() {
  console.log("Server started at port: ", port);
});
  
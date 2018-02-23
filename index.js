"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/turbo", function(req, res) {
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

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
  
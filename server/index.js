//Import libraries
const express = require('express');
const cors = require('cors');

//Express instance
const app = express();

//Import config
const cfg = require('./config.json');

//Import sensor handling code
const sensorReadings = require('./sensorReadings');

//Create an array with all sensor names (and therefore endpoint names)
const sensorEndpoints = [];
sensorReadings.sensorArray.forEach(function(sensor) {
    sensorEndpoints.push(sensor.name);
})

//Generate API endpoints for each sensor (With CORS)
sensorReadings.sensorArray.forEach(function(sensor) {
    app.get("/"+sensor.name, cors(), function (req, res) {
        //Read sensor when endpoint is accessed
        res.json({
            "name":sensor.name,
            "temperature":sensor.cachedTemperature.toFixed(1)
        });
    });
});

//Create an endpoint that lists all the currently avalible sensors
app.get("/endpoints", cors(), function(req, res) {
    res.json(sensorEndpoints);
});

//Listener
app.listen(cfg.serverConfig.port, function(){
    console.log('API listening on port ', cfg.serverConfig.port);
});
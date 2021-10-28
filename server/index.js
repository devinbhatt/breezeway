//Import libraries
const express = require('express');

//Express instance
const app = express();

//Import config
const cfg = require('./config.json');

//Import sensor handling code
const sensorReadings = require('./sensorReadings');

//Generate API endpoints for each sensor

sensorReadings.sensorArray.forEach(function(sensor) {
    app.get("/"+sensor.name, function (req, res) {
        //Read sensor when endpoint is accessed
        res.json({
            "name":sensor.name,
            "temperature":sensor.cachedTemperature.toFixed(1)
        });
    });
});

//Listener
app.listen(cfg.serverConfig.port, function(){
    console.log('API listening on port ', cfg.serverConfig.port);
});
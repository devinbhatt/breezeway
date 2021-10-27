//Import libraries
const express = require('express');
const sensorlib = require('node-dht-sensor');

//Express instance
const app = express();

//Import config
const cfg = require('./config.json')

//Generate API endpoints from sensors array
cfg.sensors.forEach(function(sensor) {
    app.get("/"+sensor.name, function (req, res) {
        //Read sensor when endpoint is accessed
        sensorlib.read(sensor.type, sensor.pin, function(err, temperature) {
            if (!err) {
                res.send(temperature.toFixed(1) + '°C');
            }
        });
        res.send(sensor.name); 
    });
});

//Listener
app.listen(cfg.serverConfig.port, function(){
    console.log('API listening on port ', cfg.serverConfig.port);
});
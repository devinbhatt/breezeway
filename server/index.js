//Import libraries
const express = require('express');
const cors = require('cors');
const { program } = require('commander');

//Import sensor handling code
const sensorReadings = require('./sensorReadings');

//Define and parse CLI flags
program
    .option('--enable-api', 'Publish sensor data to HTTP API', false)
    .option('-p, --port <port>', 'Port for HTTP API. Default: 80', '80');
program.parse(process.argv);
const options = program.opts();

//Start reading sensor data
sensorReadings.startReading();
sensorReadings.events.on('sensorUpdate', (sensor) => {
    console.log(`Sensor ${sensor.name}, reading ${sensor.cachedTemperature}`);
});
//Create Express instance if API is enabled
if (options.enableApi) {
    //Express instance
    const app = express();

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
                "temperature":sensor.cachedTemperature.toFixed(1),
                "lastRead":sensor.lastRead
            });
        });
    });

    //Create an endpoint that lists all the currently avalible sensors
    app.get("/endpoints", cors(), function(req, res) {
        res.json(sensorEndpoints);
    });

    //Listener
    app.listen(options.port, function(){
        console.log('API listening on port ', options.port);
    });
}
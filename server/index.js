//Imports
const express = require('express');
const cors = require('cors');
const { program } = require('commander');
const sensorReadings = require('./sensorReadings');
import * as rtdb from './firebaseRTDB';


//Define and parse CLI flags
program
    .option('--enable-api', 'Publish sensor data to HTTP API', false)
    .option('-p, --port <port>', 'Port for HTTP API. Default: 80', '80');
program.parse(process.argv);
const options = program.opts();

//Start reading sensor data
sensorReadings.startReading();

//Initalize RTDB sensor objects from sensor array
sensorReadings.sensorArray.forEach((sensor) => {
    rtdb.initalizeSensor(sensor);
});

//Create event listener that updates RTDB object on sensor update
sensorReadings.events.on('sensorUpdate', (sensor) => {
    rtdb.updateSensor(sensor);
})

//Create Express instance if API is enabled
if (options.enableApi) {
    //Express instance
    const app = express();

    //Create an array with all sensor names (and therefore endpoint names)
    const sensorEndpoints = [];
    sensorReadings.sensorArray.forEach((sensor) => {
            sensorEndpoints.push(sensor.name);
        })

    //Generate API endpoints for each sensor (With CORS)
    sensorReadings.sensorArray.forEach((sensor) => {
            app.get("/" + sensor.name, cors(), (req, res) => {
                    //Read sensor when endpoint is accessed
                    res.json({
                        "name": sensor.name,
                        "temperature": sensor.cachedTemperature.toFixed(1),
                        "lastRead": sensor.lastRead
                    });
                });
        });

    //Create an endpoint that lists all the currently avalible sensors
    app.get("/endpoints", cors(), (req, res) => {
            res.json(sensorEndpoints);
        });

    //Listener
    app.listen(options.port, () => {
            console.log('API listening on port ', options.port);
        });
}
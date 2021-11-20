//Imports
const dhtSensor = require('node-dht-sensor');
const events = require('events')
const cfg = require('./config/sensorConfig.json');

//Create event emitter
const eventEmitter = new events.EventEmitter();

//Add getSensorReadings and null cache to each sensor object
cfg.sensors.forEach((sensor) => {
        sensor.getSensorReadings = (callback) => {
            dhtSensor.read(sensor.type, sensor.pin, function (err, temperature) {
                if (err) {
                    return callback(err);
                }

                callback(null, temperature);
            });
        };

        sensor.cachedTemperature = null;
    })

function startReading() {
    //Update cache values every 2 seconds
    setInterval(() => {
        cfg.sensors.forEach((sensor) => {
                sensor.getSensorReadings((err, temperature) => {
                    if (err) {
                        return console.error(err, "on pin:", sensor.pin);
                    }

                    sensor.cachedTemperature = temperature;
                    sensor.lastRead = Date.now();
                    eventEmitter.emit('sensorUpdate', sensor);
                });
            })
    }, 2000);
}

//Exports
module.exports = {
    sensorArray: cfg.sensors,
    events: eventEmitter,
    startReading
}
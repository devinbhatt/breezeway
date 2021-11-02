//Import library
const dhtSensor = require('node-dht-sensor');

//Import config
const cfg = require('./config.json');

//Add getSensorReadings and null cache to each sensor object
cfg.sensors.forEach(function(sensor) {
    sensor.getSensorReadings = (callback) => {
        dhtSensor.read(sensor.type, sensor.pin, function(err, temperature) {
            if (err) {
                return callback(err)
            }

            callback(null, temperature)
        })
    };

    sensor.cachedTemperature = null;
})

//Update cache values every 2 seconds
setInterval(() => {
    cfg.sensors.forEach(function(sensor) {
        sensor.getSensorReadings((err, temperature) => {
            if (err) {
                return console.error(err, "on pin:", sensor.pin)
            }

            sensor.cachedTemperature = temperature;
        })
    })
}, 2000);

//Export sensor names and caches
exports.sensorArray = cfg.sensors;
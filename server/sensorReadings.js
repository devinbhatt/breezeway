//Import library
const dhtSensor = require('node-dht-sensor');

//Import config
const cfg = require('./config.json');

//Prototype of getSensorReadings function
const getSensorReadings = (callback) => {
    dhtSensor.read(this.type, this.pin, function(err, temperature) {
        if (err) {
            return callback(err)
        }

        callback(null, temperature)
    })
}

//Add getSensorReadings and null cache to each sensor object
cfg.sensors.forEach(function(sensor) {
    sensor.getSensorReadings = getSensorReadings;
    sensor.cachedTemperature = null;
})

//Update cache values every 2 seconds
setInterval(() => {
    cfg.sensors.forEach(function(sensor) {
        sensor.getSensorReadings((err, temperature) => {
            if (err) {
                return console.error(err)
            }

            sensor.cachedTemperature = temperature;
        })
    })
}, 2000);

//Export sensor names and caches
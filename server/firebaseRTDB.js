//Imports
const admin = require('firebase-admin');
const firebaseConfig = require('./config/firebaseConfig.json')


admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.key),
    databaseURL: firebaseConfig.databaseURL
});
const db = admin.database();

//Function to create empty sensor object from supplied sensor name
function initalizeSensor(sensor) {
    db.ref(sensor.name).set({
        name: sensor.name,
        temperature: null,
        lastRead: null
    });
}

//Function to update sensor in database with current values
function updateSensor(sensor) {
    db.ref(sensor.name).update({
        temperature: sensor.cachedTemperature,
        lastRead: sensor.lastRead
    });
}

module.exports = {
    initalizeSensor,
    updateSensor
}
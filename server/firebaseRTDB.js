//Imports
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, update } = require('firebase/database');
const { firebaseConfig } = require('./config/firebaseConfig');

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Function to create empty sensor object from supplied sensor name
function initalizeSensor(sensor) {
    set(ref(db, sensor.name), {
        name: sensor.name,
        temperature: null,
        lastRead: null
    });
}

//Function to update sensor in database with current values
function updateSensor(sensor) {
    update(ref(db, sensor.name), {
        temperature: sensor.cachedTemperature,
        lastRead: sensor.lastRead
    });
}

module.exports = {
    initalizeSensor,
    updateSensor
}
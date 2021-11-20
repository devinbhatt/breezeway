//Imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update } from "firebase/database";
import { firebaseConfig } from './config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Function to create empty sensor object from supplied sensor name
export function initalizeSensor(sensor) {
    set(ref(db, sensor.name), {
        name: sensor.name,
        temperature: null,
        lastRead: null
    });
}

//Function to update sensor in database with current values
export function updateSensor(sensor) {
    update(ref(db, sensor.name), {
        temperature: sensor.cachedTemperature,
        lastRead: sensor.lastRead
    });
}
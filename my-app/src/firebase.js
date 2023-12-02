import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { ref } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAGOa6pkUIPVIbewXuiuCW_sUzuumt8VtU",
    databaseURL: "https://iotgardening-1b09a-default-rtdb.firebaseio.com/",
    projectId: "iotgardening-1b09a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

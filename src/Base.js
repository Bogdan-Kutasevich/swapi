import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxJPf3iiJXDglKwQWLCNZZzT7tNBhfs3k",
    authDomain: "swapi-da62e.firebaseapp.com",
    databaseURL: "https://swapi-da62e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swapi-da62e",
    storageBucket: "swapi-da62e.appspot.com",
    messagingSenderId: "376551312315",
    appId: "1:376551312315:web:28547c554ce9ce3f16929e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);


export default app;

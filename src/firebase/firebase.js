import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHFlmD-MC0rvtaZcRKO83UEjuy9CLrK-E",
    authDomain: "my-app-6beb7.firebaseapp.com",
    projectId: "my-app-6beb7",
    storageBucket: "my-app-6beb7.appspot.com",
    messagingSenderId: "186469739629",
    appId: "1:186469739629:web:a93fbcd69f7a438a07e364"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
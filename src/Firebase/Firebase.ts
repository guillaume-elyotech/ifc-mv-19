import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNV3gcA_RvkPMoMkFs0kkY3k1jJukfALw",
    authDomain: "ifcm-1a069.firebaseapp.com",
    databaseURL: "https://ifcm-1a069-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ifcm-1a069",
    storageBucket: "ifcm-1a069.appspot.com",
    messagingSenderId: "267119589485",
    appId: "1:267119589485:web:f20cef3450d77795362764",
    measurementId: "G-MGE6JFWSQZ"
  };


/*
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
*/
  
  export const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();
  export const auth = getAuth(app);
  export {db};

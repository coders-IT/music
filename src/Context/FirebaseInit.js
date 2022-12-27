import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6NLsiYtcLTLSFMNUUzvgPMK950WFLGZY",
    authDomain: "sampleproject-321915.firebaseapp.com",
    databaseURL: "https://sampleproject-321915-default-rtdb.firebaseio.com",
    projectId: "sampleproject-321915",
    storageBucket: "sampleproject-321915.appspot.com",
    messagingSenderId: "652578540292",
    appId: "1:652578540292:web:f740169833686514bcde51",
    measurementId: "G-Y03V91N6LF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

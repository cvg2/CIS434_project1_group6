//Check link for Firebase JS V9 API reference
//https://firebase.google.com/docs/reference/js

import {
  initializeApp
} from "firebase/app";

import {
  getDatabase, ref, child, get, set, push, update
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEaxXY7t_87fp--qws4u_m325vKwzY10M",

  authDomain: "cis-434-project-1.firebaseapp.com",

  databaseURL: "https://cis-434-project-1-default-rtdb.firebaseio.com",

  projectId: "cis-434-project-1",

  storageBucket: "cis-434-project-1.appspot.com",

  messagingSenderId: "1027144255648",

  appId: "1:1027144255648:web:d527d0874ee77d711d21c5",

  measurementId: "G-0MX2YC4ZEY"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize instance of Firebase Realitime Database
const db = getDatabase(app);
console.log(`[DATABASE]: CONNECTION ESTABLISHED`);

//Assign userId initially to 'null'
var userId = null;

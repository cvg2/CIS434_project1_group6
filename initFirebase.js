//Check link for Firebase JS V9 API reference
//https://firebase.google.com/docs/reference/js

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import {
    getDatabase, ref, child, get, set
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

//NOTE: COMMENT OUT FOR FINAL, THIS IS ONLY FOR INTELLISENSE SUPPORT
//import * as fb from "./firebase/firebase-app.js";
//import * as db from "./firebase/firebase-database.js";

//If cookie contains userId, return it. If not, return null
function getUserId() {
    const cookieList = decodeURIComponent(document.cookie).split("; ");
    var res = null;

    cookieList.forEach(cookie => {
        if (cookie.indexOf("userId") == 0) {
            res = cookie.substring(7);
        }
    });

    return res;
}

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

//Initialize Firebase Realitime Database
const database = getDatabase(app);

//Set unique userId via cookie if no userId cookie is present
if (getUserId() == null) {
    console.log("[NO USER ID FOUND, SETTING A USER ID]");
    const exdays = new Date();
    exdays.setTime(exdays.getTime() + 1000 * 60 * 60 * 24 * 7); //Cookie expiration time is a week
    document.cookie = `userId=${Math.floor(Math.random() * 10000)}; expires=${exdays.toUTCString()};`;
    console.log("[ASSIGNED ID] " +getUserId());
}

//Assign userId from cookie
const userId = getUserId();
console.log("[USER'S ID] " +userId);


//Print database user names in console and add text of user's name in page
const dbRef = ref(database);
get(child(dbRef, "users")).then((snapshot) => {
    snapshot.forEach(user => {
        console.log("[FROM DATABASE] " +user.val().Name);

        //If userId from database matches current user's Id, display name on page
        if (user.key == userId) {
            var newText = document.createElement("p");
            newText.textContent = "Name: " +user.val().Name;
            document.body.appendChild(newText);
        }
    });
});

//Creation of button that enters data to database
const btn = document.createElement("button");
btn.textContent = "ENTER";

//Give button function that pushes data to database and console when clicked
btn.onclick = function() {
    const entry = document.getElementById("entry0").value;
    set(ref(database, `users/${userId}`), {
        Name: entry
    });

    console.log("[USER INPUT] " +entry);
}

//Put button to webpage
document.body.appendChild(btn);
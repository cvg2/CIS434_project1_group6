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

//Class used to interact with user's data in the Firebase Realtime Database (RTDB)
class Database {

  //Retrieves user ID from cookie. If no cookie present, generate new user ID that does
  //not exist in RTDB. Create new entry for newly created user ID with default parameters.
  async returnUserId() {

    //User reference to check if created user ID already present in RTDB
    const dbRef = ref(db);
    const users = (await get(child(dbRef, `users`))).val();

    //Retreive user's cookies in order for ID fetch
    const cookieList = decodeURIComponent(document.cookie).split("; ");
    
    //Assign 'uID' to 'userId' from cookie, if present. If not present, leave as null
    var uID = null;
    cookieList.forEach((cookie) => {
      if (cookie.indexOf("userId") == 0) {
          uID = cookie.substring(7);
      }
    });
  
    //Set unique 'userId' via cookie if no 'userId' cookie is present
    if (uID == null) {
      console.log(`[DATABASE]: NO USER ID FOUND, CREATING NEW USER ID`);
  
      //Generate a unique user ID not already present in RTDB
      do {
        uID = Math.floor(Math.random() * 10000);
      } while(uID in users);
  
      //Generate cookie expiration date
      const exdays = new Date();
      exdays.setTime(exdays.getTime() + 1000 * 60 * 60 * 24 * 365); //Cookie expiration time is a year
      
      //Create cookie with set user ID and expiration date
      document.cookie = `userId=${uID}; expires=${exdays.toUTCString()};`;
      console.log(`[DATABASE]: ASSIGNED ID '${uID}'`);
    }
  
    //If user ID is not in the RTDB, create new entry with default parameters
    if (!(uID in users)) {
      console.log(`[DATABASE]: USER '${uID}' NOT FOUND, CREATING NEW ENTRY`);
  
      set(ref(db, `users/${uID}`), {
        balance: 0,
        expense: 0,
        income: 0,
        transactions: {} //Will not show up in RTDB, assume 'transactions' is empty
      });
    }

    //If user ID is present in RTDB, log to terminal
    else {
      console.log(`[DATABASE]: USER '${uID}' FOUND`);
    }
  
    userId = uID; //Assign user ID to global 'userId' for other Database methods
  }
  
  //Return the data of a specific user
  async getData() {
    const dbRef = ref(db);

    const data = await get(child(dbRef, `users/${userId}/`));

    console.log(`[DATABASE]: DATA RETRIEVED: ${data.val()}`);
    return data.val();
  }

  //Push new user transactions to RTDB. Also returns the transaction ID.
  updateTxns(text, amount) {

    //Get reference to user's transactions
    const txnRef = ref(db, `users/${userId}/transactions`);

    //Get transactions from RTDB, append new transaction to it, update it to RTDB
    const newTxnRef = push(txnRef);
    set(newTxnRef, {
      amount: +amount,
      text: text,
    })

    console.log(`[DATABASE]: DATA CHANGED`);
    return newTxnRef.key;
  }

  //Update user's balance
  updateBalance(balance, income, expense) {

    //Get reference to user's entry in RTDB
    const userRef = ref(db, `users/${userId}`);

    //Prepare updates
    const newBalance = {
      balance: balance,
      income: income,
      expense: expense
    };

    update(userRef, newBalance);
  }
}

export default Database;

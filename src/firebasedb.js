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

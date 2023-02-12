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

//TODO: Make sure userId generated does not already exist in RTDB
//Set unique userId via cookie if no userId cookie is present
if (getUserId() == null) {
  console.log(`[DATABASE]: NO USER ID FOUND, CREATING NEW USER ID`);
  const exdays = new Date();
  exdays.setTime(exdays.getTime() + 1000 * 60 * 60 * 24 * 365); //Cookie expiration time is a year
  document.cookie = `userId=${Math.floor(Math.random() * 10000)}; expires=${exdays.toUTCString()};`;
  console.log(`[DATABASE]: ASSIGNED ID \'${getUserId()}\'`);
}

//Assign userId from cookie
const userId = getUserId();
findUser();

//If cookie contains userId, return it. If not, return null
function getUserId() {
  const cookieList = decodeURIComponent(document.cookie).split("; ");
  var res = null;

  cookieList.forEach((cookie) => {
      if (cookie.indexOf("userId") == 0) {
          res = cookie.substring(7);
      }
  });

  return res;
}

//If user found, return 'true'. If not, create user entry in RTDB and return 'false'.
async function findUser() {
  const dbRef = ref(db);
  const foundId = await get(child(dbRef, `users/${userId}`));
  
  if (foundId.val() == null) {
    console.log(`[DATABASE]: USER \'${userId}\' NOT FOUND, CREATING NEW ENTRY`);

    set(ref(db, `users/${userId}`), {
      balance: 0,
      expense: 0,
      income: 0,
      transactions: {} //Will not show up in RTDB, assume 'transactions' is empty
    });

    return false;
  }
  else {
    console.log(`[DATABASE]: USER \'${userId}\' FOUND`);
    return true;
  }
}

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
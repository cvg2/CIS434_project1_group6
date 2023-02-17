import React, { Component } from 'react';
import Database from './firebasedb';
import './App.css';

//Import of components
import Balanace from './components/Balance'
import History from './components/History';
import UserInput from './components/UserInput';

class App extends Component {
  constructor() {
    super();

    //Connect to RTDB
    this.db = new Database();
    
    //Initialize state to default parameters
    this.state = {
      balance: 0,
      income: 0,
      expense: 0,
      transactions: {}
    };
  }

  //Add data from RTDB to state and rerender components
  componentDidMount() {
    this.db.getData().then((data) => {
      this.setState(data);
    });
  }

  //Add new transactions to RTDB and webpage
  addTxn(txn) {

    //Guard condition for invalid entries (empty fields, non-numbers)
    if (txn.text.length == 0 || (isNaN(txn.amount) || txn.amount.length == 0) ) {
      console.log(`[ERROR]: INVALID ENTRY`)
      return null;
    }

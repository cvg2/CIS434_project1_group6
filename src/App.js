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
    
    //Get user ID, then get user's data from RTDB
    this.db.returnUserId().then(() => {
      this.db.getData().then((data) => {
        this.setState(data);
      });
    });
  }

  //Add new transactions to RTDB and webpage
  addTxn(txn) {
    txn.amount = (+txn.amount).toFixed(2);

    //Guard condition for invalid entries (empty fields, non-numbers)
    if (txn.text.length == 0 || (isNaN(txn.amount) || txn.amount.length == 0) ) {
      console.log(`[ERROR]: INVALID ENTRY`);
      alert("Invalid entry.");
      return null;
    }
    
   
    //Prepare new balance entries
    const newBalance = +(+this.state.balance + +txn.amount).toFixed(2);
    const newIncome = +(+this.state.income + (+txn.amount > 0 ? +txn.amount : 0)).toFixed(2);
    const newExpense = +(+this.state.expense + (+txn.amount < 0 ? +txn.amount : 0)).toFixed(2);

    //Guard against transactions that will cause balance to go negative
    if (newBalance < 0) {
      console.log(`[ERROR]: BALANCE CANNOT GO BELOW 0`);
      alert("New transaction cancelled, balance cannot drop below $0.");
      return null;
    }
    
    //Send new balance entries to RTDB
    this.db.updateBalance(newBalance, newIncome, newExpense);

    //Send new transaction to RTDB
    const txnId = this.db.updateTxns(txn.text, txn.amount); //Get transaction ID

    //Prepare new transaction entry for local state
    const newTxns = this.state.transactions;
    newTxns[txnId] = {
      amount: +(txn.amount),
      text: txn.text
    };

    //Set local state to new entries (NOTE: will cause rerender of page)
    this.setState({
      balance: newBalance,
      income: newIncome,
      expense: newExpense,
      transactions: newTxns
    });
  }
  
  //        CODE BY MICHAEL STARTS
  
  //Remove a transaction from RTDB and webpage
  removeTxn(tid) {
    const newTxns = this.state.transactions;
    const txn = newTxns[tid];

    //Prepare new balance entries
    const newBalance = +(+this.state.balance - +txn.amount).toFixed(2);
    const newIncome = +(this.state.income - (+txn.amount > 0 ? +txn.amount : 0)).toFixed(2);
    const newExpense = +(+this.state.expense - (+txn.amount < 0 ? +txn.amount : 0)).toFixed(2);

    //Guard against remove requests that will cause balance to go negative
    if (newBalance < 0) {
      console.log(`[ERROR]: BALANCE CANNOT GO BELOW 0`);
      alert("Transaction cannot be removed, balance cannot drop below $0.");
      return null;
    }

    //Send new balance entries to RTDB
    this.db.updateBalance(newBalance, newIncome, newExpense);

    //Remove transaction from user's transaction list
    this.db.removeTxn(tid);

    const elem = document.getElementById(tid);
    elem.parentNode.removeChild(elem);

    this.setState({
      balance: newBalance,
      income: newIncome,
      expense: newExpense,
      transactions: newTxns
    });
  }
  
  //        CODE BY MICHAEL ENDS

  render() {
    return (
      <div className="container p-4">
        <h1>Expense Tracker by Group 6</h1>
        <Balanace 
          balance={this.state.balance} 
          income={this.state.income} 
          expense={this.state.expense}
        />
        <UserInput app={this} addTxn={this.addTxn}/>
        <History app={this} removeTxn={this.removeTxn} transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default App;

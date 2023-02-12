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

    //Prepare new balance entries
    const newBalance = this.state.balance + +(txn.amount);
    const newIncome = this.state.income + (+(txn.amount) > 0 ? +(txn.amount) : 0);
    const newExpense = this.state.expense + (+(txn.amount) < 0 ? +(txn.amount) : 0);

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

  render() {
    return (
      <div className="App">
        <h1>Expense Tracker by Group 6</h1>
        <Balanace 
          balance={this.state.balance} 
          income={this.state.income} 
          expense={this.state.expense}
        />
        <History transactions={this.state.transactions}/>
        <UserInput app={this} addTxn={this.addTxn}/>
      </div>
    );
  }
}

export default App;
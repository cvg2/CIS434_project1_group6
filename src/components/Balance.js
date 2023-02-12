import React, { Component } from "react";

class Balance extends Component {
    render() {
        return (
            <div className="Balance">
                <h1>BALANCE</h1>
                <p> 
                    Balance: {this.props.balance} <br/>
                    Income: {this.props.income} <br/>
                    Expense: {this.props.expense}
                </p>
            </div>
        );
    }
}

export default Balance;
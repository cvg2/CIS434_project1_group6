import React, { Component } from "react";

//Import of subcomponent
import Transaction from "./Transaction";

class History extends Component {
    render() {
        return (
            <div className="History">
                <h1>History</h1>
                <div className="TransactionCont">
                    {Object.keys(this.props.transactions).map((key) => {
                        return (
                            <Transaction key={key} tid={key} data={this.props.transactions[key]}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default History;
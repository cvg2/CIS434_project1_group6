import React, { Component } from "react";

class Transaction extends Component {
    render() {
        const {text, amount} = this.props.data;

        return (
            <div className="Transaction">
                <p>
                    ID: {this.props.tid}, Text: {text}, Amount: {amount}
                </p>
            </div>
        );
    }
}

export default Transaction;
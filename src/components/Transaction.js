import React, { Component } from "react";

class Transaction extends Component {
    render() {
        const {text, amount} = this.props.data;
        const tid = this.props.tid;

        return (
            <tr id={tid} className={`transaction ${this.props.className}`}>
                <td className="delButton"><button onClick={this.props.removeTxn.bind(this.props.app, tid)}>&#x2A09;</button></td>
                <td>{text}</td>
                <td className="alignRight">{amount.toLocaleString('en-US', {style: 'currency', currency: 'USD',
                            minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
             </tr>
        );
    }
}

export default Transaction;

import React, { Component } from "react";

class Transaction extends Component {
    render() {
        const {text, amount} = this.props.data;

        return (
            <tr className={`transaction ${this.props.className}`}>
                <td>{text}</td>
                <td className="alignRight">{amount.toLocaleString('en-US', {style: 'currency', currency: 'USD',
                            minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
             </tr>
        );
    }
}

export default Transaction;

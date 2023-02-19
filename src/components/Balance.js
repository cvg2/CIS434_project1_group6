import React, { Component } from "react";

class Balance extends Component {
    render() {
        return (
            <div>
                <div className="card card-body col-md-8 mt-4">
                    <h4>YOUR BALANCE</h4>
                    <div>
                        <h3><strong>{this.props.balance.toLocaleString('en-US', {style: 'currency', currency: 'USD',
                                    minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></h3>
                        <div className="bg-light p-3 shadow-lg">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td><h4>INCOME</h4></td>
                                        <td><h4>EXPENSE</h4></td>
                                    </tr>
                                    <tr>
                                        <td className="green"><strong><h5>{this.props.income.toLocaleString('en-US', {style: 'currency', currency: 'USD',
                                            minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5></strong></td>
                                        <td className="text-danger"><strong><h5>{this.props.expense.toLocaleString('en-US', {style: 'currency', currency: 'USD',
                                            minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5></strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>      
        );
    }
}

export default Balance;

import React, { Component } from "react";

class UserInput extends Component {
    state = {
        text: "",
        amount: ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form className="card card-body col-md-8 mt-4">
                    <h4>Add new transaction
                        <hr></hr>
                    </h4>
                    <h5>Text</h5>
                    <div className="form-group">
                        <input className="form-control" type="text" name="text" placeholder="Description" 
                            onChange={this.onChange} value = {this.state.text}/>
                    </div>
                    <h5 className="mt-3">Amount</h5>
                    <h5>(negative - expense, positive - income)</h5>
                    <input className="form-control" type="number" name="amount" placeholder="Amount"
                        onChange={this.onChange} value = {this.state.amount}/>
                    <input className="btn btn-primary btn-block btn-lg mt-3" type="button" value="Add transaction" 
                        onClick={this.props.addTxn.bind(this.props.app, this.state)}/>
                </form>
            </div>
        );
    }
}

export default UserInput;

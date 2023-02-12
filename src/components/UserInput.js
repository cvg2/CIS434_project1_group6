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
            <div className="UserInput">
                <h1>UserInput</h1>
                <div className="UserInputCont">
                    <h2>Text</h2>
                    <input 
                        id="text" 
                        name="text"
                        placeholder="Enter Text"
                        onChange={this.onChange}
                    />
                    <h2>Amount</h2>
                    <input 
                        id="amount" 
                        name="amount"
                        placeholder="Enter Amount"
                        onChange={this.onChange}
                    />
                </div>
                <button onClick={this.props.addTxn.bind(this.props.app, this.state)}>
                    ADD TRANSACTION
                </button>
            </div>
        );
    }
}

export default UserInput;
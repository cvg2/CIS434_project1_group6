import React, { Component } from "react";

//Import of subcomponent
import Transaction from "./Transaction";

class History extends Component {
    render() {
        return (     
        <div>
        <div className="card card-body col-md-8 mt-4">
            <h4>History
                <hr></hr>
            </h4>
            <div className="container"> 
                <table className="table table-bordeless">
                    <tbody>
                        {Object.keys(this.props.transactions).map((key) => {
                            return (
                                <Transaction key={key} tid={key} data={this.props.transactions[key]}/>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>  
        );
    }
}

export default History;

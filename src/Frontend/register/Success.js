import React from 'react';
<<<<<<< HEAD
import NavBar from '../NavBar';
import axios from 'axios';
import ipList from '../../Config/ipConfig'
=======
import './register.css';

>>>>>>> e88383234928c8e695c59cc59422f88476b2c4b8
export class Success extends React.Component {

    constructor(props) {
        super(props);
        this.sendFormToDatabase = this.sendFormToDatabase.bind(this);
    }

    sendFormToDatabase() {
        //Use for get fieldValues ==> var [fieldName] = this.props.fieldValues.[fieldName];
        return true;
    }

    render() {
        if (this.sendFormToDatabase()) {
            return (
                <div>
                    <h1>
                        Success
                    </h1>
                    <a href = {"./"}>Click here to go back to Home</a>
                </div>
            );
        }
        else {
            return (
                < div >
                    <h1>
                        Not Success
                    </h1>
                </div >
            );
        }
    };
}

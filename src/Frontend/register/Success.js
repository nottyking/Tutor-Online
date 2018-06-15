import React from 'react';
import NavBar from '../NavBar';
import axios from 'axios';
import ipList from '../../Config/ipConfig'
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
                    <button>Home</button>
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

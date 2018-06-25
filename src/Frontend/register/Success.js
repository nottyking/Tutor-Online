import React from 'react';
import './Register.css';
import ipList from '../../Config/ipConfig'
import axios from 'axios'
import {NavLink} from 'reactstrap'
import {Link} from 'react-router-dom';

export class Success extends React.Component {

    constructor(props) {
        super(props);
        this.sendFormToDatabase = this.sendFormToDatabase.bind(this);
    }

    async sendFormToDatabase() {
        //Use for get fieldValues ==> var [fieldName] = this.props.fieldValues.[fieldName];
        var isSendSuccess = (await axios.post(ipList.backend + '/register/registerAsStudent' , {
          username:this.props.fieldValues.username, password:this.props.fieldValues.password, email:this.props.fieldValues.email,
          fname:'-', lname:'-', address:'-', birthday:'-', gender:'-'
        })).data
        return isSendSuccess.result;
    }

    render() {
        if (this.sendFormToDatabase()) {
            return (
                <div>
                    <h1>
                        Success
                    </h1>
                    <NavLink tag={Link} to={'/'} exact>Click here to go back to Home</NavLink>
                </div>
            );
        }
        else {
            return (
                < div >
                    <h1>
                        Not Success
                    </h1>
                        <NavLink tag={Link} to={'/'} exact>Click here to go back to Home</NavLink>
                </div >
            );
        }
    };
}

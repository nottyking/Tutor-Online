import React from 'react';
import { Redirect } from 'react-router'
import './Register.css';
import ipList from '../../Config/ipConfig'
import axios from 'axios'
import {NavLink} from 'reactstrap'
import {Link} from 'react-router-dom';

export class Success extends React.Component {

    constructor(props) {
        super(props);
        this.sendFormToDatabase = this.sendFormToDatabase.bind(this);
        this.state = {
          redirect: ""
        }
    }

    async sendFormToDatabase() {
        //Use for get fieldValues ==> var [fieldName] = this.props.fieldValues.[fieldName];
        var isSendSuccess = (await axios.post(ipList.backend + '/register' , {
          username:this.props.fieldValues.username, password:this.props.fieldValues.password, email:this.props.fieldValues.email,
          fname:'-', lname:'-', address:'-', birthday:'-', gender:'-'
        })).data
        console.log("ASD:",isSendSuccess);
        if(isSendSuccess.redirect){
          this.setState({
            redirect:isSendSuccess.redirect
          })
        }
        else
          return isSendSuccess.result;
    }

    render() {
        if(this.state.redirect !== ""){
            return <Redirect to={this.state.redirect}/>;
        }
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

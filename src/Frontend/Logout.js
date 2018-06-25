import React from 'react';
import { Button } from 'reactstrap';
import './Login.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isModal: false, msg: '', loginValid: false, defaultLoginState: true }
        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <div align='right'>
                <Button onClick={this.logout} color='danger'>Log Out</Button>
            </div>
        );
    }

    logout() {
        if (true) {//Check bha bha
            cookies.remove('loginToken');
            this.props.logout();
        }
    }
}

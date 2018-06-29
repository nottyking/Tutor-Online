import React from 'react';
import './Register.css';
import {NavLink} from 'reactstrap'
import {Link} from 'react-router-dom';

export class Success extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        this.props.initializeValue();
        if (localStorage.getItem('user') === JSON.stringify('RegisterComplete')) {
            return (
                <div>
                    <h1>
                        Success, Please confirm your account on your E-mail
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

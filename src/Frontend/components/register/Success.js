import React from 'react';
import './Register.css';
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom';

export class RegisterSuccess extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        this.props.initializeValue();
        return (
            <div>
                <h1>
                    Success, Please confirm an account on your E-mail
                    </h1>
                <NavLink tag={Link} to={'/'} exact>Click here to go back to Home</NavLink>
            </div>
        );
    };
}
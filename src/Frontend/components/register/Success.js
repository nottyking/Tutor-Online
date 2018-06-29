import React from 'react';
import './Register.css';
import {NavLink} from 'reactstrap'
import {Link} from 'react-router-dom';

export class Success extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (true) {
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

import React from 'react'

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthorizeActions } from './../../redux/actions/AuthorizeAction';
import { connect } from 'react-redux';

class AuthToken extends React.Component {
    constructor(props) {
        super(props);
        this.checkToken = this.checkToken.bind(this);
    }

    async checkToken() {
        this.props.checkValidToken();
    }

    render() {
        //initial New Dev branch
        const user = localStorage.getItem('user');
        const admin = localStorage.getItem('admin');
        console.log('GET LOCAL STORAGE FOR CHECKING!!!')

        var checkToken = this.checkToken();
        //Check for remove localstorage when loss cookie
        if (!(checkToken.type === "CHECK_TOKEN_VALID") /*Token is {invalid} or {loss} or {not match role}*/) {
            if (user) {
                localStorage.removeItem('user');
            } else if (admin) {
                localStorage.removeItem('admin');
            }
        }

        return ;
    }
}

function mapDispatchToProps(dispatch) {
    const checkValidToken = AuthorizeActions.checkValidToken;
    return { checkValidToken: () => dispatch(checkValidToken()) };
}

export default connect(null, mapDispacthToProps)(AuthToken);
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

        //console.log('GET LOCAL STORAGE FOR CHECKING!!!')
        const user = localStorage.getItem('user');
        const admin = localStorage.getItem('admin');

        //Check for remove localstorage when loss cookie
        var checkToken = await this.props.checkValidToken();
        if (!(checkToken.type === "CHECK_TOKEN_VALID") /*Token is {invalid} or {loss} or {not match role}*/) {
            if (user) {
                localStorage.removeItem('user');
            } else if (admin) {
                localStorage.removeItem('admin');
            }
        }
    }

    render() {
        this.checkToken();
        return(<div></div>);
    }
}

function mapDispacthToProps(dispatch) {
    const checkValidToken = AuthorizeActions.checkValidToken;
    return { checkValidToken: () => dispatch(checkValidToken()) };
}

export default connect(null, mapDispacthToProps)(AuthToken);
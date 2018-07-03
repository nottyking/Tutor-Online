import React from 'react'

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthorizeActions } from './../../redux/actions/AuthorizeAction';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AuthToken extends React.Component {
    constructor(props) {
        super(props);
        this.checkToken = this.checkToken.bind(this);
    }

    async checkToken() {

        //console.log('GET LOCAL STORAGE FOR CHECKING!!!')
        const user = localStorage.getItem('user');

        //Check for remove localstorage when loss cookie
        var checkToken = await this.props.checkValidToken();
        if (!(checkToken.type === "CHECK_TOKEN_VALID") /*Token is {invalid} or {loss} or {not match role}*/) {
            localStorage.removeItem('user');
            cookies.remove("loginToken");
        }
    }

    render() {
        this.checkToken();
        return (<div></div>);
    }
}

function mapDispacthToProps(dispatch) {
    const checkValidToken = AuthorizeActions.checkValidToken;
    return { checkValidToken: () => dispatch(checkValidToken()) };
}

export default connect(null, mapDispacthToProps)(AuthToken);

import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect, Switch } from 'react-router';

import { AboutUs } from './../content/About_us';
import { Content } from './../content/Content';
import { CourseA } from './../course/CourseA';
import { Student } from './../student/StudentPage';
import { Learning } from './../course/Learning';
import LoginPage from './../loginPanel/LoginPage';
import { RegisterPage } from './../register/RegisterPage';
import { Admin } from './../admin/Admin';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthorizeActions } from './../../redux/actions/AuthorizeAction';
import { connect } from 'react-redux';

class BrowserRouterManager extends React.Component {

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

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Content} />
                    <Route exact path="/about_us" component={AboutUs} />
                    <Route exact path="/course" component={CourseA} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/course/:courseID" component={CourseA} />
                    <Route exact path="/student" component={(user || admin) ? Student : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/learning" component={(user || admin) ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/learning/:courseID/:subcourseID" component={(user || admin) ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/register" component={!(user || admin) ? RegisterPage : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path='/loginPage' component={!(user || admin) ? LoginPage : () => { return (<Redirect to={'/'} />) }} />
                    <Route component={Content} />
                </Switch>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    const checkValidToken = AuthorizeActions.checkValidToken;
    return { checkValidToken: () => dispatch(checkValidToken()) };
}

export default connect(null, mapDispatchToProps)(BrowserRouterManager);
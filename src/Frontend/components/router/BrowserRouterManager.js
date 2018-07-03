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

class BrowserRouterManager extends React.Component {

    render() {
        var userType;
        const user = localStorage.getItem('user');
        if (!user) {
            userType = "guest";
        } else if (JSON.parse(user).role === "0") {
            userType = "user";
        } else if (JSON.parse(user).role === "1") {
            userType = "admin";
        } else {
            userType = "unauthorized"
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Content} />
                    <Route exact path="/about_us" component={AboutUs} />
                    <Route exact path="/admin" component={(userType === "admin") ? Admin : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path="/course/:courseID" component={CourseA} />
                    <Route exact path="/student" component={(userType === "user" || userType === "admin") ? Student : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/learning" component={(userType === "user" || userType === "admin") ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/learning/:courseID/:subcourseID" component={(userType === "user" || userType === "admin") ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/register" component={!(userType === "user" || userType === "admin") ? RegisterPage : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path='/loginPage' component={!(userType === "user" || userType === "admin") ? LoginPage : () => { return (<Redirect to={'/'} />) }} />
                    <Route component={Content} />
                </Switch>
            </div >
        );
    }
}

export default BrowserRouterManager;
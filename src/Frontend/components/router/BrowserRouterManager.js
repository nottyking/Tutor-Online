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
        const user = localStorage.getItem('user');
        const admin = localStorage.getItem('admin');
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

export default BrowserRouterManager;
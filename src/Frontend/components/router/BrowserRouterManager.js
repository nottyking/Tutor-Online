import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect, Switch } from 'react-router';

import { AboutUs } from './../content/About_us';
import { Content } from './../content/Content';
import { CourseA } from './../course/CourseA';
import { PackageA } from './../course/PackageA';
import { Student } from './../student/StudentPage';
import { Learning } from './../course/Learning';
import LoginPage from './../loginPanel/LoginPage';
import { RegisterPage } from './../register/RegisterPage';
import { securityControl} from '../../redux/helpers'

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { CoursePageList } from './../course/CoursePageList';
import { AdminManageUsers } from './../admin/AdminManageUsers';
import { AdminManageCourses } from './../admin/AdminManageCourses';
import { AdminManagePackages } from './../admin/AdminManagePackages';
import { AdminManageDiscounts } from '../admin/AdminManageDiscount';
import { AdminManageFirstPage } from '../admin/AdminManageFirstPage';

class BrowserRouterManager extends React.Component {

    render() {
        var userType;
        const user = localStorage.getItem('user');
        if (!user) {
            userType = "guest";
        } else {
            var decryptedUser = securityControl.decryptWithSecretkey(user, "userKey");
            if (decryptedUser.role == 0) {
                userType = "user";
            } else if (decryptedUser.role == 1) {
                userType = "admin";
            } else {
                userType = "unauthorized"
            }
        }
        return (
            <div style={{ minHeight: window.innerHeight - (270) }}>
                <Switch>
                    <Route exact path="/" component={Content} />
                    <Route exact path="/about_us" component={AboutUs} />
                    <Route exact path="/course/:courseID" component={CourseA} />
                    <Route exact path="/course" component={CoursePageList} />
                    <Route exact path="/package/:packageID" component={PackageA} />

                    <Route exact path="/student" component={(userType === "user" || userType === "admin") ? Student : () => { return (<Redirect to={'/loginPage'} />) }} />
                    {/* <Route exact path="/learning" component={(userType === "user" || userType === "admin") ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} /> */}
                    <Route exact path="/learning/:courseID/:subcourseID" component={(userType === "user" || userType === "admin") ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
                    <Route exact path="/register" component={!(userType === "user" || userType === "admin") ? RegisterPage : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path='/loginPage' component={!(userType === "user" || userType === "admin") ? LoginPage : () => { return (<Redirect to={'/'} />) }} />

                    <Route exact path="/admin" component={(userType === "admin") ? AdminManageCourses : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path="/admin_manage_user" component={(userType === "admin") ? AdminManageUsers : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path="/admin_manage_course" component={(userType === "admin") ? AdminManageCourses : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path="/admin_manage_package" component={(userType === "admin") ? AdminManagePackages : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path="/admin_manage_discount" component={(userType === "admin") ? AdminManageDiscounts : () => { return (<Redirect to={'/'} />) }} />
                    <Route exact path="/admin_manage_firstpage" component={(userType === "admin") ? AdminManageFirstPage : () => { return (<Redirect to={'/'} />) }} />
                    <Route component={Content} />
                </Switch>
            </div >
        );
    }
}

export default BrowserRouterManager;
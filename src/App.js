import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Redirect, Switch, Router } from 'react-router';

import { AboutUs } from './Frontend/components/content/About_us';
import { Content } from './Frontend/components/content/Content';
import { CourseA } from './Frontend/components/course/CourseA';
import { Student } from './Frontend/components/student/StudentPage';
import { Learning } from './Frontend/components/course/Learning';
import LoginPage from './Frontend/components/loginPanel/LoginPage';
import { RegisterPage } from './Frontend/components/register/RegisterPage';
import { Footer } from './Frontend/components/footer/Footer';
import { Admin } from './Frontend/components/admin/Admin';
import browserHistory from './Frontend/redux/helpers/history'

import './App.css'
import NavBar from './Frontend/components/bar/NavBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthorizeActions } from './Frontend/redux/actions/AuthorizeAction';
import { connect } from 'react-redux';

class BrowserRouterManager extends React.Component {

  constructor(props) {
    super(props);
    this.checkToken = this.checkToken.bind(this);
  }

  async checkToken() {
    await this.props.checkValidToken();
  }

  render() {
    //initial New Dev branch
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');

    var checkToken = this.checkToken();
    //Check for remove localstorage when loss cookie
    if (checkToken.type === "CHECK_TOKEN_VALID" /*Token is {invalid} or {loss} or {not match role}*/) {
      if (user) {
        localStorage.removeItem('user');
      } else if (admin) {
        localStorage.removeItem('user');
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

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Router history={browserHistory}>
          <div style={{ backgroundColor: '#222' }}>
            <Route path='/' render={() => <NavBar str={`TEST`} />} />
            <BrowserRouterManager />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const checkValidToken = AuthorizeActions.checkValidToken;
  return { checkValidToken: () => dispatch(checkValidToken) };
}

export default connect(null, mapDispatchToProps)(App);
import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Redirect, Switch } from 'react-router';

import { AboutUs } from './Frontend/components/content/About_us';
import { Content } from './Frontend/components/content/Content';
import { CourseA } from './Frontend/components/course/CourseA';
import { Student } from './Frontend/components/student/StudentPage';
import { Learning } from './Frontend/components/course/Learning';
import { LoginPage } from './Frontend/components/loginPanel/LoginPage';
import { Register } from './Frontend/components/register/Register';
import { Footer } from './Frontend/components/footer/Footer';

import './App.css'
import NavBar from './Frontend/components/bar/NavBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class BrowserRouterManager extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Content} />
          <Route exact path="/about_us" component={AboutUs} />
          <Route exact path="/course" component={CourseA} />
          <Route exact path="/course/:courseID" component={CourseA} />
          <Route exact path="/student" component={true ? Student : () => { return (<Redirect to={'/loginPage'} />) }} />
          <Route exact path="/learning" component={true ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
          <Route exact path="/learning/:courseID/:subcourseID" component={true ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
          <Route exact path="/register" component={!false ? Register : () => { return (<Redirect to={'/'} />) }} />
          <Route exact path='/loginPage' component={!false ? LoginPage : () => { return (<Redirect to={'/'} />) }} />
          <Route component={Content} />
        </Switch>
      </div >
    );
  }
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isLogin: false } // For eazy implementation in other href
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    this.setState({ isLogin: true })
    console.log('login in app');
  }

  logout() {
    this.setState({ isLogin: false })
    console.log('logout in app');
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div style={{ backgroundColor: '#222' }}>
            <Route path='/' render={() => <NavBar
              str={`TEST`}
              loginStatus={this.state.isLogin}
              login={this.login}
              logout={this.logout} />} />
            <BrowserRouterManager />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Redirect, Switch,Router } from 'react-router';

import { AboutUs } from './Frontend/components/content/About_us';
import { Content } from './Frontend/components/content/Content';
import { CourseA } from './Frontend/components/course/CourseA';
import { Student } from './Frontend/components/student/StudentPage';
import { Learning } from './Frontend/components/course/Learning';
import  LoginPage  from './Frontend/components/loginPanel/LoginPage';
import { RegisterPage } from './Frontend/components/register/RegisterPage';
import { Footer } from './Frontend/components/footer/Footer';
import { Admin } from './Frontend/components/admin/Admin';
import browserHistory from './Frontend/redux/helpers/history'

import './App.css'
import NavBar from './Frontend/components/bar/NavBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class BrowserRouterManager extends React.Component {
  render() {
    //initial New Dev branch
    //Check for remove localstorage when loss cookie
    

    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Content} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/about_us" component={AboutUs} />
          <Route exact path="/course" component={CourseA} />
          <Route exact path="/course/:courseID" component={CourseA} />
          <Route exact path="/student" component={true ? Student : () => { return (<Redirect to={'/loginPage'} />) }} />
          <Route exact path="/learning" component={true ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
          <Route exact path="/learning/:courseID/:subcourseID" component={true ? Learning : () => { return (<Redirect to={'/loginPage'} />) }} />
          <Route exact path="/register" component={!false ? RegisterPage : () => { return (<Redirect to={'/'} />) }} />
          <Route exact path='/loginPage' component={!false ? LoginPage : () => { return (<Redirect to={'/'} />) }} />
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
            <Route path='/' render={() => <NavBar str={`TEST`}/>} />
            <BrowserRouterManager />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App;

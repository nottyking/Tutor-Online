import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import './App.css'
import NavBar from './Frontend/components/bar/NavBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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
      <BrowserRouter>
      <div style={{backgroundColor: '#222'}}>
        <Route path='/' render={() => <NavBar
          str={`TEST`}
          loginStatus={this.state.isLogin}
          login={this.login}
          logout={this.logout} />} />
      </div>
          </BrowserRouter>
    )
  }
}

export default App;

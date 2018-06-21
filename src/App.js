import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import NavBar from './Frontend/NavBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isLogin: true } // For eazy implementation in other href
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    this.setState({ isLogin: true })
  }

  logout() {
    this.setState({ isLogin: false })
  }

  render() {
    return (
      <div>
        <Route path='/' render={() => <NavBar
          str={`TEST`}
          loginStatus={this.state.isLogin}
          login={this.login}
          logout={this.logout} />} />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router';

import { Footer } from './Frontend/components/footer/Footer';
import browserHistory from './Frontend/redux/helpers/history'
import NavBar from './Frontend/components/bar/NavBar'
import BrowserRouterManager from './Frontend/components/router/BrowserRouterManager';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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

export default App;
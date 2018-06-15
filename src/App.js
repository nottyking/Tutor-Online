import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import NavBar from './Frontend/NavBar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export class App extends Component {
  render() {
    return (
      <div>
          <Route path="/" render={()=><NavBar str={`TEST`} />} />
      </div>
    );
  }
}

export default App;

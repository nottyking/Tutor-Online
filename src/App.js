import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Home from './Frontend/Home'
import './App.css';
import './NavBar.css';

export class App extends Component {
  render() {
    return (
      <div>
          <Route path="/" render={()=><Home str={`TEST`} />} />
      </div>
    );
  }
}

export default App;

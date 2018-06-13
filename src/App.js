import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tutor Online</h1>
        </header>
        <p className="App-intro">
          This is home page
        </p>
      </div>
    );
  }
}


export default App;


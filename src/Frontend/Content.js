import React, { Component } from 'react';
import logo from './Image/logo.svg';
import {CourseCarousel} from './Carousel';
import {CoursePresent} from './CoursePresent';
// import './App.css';

export class Content extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tutor Online</h1>
        </header>
        <CourseCarousel/>
        <CoursePresent/> 
        <p className="App-intro">
          This is home page
        </p>
      </div>
    );
  }
}


export default Content;

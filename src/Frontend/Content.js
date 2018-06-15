import React, { Component } from 'react';
import logo from './Image/logo.svg';
<<<<<<< HEAD
// import {Carousel} from './Carousel';
// import {CoursePresent} from './CoursePresent';
=======
import {CourseCarousel} from './Carousel';
import {CoursePresent} from './CoursePresent';
>>>>>>> e88383234928c8e695c59cc59422f88476b2c4b8
// import './App.css';

export class Content extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tutor Online</h1>
        </header>
<<<<<<< HEAD
=======
        <CourseCarousel/>
        <CoursePresent/> 
>>>>>>> e88383234928c8e695c59cc59422f88476b2c4b8
        <p className="App-intro">
          This is home page
        </p>
      </div>
    );
  }
}

// <Carousel/>
// <CoursePresent/>

export default Content;

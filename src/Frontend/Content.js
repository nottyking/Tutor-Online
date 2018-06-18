import React, { Component } from 'react';
import logo from './Image/logo.svg';
import {CourseCarousel} from './CourseCarousel';
import {CoursePresent} from './CoursePresent';
// import './App.css';

export class Content extends Component {
  render() {
    return (
      <div className="App">
        <CourseCarousel/>
        <CoursePresent/> 
        <p className="App-intro">
          This is home page
        </p>
        <footer>page footer</footer>
      </div>
    );
  }
}


export default Content;

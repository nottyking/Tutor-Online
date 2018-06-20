import React, { Component } from 'react';
import logo from './Image/logo.svg';
import {CourseCarousel} from './CourseCarousel';
import {CoursePresent} from './CoursePresent';
import {Footer} from './Footer'
// import './App.css';

export class Content extends Component {
  render() {
    return (
      <div className="App"   >
        <CourseCarousel/>
        <CoursePresent/>
        <Footer/>
      </div>
    );
  }
}

// <Carousel/>
// <CoursePresent/>

export default Content;

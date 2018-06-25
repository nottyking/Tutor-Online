import React, { Component } from 'react';
import {CourseCarousel} from './CourseCarousel';
import {CoursePresent} from './CoursePresent';

export class Content extends Component {
  render() {
    return (
      <div className="App">
        <CourseCarousel/>
        <CoursePresent/>
      </div>
    );
  }
}

// <Carousel/>
// <CoursePresent/>

export default Content;

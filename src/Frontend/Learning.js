import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {SubCourseProgressBar} from './SubCourseProgressBar'
import {Row,
    Col,
    Container
} from 'reactstrap'

//class for video page
//Prop CourseName,SubCourseName,CourseDescription)

export class Learning extends React.Component {
    render() {
        return (
            <div className = 'App'>
                <header className='App-header'>
                    <h1>Course Name</h1>
                </header>
                <Container fluid={true} className="bg-secondary">
                <Row>
                <Col xs="10">
                <iframe width="100%" height="400"
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                this will be description
                </Col>
                <Col xs="2" >
                <SubCourseProgressBar style={{margin:'10 0 0 0'}}/>
                </Col>
                </Row>

                </Container>
            </div>
        );
    }
};

Learning.propTypes = {
    CourseName: PropTypes.string.isRequired,
    src: PropTypes.arrayOf(PropTypes.shape({
         Cname : PropTypes.string.isRequired,
         Cimage : PropTypes.string.isRequired,
         Clink: PropTypes.string.isRequired,
         Cdesc: PropTypes.string.isRequired
    })).isRequired
}

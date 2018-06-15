import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
                <Container>
                <Row>
                <Col xs="10">
                <iframe width="100%" height="400"
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                this will be description
                </Col>
                <Col xs="2" style={{textalign: 'left'}}>
                Will Be Progress Bar
                <p> Like this </p>
                <p> |Math101: (1) </p>
                <p> |Math101: (2) </p>
                <b> |Math101: (3) </b>
                <p> |Math101: (4) </p>
                <p> |Math101: (5) </p>
                <p> |Math101: (6) </p>
                <p> |Math101: (7) </p>
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

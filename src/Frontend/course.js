import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card, CardBody, CardText, CardImg,CardTitle,Button,Table } from 'reactstrap'

/*
Used For Present each courses's information (price, instructor's name, syllabus, etc.)
prop : Cimg ( Course Banner) Cname Cid Cprice Cdescription Cs

*/

export class Course extends React.Component {



  render () {
    const Syllabus = this.props.map((item,i) =>{
    

    });
    return (
      <div className='App'>
        <Container fluid style={{backgroundColor:'#555'}}>
        <Row style={{ justifyContent: 'center',
        alignItems: 'center'}}>
          <img src={this.props.courseImage} width={700} alt='error' />
          <Col>
          </Col>
          <Col>
          <Card>
            <CardBody>
              <CardTitle>
               {this.props.courseName}
              </CardTitle>
              <CardText>
                <br />
              {this.props.courseDesc}
              </CardText>
              <Button color='primary'>
                Enroll This
              </Button>
            </CardBody>
          </Card>
          </Col>
          <Col>
          </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseImage: PropTypes.string.isRequired,
  courseLink: PropTypes.string.isRequired,
  courseDesc: PropTypes.string.isRequired,
  subCourses: PropTypes.arrayOf(PropTypes.shape({
    subCourseName: PropTypes.string.isRequired,
    subCourseId: PropTypes.string.isRequired,
    subCourselink: PropTypes.string.isRequired
  })).isRequired
}

Course.defaultProps = {
  courseName: 'Math for PAT1',
  courseImage: 'https://dummyimage.com/600x400/ffffff/000000&text=Default IMG',
  courseLink: PropTypes.string.isRequired,
  courseDesc: 'Very Good Course for Everybody taught by Smartest person in the smartest factory of the best city of the best country',
  src: [
    {subCourseName: 'Math101',subCourseId: 'M101',subCourseLink: ''},
    {subCourseName: 'Math102',subCourseId: 'M102',subCourseLink:''},
    {subCourseName: 'Math103',subCourseId: 'M103',subCourseLink:''}
  ]
}

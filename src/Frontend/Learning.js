import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SubCourseProgressBar } from './SubCourseProgressBar'
import { Row, Col, Container, Card, CardTitle, CardText} from 'reactstrap'

// class for video page
// Prop CourseName,SubCourseName,CourseDescription)

export class Learning extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h3>Course Name</h3>
        </header>
        <Container fluid={true} className='bg-secondary'>
          <Row>
            <Col xs='10'>
            <iframe width='100%' height='400' src='https://www.youtube.com/embed/tgbNymZ7vqY'>
            </iframe>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
              <CardTitle>
                Course Description
              </CardTitle>
              <CardText>
              he shortcuts will work almost everywhere where it makes sense, and you can combine them, so to make an italic link use [_this_] or _[this]_. Some controls like Paragraph or Label allow you to “unbold” the text via the Property Inspector panel. If you do so, the words you *bolded* will stay bold. A few controls use bold text by default, so bolding text within those controls won’t make a difference. If you want to show these special formatting characters as actual text, you can escape the *, _, -, [ and ] characters with \*, \_, \-, \[ and \], so if you want to write “this [is] some text” and don’t want the “is” to become a link, just type “this \[is\] some text”. Line Breaks Most controls allow you to insert a line break to wrap text from one line to the next. You can do this by writing \r in front of the text you want to start on a new line. See the example below where a line break is used in the second item in a Radio Button control.
              </CardText>
            </Card>
            </Col>
            <Col xs='2'>
            <SubCourseProgressBar/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Learning.propTypes = {
  CourseName: PropTypes.string.isRequired,
  src: PropTypes.arrayOf(PropTypes.shape({
    Cname: PropTypes.string.isRequired,
    Cimage: PropTypes.string.isRequired,
    Clink: PropTypes.string.isRequired,
    Cdesc: PropTypes.string.isRequired
  })).isRequired
}

import React from 'react';
import PropTypes from 'prop-types';
import { SubCourseProgressBar } from './SubCourseProgressBar';
import { Row, Col, Container, Card, CardTitle, CardText } from 'reactstrap';
import {VideoPlayer} from './VideoPlayer';

// class for video page
// may be get course id from link
// this class might get these variables below \/ from database
// CourseName: PropTypes.string.isRequired,
// SubCourseID:PropTypes.string.isRequired,
//  SubCourseName:PropTypes.string.isRequired,
//  src: PropTypes.arrayOf(PropTypes.shape({
//    Cname: PropTypes.string.isRequired,
//    Cimage: PropTypes.string.isRequired,
//    Clink: PropTypes.string.isRequired,
//    Cdesc: PropTypes.string.isRequired})).isRequired}




export class Learning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        freeUser:true,
        isloaded:true,
    };
  }

  async componentWillMount(){
    // var subcourseInfo = (await axios.post())
  }

  render () {
    const timeElapsed ='0m5s'
    console.log(this.props.match.params.courseID);
    console.log(this.props.match.params.subcourseID);
    return (
      <div className='App'>
        <Container fluid>
          <Row>
          <Col/>
            <Col xs='9'>
            <h3 style={{textAlign: 'left',padding: 10,textDecoration: 'underline',color: '#FFF'}}>Coursename</h3>
            <VideoPlayer/>
            <p></p>
            <Card body style={{ backgroundColor: '#EEE',padding: 10,marginTop: 10,marginBottom: 20 }}>
              <CardTitle >
                Course Description
              </CardTitle>
              <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non odio congue, feugiat tortor nec, tincidunt dui. Proin nec euismod elit. Aenean quis nunc sit amet eros tincidunt molestie ut sit amet nisi. Nulla facilisi. Mauris nisl magna, posuere in libero eget, dictum condimentum eros. Morbi lacinia pharetra ex sit amet dapibus. Nullam et sodales purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur sed maximus urna. Vivamus et erat sit amet tortor lobortis interdum eget at nibh. Curabitur id pulvinar velit, ut porta sem. Integer sit amet lorem tortor. In gravida pulvinar tempor. Sed tempus porta lacus id gravida.

              Aliquam congue diam mi, quis tempus turpis eleifend vel. Vestibulum porttitor convallis tortor non elementum. Maecenas a egestas turpis, ac cursus neque. Duis vulputate, enim vel facilisis elementum, nibh nulla iaculis nulla, nec fermentum enim purus non quam. Donec imperdiet tincidunt varius. Curabitur tempor purus vel felis commodo placerat. Nulla rutrum in tortor eu cursus. Vivamus vitae porta massa, non finibus ante. Praesent in imperdiet libero, eu pretium elit. Nulla nisl velit, mattis eget lobortis ac, dictum at enim. Fusce sollicitudin consequat imperdiet. Proin ullamcorper enim quam, ac rutrum purus dignissim nec. Phasellus ullamcorper felis vitae arcu semper sodales. Vestibulum eu ante congue, rutrum arcu vel, ullamcorper dui. Nullam posuere pulvinar justo sit amet tristique. Ut sollicitudin bibendum sem, at euismod felis pulvinar nec.
              </CardText>
            </Card>
            </Col>
            <Col xs='2'>
            <br/><br/>
            <SubCourseProgressBar now= {1}
            src={ [
                {SCname : "Math101", SCid:1,SClink:"aaaaaa"},
                {SCname : "Math102", SCid:2,SClink:"aaaaaa"},
                {SCname : "Math201", SCid:3,SClink:"aaaaaa"},
                {SCname : "Math202", SCid:4,SClink:"aaaaaa"},
                {SCname : "Math301", SCid:5,SClink:"aaaaaa"},
                {SCname : "Math302", SCid:6,SClink:"aaaaaa"},
                {SCname : "Math401", SCid:7,SClink:"aaaaaa"},
                {SCname : "Math402", SCid:8,SClink:"aaaaaa"},
                {SCname : "Math501", SCid:9,SClink:"aaaaaa"}
            ]}
            />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Learning.propTypes = {
  CourseName: PropTypes.string.isRequired,
  SubCourseID:PropTypes.string.isRequired,
  SubCourseName:PropTypes.string.isRequired,
  src: PropTypes.arrayOf(PropTypes.shape({
    Cname: PropTypes.string.isRequired,
    Cimage: PropTypes.string.isRequired,
    Clink: PropTypes.string.isRequired,
    Cdesc: PropTypes.string.isRequired
  })).isRequired
}

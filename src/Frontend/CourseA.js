import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card,
   CardBody, CardText, CardTitle, Button,
    Table, Badge, CardSubtitle,Modal,
    ModalBody,ModalFooter,ModalHeader,
    Label,FormGroup,Input } from 'reactstrap'
import Rating from 'react-rating';
import {Payment} from './Payment'
const axios = require('axios')
const capsulation = require('./Capsulation/SendData')
const ipList = require('../Config/ipConfig')
/*
Used For Present each courses's information (price, instructor's name, syllabus, etc.)
prop : Cimg ( Course Banner) Cname Cid Cprice Cdescription Cs

*/

var courseInfo = {
  courseName: 'Math for PAT1',
  banner: 'https://dummyimage.com/600x400/ffffff/000000&text=Default IMG',
  description: 'Very Good Course for Everybody taught by Smartest person in the smartest factory of the best city of the best country',
  instructor: 'John Doe',
  rating: 5,
  price: 1555,
  subCourse: [
    {subcourseid:1,courseid:1,subcoursename: 'Math101',videolink: '/learning'},
    {subcourseid:2,courseid:1,subcoursename: 'Math102',videolink: '/learning'},
    {subcourseid:3,courseid:1,subcoursename: 'Math103',videolink: '/learning'},
    {subcourseid:4,courseid:1,subcoursename: 'Math103',videolink: '/learning'},
    {subcourseid:5,courseid:1,subcoursename: 'Math103',videolink: '/learning'},
    {subcourseid:6,courseid:1,subcoursename: 'Math103',videolink: '/learning'},
    {subcourseid:7,courseid:1,subcoursename: 'Math103',videolink: '/learning'},
    {subcourseid:8,courseid:1,subcoursename: 'Math103',videolink: '/learning'},
  ]
};

export class CourseA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        alreadyEnroll:false,
        alreadyReview:false,
        alreadyLogin:true,
        reviewModal:false,
        paymentModal:false
    };
    this.toggleReview = this.toggleReview.bind(this);
  }

  async componentDidMount(){
    courseInfo = (await axios.post(ipList.backend + "/course/queryInformation", capsulation.sendData({
      courseid: this.props.match.params.courseID
    }))).data;
    console.log(courseInfo.course);
    console.log(courseInfo.subCourse);

  }

  onClickReview = () =>{
      this.setState({alreadyReview:true});
      this.toggleReview();
  }

toggleReview(){
  this.setState({
    reviewModal:!this.state.reviewModal
  });
  }

  onClick = () =>{
    if(!this.state.alreadyEnroll){
      this.setState({alreadyEnroll:true});
      console.log('Enrolllll');
      }else{
        this.setState({alreadyEnroll:false});
        console.log('De Enrolllll');
      }
  }

onClick2 = () =>{
  if(!this.state.alreadyReview){
  this.setState({alreadyReview:true});
  console.log('Reviewwww');
  }else{
    this.setState({alreadyReview:false});
    console.log('De Reviewww');
  }
}

onClick3 = () =>{
  console.log('change Login state from '+ this.state.alreadyLogin + ' to ' + !this.state.alreadyLogin)
  this.setState({alreadyLogin : !this.state.alreadyLogin})
}

  render () {
    console.log(this.props.match.params.courseID);
    let Syllabus = courseInfo.subCourse.map((item, i) => {
      return (
        <tr>
          <th scope='row'>
            {i + 1}
          </th>
          <td>
            {item.subcourseid}
          </td>
          <td>
            {item.subcoursename}
          </td>
          <td>
            <Badge href={this.state.alreadyEnroll? item.videolink:''} color={this.state.alreadyEnroll?'primary':'danger'}>
              {this.state.alreadyEnroll? 'Learn':''}
            </Badge>
          </td>
        </tr>
      );
    });

    var CourseReview
    if (courseInfo.courseReview > 4.9) {
      CourseReview = (
        <h1 style={{color: '#ffc107'}}><i className='fa fa-star'style={{fontSize:'2rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star'style={{fontSize:'5rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star'style={{fontSize:'2rem'}}/></h1>

      );
    }else if (courseInfo.rating > 3.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star' style={{fontSize:'5rem'}}/> <i className='fa fa-star'style={{fontSize:'5rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/></h1>
      );
    }else if (courseInfo.rating > 2.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star' style={{fontSize:'3rem'}} /> <i className='fa fa-star' style={{fontSize:'5rem'}}/> <i className='fa fa-star' style={{fontSize:'3rem'}}/></h1>
      );
    }else if (courseInfo.rating > 1.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/></h1>
      );
    }else if (courseInfo.rating > 0.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star'style={{fontSize:'3rem'}}/></h1>
      );
    }else {
      CourseReview = (
        <h1>This Course Doesn't have Review Yet</h1>
      );
    }
    // '
    var CourseReviewButton = (
      <div>
      <FormGroup>
          <Label for="exampleText">Please Comment This Course</Label>
          <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup tag="fieldset">
          <FormGroup>
          <Label for="formControlRange">Rate this Course</Label>
          <br/>
          <Rating
          emptySymbol={['fa fa-star-o fa-1x', 'fa fa-star-o fa-2x',
          'fa fa-star-o fa-3x', 'fa fa-star-o fa-4x','fa fa-star-o fa-5x']}
          fullSymbol={['fa fa-star fa-1x', 'fa fa-star fa-2x',
          'fa fa-star fa-3x', 'fa fa-star fa-4x','fa fa-star fa-5x']}/>
          </FormGroup>
        </FormGroup>
        <Button color='primary' onClick={this.onClickReview}>Submit</Button>
        </div>
    );
    var CourseReviewPresent;
    if(!this.state.alreadyEnroll||this.state.alreadyReview){
      CourseReviewPresent = CourseReview;
    }else{
      CourseReviewPresent = CourseReviewButton
    }
    return (
      <div className='App'>
        <Container fluid>
          <Row>
          <Col style={{width:700,paddingLeft:0}}>
            <img src={courseInfo.banner} width={700} style={{left:0,align:'left'}} alt='error' />
            </Col>
            <Col style={{maxWidth:500,marginLeft:10,top:10}}>

            <Card style={{marginTop:10}}>
              <CardBody>
                <CardTitle>
                {this.props.match.params.courseID} : {courseInfo.courseName}
                </CardTitle>
                <CardSubtitle>
                  Instructor :
                  {courseInfo.instructor}
                </CardSubtitle>
                <CardText>

                  <br />
                  {courseInfo.description}
                </CardText>
                {!this.state.alreadyEnroll ? <Payment/> : ''}
              </CardBody>
            </Card>
            <br/>
            <Card style={{marginBottom: 60}}>
            <CardBody>
              <CardTitle>
                Student Review
              </CardTitle>
              {CourseReviewPresent}
            </CardBody>
          </Card>

            </Col>
            <Col style={{maxWidth:400}}>
            <h3 style={{marginBottom: 10,color: '#FFF'}} onClick={this.onClick}>Course Syllabus</h3>
            <Table borderless style={{marginBottom: 10,color: '#FFF'}}>
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  SubCourseID
                </th>
                <th>
                  SubCourseName
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody>
              {Syllabus}
            </tbody>
          </Table>

            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.reviewModal} toggle={this.toggleReview}>
          <ModalBody>
            Thank You for your review!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleReview}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}


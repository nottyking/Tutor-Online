import React from 'react'
import { Redirect } from 'react-router'
import {
  Row, Col, Container, Card,
  CardBody, CardText, CardTitle, Button,
  Table, Badge, CardSubtitle, CardImg, Modal,
  ModalBody, ModalFooter, ModalHeader, Alert,
  Label, FormGroup, Input, CardImgOverlay
} from 'reactstrap'
import Rating from 'react-rating';
import { Payment } from '../payment/Payment'
import { Loading } from '../loading/Loading';
import Cookies from 'universal-cookie';
import AuthToken from './../router/AuthToken';
import Login from '../loginPanel/Login';
const axios = require('axios')
const capsulation = require('../../capsulation/SendData')
const ipList = require('../../../Config/ipConfig')
const cookies = new Cookies();
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
/*
Used For Present each courses's information (price, instructor's name, syllabus, etc.)
prop : Cimg ( Course Banner) Cname Cid Cprice Cdescription Cs

*/

var defaultCourseInfo = {
  course: {
    coursename: 'Loading',
    banner: 'https://dummyimage.com/600x400/ffffff/000000&text=Default IMG',
    description: 'Very Good Course for Everybody taught by Smartest person in the smartest factory of the best city of the best country',
    instructor: 'John Doe',
    rating: 5,
    price: 20000
  },
  subCourse: [
    { subcourseid: 1, courseid: 1, subcoursename: 'Math101', videolink: '/learning' },
    { subcourseid: 2, courseid: 1, subcoursename: 'Math102', videolink: '/learning' },
    { subcourseid: 3, courseid: 1, subcoursename: 'Math103', videolink: '/learning' },
    { subcourseid: 4, courseid: 1, subcoursename: 'Math103', videolink: '/learning' },
    { subcourseid: 5, courseid: 1, subcoursename: 'Math103', videolink: '/learning' },
    { subcourseid: 6, courseid: 1, subcoursename: 'Math103', videolink: '/learning' },
    { subcourseid: 7, courseid: 1, subcoursename: 'Math103', videolink: '/learning' },
    { subcourseid: 8, courseid: 1, subcoursename: 'Math103', videolink: '/learning' },
  ]
};

export class CourseA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyEnroll: false,
      alreadyReview: false,
      alreadyLogin: true,
      reviewModal: false,
      paymentModal: false,
      isLoaded: false,
      courseInfo: defaultCourseInfo,
      rating: 0,
      redirect: ""
    };
    this.toggleReview = this.toggleReview.bind(this);
  }

  async componentWillMount() {
    var temp = (await axios.post(ipList.backend + "/course/queryInformation", capsulation.sendData({
      courseid: this.props.match.params.courseID
    }))).data;
    if (temp.redirect) {
      this.setState({
        redirect: temp.redirect
      })
    }
    else {
      try {
        temp.course.banner = require('../../Image/Course/Banner/Banner' + this.props.match.params.courseID + '.jpg')
      } catch (err) {
        temp.course.banner = 'https://dummyimage.com/600x400/ffffff/000000&text=' + temp.course.coursename
      }

      if (temp.reviewcourse.length == 0) {
        temp.reviewcourse.push({
          rating: 0
        })
      }
      temp.course.description = htmlToReactParser.parse(temp.course.description);
      console.log(temp.course);
      this.setState({
        courseInfo: temp,
        alreadyEnroll: temp.enrolledcourse.length > 0 ? true : false,
        alreadyReview: temp.reviewcourse[0].rating > 0 ? true : false,
        alreadyLogin: cookies.get("loginToken") ? true : false,
        isLoaded: true
      });
    }
  }

  createSyllabus() {
    var syllabus = this.state.courseInfo.subCourse.map((item, i) => {
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
            <Badge href={this.state.alreadyEnroll ? ipList.frontend + "/learning/" + this.props.match.params.courseID + '/' + item.subcourseid : ''} color={this.state.alreadyEnroll ? 'primary' : 'danger'}>
              {this.state.alreadyEnroll ? 'Let\'s Learn!' : 'Please Enroll first'}
            </Badge>
          </td>
        </tr>
      );
    });
    return syllabus;
  }

  generateStar(rating) {
    console.log('rating: ' + rating);
    if (rating > 4.9) {
      return (
        <h1 style={{ color: '#ffc107' }}><i className='fa fa-star' style={{ fontSize: '2rem' }} /> <i className='fa fa-star' style={{ fontSize: '3rem' }} /> <i className='fa fa-star' style={{ fontSize: '5rem' }} /> <i className='fa fa-star' style={{ fontSize: '3rem' }} /> <i className='fa fa-star' style={{ fontSize: '2rem' }} /></h1>
      );
    } else if (rating > 3.9) {
      return (
        <h1 style={{ color: '#007bff' }}><i className='fa fa-star' style={{ fontSize: '3rem' }} /> <i className='fa fa-star' style={{ fontSize: '5rem' }} /> <i className='fa fa-star' style={{ fontSize: '5rem' }} /> <i className='fa fa-star' style={{ fontSize: '3rem' }} /></h1>
      );
    } else if (rating > 2.9) {
      return (
        <h1 style={{ color: '#007bff' }}><i className='fa fa-star' style={{ fontSize: '3rem' }} /> <i className='fa fa-star' style={{ fontSize: '5rem' }} /> <i className='fa fa-star' style={{ fontSize: '3rem' }} /></h1>
      );
    } else if (rating > 1.9) {
      return (
        <h1 style={{ color: '#007bff' }}><i className='fa fa-star' style={{ fontSize: '3rem' }} /> <i className='fa fa-star' style={{ fontSize: '3rem' }} /></h1>
      );
    } else if (rating > 0.9) {
      return (
        <h1 style={{ color: '#007bff' }}><i className='fa fa-star' style={{ fontSize: '3rem' }} /></h1>
      );
    } else {
      return (
        <h4>This Course Doesn't have Review Yet</h4>
      );
    }
  }

  createReviewComponent() {
    var CourseReviewPresent;
    if (!this.state.alreadyEnroll || this.state.alreadyReview) {
      CourseReviewPresent = this.generateStar(this.state.courseInfo.reviewcourse[0].rating);
    } else {
      CourseReviewPresent = (
        <div>
          <FormGroup>
            <Label for="exampleText">Please Comment This Course</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <FormGroup tag="fieldset">
            <FormGroup>
              <Label for="formControlRange">Rate this Course</Label>
              <br />
              <Rating onChange={this.handleRatingChange} initialRating={this.state.rating}
                emptySymbol={['fa fa-star-o fa-1x', 'fa fa-star-o fa-2x',
                  'fa fa-star-o fa-3x', 'fa fa-star-o fa-4x', 'fa fa-star-o fa-5x']}
                fullSymbol={['fa fa-star fa-1x', 'fa fa-star fa-2x',
                  'fa fa-star fa-3x', 'fa fa-star fa-4x', 'fa fa-star fa-5x']} />
            </FormGroup>
          </FormGroup>
          <Button color='primary' onClick={this.onClickReview}>Submit</Button>
        </div>
      );
    }
    return CourseReviewPresent;
  }

  onClickReview = async () => {
    var courseid = this.props.match.params.courseID
    var description = document.getElementById('exampleText').value;
    var rating = this.state.rating
    var isSubmitReviewSuccess = (await axios.post(ipList.backend + '/course/submitreview'), capsulation.sendData({
      courseid: courseid, description: description, rating: rating
    }))
    this.setState({ alreadyReview: true });
    this.toggleReview();
    // send review data to database
  }

  toggleReview() {
    this.setState({
      reviewModal: !this.state.reviewModal
    });
  }

  onClick = () => {
    if (!this.state.alreadyEnroll) {
      this.setState({ alreadyEnroll: true });
      console.log('Enrolllll');
    } else {
      this.setState({ alreadyEnroll: false });
      console.log('De Enrolllll');
    }
  }

  onClick2 = () => {
    if (!this.state.alreadyReview) {
      this.setState({ alreadyReview: true });
      console.log('Reviewwww');
    } else {
      this.setState({ alreadyReview: false });
      console.log('De Reviewww');
    }
  }

  onClick3 = () => {
    console.log('change Login state from ' + this.state.alreadyLogin + ' to ' + !this.state.alreadyLogin)
    this.setState({ alreadyLogin: !this.state.alreadyLogin })
  }

  handleRatingChange = async (value) => {
    await this.setState({
      rating: value
    })
  }

  render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.isLoaded) {
      //Get UI Component for render
      var Syllabus = this.createSyllabus();
      var CourseReviewPresent = this.createReviewComponent();

      return (
        <div className='App'>
          <AuthToken msgFrom="CourseA" />
          <Container fluid>
            <Row>
              <Col></Col>
              <Col>
                <br />
                <Card style={{ width: 800 }}>
                  <CardImg src={this.state.courseInfo.course.banner} style={{ left: 0, align: 'left' }} alt='error' />
                  <CardBody>
                    <CardTitle>
                      {this.props.match.params.courseID} : {this.state.courseInfo.course.coursename}
                    </CardTitle>
                    <CardSubtitle>
                      Instructor :
                    {this.state.courseInfo.course.instructor}
                    </CardSubtitle>
                    <CardText>
                      <br />
                      {this.state.courseInfo.course.description}
                    </CardText>
                    {!this.state.alreadyLogin ?
                      <div textAlign="center" style={{ textAlign: 'center', paddingTop: '15px' }}>
                        <Button block color='secondary'>
                          "Please login before enroll"
                          <div style={{ paddingTop: '10px' }}>
                            <Login />
                          </div>
                        </Button>
                      </div>
                      :
                      !this.state.alreadyEnroll ?
                        this.state.courseInfo.course.price == 0 ? <Button block color='primary'>Enroll this course for free</Button> : <Payment coursePrice={this.state.courseInfo.course.price} courseID={this.state.courseInfo.course.courseid} />
                        :
                        <div style={{ textAlign: 'center', paddingTop: '15px' }}>
                          <Button block color='primary' style={{ paddingTop: '10px',paddingBottom: '10px' }}>You've finished enroll, Let's learn!</Button>
                        </div>
                    }
                    <br />
                  </CardBody>
                </Card>
                <br />

                <Card style={{ width: 800 }}>
                  <CardBody>
                    <CardTitle>
                      Student Review
                </CardTitle>
                    {CourseReviewPresent}
                  </CardBody>
                </Card>
                <br />

                <Card style={{ width: 800, color: 'white', background: 'black' }}>
                  <h3>Course Syllabus</h3>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>SUB-COURSE ID</th>
                        <th>SUB-COURSE NAME</th>
                        <th><Badge color="light">STATUS</Badge></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Syllabus}
                    </tbody>
                  </Table>
                </Card>
                <br />

              </Col>
              <Col></Col>
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
      );
    }
    else {
      return (<Loading />);
    }
  }
}

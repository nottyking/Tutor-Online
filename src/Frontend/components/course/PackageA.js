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

export class PackageA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyEnroll: false,
      alreadyReview: false,
      alreadyLogin: true,
      reviewModal: false,
      paymentModal: false,
      isLoaded: false,
      packageInfo: [],
      packageCourseInfo: [],
      redirect: ""
    };
  }
  // /package/queryinformation

  async componentWillMount() {
    var temp = (await axios.post(ipList.backend + "/package/queryInformation", capsulation.sendData({
      packageid: this.props.match.params.packageID
    }))).data;
    console.log(temp.package);
    if (temp.redirect) {
      this.setState({
        redirect: temp.redirect
      })
    }
    else {
      try {
        temp.package.banner = require('../../Image/Package/Banner/Banner' + this.props.match.params.packageID + '.jpg')
      } catch (err) {
        temp.package.banner = 'https://dummyimage.com/600x400/ffffff/000000&text=' + temp.package.packagename
      }
      temp.package.description = htmlToReactParser.parse(temp.course.description);
      console.log(temp.course);
      console.log(temp.package);
      this.setState({
        packageInfo: temp.package,
        packageCourseInfo: temp.course,
        alreadyLogin: cookies.get("loginToken") ? true : false,
        isLoaded: true
      });
    }
  }

  createSyllabus() {
    var syllabus = this.state.packageCourseInfo.map((item, i) => {
        var today = new Date();
      return (
        <tr>
          <th scope='row'>
            {i + 1}
          </th>
          <td>
            {item.courseid}
          </td>
          <td>
            {item.coursename}
          </td>
          <td>
            <Badge href={(parseInt(((new Date(item.expireddate)) - today)) > 0) ? ipList.frontend + "/course/" + item.courseid : ''} color={(parseInt(((new Date(item.expireddate)) - today)) > 0) ? 'primary' : 'danger'}>
              {(parseInt(((new Date(item.expireddate)) - today)) > 0) ? 'You have enrolled this course' : 'You haven\'t enrolled this course yet'}
            </Badge>
          </td>
        </tr>
      );
    });
    return syllabus;
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

  render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.isLoaded) {
      //Get UI Component for render
      var Syllabus = this.createSyllabus();

      return (
        <div className='App'>
          <AuthToken msgFrom="CourseA" />
          <Container fluid>
            <Row>
              <Col></Col>
              <Col>
                <br />
                <Card style={{ width: 800 }}>
                  <CardImg src={this.state.packageInfo.banner} style={{ left: 0, align: 'left' }} alt='error' />
                  <CardBody>
                    <CardTitle>
                      {this.props.match.params.packageID} : {this.state.packageInfo.packagename}
                    </CardTitle>
                    <CardSubtitle>
                      Instructor :
                    </CardSubtitle>
                    <CardText>
                      <br />
                      {this.state.packageInfo.description}
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
                        this.state.packageInfo.price == 0 ? <Button block color='primary'>Enroll this package for free</Button> : <Payment coursePrice={this.state.packageInfo.price} packageID={this.state.packageInfo.packageid} />
                        :
                        <div style={{ textAlign: 'center', paddingTop: '15px' }}>
                          <Button block color='primary' style={{ paddingTop: '10px',paddingBottom: '10px' }}>You've finished enroll, Let's learn!</Button>
                        </div>
                    }
                    <br />
                  </CardBody>
                </Card>
                <br />

                <Card style={{ width: 800, color: 'white', background: 'black' }}>
                  <h3>Course Syllabus</h3>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>COURSE ID</th>
                        <th>COURSE NAME</th>
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

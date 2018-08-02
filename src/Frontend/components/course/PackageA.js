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
import { PaymentForPackage } from '../payment/PaymentForPackage'
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
          <AuthToken msgFrom="PackageA" />
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
                        this.state.packageInfo.discountprice == 0 ? <Button block color='primary'>Enroll this package for free</Button> : <PaymentForPackage packagePrice={this.state.packageInfo.discountprice} packageID={this.state.packageInfo.packageid} courseID = {this.state.packageCourseInfo} />
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
                  <h3>Course in this package</h3>
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

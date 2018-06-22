import React, { Component } from 'react'
import { width } from 'window-size';
import PropTypes from 'prop-types';
import { Success } from './student/Success'
import { Footer } from './Footer';
import { ProfileField } from './student/ProfileField';
import { CourseField } from './student/CourseField';
import { EditProfileField } from './student/EditProfileField';
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies();
const ipList = require('../Config/ipConfig')

/*
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Course object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/
const defaultValue = {
  UserID: '',
  Username: '',
  FirstName: '',
  LastName: '',
  Email: '',
  ProfileImg: 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png',
  Birthday: '',
  Address: '',
  Gender: '',
  src: [{CourseID:'',CourseName:'',CourseExpDate:'',CourseLink:''}]
}

// var testData = {
//   UserID: 'Success111',
//   Username: 'Loggin in',
//   FirstName: 'Jonathan',
//   LastName: 'Boooo',
//   Email: 'Jonathan_Boo0000@kk.co.th',
//   ProfileImg: 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png',
//   Birthday: '1999-05-22',
//   Address: '123456 abcdef 543210 ijklmnop',
//   Gender: 'Female',
//   src: [
//     { CourseID: '10001', CourseName: 'Math for Programmer 0', CourseExpDate: '2018-10-11', CourseLink: '' },
//     { CourseID: '10002', CourseName: 'Math for Programmer 1', CourseExpDate: '2018-07-11', CourseLink: '' },
//     { CourseID: '10003', CourseName: 'Math for Programmer 2', CourseExpDate: '2018-06-10', CourseLink: '' },
//     { CourseID: '10004', CourseName: 'Math for Programmer 3', CourseExpDate: '2018-02-07', CourseLink: '' }
//   ]
// }

export class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 }
    this.toNextStep = this.toNextStep.bind(this);
    this.toPreviousStep = this.toPreviousStep.bind(this);
    this.getDatabaseValue = this.getDatabaseValue.bind(this);
  }

  async getDatabaseValue() {
    //get Data from database
    var studentInformationAndError = (await axios.post(ipList.backend + "/student/queryInformation" , {
      loginToken : cookies.get("loginToken")
    })).data;
    console.log("studentInformationAndError:",studentInformationAndError);
    var studentInformation = studentInformationAndError.result;
    var studentError = studentInformationAndError.error;

    defaultValue.UserID = studentInformation.userid;
    defaultValue.Username = studentInformation.username;
    defaultValue.FirstName = studentInformation.fname;
    defaultValue.LastName = studentInformation.lname;
    defaultValue.Email = studentInformation.email;
    // defaultValue.ProfileImg = studentInformation.profileimg;
    defaultValue.Birthday = studentInformation.birthday;
    defaultValue.Address = studentInformation.address;
    defaultValue.Gender = studentInformation.gender;
    defaultValue.src = studentInformation.src.result;
    this.toNextStep()
  }

  toNextStep() {
    var newStep = (this.state.step + 1) > 3 ? 3 : (this.state.step + 1);

    this.setState({
      step: newStep
    })
  }

  toPreviousStep() {
    var newStep = (this.state.step - 1) < 0 ? 0 : (this.state.step - 1);
    console.log(this.state.step);
    this.setState({
      step: newStep
    })
  }

  render() {
    switch (this.state.step) {
      case 0:
        this.getDatabaseValue();
        console.log("After load");
      case 1:
        return (
          <div className='App'>
            <Container fluid style={{ backgroundColor: '#222', bottom: 0, padding: 20 }}>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <ProfileField toNextStep={this.toNextStep} defaultValue={defaultValue} />
                <CourseField defaultValue={defaultValue} />
              </Col>
            </Container>
            <Footer />
          </div>
        );
      case 2:
        return (
          <div className='App'>
            <Container fluid style={{ backgroundColor: '#222', bottom: 0, padding: 20 }}>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <EditProfileField toPreviousStep={this.toPreviousStep} toNextStep={this.toNextStep} defaultValue={defaultValue}/>
              </Col>
            </Container>
            <Footer />
          </div>
        );
      case 3:
        return (
          <div className='App'>
            <Success />
          </div>
        );
      default:
        return (<p>Oh no this gonna be bug</p>);
    }
  }
}

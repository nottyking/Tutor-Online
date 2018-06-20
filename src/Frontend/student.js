import React, { Component } from 'react'
import { width } from 'window-size';
import PropTypes from 'prop-types';
import { Footer } from './Footer';
import { ProfileField } from './student/ProfileField';
import { CourseField } from './student/CourseField';
import { EditProfileField } from './student/EditProfileField';
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'

/*
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Course object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/
const defaultValue = {
  UserID: 'EX111',
  Username: 'Error in Login Process',
  FirstName: 'John',
  LastName: 'Doe',
  Email: 'John_doe1234@gg.com',
  ProfileImg: 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png',
  Birthday: 'yyyy-mm-dd',
  Address: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  Gender: 'Male',
  src: [
    { CourseID: '10001', CourseName: 'Math for Programmer 0', CourseExpDate: '2018-10-11', CourseLink: '' },
    { CourseID: '10002', CourseName: 'Math for Programmer 1', CourseExpDate: '2018-07-11', CourseLink: '' },
    { CourseID: '10003', CourseName: 'Math for Programmer 2', CourseExpDate: '2018-06-10', CourseLink: '' },
    { CourseID: '10004', CourseName: 'Math for Programmer 3', CourseExpDate: '2018-02-07', CourseLink: '' }
  ]

}
export class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 2 }
    this.toEditPage = this.toEditPage.bind(this);
    this.toProfilePage = this.toProfilePage.bind(this);
    this.getDatabaseValue();
  }

  getDatabaseValue() {
    //get Data from database
    defaultValue.UserID = 'Success111';
    defaultValue.Username = 'Loggin in';
    defaultValue.FirstName = 'Jonathan';
    defaultValue.LastName = 'Boooo';
    defaultValue.Email= 'Jonathan_Boo0000@kk.co.th',
    defaultValue.ProfileImg = 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png';
    defaultValue.Birthday = '1999-05-22';
    defaultValue.Address = '123456 abcdef 543210 ijklmnop';
    defaultValue.Gender = 'Female';
    defaultValue.src = [
      { CourseID: '10001', CourseName: 'Math for Programmer 0', CourseExpDate: '2018-10-11', CourseLink: '' },
      { CourseID: '10002', CourseName: 'Math for Programmer 1', CourseExpDate: '2018-07-11', CourseLink: '' },
      { CourseID: '10003', CourseName: 'Math for Programmer 2', CourseExpDate: '2018-06-10', CourseLink: '' },
      { CourseID: '10004', CourseName: 'Math for Programmer 3', CourseExpDate: '2018-02-07', CourseLink: '' }
    ]
  }

  toEditPage() {
    var newStep = (this.state.step + 1) > 2 ? 2 : (this.state.step + 1);

    this.setState({
      step: newStep
    })
  }

  toProfilePage() {
    var newStep = (this.state.step - 1) < 1 ? 1 : (this.state.step - 1);

    this.setState({
      step: newStep
    })
  }

  render() {

    switch (this.state.step) {
      case 1:
        return (
          <div className='App'>
            <Container fluid style={{ backgroundColor: '#222', bottom: 0, padding: 20 }}>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <ProfileField toEditPage={this.toEditPage} defaultValue={defaultValue} />
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
                <EditProfileField toProfilePage={this.toProfilePage} defaultValue={defaultValue} />
              </Col>
            </Container>
            <Footer />
          </div>
        );
      default:
        return (<p>Oh no this gonna be bug</p>);
    }
  }
}

//// Set the prop of each class

// ProfileField.propTypes = {
//   UserID: PropTypes.string.isRequired,
//   Username: PropTypes.string.isRequired,
//   FirstName: PropTypes.string.isRequired,
//   LastName: PropTypes.string.isRequired,
//   ProfileImg: PropTypes.string.isRequired,
//   Birthday: PropTypes.string.isRequired,
//   Address: PropTypes.string.isRequired,
//   Gender: PropTypes.string.isRequired,
// }

// ProfileField.defaultProps = {
//   UserID: 'EX111',
//   Username: 'Error in Login Process',
//   FirstName: 'John',
//   LastName: 'Doe',
//   ProfileImg: 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png',
//   Birthday: 'yyyy-mm-dd',
//   Address: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
//   Gender: 'Male'
// }

// CourseField.propTypes = {
//   src: PropTypes.arrayOf(PropTypes.shape({
//     CourseID: PropTypes.string.isRequired,
//     CourseName: PropTypes.string.isRequired,
//     CourseExpDate: PropTypes.string.isRequired,
//     CourseLink: PropTypes.string.isRequired
//   })).isRequired
// }

// CourseField.defaultProps = {
//   src: [
//     { CourseID: '10001', CourseName: 'Math for Programmer 0', CourseExpDate: '2018-10-11', CourseLink: '' },
//     { CourseID: '10002', CourseName: 'Math for Programmer 1', CourseExpDate: '2018-07-11', CourseLink: '' },
//     { CourseID: '10003', CourseName: 'Math for Programmer 2', CourseExpDate: '2018-06-10', CourseLink: '' },
//     { CourseID: '10004', CourseName: 'Math for Programmer 3', CourseExpDate: '2018-02-07', CourseLink: '' }
//   ]
// }
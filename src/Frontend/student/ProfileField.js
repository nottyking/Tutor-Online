import '../student.css';
import React, { Component } from 'react'
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
// import profilePicture from '../Image/ProfileImage/ProfileImage17.jpg'
export class ProfileField extends React.Component {
    render() {
      var profilePicture = 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png';
      try{
          profilePicture = require('../Image/ProfileImage/ProfileImage' + this.props.defaultValue.UserID + '.jpg');
      } catch(err){
        console.log("ERR:",err);
      }
      return (
        <div>
          <Card style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            padding: 10
          }}>
            <CardImg
              top
              className='avatar'
              src={profilePicture}
              alt='Card image cap' />
            <CardBody>
              <CardTitle>
                {this.props.defaultValue.Username}
              </CardTitle>
              <CardSubtitle>
                User Information
                  </CardSubtitle>
              <CardText>
                <br />
                <p>
                  UserID : {this.props.defaultValue.UserID}
                </p>
                <p>
                  FirstName : {this.props.defaultValue.FirstName}
                </p>
                <p>
                  LastName: {this.props.defaultValue.LastName}
                </p>
                <p>
                  E-mail : {this.props.defaultValue.Email}
                </p>
                <p>
                  Birthday : {this.props.defaultValue.Birthday}
                </p>
                <p>
                  Address : {this.props.defaultValue.Address}
                </p>
                <p>
                  Gender : {this.props.defaultValue.Gender}
                </p>
              </CardText>
              <Button color='primary' onClick={this.props.toNextStep} defaultValue={this.props.defaultValue}>
                Edit Profile
                  </Button>
            </CardBody>
          </Card>

        </div>
      );
    }
  }

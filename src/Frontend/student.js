import React, { Component } from 'react'
import { width } from 'window-size'
import PropTypes from 'prop-types'
import { Footer } from './Footer'
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'

/*
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Course object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/

export class Student extends React.Component {
  render () {
    const tablebody = this.props.src.map((item, i) => {
      var today = new Date()
      if (new Date(item.CourseExpDate) >= today) {
        return (<tr>
                  <th scope='row'>
                    {i + 1}
                  </th>
                  <td>
                    {item.CourseID}
                  </td>
                  <td>
                    {item.CourseName}
                  </td>
                  <td>
                    {item.CourseExpDate}
                    <Badge color='primary'>
                      {parseInt(((new Date(item.CourseExpDate)) - today) / (24 * 3600 * 1000))} days left
                    </Badge>
                  </td>
                </tr>
          );}else {
        return (<tr style={{color: '#F00'}}>
                  <th scope='row'>
                    {i + 1}
                  </th>
                  <td>
                    {item.CourseID}
                  </td>
                  <td>
                    {item.CourseName}
                  </td>
                  <td>
                    {item.CourseExpDate}
                    <Badge color='danger'>
                      Expired!
                    </Badge>
                  </td>
                </tr>
        )
      }
    });
    return (
      <div className='App'>
        <Container fluid style={{backgroundColor: '#222',bottom: 0,padding: 20}}>
          <Col sm='12' md={{ size: 8, offset: 2 }}>
          <Card style={{
 justifyContent: 'center',
 alignItems: 'center',
 marginBottom: 10,
 padding: 10
 }}>
            <CardImg
              top
              style={{width: 100,textAlign: 'center'}}
              src={this.props.ProfileImg}
              alt='Card image cap' />
            <CardBody>
              <CardTitle>
                {this.props.Username}
              </CardTitle>
              <CardSubtitle>
                User Information
              </CardSubtitle>
              <CardText>
                <br />
                <p>
                  UserID :
                  {' ' + this.props.UserID}
                </p>
                <p>
                  FirstName :
                  {' ' + this.props.FirstName}
                </p>
                <p>
                  LastName :
                  {' ' + this.props.LastName}
                </p>
                <p>
                  Birthday :
                  {' ' +(new Date(this.props.Birthday)).getFullYear() + '-' + (new Date(this.props.Birthday)).getMonth()+'-'+(new Date(this.props.Birthday)).getDate()}
                </p>
                <p>
                  Address :
                  {' ' + this.props.Address}
                </p>
                <p>
                  Gender :
                  {' ' + this.props.Gender}
                </p>
              </CardText>
              <Button>
                Edit Information
              </Button>
            </CardBody>
          </Card>
          <Card>
            <Table style={{marginBottom: 10}}>
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    CourseID
                  </th>
                  <th>
                    Course Name
                  </th>
                  <th>
                    Expiry Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {tablebody}
              </tbody>
            </Table>
          </Card>
          </Col>
        </Container>
        <Footer/>
      </div>
    )
  }
}

Student.propTypes = {
  UserID: PropTypes.string.isRequired,
  Username: PropTypes.string.isRequired,
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  ProfileImg: PropTypes.string.isRequired,
  Birthday: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  Gender: PropTypes.string.isRequired,
  src: PropTypes.arrayOf(PropTypes.shape({
    CourseID: PropTypes.string.isRequired,
    CourseName: PropTypes.string.isRequired,
    CourseExpDate: PropTypes.string.isRequired,
    CourseLink: PropTypes.string.isRequired
  })).isRequired
}

Student.defaultProps = {
  UserID: 'EX111',
  Username: 'Play_Play',
  FirstName: 'John',
  LastName: 'Doe',
  ProfileImg: 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png',
  Birthday: '1550-11-12',
  Address: '349, SJ Infinite One Business Complex, 11th Floor, Vibhavadi-Rangsit Road, Chompol, Chatuchak, Bangkok 10900',
  Gender: 'Male',
  src: [
    {CourseID: '10001',CourseName: 'Math for Programmer 0',CourseExpDate: '2018-10-11',CourseLink: ''},
    {CourseID: '10002',CourseName: 'Math for Programmer 1',CourseExpDate: '2018-07-11',CourseLink: ''},
    {CourseID: '10003',CourseName: 'Math for Programmer 2',CourseExpDate: '2018-06-10',CourseLink: ''},
    {CourseID: '10004',CourseName: 'Math for Programmer 3',CourseExpDate: '2018-02-07',CourseLink: ''}
  ]
}

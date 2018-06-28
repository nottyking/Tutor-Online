import React from 'react'
import {AdminEditCourseModal} from './AdminEditCourseModal';
import { Loading } from './Loading'
import { Container, Col,Table,Badge,Modal,ModalBody,Button,ModalFooter,ModalHeader } from 'reactstrap'
import Cookies from 'universal-cookie';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

const cookies = new Cookies();
const ipList = require('../Config/ipConfig');
const axios = require('axios')
const capsule = require('./Capsulation/SendData')
var isValidToken;
var linkRedirect = '/loginPage';
var modalComponent;

/*
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Course object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/

export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isloaded: false,
        modalOpen:false,
        courseInfo:{}
    }
    this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  async componentWillMount() {
    console.log("ENTER CoursePresent Component");
    var temp1 = (await axios.post(ipList.backend + "/home/queryInformation", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    this.setState({
      isloaded: true ,
      courseInfo: temp1,
    })
    console.log("Course info:",this.state.courseInfo);
  }

  async getDatabaseValue() {
    //get Data from database
    var studentInformationAndError = (await axios.post(ipList.backend + "/student/queryInformation", {
      loginToken: cookies.get("loginToken")
    })).data;
    console.log("studentInformationAndError:", studentInformationAndError);
    isValidToken = true;
    linkRedirect = '';
    if (studentInformationAndError.redirect) {
      console.log("Redirect", studentInformationAndError.redirect);
      isValidToken = false;
      linkRedirect = studentInformationAndError.redirect;
    }
    else {
      var studentInformation = studentInformationAndError.result[0]
      console.log(studentInformation);
      var studentError = studentInformationAndError.error;
      console.log();
    }
    return;
  }

toggle(x) {
  console.log(this.state.modalOpen);
this.setState({
    modalOpen: !this.state.modalOpen
});
modalComponent = (x===-1)? 'Error':(<AdminEditCourseModal src={this.state.courseInfo[x]}/>);
}



  render() {
    if(this.state.isloaded){
        var courseTableBody = this.state.courseInfo.map((item,i)=>
        <tr>
                <th scope="row">{i+1}</th>
                <td>{item.courseid}</td>
                <td>{item.coursename}</td>
                <td>{item.instructor}</td>
                <td>{item.price/100} ฿</td>
                <td><Badge color='primary' onClick={()=>{this.toggle(i)}}>click</Badge></td>
                <td><Badge color='primary' onClick={()=>{this.toggle(i)}}>click</Badge></td>
        </tr>


        );

        return(
            <Container fluid>
            <Modal isOpen={this.state.modalOpen}  toggle={()=>{this.toggle(-1)}} className={this.props.className}>
            <ModalHeader toggle={()=>{this.toggle(-1)}}>Edit Course</ModalHeader>
            {modalComponent}
            <ModalFooter><Button color="secondary" onClick={()=>{this.toggle(-1)}}>Cancel</Button></ModalFooter>
            </Modal>);
            <Col>
            <Table inverse striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Course id</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Price</th>
            <th>Edit Info</th>
            <th>Edit Subcourse</th>
          </tr>
          <tr>
          <Button color='primary' fluid width='100%'> +</Button>
      </tr>
          {courseTableBody}
        </thead>
        <tbody>

        </tbody>
      </Table>
      </Col>
            </Container>
        );

    }
    else{
        return(
            <Loading/>
        );
    }
  }
}

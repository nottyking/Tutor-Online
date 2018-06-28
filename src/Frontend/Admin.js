import React from 'react'
import {AdminEditCourseModal} from './AdminEditCourseModal';
import {AdminCreateCourseModal} from './AdminCreateCourseModal';
import {AdminEditSubCourseModal} from './AdminEditSubCourseModal';
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
        courseInfo:{},
        modalHeader:''
    }
    this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleSubcourse = this.toggleSubcourse.bind(this);
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

toggleEdit(x) {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Edit Course',
    modalOpen: !this.state.modalOpen
});
modalComponent = (x===-1)? '':(<AdminEditCourseModal src={this.state.courseInfo[x]}/>);
}

toggleCreate() {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Create Course',
    modalOpen: !this.state.modalOpen
});
modalComponent =<AdminCreateCourseModal/>;
}

toggleSubcourse(x) {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Edit Sub Course',
    modalOpen: !this.state.modalOpen
});
modalComponent = (x===-1)? '':(<AdminEditSubCourseModal courseid={this.state.courseInfo[x].courseid}/>);
}

closeModal=()=> {
  this.setState({
    modalOpen: false
});
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
                <td><Button color='primary' onClick={()=>{this.toggleEdit(i)}}><i class="fa fa-edit"/></Button></td>
                <td><Button color='primary' onClick={()=>{this.toggleSubcourse(i)}}><i class="fa fa-edit"/></Button></td>
        </tr>

            
        );
    
        return(
            <Container fluid>
            <Modal isOpen={this.state.modalOpen}  toggle={this.closeModal} className={this.props.className}>
            <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>
            {modalComponent}
            <ModalFooter><Button color="secondary" onClick={this.closeModal}>Cancel</Button></ModalFooter>
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
          <Button color='primary' outline left='50%' onClick={this.toggleCreate}> +</Button>
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


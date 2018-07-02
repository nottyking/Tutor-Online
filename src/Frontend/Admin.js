import React from 'react'
import {AdminEditCourseModal} from './AdminEditCourseModal';
import {AdminCreateCourseModal} from './AdminCreateCourseModal';
import {AdminEditSubCourseModal} from './AdminEditSubCourseModal';
import {AdminDeleteCourseModal} from './AdminDeleteCourseModal';
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
    //this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleSubcourse = this.toggleSubcourse.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  async componentWillMount() {
    return this.getData();
  }

 async getData(){
  this.setState({
    isloaded: false
  });
  console.log("GetIt");
  var temp1 = (await axios.post(ipList.backend + "/manage/queryInformation", capsule.sendData({
    // Don't need to add anything, just send only a loginToken with capsule
  }))).data;
  console.log(temp1);
  for(var i = 0 ; i < temp1.length ; i++){
    // console.log(courseInfo[i].thumbnail);
    try{
      temp1[i].thumbnail = require('./Image/Course/Thumbnail/Thumbnail' + temp1[i].courseid + '.jpg')
      temp1[i].banner = require('./Image/Course/Banner/Banner' + temp1[i].courseid + '.jpg')
    } catch(err){

    }
    // console.log(courseInfo[i].thumbnail);
  }
  console.log(temp1);
  this.setState({
    isloaded: true ,
    courseInfo: temp1,
    isChanged:false
  });
  console.log("Course info:",this.state.courseInfo);
  return true;
 }

  /*async getDatabaseValue() {
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
  }*/

toggleEdit(x) {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Edit Course',
    modalOpen: !this.state.modalOpen
});
modalComponent = (x<0)? '':(<AdminEditCourseModal src={this.state.courseInfo[x]}  closeModal={this.closeModal}/>);
}

toggleCreate() {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Create Course',
    modalOpen: !this.state.modalOpen
});
modalComponent =<AdminCreateCourseModal  closeModal={this.closeModal}/>;
}

toggleSubcourse(x) {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Edit Sub Course',
    modalOpen: !this.state.modalOpen
});
modalComponent = (x<0)? '':(<AdminEditSubCourseModal courseid={this.state.courseInfo[x].courseid} coursename={this.state.courseInfo[x].coursename} closeModal={this.closeModal}/>);
}

toggleDelete(x) {
  console.log(this.state.modalOpen);
this.setState({
    modalHeader: 'Delete Course',
    modalOpen: !this.state.modalOpen
});
modalComponent = (x<0)? '':(<AdminDeleteCourseModal courseid={this.state.courseInfo[x].courseid} coursename={this.state.courseInfo[x].coursename} closeModal={this.closeModal}/>);
}

closeModal=()=> {
  console.log('closemodal by fx')
  this.getData();
  this.setState({
    modalOpen: false
});
}


  render() {
    console.log('renderrrrrr');
    if(this.state.isloaded){
        var courseTableBody = this.state.courseInfo.map((item,i)=>
        <tr style={{color : (item.isavailable == '1') ? '#FFF': '#555'}}>
                <td><b>{i+1}</b></td>
                <td>{item.courseid}</td>
                <td>{item.coursename}</td>
                <td>{item.instructor}</td>
                <td>{item.price/100} ฿</td>
                <td><Button color='primary' outline onClick={()=>{this.toggleEdit(i)}}><i class="fa fa-edit"/></Button>{' '}
                <Button color='primary' outline onClick={()=>{this.toggleSubcourse(i)}}><i class="fa fa-reorder"/></Button>{' '}
                <Button color='danger' outline onClick={()=>{this.toggleDelete(i)}}><i class="fa fa-trash-o"/></Button></td>
        </tr>


        );

        return(
            <Container fluid>
            <h3 color='white'>Courses List</h3>
            <Modal size="lg" isOpen={this.state.modalOpen}  toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>

            {modalComponent}
            <ModalFooter></ModalFooter>
            </Modal>
            <Col>
            <Table inverse striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Course id</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Price</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td colspan="10">
          <Button color='info' outline style={{width:'100%',height:'100%'}} onClick={this.toggleCreate}><i class="fa fa-plus"/></Button></td>

      </tr>
          {courseTableBody}



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

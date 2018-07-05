import React from 'react'
import { AdminEditCourseModal } from './AdminEditCourseModal';
import { AdminCreateCourseModal } from './AdminCreateCourseModal';
import { AdminEditSubCourseModal } from './AdminEditSubCourseModal';
import { AdminDeleteCourseModal } from './AdminDeleteCourseModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import { Form, Card, Input, Container, Col, Row, FormGroup, Table, Modal, Button, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { Switch } from 'antd';
import 'antd/dist/antd.css';

const ipList = require('../../../Config/ipConfig');
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
var modalComponent;
const rowperpage = 15;
var allusers;
<<<<<<< HEAD
const rolecolor = ['#FFF','#007bff'];
const type = ['','fab fa-facebook-f' ,'fab fa-google']
=======
const rolecolor = ['#FFF', '#007bff']
>>>>>>> bfade338b175155453ca2bbecbaa5f96dc29842c

/*
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Course object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/

const MyLoaderRow = () => (
  <ContentLoader
    height={15}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#9c9c9c"
  >
    <rect x="0" y="5" rx="3" ry="3" width="395" height="5" />
  </ContentLoader>
);
const MyLoader2 = props => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#9c9c9c"
  >
    <circle cx="23.64" cy="24.64" r="14.64" />
  </ContentLoader>
);



export class AdminManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      modalOpen: false,
      userinfo: {},
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      //Sort 0 : by courseid assending, 1 : by courseid decreasing ,2: by coursename ass, 3 cn decre,  
      sortmode: 0
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

  setPage(x) {
    if (x >= 0 && x <= Math.ceil(this.state.userinfo.length / rowperpage) - 1) {
      this.setState({ pager: x });
    }
  }

  async getData() {
    this.setState({
      isloaded: false
    });
    console.log("GetIt");
    var temp1 = (await axios.post(ipList.backend + "/manage/mainuser", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    console.log(temp1);
    for (var i = 0; i < temp1.length; i++) {
      // console.log(userinfo[i].thumbnail);
      try {
        temp1[i].thumbnail = require('../../Image/Course/Thumbnail/Thumbnail' + temp1[i].courseid + '.jpg')
        temp1[i].banner = require('../../Image/Course/Banner/Banner' + temp1[i].courseid + '.jpg')
      } catch (err) {

      }
      // console.log(userinfo[i].thumbnail);
    }
    allusers = temp1;
    if (this.state.ishideUnavailable) {
      for (var i = temp1.length - 1; i >= 0; --i) {
        if (temp1[i].isavailable == 0) {
          temp1.splice(i, 1);
        }
      }
    }
    console.log(temp1);
    this.setState({
      isloaded: true,
      userinfo: temp1,
      pager: 0
    });
    console.log("Course info:", this.state.userinfo);
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
    modalComponent = (x < 0) ? '' : (<AdminEditCourseModal src={this.state.userinfo[x]} closeModal={this.closeModal} />);
  }

  toggleCreate() {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Create Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = <AdminCreateCourseModal closeModal={this.closeModal} />;
  }

  toggleSubcourse(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Sub Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={this.state.userinfo[x].courseid} coursename={this.state.userinfo[x].coursename} closeModal={this.closeModal} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={this.state.userinfo[x].courseid} coursename={this.state.userinfo[x].coursename} closeModal={this.closeModal} />);
  }

  closeModal = () => {
    console.log('closemodal by fx')
    this.getData();
    this.setState({
      modalOpen: false
    });
  }

  togglehideUnavailable = () => {
    console.log('hide : ' + !this.state.ishideUnavailable);
    this.setState({ ishideUnavailable: !this.state.ishideUnavailable });
    this.getData();
  }

  searchUser(searchword, mode) {
    if (searchword.indexOf('[') > -1 || searchword.indexOf('(') > -1 || searchword.indexOf('*') > -1 || searchword.indexOf('+') > -1) {
      document.getElementById('usersearchbox').classList.remove('is-valid');
      document.getElementById('usersearchbox').classList.add('is-invalid');
      return;
    }
    var expr = RegExp(searchword.toLowerCase());
    var tempusers = [];
    switch (mode) {
      case 'fname':
        allusers.map((item) =>
          (expr.test(item.fname.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      case 'userid':
        allusers.map((item) =>
          (expr.test(item.fname.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      case 'lname':
        allusers.map((item) =>
          (expr.test(item.fname.toLowerCase())) ? tempusers.push(item) : ''
        );
      case 'email':
        allusers.map((item) =>
          (expr.test(item.fname.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      default:

    }

    console.log(tempusers);
    this.setState({ userinfo: tempusers, pager: 0 });
  }


  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var courseTableBody = this.state.userinfo.map((item, i) =>
        <tr style={{ color: (item.isBanned == '1') ? '#F55' : (item.isConfirm == '0') ? '#888' : rolecolor[parseInt(item.role)], display: (i >= rowperpage * this.state.pager && i < rowperpage * (this.state.pager + 1)) ? '' : 'none' }}>
          <td><b>{i + 1}</b></td>
          <td>{item.userid}</td>
          <td>{item.username}</td>
          <td>{item.fname}</td>
          <td>{(item.lname)}</td>
          <td><Button color='primary' outline onClick={() => { this.toggleEdit(i) }}><i class="fa fa-google" /></Button>{' '}
            <Button color='primary' outline onClick={() => { this.toggleSubcourse(i) }}><i class="fa fa-reorder" /></Button>{' '}
            <Button color='danger' outline onClick={() => { this.toggleDelete(i) }}><i class="fa fa-trash-o" /></Button></td>
            <td><i class={item.type=='1'?"fa fa-facebook":item.type=='2'? "fa fa-google":''} /></td>
        </tr>
      );

      var paginationitems = [];
      for (var i = 0; i < Math.ceil(this.state.userinfo.length / rowperpage); i++) {
        ((i) => {
          paginationitems.push(
            <PaginationItem active={i == this.state.pager}>
              <PaginationLink onClick={() => { this.setPage(new Number(i)) }}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>);

        })(i);
      }

      return (
        <Container fluid style={{ paddingBottom: '10px' }}>

          <br />
          <Card style={{ background: '#444', padding: 20 }}>
            <Row className="justify-content-between" style={{ color: 'white' }}>
              <Col xs='auto'>
                <Input plaintext style={{ color: 'white', fontSize: 'large', fontWeight: 'bold' }}>User Management</Input>
              </Col>
              <Col xs='auto'>
                <Form inline style={{ display: 'block', zIndex: 100 }}>
                  <FormGroup row style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Input plaintext style={{ color: 'white', width: 100 }}>HIDE&nbsp;&nbsp;<Switch checked={this.state.ishideUnavailable} onChange={this.togglehideUnavailable} style={{ width: 50 }} /></Input>
                    <Input type="text" name="searchbox" id="usersearchbox" placeholder="Search User" style={{ width: 300 }} />&nbsp;
                    <Button color="primary" onClick={() => { this.searchUser(document.getElementById('usersearchbox').value, 'fname') }}><i class="fa fa-search" /></Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Card>
          <br />

          <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>

            {modalComponent}
            <ModalFooter></ModalFooter>
          </Modal>
          <Col>
            <Table inverse striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>UserName</th>
                  <th>FirstName</th>
                  <th>Price</th>
                  <th></th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
                {courseTableBody}
              </tbody>
            </Table>

            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled={this.state.pager == 0}>
                <PaginationLink onClick={() => { this.setPage(this.state.pager - 1) }} >
                  <i class="fa fa-angle-left" />
                </PaginationLink>
              </PaginationItem>
              {paginationitems}
              <PaginationItem disabled={this.state.pager == Math.ceil(this.state.userinfo.length / rowperpage) - 1 || this.state.userinfo.length === 0}>
                <PaginationLink onClick={() => { this.setPage(this.state.pager + 1) }} >
                  <i class="fa fa-angle-right" />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
        </Container>
      );

    }
    else {
      return (
        <Container fluid style={{ paddingBottom: '10px' }}>
          <h3 color='white'>Courses List</h3>
          <Switch checked={this.state.ishideUnavailable} disabled loading />
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
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td></tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td></tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>
      );
    }
  }
}

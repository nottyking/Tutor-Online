import React from 'react'
import { AdminEditUserModal } from './AdminEditUserModal';
import { AdminEditCourseModal } from './AdminEditCourseModal';
import { AdminCreateCourseModal } from './AdminCreateCourseModal';
import { AdminEditSubCourseModal } from './AdminEditSubCourseModal';
import { AdminDeleteCourseModal } from './AdminDeleteCourseModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import {
  Form, Badge, Card, Input, InputGroupButtonDropdown, DropdownMenu, DropdownItem, InputGroupAddon, DropdownToggle, InputGroup,
  Container, Col, Row, FormGroup, Table, Modal, Button, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink
} from 'reactstrap'
import { Switch } from 'antd';
import 'antd/dist/antd.css';

const ipList = require('../../../Config/ipConfig');
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
var modalComponent;
const rowperpage = 15;
var allusers;
const rolecolor = ['#FFF', '#007bff'];
const type = ['', 'fab fa-facebook-f', 'fab fa-google']

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
      userhideinfo:{},
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      splitButtonOpen: false,
      searchType: 'All',
      //Sort 0 : by courseid assending, 1 : by courseid decreasing ,2: by coursename ass, 3 cn decre,
      sortmode: 0
    }
    //this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleSubcourse = this.toggleSubcourse.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
  }

  async componentWillMount() {
    this.getData();
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
    allusers = temp1;
    console.log("GETDATA",temp1);
    this.setState({
      isloaded: true,
      userinfo: temp1,
      pager: 0
    });
    console.log("Course info:", this.state.userinfo);
    return true;
  }

  sortCourse(mode) {
    console.log('mode : ' + mode);
    var tempusers = this.state.userinfo;
    switch (parseInt(mode)) {
      case 0:
        tempusers.sort(function (a, b) { return a.userid - b.userid });
        break;
      case 1:
        tempusers.sort(function (a, b) { return b.userid - a.userid });
        break;
      case 2:
        tempusers.sort(function (a, b) {
          var x = a.username.toLowerCase();
          var y = b.username.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.userid - b.userid;
        });
        break;
      case 3:
        tempusers.sort(function (a, b) {
          var x = a.username.toLowerCase();
          var y = b.username.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.userid - b.userid;
        });
        break;
      case 4:
        tempusers.sort(function (a, b) {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.userid - b.userid;
        });
        break;
      case 5:
        tempusers.sort(function (a, b) {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.userid - b.userid;
        });
        break;
      case 6:
        tempusers.sort(function (a, b) {
          var x = a.fname.toLowerCase();
          var y = b.fname.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.userid - b.userid;
        });
        break;
      case 7:
        tempusers.sort(function (a, b) {
          var x = a.fname.toLowerCase();
          var y = b.fname.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.userid - b.userid;
        });
        break;
      case 8:
        tempusers.sort(function (a, b) {
          var x = a.lname.toLowerCase();
          var y = b.lname.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.userid - b.userid;
        });
        break;
      case 9:
        tempusers.sort(function (a, b) {
          var x = a.lname.toLowerCase();
          var y = b.lname.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.userid - b.userid;
        });
        break;
      default:
        this
    }
    console.log("SORT");
    this.setState({ userinfo: tempusers, sortmode: mode, pager: 0 });
  }

  handleSearchKeyPress(event, mode) {
    if (event.charCode == 13) {
      event.preventDefault();
      this.searchUser(event.target.value, mode);
    }
  }

  changeSearchType(type) {
    if (this.state.searchType !== type)
      this.setState(
        { searchType: type }
      )
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
      case 'Name':
        allusers.map((item) =>
          ((expr.test(item.fname.toLowerCase())) || (expr.test(item.lname.toLowerCase()))) ? tempusers.push(item) : ''
        );
        break;
      case 'User ID':
        allusers.map((item) =>
          (expr.test(item.userid)) ? tempusers.push(item) : ''
        );
        break;
      case 'Username':
        allusers.map((item) =>
          (expr.test(item.username.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      case 'First Name':
        allusers.map((item) =>
          (expr.test(item.fname.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      case 'Last Name':
        allusers.map((item) =>
          (expr.test(item.lname.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      case 'Email-Address':
        allusers.map((item) =>
          (expr.test(item.email.toLowerCase())) ? tempusers.push(item) : ''
        );
        break;
      default:
        allusers.map((item) => (
          (expr.test(item.userid)) ||
          (expr.test(item.username.toLowerCase())) ||
          (expr.test(item.email.toLowerCase())) ||
          (expr.test(item.fname.toLowerCase())) ||
          (expr.test(item.lname.toLowerCase()))) ? tempusers.push(item) : ''
        );
        break;
    }
    console.log(tempusers);
    console.log("SEARCH");
    this.setState({ userinfo: tempusers, pager: 0 });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  toggleEdit(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit User',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditUserModal src={this.state.userinfo[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleCreate() {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Create User',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = <AdminCreateCourseModal closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />;
  }

  toggleSubcourse(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit User',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={this.state.userinfo[x].courseid} coursename={this.state.userinfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete User',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={this.state.userinfo[x].courseid} coursename={this.state.userinfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  closeModal = () => {
    console.log('closemodal by fx')
    this.setState({
      modalOpen: false
    });
  }

  closeModalAndReload = () => {
    console.log('closemodal by fx')
    this.getData();
    this.setState({
      modalOpen: false
    });

  }

  togglehideUnavailable = () => {
    console.log('hide : ' + !this.state.ishideUnavailable);
    var temp = Object.assign([], this.state.userinfo);
    for (var i = temp.length - 1; i >= 0; --i) {
      if (temp[i].isconfirm == 0) {
        temp.splice(i, 1);
      }
    }
    this.setState({ ishideUnavailable: !this.state.ishideUnavailable, userhideinfo:temp, pager:0 });
  }

  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var info = this.state.userinfo
      console.log(this.state.userinfo);
      console.log("ishide",this.state.ishideUnavailable);
      if(this.state.ishideUnavailable){
        console.log("IN");
        info = this.state.userhideinfo
      }
      var courseTableBody = info.map((item, i) =>
        <tr style={{ color: (item.isbanned == '1') ? '#F55' : (item.isconfirm == '0') ? '#888' : rolecolor[parseInt(item.role)], display: (i >= rowperpage * this.state.pager && i < rowperpage * (this.state.pager + 1)) ? '' : 'none' }}>
          <td><b>{i + 1}</b></td>
          <td>{item.userid}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.fname}</td>
          <td>{(item.lname)}</td>
          <td style={{ width: 60 }}><Button color='primary' style={{ width: 45, height: 40 }} outline onClick={() => { this.toggleEdit(i) }}><i class="fa fa-reorder" /></Button></td>
          <td style={{ width: 120 }}>
            <Button disabled color={item.isconfirm == 0 ? "dark" : item.isbanned == 1 ? "danger" : item.role == 1 ? "primary" : "success"}
              style={{ width: 45, height: 40 }}>
              <i class={item.isconfirm == 0 ? "fa fa-envelope-o" : item.isbanned == 1 ? "fa fa-warning" : item.role == 1 ? "fa fa-graduation-cap" : "fa fa-check"} />
            </Button>{" "}
            <Button disabled color={item.isconfirm == 0 ? "dark" : item.isbanned == 1 ? "danger" : item.role == 1 ? "primary" : item.type == '1' ? "primary" : item.type == '2' ? "danger" : "light"}
              style={{ width: 45, height: 40 }}>
              <i class={item.type == '1' ? "fa fa-facebook" : item.type == '2' ? "fa fa-google" : 'fa fa-user'} />
            </Button>
          </td>
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
                    <InputGroup >
                      <Input plaintext style={{ color: 'white', width: 100 }}>HIDE&nbsp;&nbsp;<Switch checked={this.state.ishideUnavailable} onChange={this.togglehideUnavailable} style={{ width: 50 }} /></Input>
                      <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                        <Input disabled hidden value={this.state.searchType}></Input>
                        <Button disabled color="light" outline
                          style={{ width: 130 }} >{this.state.searchType}</Button>
                        <DropdownToggle split outline color='light' />
                        <DropdownMenu>
                          <DropdownItem onClick={() => this.changeSearchType('All')}>All</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('User ID')}>User ID</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Username')}>Username</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Email-Address')}>Email-Address</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Name')}>Name</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('First Name')}>First Name</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Last Name')}>Last Name</DropdownItem>
                        </DropdownMenu>
                      </InputGroupButtonDropdown>
                    </InputGroup >&nbsp;
                    <InputGroup style={{ width: 340 }} >
                      <Input type="text" name="searchbox" id="usersearchbox" placeholder="Search User"
                        onKeyPress={(e, mode = this.state.searchType) => this.handleSearchKeyPress(e, mode)}
                        style={{ width: 300 }} />
                      <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => { this.searchUser(document.getElementById('usersearchbox').value, this.state.searchType) }}>
                          <i class="fa fa-search" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Card>
          <br />

          <Modal size="md" isOpen={this.state.modalOpen} toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>

            {modalComponent}
            <ModalFooter></ModalFooter>
          </Modal>
          <Col>
            <Table bordered inverse striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 0 ? this.sortCourse(1) : this.sortCourse(0); }}>User ID </span>
                    <Badge color={this.state.sortmode == 0 || this.state.sortmode == 1 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 0 ? this.sortCourse(1) : this.sortCourse(0); }}>
                      <i class={this.state.sortmode == 0 ? "fa fa-sort-amount-asc " : this.state.sortmode == 1 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 0 || this.state.sortmode == 1 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 2 ? this.sortCourse(3) : this.sortCourse(2); }}>UserName </span>
                    <Badge color={this.state.sortmode == 2 || this.state.sortmode == 3 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 2 ? this.sortCourse(3) : this.sortCourse(2); }}><i class={this.state.sortmode == 2 ? "fa fa-sort-amount-asc " : this.state.sortmode == 3 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 2 || this.state.sortmode == 3 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 4 ? this.sortCourse(5) : this.sortCourse(4); }}>Email </span>
                    <Badge color={this.state.sortmode == 4 || this.state.sortmode == 5 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 4 ? this.sortCourse(5) : this.sortCourse(4); }}><i class={this.state.sortmode == 4 ? "fa fa-sort-amount-asc " : this.state.sortmode == 5 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 4 || this.state.sortmode == 5 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 6 ? this.sortCourse(7) : this.sortCourse(6); }}>FirstName </span>
                    <Badge color={this.state.sortmode == 6 || this.state.sortmode == 7 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 6 ? this.sortCourse(7) : this.sortCourse(6); }} ><i class={this.state.sortmode == 6 ? "fa fa-sort-amount-asc " : this.state.sortmode == 7 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 6 || this.state.sortmode == 7 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 8 ? this.sortCourse(9) : this.sortCourse(8); }}>LastName  </span>
                    <Badge color={this.state.sortmode == 8 || this.state.sortmode == 9 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 8 ? this.sortCourse(9) : this.sortCourse(8); }} ><i class={this.state.sortmode == 8 ? "fa fa-sort-amount-asc " : this.state.sortmode == 9 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 8 || this.state.sortmode == 9 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                  </th>
                  <th>
                    {'type'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseTableBody}
              </tbody>
            </Table>

          </Col>

          <Row className='justify-content-around'>
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
          </Row>
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
                  <th>User ID</th>
                  <th>UserName</th>
                  <th>Email-Address</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Action</th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
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

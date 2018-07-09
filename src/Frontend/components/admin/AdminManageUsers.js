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
const sortName = ['User ID (+)', 'User ID (-)', 'Username (A-Z)', 'Username (Z-A)', 'E-mail (A-Z)', 'E-mail (Z-A)', 'Name (A-Z)', 'Name (Z-A)', 'Surname (A-Z)', 'Surname (Z-A)']

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
      userInfo: {},
      userhideinfo:{},
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      splitButtonOpen: false,
      searchType: 'All',
      searchWord: '',
      //Sort 0 : by courseid assending, 1 : by courseid decreasing ,2: by coursename ass, 3 cn decre,
      sortmode: -1,
      sortmodeIcon: -1,
      sortmodeName: 'None'
    }
    //this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleSubcourse = this.toggleSubcourse.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.toggleSortSplit = this.toggleSortSplit.bind(this);
    this.setSortModeIcon = this.setSortModeIcon.bind(this);
    this.setSortModeName = this.setSortModeName.bind(this);
    this.sortUser = this.sortUser.bind(this);
    this.sortUserData = this.sortUserData.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleSearchIconPress = this.handleSearchIconPress.bind(this);
  }

  async componentWillMount() {
    this.getData();
  }

  setPage(x) {
    var info = this.state.userInfo
    if(this.state.ishideUnavailable)
      info = this.state.userhideinfo
    if (x >= 0 && x <= Math.ceil(info.length / rowperpage) - 1) {
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
      userInfo: temp1,
      pager: 0
    });
    this.togglehideUnavailable();
    console.log("Course info:", this.state.userInfo);
    return true;
  }

  handleSearchKeyPress(event, searchMode, sortMode) {
    if (event.charCode == 13) {
      event.preventDefault();
      this.searchUser(event.target.value, searchMode, sortMode);
    }
  }

  handleSearchIconPress(searchKeyword, searchMode, sortMode) {
    this.searchUser(searchKeyword, searchMode, sortMode);
  }

  changeSearchType(type) {
    if (this.state.searchType !== type)
      this.setState(
        { searchType: type }
      )
  }

  setSortModeIcon(sortMode) {
    if (this.state.sortmodeIcon !== sortMode) {
      this.setState({
        sortmodeIcon: sortMode
      });
      this.setSortModeName(sortMode)
    }
  }

  setSortModeName(sortMode) {
    if (sortMode < 0) {
      this.setState({
        sortmodeName: 'None'
      });
    }
    else {
      this.setState({
        sortmodeName: sortName[sortMode]
      });
    }
  }

  sortUserData(sortMode, userdata) {
    var tempusers = userdata;
    this.setSortModeName(sortMode);
    switch (parseInt(sortMode)) {
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
    this.setState({ userInfo: tempusers, sortmode: sortMode, pager: 0 });
    this.togglehideUnavailable();
  }

  sortUser(sortmode) {
    var tempusers = this.state.userInfo;
    this.sortUserData(sortmode, tempusers)
    console.log('sort user (by icon) finish')
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

  searchUser(searchword, searchMode, sortMode) {
    if (searchword.indexOf('[') > -1 || searchword.indexOf('(') > -1 || searchword.indexOf('*') > -1 || searchword.indexOf('+') > -1) {
      document.getElementById('usersearchbox').classList.remove('is-valid');
      document.getElementById('usersearchbox').classList.add('is-invalid');
      return;
    }
    document.getElementById('usersearchbox').classList.add('is-valid');
    document.getElementById('usersearchbox').classList.remove('is-invalid');
    var expr = RegExp(searchword.toLowerCase());
    var tempusers = [];
    switch (searchMode) {
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
    this.sortUserData(sortMode, tempusers);
  }

  toggleSortSplit() {
    this.setState({
      splitSortButtonOpen: !this.state.splitSortButtonOpen
    });
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
    var info = this.state.userInfo
    if(this.state.ishideUnavailable)
      info = this.state.userhideinfo
    modalComponent = (x < 0) ? '' : (<AdminEditUserModal src={info[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
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
    var info = this.state.userInfo
    if(this.state.ishideUnavailable)
      info = this.state.userhideinfo
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={info[x].courseid} coursename={info[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete User',
      modalOpen: !this.state.modalOpen
    });
    var info = this.state.userInfo
    if(this.state.ishideUnavailable)
      info = this.state.userhideinfo
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={info[x].courseid} coursename={info[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  closeModal = () => {
    console.log('closemodal by fx')
    this.setState({
      modalOpen: false
    });
  }

  closeModalAndReload = async() => {
    console.log('closemodal by fx')
    await this.getData();
    console.log("!@#",this.state.searchWord,this.state.searchType);
    this.searchUser(this.state.searchWord, this.state.searchType)
    console.log(this.state.sortmode);
    this.sortUser(this.state.sortmode);
    this.setState({
      modalOpen: false
    });

  }

  handleHideToggle = () => {
    this.setState({ ishideUnavailable: !this.state.ishideUnavailable, pager:0 });
  }

  togglehideUnavailable = () => {
    console.log('hide : ' + !this.state.ishideUnavailable);
    var temp = Object.assign([], this.state.userInfo);
    for (var i = temp.length - 1; i >= 0; --i) {
      if (temp[i].isconfirm == 0) {
        temp.splice(i, 1);
      }
    }
    this.setState({userhideinfo:temp});
  }

  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var info = this.state.userInfo
      console.log(this.state.userInfo);
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
      for (var i = 0; i < Math.ceil(info.length / rowperpage); i++) {
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
                      <Input plaintext style={{ color: 'white', width: 100 }}>HIDE&nbsp;&nbsp;<Switch checked={this.state.ishideUnavailable} onChange={this.handleHideToggle} style={{ width: 50 }} /></Input>

                      <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitSortButtonOpen} toggle={this.toggleSortSplit}>
                      <Button disabled color="light" outline
                        style={{ width: 160 }} >{this.state.sortmodeName}</Button>
                      <DropdownToggle split outline color='light' />
                      <DropdownMenu>
                        <DropdownItem onClick={() => this.setSortModeIcon(-1)}>None</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(0)}>{sortName[0]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(1)}>{sortName[1]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(2)}>{sortName[2]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(3)}>{sortName[3]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(4)}>{sortName[4]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(5)}>{sortName[5]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(6)}>{sortName[6]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(7)}>{sortName[7]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(8)}>{sortName[8]}</DropdownItem>
                        <DropdownItem onClick={() => this.setSortModeIcon(9)}>{sortName[9]}</DropdownItem>
                      </DropdownMenu>
                      </InputGroupButtonDropdown>

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
                      <Input type="text" name="searchbox" id="usersearchbox" placeholder="Search User" defaultValue={this.state.searchWord==''? '':this.state.searchWord}
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
                    <span onClick={() => { this.state.sortmode == 0 ? this.sortUser(1) : this.sortUser(0); }}>User ID </span>
                    <Badge color={this.state.sortmode == 0 || this.state.sortmode == 1 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 0 ? this.sortUser(1) : this.sortUser(0); }}>
                      <i class={this.state.sortmode == 0 ? "fa fa-sort-amount-asc " : this.state.sortmode == 1 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 0 || this.state.sortmode == 1 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 2 ? this.sortUser(3) : this.sortUser(2); }}>UserName </span>
                    <Badge color={this.state.sortmode == 2 || this.state.sortmode == 3 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 2 ? this.sortUser(3) : this.sortUser(2); }}><i class={this.state.sortmode == 2 ? "fa fa-sort-amount-asc " : this.state.sortmode == 3 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 2 || this.state.sortmode == 3 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 4 ? this.sortUser(5) : this.sortUser(4); }}>Email </span>
                    <Badge color={this.state.sortmode == 4 || this.state.sortmode == 5 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 4 ? this.sortUser(5) : this.sortUser(4); }}><i class={this.state.sortmode == 4 ? "fa fa-sort-amount-asc " : this.state.sortmode == 5 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 4 || this.state.sortmode == 5 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 6 ? this.sortUser(7) : this.sortUser(6); }}>FirstName </span>
                    <Badge color={this.state.sortmode == 6 || this.state.sortmode == 7 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 6 ? this.sortUser(7) : this.sortUser(6); }} ><i class={this.state.sortmode == 6 ? "fa fa-sort-amount-asc " : this.state.sortmode == 7 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                      style={{ color: this.state.sortmode == 6 || this.state.sortmode == 7 ? '' : '#AAA' }} />
                    </Badge>
                  </th>
                  <th>
                    <span onClick={() => { this.state.sortmode == 8 ? this.sortUser(9) : this.sortUser(8); }}>LastName  </span>
                    <Badge color={this.state.sortmode == 8 || this.state.sortmode == 9 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 8 ? this.sortUser(9) : this.sortUser(8); }} ><i class={this.state.sortmode == 8 ? "fa fa-sort-amount-asc " : this.state.sortmode == 9 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
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
              <PaginationItem disabled={this.state.pager == Math.ceil(info.length / rowperpage) - 1 || info.length === 0}>
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

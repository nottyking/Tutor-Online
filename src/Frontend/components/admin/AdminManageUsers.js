import React from 'react'
import { AdminEditUserModal } from './AdminEditUserModal';
import { AdminEditCourseModal } from './AdminEditCourseModal';
import { AdminCreateCourseModal } from './AdminCreateCourseModal';
import { AdminEditSubCourseModal } from './AdminEditSubCourseModal';
import { AdminDeleteCourseModal } from './AdminDeleteCourseModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import {
  Form, Card, Input, InputGroupButtonDropdown, DropdownMenu, DropdownItem, InputGroupAddon, DropdownToggle, InputGroup,
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
const sortName = ['User ID (+)', 'User ID (-)', 'Username (A-Z)', 'Username (Z-A)', 'E-mail (A-Z)', 'E-mail (Z-A)', 'Name (A-Z)', 'Name (Z-A)']


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
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      splitButtonOpen: false,
      splitSortButtonOpen: false,
      searchType: 'All',
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
    return this.getData();
  }

  setPage(x) {
    if (x >= 0 && x <= Math.ceil(this.state.userInfo.length / rowperpage) - 1) {
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
    this.setState({
      isloaded: true,
      userInfo: temp1,
      pager: 0
    });
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

  sortUserData(sortmode, userdata) {
    var tempusers = userdata;
    this.setSortModeName(sortmode);
    switch (parseInt(sortmode)) {
      case 0:
        //User ID sort min > max
        tempusers.sort(function (a, b) { return a.userid - b.userid });
        console.log('mode 0 complete');
        break;
      case 1:
        //User ID sort max > min
        tempusers.sort(function (a, b) { return b.userid - a.userid });
        console.log('mode 1 complete');
        break;
      case 2:
        //username min > max
        tempusers.sort(function (a, b) {
          var x = a.username.toLowerCase();
          var y = b.username.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        console.log('mode 2 complete');
        break;
      case 3:
        //username max < min
        tempusers.sort(function (a, b) {
          var x = a.username.toLowerCase();
          var y = b.username.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        });
        console.log('mode 3 complete');
        break;
      case 4:
        //E-mail min > max
        tempusers.sort(function (a, b) {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        console.log('mode 4 complete');
        break;
      case 5:
        //E-mail max < min
        tempusers.sort(function (a, b) {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        });
        console.log('mode 5 complete');
        break;
      case 6:
        //Name min > max
        tempusers.sort(function (a, b) {
          var x = a.fname.toLowerCase();
          var y = b.fname.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        console.log('mode 6 complete');
        break;
      case 7:
        //Name max < min
        tempusers.sort(function (a, b) {
          var x = a.fname.toLowerCase();
          var y = b.fname.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        });
        console.log('mode 7 complete');
        break;
      default:
        //Do nothing
        break;
    }
    this.setState({ userInfo: tempusers, sortmode: sortmode, pager: 0 });
    console.log('sort data');
    console.log(tempusers);
    console.log('sort finish')
  }

  sortUser(sortmode) {
    var tempusers = this.state.userInfo;
    this.sortUserData(sortmode, tempusers)
    console.log('sort user (by icon) finish')
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
    console.log('search data');
    console.log(tempusers);
    this.sortUser(sortMode, tempusers);
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  toggleSortSplit() {
    this.setState({
      splitSortButtonOpen: !this.state.splitSortButtonOpen
    });
  }

  toggleEdit(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit User',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditUserModal src={this.state.userInfo[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
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
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={this.state.userInfo[x].courseid} coursename={this.state.userInfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete User',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={this.state.userInfo[x].courseid} coursename={this.state.userInfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
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
    var temp = Object.assign([], allusers);
    if (!this.state.ishideUnavailable) {
      for (var i = temp.length - 1; i >= 0; --i) {
        if (temp[i].isconfirm == 0) {
          temp.splice(i, 1);
        }
      }
    }
    console.log(temp);
    this.setState({ ishideUnavailable: !this.state.ishideUnavailable, userInfo: temp, pager: 0 });
  }

  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var courseTableBody = this.state.userInfo.map((item, i) =>
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
      for (var i = 0; i < Math.ceil(this.state.userInfo.length / rowperpage); i++) {
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
                      <Input type="text" name="searchbox" id="usersearchbox" placeholder="Search User"
                        onKeyPress={(e, searchMode = this.state.searchType, sortMode = this.state.sortmodeIcon) => this.handleSearchKeyPress(e, searchMode, sortMode)}
                        style={{ width: 300 }} />
                      <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => { this.handleSearchIconPress(document.getElementById('usersearchbox').value, this.state.searchType, this.state.sortmodeIcon) }}>
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

          <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>

            {modalComponent}
            <ModalFooter></ModalFooter>
          </Modal>
          <Col>
            <Table bordered inverse striped>
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
              <PaginationItem disabled={this.state.pager == Math.ceil(this.state.userInfo.length / rowperpage) - 1 || this.state.userInfo.length === 0}>
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

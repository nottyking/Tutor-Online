//MOVE THIS TO "AdminManageCourse" WHEN FINSIH add sale Modal

import React from 'react'
import classnames from 'classnames';
import { AdminEditCourseModal } from './AdminEditCourseModal';
import { AdminEditSaleModal } from './AdminEditSaleModal';
import { AdminCreateCourseModal } from './AdminCreateCourseModal';
import { AdminEditSubCourseModal } from './AdminEditSubCourseModal';
import { AdminDeleteCourseModal } from './AdminDeleteCourseModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import {
  Form, Badge, Label, Input, InputGroupButtonDropdown, DropdownMenu, DropdownItem, InputGroupAddon, DropdownToggle, InputGroup,
  FormGroup, Card, Navbar, TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Table, Modal, Button, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink
} from 'reactstrap'
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { AdminManageUsers } from './AdminManageUsers';

const ipList = require('../../../Config/ipConfig');
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
var modalComponent;
var allcourses;
const rowperpage = 15;
const sortName = ['Course ID (+)', 'Course ID (-)', 'Course Name (A-Z)', 'Course Name (Z-A)', 'Instructor (A-Z)', 'Instructor (Z-A)', 'Price (+)', 'Price (-)', 'New Course', 'Old Course']

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
    speed={10}
    primaryColor="#f3f3f3"
    secondaryColor="#9c9c9c"
  >
    <circle cx="23.64" cy="24.64" r="14.64" />
  </ContentLoader>
);

export class AdminManageSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      modalOpen: false,
      courseInfo: {},
      courseHideInfo: {},
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      splitButtonOpen: false,
      splitSortButtonOpen: false,
      searchType: 'All',
      searchWord: '',
      //Sort 0 : by courseid assending, 1 : by courseid decreasing ,2: by coursename ass,
      // See "https://docs.google.com/spreadsheets/d/1lYKSrloHOo-Sj_Xzs-GpRVDH6igA5GcvTtXoHaZdom8/edit?usp=sharing" for more info
      sortmode: -1,
      sortmodeIcon: -1,
      sortmodeName: 'None'
    }
    //this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleSubcourse = this.toggleSubcourse.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.changeSearchType = this.changeSearchType.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.toggleSortSplit = this.toggleSortSplit.bind(this);
    this.setSortMode = this.setSortModeIcon.bind(this);
    this.sortCourseData = this.sortCourseData.bind(this);
    this.setSortModeName = this.setSortModeName.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleSearchIconPress = this.handleSearchIconPress.bind(this);
  }

  async componentWillMount() {
    return this.getData();
  }

  async setPage(x) {
    var courseinfo = this.state.courseInfo;
    if (this.state.ishideUnavailable)
      courseinfo = this.state.courseHideInfo;
    if (x >= 0 && x <= Math.ceil(courseinfo.length / rowperpage) - 1) {
      await this.setState({ pager: x });
    }
  }

  async getData() {
    await this.setState({
      isloaded: false
    });
    console.log("GetIt");
    var temp1 = (await axios.post(ipList.backend + "/manage/queryInformation", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    allcourses = temp1;
    for (var i = 0; i < temp1.length; i++) {
      try {
        temp1[i].thumbnail = require('../../Image/Course/Thumbnail/Thumbnail' + temp1[i].courseid + '.jpg')
        temp1[i].banner = require('../../Image/Course/Banner/Banner' + temp1[i].courseid + '.jpg')
      } catch (err) {

      }
    }
    console.log(temp1);
    await this.setState({
      isloaded: true,
      courseInfo: temp1,
      pager: 0
    });
    this.togglehideUnavailable()
    console.log("Course info:", this.state.courseInfo);
    return true;
  }

  handleSearchKeyPress(event, searchMode, sortMode) {
    if (event.charCode == 13) {
      event.preventDefault();
      this.searchCourse(event.target.value, searchMode, sortMode);
    }
  }

  handleSearchIconPress(searchKeyword, searchMode, sortMode) {
    this.searchCourse(searchKeyword, searchMode, sortMode);
  }

  async changeSearchType(type) {
    if (this.state.searchType !== type)
      await this.setState(
        { searchType: type }
      )
  }

  async setSortModeIcon(sortMode) {
    if (this.state.sortmodeIcon !== sortMode) {
      await this.setState({
        sortmodeIcon: sortMode
      });
      this.setSortModeName(sortMode)
    }
  }

  async setSortModeName(sortMode) {
    if (sortMode < 0) {
      await this.setState({
        sortmodeName: 'None'
      });
    }
    else {
      await this.setState({
        sortmodeName: sortName[sortMode]
      });
    }
  }

  async sortCourseData(sortmode, coursedata) {
    var tempcourses = coursedata;
    this.setSortModeName(sortmode);
    switch (parseInt(sortmode)) {
      case 0:
        //Course ID sort min > max
        tempcourses.sort(function (a, b) { return a.courseid - b.courseid });
        break;
      case 1:
        //Course ID sort max > min
        console.log('mode 1 sssss');
        tempcourses.sort(function (a, b) { return b.courseid - a.courseid });
        break;
      case 2:
        //Course name min > max
        tempcourses.sort(function (a, b) {
          var x = a.coursename.toLowerCase();
          var y = b.coursename.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.courseid - b.courseid;
        });
        break;
      case 3:
        //Course name max < min
        tempcourses.sort(function (a, b) {
          var x = a.coursename.toLowerCase();
          var y = b.coursename.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.courseid - b.courseid;
        });
        break;
      case 4:
        //Instructor min > max
        tempcourses.sort(function (a, b) {
          var x = a.instructor.toLowerCase();
          var y = b.instructor.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.courseid - b.courseid;
        });
        break;
      case 5:
        //Instructor max > min
        tempcourses.sort(function (a, b) {
          var x = a.instructor.toLowerCase();
          var y = b.instructor.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.courseid - b.courseid;
        });
        break;
      case 6:
        //Price cheap > expansive
        tempcourses.sort(function (a, b) {
          if (a.price != b.price)
            return a.price - b.price
          return a.courseid - b.courseid;
        });
        break;
      case 7:
        //Price expansive > cheap
        tempcourses.sort(function (a, b) {
          if (a.price != b.price)
            return b.price - a.price
          return a.courseid - b.courseid;
        });
        break;
      case 8:
        //Create Date new > old
        tempcourses.sort(function (a, b) {
          var x = a.createdate;
          var y = b.createdate;
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return a.courseid - b.courseid;
        });
        break;
      case 9:
        //Create Date new > old
        tempcourses.sort(function (a, b) {
          var x = a.createdate;
          var y = b.createdate;
          if (x > y) { return 1; }
          if (x < y) { return -1; }
          return a.courseid - b.courseid;
        });
        break;
      case 10:
        //Waiting for change
        //tempcourses.sort(function (a, b) { return b.price - a.price });
        break;
      case 11:
        //Waiting for change
        //tempcourses.sort(function (a, b) { return b.price - a.price });
        break;
      default:
        //Do nothing
        break;
    }
    await this.setState({ courseInfo: tempcourses, courseHideInfo: tempcourses, sortmode: sortmode, pager: 0 });
    this.togglehideUnavailable()
    console.log('sort finish')
  }

  sortCourse(sortmode) {
    var tempcourses = this.state.courseInfo;
    this.sortCourseData(sortmode, tempcourses)
    console.log('sort (by icon) finish')
  }

  async searchCourse(searchword, searchMode, sortMode) {
    if (searchword.indexOf('[') > -1 || searchword.indexOf('(') > -1 || searchword.indexOf('*') > -1 || searchword.indexOf('+') > -1) {
      document.getElementById('coursesearchbox').classList.remove('is-valid');
      document.getElementById('coursesearchbox').classList.add('is-invalid');
      return;
    }
    document.getElementById('coursesearchbox').classList.add('is-valid');
    document.getElementById('coursesearchbox').classList.remove('is-invalid');
    var expr = RegExp(searchword.toLowerCase());
    var tempcourses = [];

    switch (searchMode) {
      case 'Course Name':
        allcourses.map((item) =>
          (expr.test(item.coursename.toLowerCase())) ? tempcourses.push(item) : ''
        );
        break;
      case 'Instructor':
        allcourses.map((item) =>
          (expr.test(item.instructor.toLowerCase())) ? tempcourses.push(item) : ''
        );
        break;
      case 'Price >':
        if (searchword == "") searchword = "0";
        allcourses.map((item) =>
          (item.price >= (100 * parseInt(searchword))) ? tempcourses.push(item) : ''
        );
        break;
      case 'Price <':
        allcourses.map((item) =>
          (item.price <= (100 * parseInt(searchword))) ? tempcourses.push(item) : ''
        );
        break;
      default:
        allcourses.map((item) =>
          (expr.test(item.coursename.toLowerCase()) ||
            expr.test(item.instructor.toLowerCase())) ? tempcourses.push(item) : (parseInt(searchword) == NaN) ? '' :
              (item.price >= (100 * parseInt(searchword))) ? tempcourses.push(item) : ''
        );
        break;
    }
    this.sortCourseData(sortMode, tempcourses);
    await this.setState({
      searchWord: searchword
    })
    console.log('search finish')
  }

  handleHideToggle = async () => {
    await this.setState({ ishideUnavailable: !this.state.ishideUnavailable, pager: 0 });
  }
  togglehideUnavailable = () => {
    var temp2 = Object.assign([], this.state.courseInfo);
    for (var i = temp2.length - 1; i >= 0; --i) {
      if (temp2[i].isavailable == 0) {
        temp2.splice(i, 1);
      }
    }
    this.setState({ courseHideInfo: temp2 });
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
    //console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Course',
      modalOpen: !this.state.modalOpen
    });
    var courseinfo = this.state.courseInfo;
    if (this.state.ishideUnavailable)
      courseinfo = this.state.courseHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminEditCourseModal src={courseinfo[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleSale(x) {
    ///////////////////////////////
    this.setState({
      modalHeader: 'Sale Course',
      modalOpen: !this.state.modalOpen
    });
    var courseinfo = this.state.courseInfo;
    if (this.state.ishideUnavailable)
      courseinfo = this.state.courseHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminEditSaleModal src={courseinfo[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);


    ///////////////////////////////
  }

  toggleCreate() {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Create Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = <AdminCreateCourseModal closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />;
  }

  toggleSubcourse(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Sub Course',
      modalOpen: !this.state.modalOpen
    });
    var courseinfo = this.state.courseInfo;
    if (this.state.ishideUnavailable)
      courseinfo = this.state.courseHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={courseinfo[x].courseid} coursename={courseinfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete Course',
      modalOpen: !this.state.modalOpen
    });
    var courseinfo = this.state.courseInfo;
    if (this.state.ishideUnavailable)
      courseinfo = this.state.courseHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={courseinfo[x].courseid} coursename={courseinfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  closeModalAndReload = async () => {
    console.log('closemodal by fx')
    await this.getData();
    this.searchCourse(this.state.searchWord, this.state.searchType, this.state.sortmode)
    await this.setState({
      modalOpen: false
    });
  }

  closeModal = async () => {
    await this.setState({
      modalOpen: false
    });
  }

  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var courseinfo = this.state.courseInfo;
      if (this.state.ishideUnavailable)
        courseinfo = this.state.courseHideInfo;
      var courseTableBody = courseinfo.map((item, i) =>
        <tr style={{ color: (item.isavailable == '1') ? '#FFF' : '#555', display: (i >= rowperpage * this.state.pager && i < rowperpage * (this.state.pager + 1)) ? '' : 'none' }}>
          <td style={{ width: 50, maxWidth: 50 }}><b>{i + 1}</b></td>
          <td style={{ width: 110, maxWidth: 110 }}>{item.courseid}</td>
          <td style={{ width: 300, maxWidth: 300, overflowX: 'hide' }}>{item.coursename}</td>
          <td style={{ width: 300, maxWidth: 300 }}>{item.instructor}</td>
          <td style={{ width: 150, maxWidth: 150 }}>{(item.price / 100).toLocaleString('en')} ฿</td>
          <td style={{ width: 180 }}>
            <Button color='primary' style={{ width: 45, height: 40 }} outline onClick={() => { this.toggleSale(i) }}><i class="fa fa-dollar" /></Button>{' '}
            <Button color='danger' style={{ width: 45, height: 40 }} outline onClick={() => { this.toggleDelete(i) }}><i class="fa fa-trash-o" /></Button></td>
        </tr>
      );

      var paginationitems = [];
      for (var i = 0; i < Math.ceil(courseinfo.length / rowperpage); i++) {
        ((i) => {
          paginationitems.push(
            <PaginationItem active={i == this.state.pager}>
              <PaginationLink onClick={() => { this.setPage(new Number(i)) }}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>);

        })(i)
      }
      var tableHeader = [];

      return (
        <Container fluid style={{ paddingBottom: '10px' }}>
          <br />
          <Card style={{ background: '#444', padding: 20 }}>
            <Row className="justify-content-between" style={{ color: 'white' }}>
              <Col xs='auto'>
                <Input plaintext style={{ color: 'white', fontSize: 'large', fontWeight: 'bold' }}>Sale Management</Input>
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
                        <Button disabled color="light" outline
                          style={{ width: 130 }} >{this.state.searchType}</Button>
                        <DropdownToggle split outline color='light' />
                        <DropdownMenu>
                          <DropdownItem onClick={() => this.changeSearchType('All')}>All</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Course Name')}>Course Name</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Instructor')}>Instructor</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Price >')}>{'Price >'}</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Price <')}>{'Price <'}</DropdownItem>
                        </DropdownMenu>
                      </InputGroupButtonDropdown>
                    </InputGroup >&nbsp;
                    <InputGroup style={{ minWidth: 290, maxWidth: 340 }} responsive >
                      <Input type="text" name="coursesearchbox" id="coursesearchbox" placeholder="Search Course" defaultValue={this.state.searchWord == '' ? '' : this.state.searchWord}
                        onKeyPress={(e, searchMode = this.state.searchType, sortMode = this.state.sortmodeIcon) => this.handleSearchKeyPress(e, searchMode, sortMode)}
                        style={{ minWidth: 250, maxWidth: 300 }} />
                      <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => { this.handleSearchIconPress(document.getElementById('coursesearchbox').value, this.state.searchType, this.state.sortmodeIcon) }}>
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

          <Card style={{ background: '#444', paddingTop: 5, paddingRight: 20, paddingLeft: 20 }}>
            <Row>
              <Table responsive bordered inverse striped style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 0 ? this.sortCourse(1) : this.sortCourse(0); }}>{"    Course id  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 0 || this.state.sortmode == 1 ? 'success' : 'secondary'} onClick={() => { (this.state.sortmode == 0 || this.state.sortmode == -1) ? this.sortCourse(1) : this.sortCourse(0); }}><i class={this.state.sortmode == 0 ? "fa fa-sort-amount-asc " : this.state.sortmode == 1 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 0 || this.state.sortmode == 1 ? '' : '#AAA' }} /></Badge></th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 2 ? this.sortCourse(3) : this.sortCourse(2); }}>{"  Course Name  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 2 || this.state.sortmode == 3 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 2 ? this.sortCourse(3) : this.sortCourse(2); }}><i class={this.state.sortmode == 2 ? "fa fa-sort-amount-asc " : this.state.sortmode == 3 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 2 || this.state.sortmode == 3 ? '' : '#AAA' }} /></Badge>
                    </th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 4 ? this.sortCourse(5) : this.sortCourse(4); }}>{"  Instructor  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 4 || this.state.sortmode == 5 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 4 ? this.sortCourse(5) : this.sortCourse(4); }} ><i class={this.state.sortmode == 4 ? "fa fa-sort-amount-asc " : this.state.sortmode == 5 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 4 || this.state.sortmode == 5 ? '' : '#AAA' }} /></Badge>
                    </th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 6 ? this.sortCourse(7) : this.sortCourse(6); }}>{"  Price  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 6 || this.state.sortmode == 7 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 6 ? this.sortCourse(7) : this.sortCourse(6); }} ><i class={this.state.sortmode == 6 ? "fa fa-sort-amount-asc " : this.state.sortmode == 7 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 6 || this.state.sortmode == 7 ? '' : '#AAA' }} /></Badge>
                    </th>
                    <th><i class="fa fa-cogs" aria-hidden="true" /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="10">
                      <Button color='info' outline style={{ width: '100%', height: '100%' }} onClick={this.toggleCreate}><i class="fa fa-plus" /></Button>
                    </td>
                  </tr>
                  {courseTableBody}
                </tbody>
              </Table>
            </Row>

            <Row className='justify-content-around'>
              <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={this.state.pager == 0}>
                  <PaginationLink onClick={() => { this.setPage(this.state.pager - 1) }} >
                    <i class="fa fa-angle-left" />
                  </PaginationLink>
                </PaginationItem>
                {paginationitems}
                <PaginationItem disabled={this.state.pager == Math.ceil(courseinfo.length / rowperpage) - 1 || courseinfo.length === 0}>
                  <PaginationLink onClick={() => { this.setPage(this.state.pager + 1) }} >
                    <i class="fa fa-angle-right" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Row>
          </Card>
        </Container >
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

import React from 'react'
import classnames from 'classnames';
import { AdminEditCourseModal } from './AdminEditCourseModal';
import { AdminCreateCourseModal } from './AdminCreateCourseModal';
import { AdminEditSubCourseModal } from './AdminEditSubCourseModal';
import { AdminDeleteCourseModal } from './AdminDeleteCourseModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import { Form, Badge,Label, Input, FormGroup, Navbar, TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Table, Modal, Button, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { AdminManageUsers } from './AdminManageUsers';

const ipList = require('../../../Config/ipConfig');
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
var modalComponent;
var allcourses;
const rowperpage = 15;

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



export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      modalOpen: false,
      courseInfo: {},
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      //Sort 0 : by courseid assending, 1 : by courseid decreasing ,2: by coursename ass, 
      // See "https://docs.google.com/spreadsheets/d/1lYKSrloHOo-Sj_Xzs-GpRVDH6igA5GcvTtXoHaZdom8/edit?usp=sharing" for more info
      sortmode: 0,

      // Cut this off when cut Admin to Course manage Component
      activeTab: '1'
    }
    //this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleSubcourse = this.toggleSubcourse.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  // Cut this off when cut Admin to Course manage Component  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  async componentWillMount() {
    return this.getData();
  }

  setPage(x) {
    if (x >= 0 && x <= Math.ceil(this.state.courseInfo.length / rowperpage) - 1) {
      this.setState({ pager: x });
    }
  }

  async getData() {
    this.setState({
      isloaded: false
    });
    console.log("GetIt");
    var temp1 = (await axios.post(ipList.backend + "/manage/queryInformation", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    allcourses = temp1;
    for (var i = 0; i < temp1.length; i++) {
      // console.log(courseInfo[i].thumbnail);
      try {
        temp1[i].thumbnail = require('../../Image/Course/Thumbnail/Thumbnail' + temp1[i].courseid + '.jpg')
        temp1[i].banner = require('../../Image/Course/Banner/Banner' + temp1[i].courseid + '.jpg')
      } catch (err) {

      }
      // console.log(courseInfo[i].thumbnail);
    }
    console.log(temp1);
    this.setState({
      isloaded: true,
      courseInfo: temp1,
      pager: 0
    });
    console.log("Course info:", this.state.courseInfo);
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

  sortCourse(mode) {
    console.log('mode : ' + mode);
    var tempcourses = this.state.courseInfo;
    switch (parseInt(mode)) {
      case 0:
        tempcourses.sort(function (a, b) { return a.courseid - b.courseid });
        console.log('mode 0 complete');
        break;
      case 1:
        console.log('mode 1 sssss');
        tempcourses.sort(function (a, b) { return b.courseid - a.courseid });
        console.log('mode 1 complete');
        break;
      case 2:
        tempcourses.sort(function (a, b) {
          var x = a.coursename.toLowerCase();
          var y = b.coursename.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        console.log('mode 2 complete');
        break;
      case 3:
        tempcourses.sort(function (a, b) {
          var x = a.coursename.toLowerCase();
          var y = b.coursename.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        });
        console.log('mode 3 complete');
        break;
      case 4:
        tempcourses.sort(function (a, b) {
          var x = a.instructor.toLowerCase();
          var y = b.instructor.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        break;
      case 5:
        tempcourses.sort(function (a, b) {
          var x = a.instructor.toLowerCase();
          var y = b.instructor.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        });
        break;
      case 6:
        tempcourses.sort(function (a, b) { return a.price - b.price });
        break;
      case 7:
      tempcourses.sort(function (a, b) { return b.price - a.price });
        break;
      case 8:
      tempcourses.sort(function (a, b) {
          var x = a.createdate;
          var y = b.createdate;
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        break;
      case 9:
      tempcourses.sort(function (a, b) {
          var x = a.createdate;
          var y = b.createdate;
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return 0;
        });
        break;
      case 10:
      tempcourses.sort(function (a, b) { return b.price - a.price });
        break;
      case 11:
      tempcourses.sort(function (a, b) { return b.price - a.price });
        break;
      default:
        this
    }
    this.setState({courseInfo:tempcourses,sortmode:mode,pager:0});
  }

  searchCourse(searchword){
    var expr = RegExp(searchword.toLowerCase());
    var tempcourses = [];
    allcourses.map((item)=>
    (expr.test(item.coursename.toLowerCase())||expr.test(item.instructor.toLowerCase()))? tempcourses.push(item):'' 
  );
  console.log(tempcourses);
    this.setState({courseInfo:tempcourses,pager:0});
  }


  togglehideUnavailable = () => {
    var temp2 = Object.assign([],allcourses);
    console.log(allcourses)
    if (!this.state.ishideUnavailable) {
      console.log('hideee');
      for (var i = temp2.length - 1; i >= 0; --i) {
        if (temp2[i].isavailable == 0) {
          temp2.splice(i, 1);
        }
      }
    }
    console.log('hide : ' + !this.state.ishideUnavailable);
    console.log(allcourses);
    console.log(temp2);
    this.setState({ ishideUnavailable: !this.state.ishideUnavailable,courseInfo:temp2,pager:0 });
  }


  toggleEdit(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditCourseModal src={this.state.courseInfo[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload}/>);
  }

  toggleCreate() {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Create Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = <AdminCreateCourseModal closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload}/>;
  }

  toggleSubcourse(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Sub Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={this.state.courseInfo[x].courseid} coursename={this.state.courseInfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload}/>);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={this.state.courseInfo[x].courseid} coursename={this.state.courseInfo[x].coursename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload}/>);
  }

  closeModalAndReload = () => {
    console.log('closemodal by fx')
    this.getData();
    this.setState({
      modalOpen: false
    });
  }

  closeModal=()=>{
    this.setState({
      modalOpen: false
    });
  }





  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var courseTableBody = this.state.courseInfo.map((item, i) =>
        <tr style={{ color: (item.isavailable == '1') ? '#FFF' : '#555', display: (i >= rowperpage * this.state.pager && i < rowperpage * (this.state.pager + 1)) ? '' : 'none' }}>
          <td style={{width:50,maxWidth:50}}><b>{i + 1}</b></td>
          <td style={{width:100,maxWidth:100}}>{item.courseid}</td>
          <td style={{width:300,maxWidth:300}}>{item.coursename}</td>
          <td style={{width:300,maxWidth:300}}>{item.instructor}</td>
          <td style={{width:150,maxWidth:150}}>{(item.price / 100).toLocaleString('en')} ฿</td>
          <td><Button color='primary' outline onClick={() => { this.toggleEdit(i) }}><i class="fa fa-edit" /></Button>{' '}
            <Button color='primary' outline onClick={() => { this.toggleSubcourse(i) }}><i class="fa fa-reorder" /></Button>{' '}
            <Button color='danger' outline onClick={() => { this.toggleDelete(i) }}><i class="fa fa-trash-o" /></Button></td>
        </tr>
      );

      var paginationitems = [];
      for (var i = 0; i < Math.ceil(this.state.courseInfo.length / rowperpage); i++) {
        ((i) => {
          paginationitems.push(
            <PaginationItem active={i == this.state.pager}>
              <PaginationLink onClick={() => { this.setPage(new Number(i)) }}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>);

        })(i);
      }
      var tableHeader =[];

      return (
        <Container fluid style={{ paddingBottom: '10px' }}>
          <Navbar color="light" light expand="md">
            <Nav navbar>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Manage Course
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Moar Tabs
            </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">

              <FormGroup>
                <Label for="exampleSelectMulti">Mode</Label>
                <Input type="select" name="selectMulti" id="selectedsortmode" onClick={() => {
                  this.sortCourse( document.getElementById('selectedsortmode').value );
                  console.log(document.getElementById('selectedsortmode').value);
                }} multiple>
                  <option value={8}>Createdate Asc</option>
                  <option value={9}>Createdate Desc</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                </Input>
              </FormGroup>
              <Form inline>
              <Input type="text" name="searchbox" id="searchbox" placeholder="Search Course" style={{width:300}} />
              <Button color="primary" onClick={()=>{this.searchCourse(document.getElementById('searchbox').value)}}><i class="fa fa-search" /></Button>
              </Form>
              <Row>
                <Col sm="12">
                  <h3 color='white'>Courses List</h3>
                  <Switch checked={this.state.ishideUnavailable} onChange={this.togglehideUnavailable} />
                  <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.closeModal}>
                    <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>

                    {modalComponent}
                    <ModalFooter></ModalFooter>
                  </Modal>
                  <Col>
                    <Table inverse striped style={{ textAlign: 'center' }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{"    Course id  "}
                            <Badge color={this.state.sortmode==0||this.state.sortmode==1?'light':'secondary'} onClick={() => { this.state.sortmode==0?this.sortCourse(1):this.sortCourse(0); }}><i class={this.state.sortmode==0?"fa fa-sort-amount-asc ":this.state.sortmode==1?"fa fa-sort-amount-desc":"fa fa-align-center"} 
                             style={{color:this.state.sortmode==0||this.state.sortmode==1?'':'#AAA'}} /></Badge></th>
                          <th>{"  Course Name  "}<Badge color={this.state.sortmode==2||this.state.sortmode==3?'light':'secondary'} onClick={() => { this.state.sortmode==2?this.sortCourse(3):this.sortCourse(2); }}><i class={this.state.sortmode==2?"fa fa-sort-amount-asc ":this.state.sortmode==3?"fa fa-sort-amount-desc":"fa fa-align-center"} 
                           style={{color:this.state.sortmode==2||this.state.sortmode==3?'':'#AAA'}} /></Badge>
                            </th>
                          <th>{"  Instructor  "}<Badge color={this.state.sortmode==4||this.state.sortmode==5?'light':'secondary'} onClick={() => { this.state.sortmode==4?this.sortCourse(5):this.sortCourse(4); }} ><i class={this.state.sortmode==4?"fa fa-sort-amount-asc ":this.state.sortmode==5?"fa fa-sort-amount-desc":"fa fa-align-center"} 
                          style={{color:this.state.sortmode==4||this.state.sortmode==5?'':'#AAA'}} /></Badge>
                            </th>
                          <th>{"  Price  "}<Badge color={this.state.sortmode==6||this.state.sortmode==7?'light':'secondary'} onClick={() => { this.state.sortmode==6?this.sortCourse(7):this.sortCourse(6); }} ><i class={this.state.sortmode==6?"fa fa-sort-amount-asc ":this.state.sortmode==7?"fa fa-sort-amount-desc":"fa fa-align-center"} 
                          style={{color:this.state.sortmode==6||this.state.sortmode==7?'':'#AAA'}} /></Badge>
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
                    <Pagination aria-label="Page navigation example" style={{position: 'absolute', left: '50%', transform: 'translate(-50%, -100%)'}}>
                      <PaginationItem disabled={this.state.pager == 0}>
                        <PaginationLink onClick={() => { this.setPage(this.state.pager - 1) }} >
                          <i class="fa fa-angle-left" />
                        </PaginationLink>
                      </PaginationItem>
                      {paginationitems}
                      <PaginationItem disabled={this.state.pager == Math.ceil(this.state.courseInfo.length / rowperpage) - 1}>
                        <PaginationLink onClick={() => { this.setPage(this.state.pager + 1) }} >
                          <i class="fa fa-angle-right" />
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <AdminManageUsers />
                </Col>
              </Row>
            </TabPane>
          </TabContent>

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
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>
                <tr>
                  <td colspan="10">
                    {MyLoaderRow()}</td>

                </tr>



              </tbody>
            </Table>
          </Col>
        </Container>

      );
    }
  }
}

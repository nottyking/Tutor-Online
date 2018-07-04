import React from 'react'
import { AdminEditCourseModal } from './AdminEditCourseModal';
import { AdminCreateCourseModal } from './AdminCreateCourseModal';
import { AdminEditSubCourseModal } from './AdminEditSubCourseModal';
import { AdminDeleteCourseModal } from './AdminDeleteCourseModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import { Container, Col, Table, Modal, Button, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { Switch } from 'antd';
import 'antd/dist/antd.css';

const ipList = require('../../../Config/ipConfig');
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
var modalComponent;
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
      courseInfo: {},
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
    console.log(temp1);
    for (var i = 0; i < temp1.length; i++) {
      // console.log(courseInfo[i].thumbnail);
      try {
        temp1[i].thumbnail = require('../../Image/Course/Thumbnail/Thumbnail' + temp1[i].courseid + '.jpg')
        temp1[i].banner = require('../../Image/Course/Banner/Banner' + temp1[i].courseid + '.jpg')
      } catch (err) {

      }
      // console.log(courseInfo[i].thumbnail);
    }
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

  toggleEdit(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminEditCourseModal src={this.state.courseInfo[x]} closeModal={this.closeModal} />);
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
    modalComponent = (x < 0) ? '' : (<AdminEditSubCourseModal courseid={this.state.courseInfo[x].courseid} coursename={this.state.courseInfo[x].coursename} closeModal={this.closeModal} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete Course',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = (x < 0) ? '' : (<AdminDeleteCourseModal courseid={this.state.courseInfo[x].courseid} coursename={this.state.courseInfo[x].coursename} closeModal={this.closeModal} />);
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




  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var courseTableBody = this.state.courseInfo.map((item, i) =>
        <tr style={{ color: (item.isavailable == '1') ? '#FFF' : '#555', display: (i >= rowperpage * this.state.pager && i < rowperpage * (this.state.pager + 1)) ? '' : 'none' }}>
          <td><b>{i + 1}</b></td>
          <td>{item.courseid}</td>
          <td>{item.coursename}</td>
          <td>{item.instructor}</td>
          <td>{(item.price / 100).toLocaleString('en')} ฿</td>
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

      return (
        <Container fluid style={{ paddingBottom: '10px' }}>
          <h3 color='white'>Courses List</h3>
          <Switch checked={this.state.ishideUnavailable} onChange={this.togglehideUnavailable} />
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
                    <Button color='info' outline style={{ width: '100%', height: '100%' }} onClick={this.toggleCreate}><i class="fa fa-plus" /></Button></td>

                </tr>
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
              <PaginationItem disabled={this.state.pager == Math.ceil(this.state.courseInfo.length / rowperpage) - 1}>
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

import React from 'react';
import { Loading } from '../loading/Loading'
import { Button, FormGroup,FormFeedback, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, Container, Table,Form } from 'reactstrap';


const ipList = require('../../../Config/ipConfig');
const axios = require('axios');
const capsulation = require('../../capsulation/SendData');

var exitfx;
var tempPackagecourseInfo;
var scid;
var editsubcourse;
var exitandreloadfx;
var allcourses;
var isChangeBool;
var isChange;



export class AdminEditPackageCourseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expireType: 0,
      packagecourseinfo: '',
      isLoaded: false,
      warnModal: false,
      editModal: false,
      nestedModal: false,
      create: false,
    }
    this.updatePackagecourse = this.updatePackagecourse.bind(this);
    this.refresh = this.refresh.bind(this);
    this.add = this.add.bind(this);
    this.delete= this.delete.bind(this);
    this.swapdown = this.swapdown.bind(this);
    this.swapup = this.swapup.bind(this);
    exitfx = this.props.closeModal;
    exitandreloadfx=this.props.closeModalAndReload;
    isChange = this.props.isChange;
    isChangeBool = false;

  }

  async componentDidMount() {
    this.refresh();
  }

  async refresh() {
    this.setState({ isLoaded: false });
    var temp1 = (await axios.post(ipList.backend + "/manage/package/querypackagecourse", capsulation.sendData({
      packageid: this.props.packageid
    }))).data;

    var temp2 = (await axios.post(ipList.backend + "/manage/queryInformation", capsulation.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    allcourses = temp2;
    console.log(temp1);
    console.log('allcourses');
    console.log(allcourses)
    tempPackagecourseInfo = temp1;
    console.log(temp1);
    this.setState({ packagecourseinfo: temp1, isLoaded: true, create: false });
    console.log(this.state.packagecourseinfo);
    console.log('loaded');
  }

  async updatePackagecourse() {
    this.setState({ isLoaded: false });
    var temp2 = (await axios.post(ipList.backend + "/manage/package/editcourse", capsulation.sendData({
      packagecourse: tempPackagecourseInfo, packageid: this.props.packageid
    }))).data
    console.log('updated');
    console.log(tempPackagecourseInfo);
    this.refresh();
  }

  async delete(x) {
    console.log('delete' + x);
    tempPackagecourseInfo.splice(x, 1);
    console.log(tempPackagecourseInfo);
    this.updatePackagecourse();
    this.refresh();
    isChange(true);
  }


  async add() {
    if(document.getElementById('addcourse').value==0){
      return;
    }
    var temppcid = this.state.packagecourseinfo.length ==0 ? 1 : this.state.packagecourseinfo[this.state.packagecourseinfo.length-1].packagecourseid+1;
    var subcourseWillBeAdded = {
      courseid: document.getElementById('addcourse').value,
      packagecourseid: temppcid
    }
    tempPackagecourseInfo.push(subcourseWillBeAdded);
    console.log(tempPackagecourseInfo);
    this.updatePackagecourse();
    this.refresh();
    isChange(true);
  }


  // swap index x with x-1
  swapup(x){
    if(x>0){
      console.log(x);
      console.log(tempPackagecourseInfo[x-1].packagecourseid);
      console.log(tempPackagecourseInfo[x].packagecourseid);
      var swaptemp = tempPackagecourseInfo[x-1].packagecourseid;
      console.log(tempPackagecourseInfo[x-1]);
      tempPackagecourseInfo[x-1].packagecourseid = tempPackagecourseInfo[x].packagecourseid;
      console.log(tempPackagecourseInfo[x-1])
      tempPackagecourseInfo[x].packagecourseid = swaptemp;
      console.log(tempPackagecourseInfo);
      this.updatePackagecourse();
    }
  }

  //swap index x with x+1
  swapdown(x){
    if(x < tempPackagecourseInfo.length-1){
    var swaptemp = tempPackagecourseInfo[x+1].packagecourseid;
    console.log(tempPackagecourseInfo[x+1]);
    tempPackagecourseInfo[x+1].packagecourseid = tempPackagecourseInfo[x].packagecourseid;
    tempPackagecourseInfo[x].packagecourseid = swaptemp;
    console.log(tempPackagecourseInfo);
    this.updatePackagecourse();
    }
  }

  render() {

    console.log('modal render');
    if (this.state.isLoaded) {
      var courseTableBody = this.state.packagecourseinfo.map((item, i) =>
        <tr>
          <td scope="row" style={{ color: item.isavailable == '0' ? 'grey' : 'black' }}><b>{i + 1}</b></td>
          <td><Button color='secondary' onClick={async () => {this.swapdown(i); }}><i class="fa fa-angle-down" /></Button>{' '}
          <Button color='secondary' onClick={() => { this.swapup(i) }}><i class="fa fa-angle-up" /></Button></td>
          <td>{allcourses.find(x => x.courseid === item.courseid).courseid}</td>
          <td>{allcourses.find(x => x.courseid === item.courseid).coursename}</td>
          <td><Button color='danger' onClick={() => { this.delete(i) }}><i class="fa fa-trash-o" /></Button></td>
        </tr>


      );
      var temp = this.state.packagecourseinfo;

      var allchoices = allcourses.map(function(item){
      if(temp.findIndex(x => x.courseid == item.courseid)==-1){
      return <option value={parseInt(item.courseid)}>{item.courseid} : {item.coursename}</option>
      }
      }
    );
      return (
        <ModalBody>
          <Container style={{ width: '100%' }}>
            <h3>{this.props.coursename}</h3>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order</th>
                  <th>Courseid</th>
                  <th>Name</th>
                  <th></th>
                </tr>
                <tr>
                  <td colspan="10">
                  <Form inline>
                  <FormGroup inline>
                  <Input type="select" name="select" id="addcourse">
                  <option value={0}>select course to add to this package</option>
                    {allchoices}
                  </Input>
                  <Button color='info' onClick={this.add}>Add</Button>
                </FormGroup>
                </Form></td>
                </tr>

              </thead>
              <tbody>
                {courseTableBody}
              </tbody>
            </Table>
          </Container>
        </ModalBody>
      );
    } else {
      return (
        <ModalBody>
          <Loading background='white' />
        </ModalBody>);
    }
  }
}

/* Create form
      subcoursename:,
      packagecourseinfo:,
      videolink:,
      isavailable:,*/

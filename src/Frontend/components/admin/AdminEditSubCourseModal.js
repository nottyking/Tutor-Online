import React from 'react';
import { Loading } from '../loading/Loading'
import { Button, FormGroup,FormFeedback, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, Container, Table } from 'reactstrap';


const ipList = require('../../../Config/ipConfig');
const axios = require('axios');
const capsulation = require('../../capsulation/SendData');

var exitfx;
var tempSubcourseInfo;
var scid;
var editsubcourse;
var exitandreloadfx;



export class AdminEditSubCourseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expireType: 0,
      subcourseinfo: '',
      isLoaded: false,
      warnModal: false,
      editModal: false,
      nestedModal: false,
      create: false,
    }
    this.updateSubcourse = this.updateSubcourse.bind(this);
    this.refresh = this.refresh.bind(this);
    exitfx = this.props.closeModal;
    exitandreloadfx=this.props.closeModalAndReload;

  }

  async componentDidMount() {
    this.refresh();
  }

  async refresh() {
    this.setState({ isLoaded: false });
    var temp1 = (await axios.post(ipList.backend + "/course/queryInformation", capsulation.sendData({
      courseid: this.props.courseid
    }))).data;

    tempSubcourseInfo = temp1.subCourse;
    this.setState({ subcourseinfo: temp1.subCourse, isLoaded: true, create: false });
    console.log(this.state.subcourseinfo);
    console.log('loaded');
  }

  async updateSubcourse() {
    this.setState({ isLoaded: false });
    var temp2 = (await axios.post(ipList.backend + "/manage/editcourse", capsulation.sendData({
      subcourse: tempSubcourseInfo, courseid: this.props.courseid
    }))).data
    console.log('updated');
    console.log(tempSubcourseInfo);
    this.refresh();
  }

  async delete(x) {
    console.log('delete' + x);
    tempSubcourseInfo.splice(x, 1);
    console.log(tempSubcourseInfo);
    this.updateSubcourse();
    this.refresh();
  }

  async editFetch(x) {
    document.getElementById('subcoursename').value = this.state.subcourseinfo[x].subcoursename;
    document.getElementById('subcourseinfo').placeholder = this.state.subcourseinfo[x].subcourseinfo;
    document.getElementById('videolink').placeholder = this.state.subcourseinfo[x].videolink;
    editsubcourse = x;
    scid = this.state.subcourseinfo[x].subcourseid;

  }


  async create() {
    var subcourseWillBeAdded = {
      courseid: this.props.courseid,
      subcourseid: 0,
      subcoursename: document.getElementById('subcoursename').value,
      subcourseinfo: document.getElementById('subcourseinfo').value,
      videolink: document.getElementById('videolink').value,
      isavailable: '1',
    }
    if (this.state.create) {
      if (this.state.subcourseinfo.length > 0) {
        subcourseWillBeAdded.subcourseid = (this.state.subcourseinfo[this.state.subcourseinfo.length - 1].subcourseid) + 1;
      }
      else {
        subcourseWillBeAdded.subcourseid = 1;
      }
    }
    else {
      subcourseWillBeAdded.subcourseid = scid;
      tempSubcourseInfo.splice(editsubcourse, 1);
    }

    tempSubcourseInfo.push(subcourseWillBeAdded);
    console.log(tempSubcourseInfo);
    this.updateSubcourse();
  }

  toggleNested = async () => {
    return await new Promise(async (resolve, reject) => {
      await this.setState({ nestedModal: !this.state.nestedModal });
      resolve();
    })

  }


  // swap index x with x-1
  swapup(x){
    if(x>0){
      var swaptemp = tempSubcourseInfo[x-1].subcourseid;
      tempSubcourseInfo[x-1].subcourseid = tempSubcourseInfo[x].subcourseid;
      tempSubcourseInfo[x].subcourseid = swaptemp;
      this.updateSubcourse();
    }
  }

  //swap index x with x+1
  swapdown(x){
    if(x < tempSubcourseInfo.length-1){
    var swaptemp = tempSubcourseInfo[x+1].subcourseid;
    tempSubcourseInfo[x+1].subcourseid = tempSubcourseInfo[x].subcourseid;
    tempSubcourseInfo[x].subcourseid = swaptemp;
    this.updateSubcourse();
    }
  }

  subcourseNameCheck() {
    if ((document.getElementById('subcoursename').value > 4 && document.getElementById('subcoursename').value.length < 45)) {
      document.getElementById("subcoursename").classList.remove('is-invalid');
      document.getElementById("subcoursename").classList.add('is-valid');
      console.log('price true');
      return true;
    }
    document.getElementById("subcoursename").classList.remove('is-valid');
    document.getElementById("subcoursename").classList.add('is-invalid');
    return false;
  }

  checkLink(){
    var link = document.getElementById('videolink').value;
    if((link.match(/vimeo/i)!==null || !isNaN(link))&&link.length>0){
      if(link.indexOf('video/')!=-1 && !isNaN(link.substring(link.indexOf('video/') + 'video/'.length))){
        document.getElementById("videolink").classList.remove('is-invalid');
        document.getElementById("videolink").classList.add('is-valid');
        document.getElementById('validlinkfeedback').innerHTML = ''; 
        return link;
      }
      else if(link.indexOf('com/')!=-1 && !isNaN(link.substring(link.indexOf('com/') + 'com/'.length))){
        document.getElementById("videolink").classList.remove('is-invalid');
        document.getElementById("videolink").classList.add('is-valid');
        document.getElementById('validlinkfeedback').innerHTML = ''; 
        return    "https://player.vimeo.com/video/"+ link.substring(link.indexOf('com/') + 'com/'.length);
      }
      else if(!isNaN(link)){
        document.getElementById("videolink").classList.remove('is-invalid');
        document.getElementById("videolink").classList.add('is-valid');
        console.log('you mean https://player.vimeo.com/video/'+link +'  ?');
        document.getElementById('validlinkfeedback').innerHTML = 'you mean https://player.vimeo.com/video/'+link +'  ?'; 
        return    "https://player.vimeo.com/video/"+ link;
      }
      document.getElementById("videolink").classList.remove('is-valid');
      document.getElementById("videolink").classList.add('is-invalid');
      return false;
    }
    document.getElementById("videolink").classList.remove('is-valid');
    document.getElementById("videolink").classList.add('is-invalid');
    return false;
  }


  render() {

    console.log('modal render');
    if (this.state.isLoaded) {
      var courseTableBody = this.state.subcourseinfo.map((item, i) =>
        <tr>
          <td scope="row" style={{ color: item.isavailable == '0' ? 'grey' : 'black' }}><b>{i + 1}</b></td>
          <td><Button color='secondary' onClick={async () => {this.swapdown(i); }}><i class="fa fa-angle-down" /></Button>{' '}
          <Button color='secondary' onClick={() => { this.swapup(i) }}><i class="fa fa-angle-up" /></Button></td>
          <td>{item.subcoursename}</td>
          <td><Button href={item.videolink} target='_blank'><i class="fa fa-film" /></Button></td>
          <td><Button color='primary' onClick={async () => { await this.toggleNested(); this.editFetch(i); }}><i class="fa fa-edit" /></Button>{' '}
            <Button color='danger' onClick={() => { this.delete(i) }}><i class="fa fa-trash-o" /></Button>
          </td>
        </tr>


      );
      return (
        <ModalBody>

          <Modal isOpen={this.state.warnModal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.togglel}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.editModal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Container style={{ width: '100%' }}>
            <h3>{this.props.coursename}</h3>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Videolink</th>
                  <th></th>
                </tr>
                <tr>
                  <td colspan="10">
                    <Button color='info' style={{ width: '100%', height: '100%' }} onClick={() => { this.toggleNested(); this.state.create = true }}><i class="fa fa-plus" /></Button></td>
                </tr>

              </thead>
              <tbody>
                {courseTableBody}
              </tbody>
            </Table>
          </Container>
          <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
            <ModalHeader toggle={this.toggleNested}>Create/Edit SubCourse</ModalHeader>
            <ModalBody>
              <Container fluid>
                <FormGroup row>
                  <Label>
                    SubCourse Name
              </Label>
                  <Input
                    type='text'
                    id='subcoursename'
                    placeholder='Enter SubCourse Name' />
                </FormGroup>
                <FormGroup row>
                  <Label>
                    SubCourse Info
              </Label>
                  <Input
                    type='text'
                    id='subcourseinfo'
                    placeholder='Enter SubCourse Info' />
                </FormGroup>
                <FormGroup row>
                  <Label>
                    SubCourse Video Link
            </Label>
                  <Input
                    type='text'
                    id='videolink'
                    placeholder='Enter Link of Video' 
                    onChange={this.checkLink}/>
                    <FormFeedback>
              Link must in the form of https://player.vimeo.com/video/[video_id] or https://vimeo.com/[video_id] or only video_id is acceptable
              </FormFeedback>
              <FormFeedback valid id='validlinkfeedback'>
             
              </FormFeedback>

                </FormGroup>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => { this.toggleNested(); this.create() }}>Done</Button>{' '}
              <Button color="secondary" onClick={this.toggleNested}>Cancel</Button>
            </ModalFooter>
          </Modal>
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
      subcourseinfo:,
      videolink:,
      isavailable:,*/

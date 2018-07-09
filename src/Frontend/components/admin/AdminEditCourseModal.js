import React from 'react'
import PropTypes from 'prop-types'
import {  Button, Form, FormGroup,  ModalBody,  Label, Input, Container,Collapse,Card,CardBody,FormFeedback } from 'reactstrap'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData');
var id; var exitfx;var exitandreloadfx;


export class AdminEditCourseModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        expireType:this.props.src.limitdurationtype,
        showThumbnail: this.props.src.thumbnail,
        showBanner:this.props.src.banner,
        redirect:''
    }
    this.toggletype=this.toggletype.bind(this);
    this.showBanner=this.bannerChange.bind(this);
    this.showThumbnail=this.thumbnailChange.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
    id = this.props.src.courseid;
    exitfx = this.props.closeModal;
    exitandreloadfx=this.props.closeModalAndReload;
  }

  async saveToDatabase() {
    const bannerFormData = new FormData()
    const thumbnailFormData = new FormData()
    bannerFormData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
    bannerFormData.append('courseid', document.getElementById('banner').files[0], id);
    thumbnailFormData.append('myFile', document.getElementById('thumbnail').files[0], cookies.get('loginToken'));
    thumbnailFormData.append('courseid', document.getElementById('thumbnail').files[0], id);

    var temp;
    if (document.getElementById('limitdurationtype').value === '0') {
      temp = 0;
    }
    else if (document.getElementById('limitdurationtype').value === '1') {
      temp = document.getElementById('limitduration').value;
    }
    else {
      var createdate = new Date(this.props.src.createdate);
      temp = Math.ceil(((new Date(document.getElementById('expiredate').value)) - createdate) / (24 * 3600 * 1000));
    }

    var data = {
        courseid: id,
        coursename: document.getElementById('coursename').value,
        instructor: document.getElementById('instructor').value,
        price: document.getElementById('price').value*100,
        description: document.getElementById('description').value,
        isavailable: (document.getElementById('isavailable').checked)? '1':'0',
        limitdurationtype: document.getElementById('limitdurationtype').value,
        limitduration: temp

    }
    console.log(data);
    console.log((document.getElementById('isavailable').checked));
    var temp = (await axios.post(ipList.backend + "/manage/editcourse", capsulation.sendData({
      course:{
        courseid: data.courseid,
        coursename: data.coursename,
        instructor: data.instructor,
        price: data.price,
        description: data.description,
        isavailable: data.isavailable,
        limitdurationtype: data.limitdurationtype,
        limitduration: data.limitduration
      }
    }))).data
    var temp2 = (await axios.post(ipList.backend + "/manage/uploadbanner", bannerFormData)).data
    var temp3 = (await axios.post(ipList.backend + "/manage/uploadthumbnail", thumbnailFormData)).data
    exitandreloadfx();
    return true;
}

  toggletype=event=>{
      console.log(document.getElementById('limitdurationtype').value);
      this.setState({expireType:document.getElementById('limitdurationtype').value
    });
  }

  bannerChange=event=>{
    var file = document.getElementById('banner').files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
        this.setState({
            showBanner:[reader.result]
        })
      }.bind(this);
      console.log(url)
  }
  thumbnailChange=event=>{
    var file = document.getElementById('thumbnail').files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
        this.setState({
            showThumbnail:[reader.result]
        })
      }.bind(this);
      console.log(url)
  }

  limitdurationCheck() {
    if (document.getElementById('limitdurationtype').value === '1') {
      if (!isNaN(document.getElementById('limitduration').value) && (document.getElementById('limitduration').value >= 7)) {
        document.getElementById("limitduration").classList.remove('is-invalid');
        document.getElementById("limitduration").classList.add('is-valid');
        console.log('price true');
        return true;
      }
      console.log('price false');
      document.getElementById("limitduration").classList.remove('is-valid');
      document.getElementById("limitduration").classList.add('is-invalid');
      return false;
    }
    return true;
  }
  expireDateCheck() {
    if (document.getElementById('limitdurationtype').value === '2') {
      console.log('check expire');
      var today = new Date();
      var temp;
      today.setHours(0, 0, 0, 0);
      temp = parseInt((new Date(document.getElementById('expiredate').value)) - today) / (24 * 3600 * 1000);
      console.log(temp>=7);
      if (temp >= 7) {
        document.getElementById("expiredate").classList.remove('is-invalid');
        document.getElementById("expiredate").classList.add('is-valid');
        return true;
      } else {
        document.getElementById("expiredate").classList.remove('is-valid');
        document.getElementById("expiredate").classList.add('is-invalid');
        return false;
      }

    }
    return true

  }

  toggletype = event => {
    console.log(document.getElementById('limitdurationtype').value);
    this.setState({
      expireType: document.getElementById('limitdurationtype').value
    });
  }

  render () {
    var date;
    if(this.props.src.limitdurationtype==2){
      date = new Date(this.props.src.createdate);
      date.setDate(date.getDate() + this.props.src.limitduration);
      console.log(date);
    }
    return (
      <ModalBody >
        <Container fluid>
          <h3>{this.props.src.coursename}</h3>
          {' '}
          <Form>
            <hr></hr>
            <FormGroup row>
              <Label>
                Course Name
              </Label>
              <Input
                type='text'
                id='coursename'
                defaultValue={this.props.src.coursename}
                placeholder='Enter Course Name' />
            </FormGroup>
            <FormGroup row>
              <Label>
                Instructor
              </Label>
              <Input
                type='instructor'
                id='instructor'
                defaultValue={this.props.src.instructor}
                placeholder='Enter Instructor' />
            </FormGroup>
            <FormGroup row>
              <Label>
                Price (Thai Baht)
              </Label>
              <Input
                type='price'
                id='price'
                defaultValue={this.props.src.price/100}
                placeholder='Enter Course price in Thai Baht' />
            </FormGroup>

            <FormGroup row>
            <Input plaintext> Description
            </Input>
            <Input type='textarea' id='description' defaultValue={this.props.src.description} />
            </FormGroup>
            <hr></hr>
            <FormGroup row>
              <Input plaintext> Thumbnail<br/>
              <img src={this.state.showThumbnail} className='img-fluid'></img>
              </Input>
              <Input
                block
                type='file'
                id='thumbnail'
                ref='thumbnail'
                onChange={this.thumbnailChange}
                />
                </FormGroup>
                <hr></hr>
                <FormGroup row>
              <Input plaintext> Banner<br/>
              <img src={this.state.showBanner} className='img-fluid'></img>
              </Input>
              <Input
                block
                type='file'
                id='banner'
                thumbnail='banner'
                onChange={this.bannerChange}
                />

               </FormGroup>
               <hr/>
               <FormGroup row>
              <Input plaintext> Expire Type
                  </Input>
              <Input
                type='select'
                name='limitdurationtype'
                id='limitdurationtype'
                defaultValue={this.props.src.limitdurationtype}
                onChange={this.toggletype}>
                <option value='0'>
                  Will Not Expire
                  </option>
                <option value='1'>
                  Expire in a range of time
                  </option>
                <option value='2'>
                  Expire on exact date
                  </option>
              </Input>

              <Collapse isOpen={this.state.expireType == '1'}>
                <Card>
                  <CardBody>
                    choose type 1 : Expire in a range of time
                      <FormGroup row>
                      <Label>
                      Choose Range of time
                  </Label>
                      <Input
                        type='text'
                        id='limitduration'
                        placeholder='Enter range of expire in days ex. 365'
                        defaultValue={this.props.src.limitdurationtype==1?this.props.src.limitduration:''}
                        onChange={this.limitdurationCheck}
                        />
                        <FormFeedback>must be number and exceed 7</FormFeedback>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Collapse>
              <br />
              <Collapse isOpen={this.state.expireType == '2'}>
                <Card>
                  <CardBody>
                    choose type 2 : Expire on exact date<br/>
                                    <Label>Choose Exact Expiry Date</Label>
                    <Input
                      type='date'
                      id='expiredate'
                      onChange={this.expireDateCheck}
                      defaultValue={this.props.src.limitdurationtype==2?date.toISOString().split('T')[0]:new Date}
                    />
                    <FormFeedback>must more than 7 days form now</FormFeedback>
                  </CardBody>
                </Card>
              </Collapse>
            </FormGroup>
            <hr/>
               <FormGroup>
          <Label>
            <Input type="checkbox" defaultChecked={this.props.src.isavailable=='1'? true:false} onChange={()=>{console.log(document.getElementById('isavailable').value)}} id='isavailable'/>{' '}
            Available This Course?
          </Label>
        </FormGroup>
          </Form>
          <hr/>
          <Button color='primary' onClick={this.saveToDatabase} style={{float:'right'}}>
            Save
          </Button><p style={{float:'right'}}> </p><Button color='secondary' onClick={this.props.closeModal} style={{float:'right'}}>Cancel</Button>
        </Container>

      </ModalBody>
    )
  }
}

AdminEditCourseModal.propTypes = {
  src: PropTypes.shape({
    courseid:PropTypes.string.isRequired,
    coursename: PropTypes.string.isRequired,
    instructor: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    limitduration: PropTypes.string.isRequired,
    limitdurationtype: PropTypes.string.isRequired,
    createdate: PropTypes.string.isRequired,
    isavailable: PropTypes.string.isRequired
  }).isRequired
}

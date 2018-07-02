import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const ipList = require('../Config/ipConfig')
const axios = require('axios')
var isValidToken
var linkRedirect = '/loginPage'
const capsulation = require('./Capsulation/SendData');
var id; var exitfx;


export class AdminEditCourseModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        expireType:0,
        showThumbnail: this.props.src.thumbnail,
        showBanner:this.props.src.banner,
        redirect:''
    }
    this.toggletype=this.toggletype.bind(this);
    this.showBanner=this.bannerChange.bind(this);
    this.showThumbnail=this.thumbnailChange.bind(this);
    id = this.props.src.courseid;
    exitfx = this.props.closeModal;
  }

  async saveToDatabase() {
    const bannerFormData = new FormData()
    const thumbnailFormData = new FormData()
    bannerFormData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
    bannerFormData.append('courseid', document.getElementById('banner').files[0], id);
    thumbnailFormData.append('myFile', document.getElementById('thumbnail').files[0], cookies.get('loginToken'));
    thumbnailFormData.append('courseid', document.getElementById('thumbnail').files[0], id);

    var data = {
        courseid: id,
        coursename: document.getElementById('coursename').value,
        instructor: document.getElementById('instructor').value,
        price: document.getElementById('price').value*100,
        description: document.getElementById('description').value,
        isavailable: (document.getElementById('isavailable').checked)? '1':'0'
    }
    console.log(data);
    console.log((document.getElementById('isavailable').checked));
    var temp = await (axios.post(ipList.backend + "/manage/editcourse", capsulation.sendData({
      course:{
        courseid: data.courseid,
        coursename: data.coursename,
        instructor: data.instructor,
        price: data.price,
        description: data.description,
        isavailable: data.isavailable
      }
    }))).data
    /*if(temp.redirect){
      this.setState({
        redirect:temp.redirect
      })
    }*/
    /*var temp2 = (await axios.post(ipList.backend + "/student/editProfile/uploadProfileImage", formData)).data
    if(temp2.redirect){
      this.setState({
        redirect:temp2.redirect
      })
    }*/
    exitfx();
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

  render () {

    console.log('modal render')
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

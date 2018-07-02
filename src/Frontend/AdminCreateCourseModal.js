import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const ipList = require('../Config/ipConfig')
const axios = require('axios')
var isValidToken
var linkRedirect = '/loginPage'
const capsulation = require('./Capsulation/SendData')
var exitfx;


export class AdminCreateCourseModal extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            expireType:0,
            showThumbnail:'',
            showBanner:''
        }
        this.toggletype=this.toggletype.bind(this);
        this.showBanner=this.bannerChange.bind(this);
        this.showThumbnail=this.thumbnailChange.bind(this);
        exitfx=this.props.closeModal;
      }

      async saveToDatabase() {
        const bannerFormData = new FormData()
        const thumbnailFormData = new FormData()
        //console.log(this.state.selectedFile === null);
        //formData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
        var temp;
        if(document.getElementById('limitdurationtype').value==='0'){
          console.log('asdasdad');
          temp = 0;  }
        else if(document.getElementById('limitdurationtype').value==='1'){
          temp = document.getElementById('limitduration').value; }
        else{
          var today = new Date();
          today.setHours(0,0,0,0);
          temp = parseInt((new Date(document.getElementById('expiredate').value)) - today)/ (24 * 3600 * 1000);}
        console.log(parseInt(((new Date(document.getElementById('expiredate').value)) - today)/ (24 * 3600 * 1000)));
        var data = {
          coursename: document.getElementById('coursename').value,
          instructor: document.getElementById('instructor').value,
          price: document.getElementById('price').value*100,
          description: document.getElementById('description').value,
          limitdurationtype:document.getElementById('limitdurationtype').value,
          limitduration: temp
        }
        console.log(data);
        var temp =  (await axios.post(ipList.backend + "/manage/createcourse", capsulation.sendData({
          coursename: data.coursename,
          instructor: data.instructor,
          price: data.price,
          description: data.description,
          limitdurationtype:data.limitdurationtype,
          limitduration: data.limitduration
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
          <ModalBody>
            <Container fluid>
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
                    placeholder='Enter Course Name' />
                </FormGroup>
                <FormGroup row>
                  <Label>
                    Instructor
                  </Label>
                  <Input
                    type='instructor'
                    id='instructor'
                    placeholder='Enter Instructor' />
                </FormGroup>
                <FormGroup row>
                  <Label>
                    Price (Thai Baht)
                  </Label>
                  <Input
                    type='price'
                    id='price'
                    placeholder='Enter Course price in Thai Baht' />
                </FormGroup>
                
                <FormGroup row>
                <Input plaintext> Description
                </Input>
                <Input type='textarea' id='description' placeholder='Describe the Course' />
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
                  <Input plaintext> Banner
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
                    defaultValue='0'
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
    
                  <Collapse isOpen={this.state.expireType==='1'}>
                    <Card>
                      <CardBody>
                      choose type 1 : Expire in a range of time
                      <FormGroup row>
                  <Label>
                    Course Name
                  </Label>
                  <Input
                    type='text'
                    id='limitduration'
                    placeholder='Enter range of expire in days ex. 365' />
                </FormGroup>
                      </CardBody>
                    </Card>
                  </Collapse>
                                <br/>
                                <Collapse isOpen={this.state.expireType==='2'}>
                                <Card>
                                  <CardBody>
                                  choose type 2 : Expire on exact date
                                    <Label>Choose Exact Expiry Date</Label>
                                  <Input
                                  type='date'
                                  id='expiredate'
                                />
                                  </CardBody>
                                </Card>
                              </Collapse>
                </FormGroup>
              </Form>
              <Button color='primary' onClick={this.saveToDatabase}>
                Create
              </Button>{' '}
              <Button color='secondary' onClick={this.props.closeModal}>Cancel</Button>
            </Container>
            
          </ModalBody>
        )
    }
}


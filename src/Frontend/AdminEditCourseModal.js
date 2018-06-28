import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const ipList = require('../Config/ipConfig')
const axios = require('axios')
const capsule = require('./Capsulation/SendData')
var isValidToken
var linkRedirect = '/loginPage'

/*
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Course object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/

export class AdminEditCourseModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        expireType:0,
        showThumbnail:this.props.src.thumbnail,
        showBanner:this.props.src.banner
    }
    this.toggletype=this.toggletype.bind(this);
    this.showBanner=this.bannerChange.bind(this);
    this.showThumbnail=this.thumbnailChange.bind(this);
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
          <Button color='primary' onClick={this.toggle}>
            Do Something
          </Button>
        </Container>
      </ModalBody>
    )
  }
}

AdminEditCourseModal.propTypes = {
  src: PropTypes.shape({
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

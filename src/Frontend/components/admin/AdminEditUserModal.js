import React from 'react'
import PropTypes from 'prop-types'
import {  Button, Form, FormGroup,  ModalBody,  Label, Input, Container } from 'reactstrap'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData');
var id;
var exitfx;
var exitandreloadfx;


export class AdminEditUserModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        expireType:0,
        showThumbnail: this.props.src.thumbnail,
        showBanner:this.props.src.banner,
        redirect:''
    }
    id = this.props.src.userid;
    exitfx = this.props.closeModal;
    exitandreloadfx=this.props.closeModalAndReload;
  }

  async saveToDatabase() {
    var data = {
        isbanned: (document.getElementById('isbanned').checked)? '1':'0' ,
        role: (document.getElementById('role').checked)? '1':'0'
    }
    console.log(data);

    var temp = (await axios.post(ipList.backend + "/manage/edituser", capsulation.sendData({
      isbanned : data.isbanned ,
      role : data.role,
      userid : id
    }))).data

    exitandreloadfx();
    return true;
  }


  render () {

    console.log('modal render')
    return (
      <ModalBody >
        <Container fluid>
          <h3 style={{textAlign:"center"}}>{this.props.src.username}</h3>
          {' '}
          <Form>
            <FormGroup>
              <Label>
                <Input type="checkbox" defaultChecked={this.props.src.isbanned=='1'? true:false} onChange={()=>{console.log(document.getElementById('isbanned').value)}} id='isbanned'/>{' '}
                Ban this user?
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="checkbox" defaultChecked={this.props.src.role=='1'? true:false} onChange={()=>{console.log(document.getElementById('role').value)}} id='role'/>{' '}
                Authorize this user to admin?
              </Label>
            </FormGroup>
          </Form>
          <Button color='primary' onClick={this.saveToDatabase} style={{float:'right'}}>
            Save
          </Button><p style={{float:'right'}}> </p><Button color='secondary' onClick={this.props.closeModal} style={{float:'right'}}>Cancel</Button>
        </Container>

      </ModalBody>
    )
  }
}

AdminEditUserModal.propTypes = {
  src: PropTypes.shape({
    courseid: PropTypes.string.isRequired,
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

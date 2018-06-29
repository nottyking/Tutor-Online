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
var id;
var exitfx;

export class AdminDeleteCourseModal extends React.Component{

    constructor (props) {
        super(props)
        id = this.props.courseid;
        exitfx=this.props.closeModal;
      }

    async sendRequestToDatabase() {
        //console.log(this.state.selectedFile === null);
        //formData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
        var temp =  (await axios.post(ipList.backend + "/manage/deletecourse", capsulation.sendData({
          courseid: id
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



    render(){
        exitfx = this.props.closeModal;
        return(
            <ModalBody style={{textAlign:'center',backgroundColor:'#dc3545',color:'#FFF'}}>
                <h3><b>Are you sure to delete "{this.props.courseid} : {this.props.coursename}?</b>"</h3><br/>
                {'>>'} You can edit availability of this course by edit its information {'<<'}<br/>
                <Button color='warning' onClick={this.sendRequestToDatabase}>Delete</Button>{' '}
                <Button color='secondary' onClick={this.props.closeModal}>Cancel</Button>
            </ModalBody>
        );

    }

}
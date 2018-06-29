import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from './Loading'
import { Collapse, Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import Cookies from 'universal-cookie'


const ipList = require('../Config/ipConfig');
const axios = require('axios');
const capsulation = require('./Capsulation/SendData');

var exitfx;
var tempSubcourseInfo;



export class AdminEditSubCourseModal extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            expireType:0,
            subcourseinfo:'',
            isLoaded:false,
            warnModal:false,
            editModal:false
        }
        this.updateSubcourse = this.updateSubcourse.bind(this);
        exitfx = this.props.closeModal;
      }

      async componentDidMount(){
        var temp = (await axios.post(ipList.backend + "/course/queryInformation", capsulation.sendData({
          courseid: this.props.courseid
        }))).data;
        
        console.log('subcourse info state asdasdsa');
        this.setState({subcourseinfo:temp.subCourse,isLoaded:true});
        tempSubcourseInfo = temp.subCourse;
        console.log(this.state.isLoaded);
        console.log(temp.subCourse);
        console.log(this.state.subcourseinfo);
      }

      async updateSubcourse(){
        var temp = await (axios.post(ipList.backend + "/manage/editcourse", capsulation.sendData({
          subcourse:tempSubcourseInfo
        }))).data
      }

      async delete(x){
        tempSubcourseInfo.splice(x,1);
        this.updateSubcourse();
      }

      async edit(x){
        tempSubcourseInfo.splice(x,1);
        this.updateSubcourse();
      }
    
    
      render () {
        console.log('modal render')
        if(this.state.isLoaded){

            var courseTableBody = this.state.subcourseinfo.map((item,i)=>
            <tr>
                    <td scope="row"><b>{i+1}</b></td>
                    <td>{item.subcourseid}</td>
                    <td>{item.subcoursename}</td>
                    <td><Button href={item.videolink} target='_blank'><i class="fa fa-film"/></Button></td>
                    <td><Button color='primary' onClick={()=>{this.edit(i)}}><i class="fa fa-edit"/></Button>{' '}
                    <Button color='danger' onClick={()=>{this.delete(i)}}><i class="fa fa-trash-o"/></Button>
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

          <Container style={{width:'100%'}}>
          <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>SubCourse id</th>
              <th>SubCourse Name</th>
              <th>videolink</th>
              <th></th>
            </tr>
            <tr>
            <td colspan="10">
            <Button color='info' outline style={{width:'100%',height:'100%'}} onClick={this.toggleCreate}><i class="fa fa-plus"/></Button></td>
        </tr>
            
          </thead>
          <tbody>
          {courseTableBody}
          </tbody>
        </Table>
        </Container>
          </ModalBody>
        );
    }else{
        return (
            <ModalBody>
            <Loading background='white'/>
        </ModalBody>);
    }
    }
}


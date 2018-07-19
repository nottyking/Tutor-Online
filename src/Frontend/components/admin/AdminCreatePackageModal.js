import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button, Form, FormGroup, FormFeedback, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import Cookies from 'universal-cookie'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies()
const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData')
var exitfx;
var warnMessage;
var exitandreloadfx;

export class AdminCreatePackageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expireType: 0,
      showThumbnail: '',
      showBanner: '',
      editorState: EditorState.createEmpty()
    }
    this.toggletype = this.toggletype.bind(this);
    this.showBanner = this.bannerChange.bind(this);
    this.showThumbnail = this.thumbnailChange.bind(this);
    this.checkInp = this.checkInp.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    exitfx = this.props.closeModal;
    exitandreloadfx = this.props.closeModalAndReload;
  }
  checkInp(x) {
    var regex = /^[0-9]+$/;
    if (x.match(regex)) {
      return false;
    }
    return true;
  }

  packageNameCheck() {
    if (document.getElementById('packagename').value.length > 3 && document.getElementById('packagename').value.length < 46) {
      document.getElementById("packagename").classList.remove('is-invalid');
      document.getElementById("packagename").classList.add('is-valid');
      return true;
    }
    document.getElementById("packagename").classList.remove('is-valid');
    document.getElementById("packagename").classList.add('is-invalid');
    return false;
  }



  checkIsPicture(id){

  }

  checkAll = () => {
    return  this.packageNameCheck();
  }

  async saveToDatabase() {
    console.log(this.checkAll());
    if (!this.checkAll()) {
      console.log('not save');
      return;
    }
    const bannerFormData = new FormData()
    const thumbnailFormData = new FormData()
    bannerFormData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
    thumbnailFormData.append('myFile', document.getElementById('thumbnail').files[0], cookies.get('loginToken'));
    var temp;
    var data = {
      packagename: document.getElementById('packagename').value,
      description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    }
    console.log(data);
    var temp = (await axios.post(ipList.backend + "/manage/package/create", capsulation.sendData({
      packagename: data.packagename,
      description: data.description,
    }))).data
    if (bannerFormData) {
      console.log("send bannerFormData");
      var temp2 = (await axios.post(ipList.backend + "/manage/package/uploadbanner", bannerFormData)).data
      console.log(temp2);
    }
    if (thumbnailFormData) {
      console.log("send thumbnailFormData");
      var temp3 = (await axios.post(ipList.backend + "/manage/package/uploadthumbnail", thumbnailFormData)).data
      console.log(temp3);
    }
    exitandreloadfx();
    return true;
  }




  toggletype = event => {
    console.log(document.getElementById('limitdurationtype').value);
    this.setState({
      expireType: document.getElementById('limitdurationtype').value
    });
  }

  bannerChange = event => {
    var file = document.getElementById('banner').files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        showBanner: [reader.result]
      })
    }.bind(this);
    console.log(url)
  }

  thumbnailChange = event => {
    var file = document.getElementById('thumbnail').files[0];
    var fileType = file["type"];
    var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        showThumbnail: [reader.result]
      })
    }.bind(this);
    console.log(url)
  }

  onEditorStateChange: Function = (editorState) => {
    console.log("CHANGE:",editorState);
    this.setState({
      editorState: editorState,
    })
  }

  render() {
    console.log('modal render')
    return (
      <ModalBody>
        <Container fluid>
          {' '}
          <Form>
            <hr></hr>
            <FormGroup row>
              <Label>
                Package Name
                  </Label>
              <Input
                type='text'
                id='packagename'
                placeholder='Enter Package Name'
                onChange={this.packageNameCheck}

              />
              <FormFeedback>Package Name must have length between 4-45</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Input plaintext> Description </Input>

              <Editor
                editorState={this.state.editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },

                }}
              />
            </FormGroup>
            <hr></hr>
            <FormGroup row>
              <Input plaintext> Thumbnail<br />
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
            <hr />
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

import React from 'react'
import PropTypes from 'prop-types'
import {  Button, Form, FormGroup,  ModalBody,  Label, Input, Container,Collapse,Card,CardBody,FormFeedback } from 'reactstrap'
import Cookies from 'universal-cookie'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies()
const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData');
var id; var exitfx;var exitandreloadfx;

export class AdminEditPackageModal extends React.Component {
  constructor (props) {
    super(props)
    const html = this.props.src.description;
    console.log(html);
    const contentBlock = htmlToDraft(html);
    console.log(contentBlock);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    console.log(contentState);
    const editorState = EditorState.createWithContent(contentState);
    console.log(editorState);
    this.state = {
        showThumbnail: this.props.src.thumbnail,
        showBanner:this.props.src.banner,
        redirect:'',
        editorState: editorState ,
        contentState : contentState,
        contentBlock : contentBlock,
        html : html
    }
    this.toggletype=this.toggletype.bind(this);
    this.showBanner=this.bannerChange.bind(this);
    this.showThumbnail=this.thumbnailChange.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
    this.priceCheck = this.priceCheck.bind(this);
    id = this.props.src.packageid;
    exitfx = this.props.closeModal;
    exitandreloadfx=this.props.closeModalAndReload;
  }

  async saveToDatabase() {
    const bannerFormData = new FormData()
    const thumbnailFormData = new FormData()
    bannerFormData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
    bannerFormData.append('packageid', document.getElementById('banner').files[0], id);
    thumbnailFormData.append('myFile', document.getElementById('thumbnail').files[0], cookies.get('loginToken'));
    thumbnailFormData.append('packageid', document.getElementById('thumbnail').files[0], id);


    var data = {
        packageid: id,
        packagename: document.getElementById('packagename').value,
        discountprice: document.getElementById('discountprice').value*100,
        description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        isavailable: (document.getElementById('isavailable').checked)? '1':'0',
    }
    console.log(data);
    console.log((document.getElementById('isavailable').checked));
    var temp = (await axios.post(ipList.backend + "/manage/package/edit", capsulation.sendData({
        packageid: data.packageid,
        packagename: data.packagename,
        discountprice: data.discountprice,
        description: data.description,
        isavailable: data.isavailable,
    }))).data
    var temp2 = (await axios.post(ipList.backend + "/manage/package/uploadbanner", bannerFormData)).data
    var temp3 = (await axios.post(ipList.backend + "/manage/package/uploadthumbnail", thumbnailFormData)).data
    exitandreloadfx();
    return true;
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

  priceCheck() {
    if (!isNaN(document.getElementById('discountprice').value) && (document.getElementById('discountprice').value > 20 && document.getElementById('discountprice').value <= parseInt(this.props.src.price)/100) || document.getElementById('discountprice').value === '0') {
      document.getElementById("discountprice").classList.remove('is-invalid');
      document.getElementById("discountprice").classList.add('is-valid');
      document.getElementById("pricevalid").innerHTML='as '+((parseInt(document.getElementById('discountprice').value)*100/parseInt(this.props.src.price))*100).toFixed(2)+'% of '+(this.props.src.price/100).toLocaleString('en')+'฿';
      console.log('price true');
      return true;
    }
    document.getElementById("discountprice").classList.remove('is-valid');
    document.getElementById("discountprice").classList.add('is-invalid');
    
    return false;
  }

  checkAll = () => {
    var check1 = this.packageNameCheck()
    var check3 = this.priceCheck()
    return ( check1 && check3);
  }

  toggletype = event => {
    console.log(document.getElementById('limitdurationtype').value);
    this.setState({
      expireType: document.getElementById('limitdurationtype').value
    });
  }

  onEditorStateChange: Function = (editorState) => {
    console.log("CHANGE:",editorState);
    this.setState({
      editorState: editorState,
    })
  }

  render () {
    return (
      <ModalBody >
        <Container fluid>
          <h3>{this.props.src.packagename}</h3>
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
                defaultValue={this.props.src.packagename}
                onChange={this.packageNameCheck}
                placeholder='Enter Package Name' />
                <FormFeedback>Package Name must have length between 4-45</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Label>
                Price (Thai Baht)
              </Label>
              <Input
                type='price'
                id='discountprice'
                defaultValue={this.props.src.discountprice/100}
                onChange={this.priceCheck}
                placeholder='Enter discounted price in Thai Baht' />
                <FormFeedback>Price must be a number ,between 20-{(this.props.src.price/100).toLocaleString('en')}฿ or 0 and not have all of symbol ex. ',' , '฿'</FormFeedback>
                <FormFeedback valid id='pricevalid'></FormFeedback>
            </FormGroup>

            <FormGroup row>
            <Input plaintext> Description
            </Input>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
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
            Available This Package?
          </Label>
        </FormGroup>
          </Form>
          <hr/>
          <Button color='primary' onClick={()=>{if(this.checkAll()){this.saveToDatabase()}}} style={{float:'right'}}>
            Save
          </Button><p style={{float:'right'}}> </p><Button color='secondary' onClick={this.props.closeModal} style={{float:'right'}}>Cancel</Button>
        </Container>

      </ModalBody>
    )
  }
}

AdminEditPackageModal.propTypes = {
  src: PropTypes.shape({
    packageid:PropTypes.string.isRequired,
    packagename: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isavailable: PropTypes.string.isRequired
  }).isRequired
}

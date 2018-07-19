import React from 'react'
import {  Button, ModalBody} from 'reactstrap'

const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData')
var id;
var exitfx;
var exitandreloadfx;

export class AdminDeletePackageModal extends React.Component{

    constructor (props) {
        super(props)
        id = this.props.packageid;
        exitfx=this.props.closeModal;
        exitandreloadfx=this.props.closeModalAndReload;
      }

    async sendRequestToDatabase() {
        //console.log(this.state.selectedFile === null);
        //formData.append('myFile', document.getElementById('banner').files[0], cookies.get('loginToken'));
        var temp =  (await axios.post(ipList.backend + "/manage/package/delete", capsulation.sendData({
          packageid: id
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
        exitandreloadfx();
        return true;
    }



    render(){
        exitfx = this.props.closeModal;
        return(
            <ModalBody style={{textAlign:'center',backgroundColor:'#dc3545',color:'#FFF'}}>
                <h3><b>Are you sure to delete package "{this.props.packageid} : {this.props.packagename}?</b>"</h3><br/>
                {'>>'} You can edit availability of this package by edit its information {'<<'}<br/>
                <Button color='warning' onClick={this.sendRequestToDatabase}>Delete</Button>{' '}
                <Button color='secondary' onClick={this.props.closeModal}>Cancel</Button>
            </ModalBody>
        );

    }

}

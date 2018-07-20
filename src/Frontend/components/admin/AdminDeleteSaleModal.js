import React from 'react'
import {  Button, ModalBody} from 'reactstrap'

const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData')
var id;
var exitfx;
var exitandreloadfx;

export class AdminDeleteSaleModal extends React.Component{

    constructor (props) {
        super(props)
        id = this.props.courseid;
        exitfx=this.props.closeModal;
        exitandreloadfx=this.props.closeModalAndReload;
        this.sendRequestToDatabase = this.sendRequestToDatabase.bind(this)
      }

    async sendRequestToDatabase() {
        var temp =  (await axios.post(ipList.backend + "/manage/coursediscount/delete", capsulation.sendData({
          courseid: this.props.deleteInfo.courseid, coursediscountid: this.props.deleteInfo.coursediscountid
        }))).data
        exitandreloadfx();
        return true;
    }



    render(){
        exitfx = this.props.closeModal;
        return(
            <ModalBody style={{textAlign:'center',backgroundColor:'#dc3545',color:'#FFF'}}>
                <h3><b>Are you sure to delete "{this.props.deleteInfo.courseid} : {this.props.deleteInfo.coursename}?</b>"</h3><hr />
                {'>>'} More Information {'<<'}<br/>
                Original price:  {this.props.deleteInfo.price * 0.01} ฿<br/>
                Sale price: {(this.props.deleteInfo.coursediscountprice * 0.01).toLocaleString('en')} ฿<br/>
                Start date: {(this.props.deleteInfo.coursediscountcreatedate.substring(0,10)).toLocaleString('en')}<br/>
                End date: {this.props.deleteInfo.coursediscountexpireddate.substring(0,10)}<br/>
                <hr />


                <Button color='warning' onClick={this.sendRequestToDatabase}>Delete</Button>{' '}
                <Button color='secondary' onClick={this.props.closeModal}>Cancel</Button>
            </ModalBody>
        );

    }

}

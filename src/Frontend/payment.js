import React from 'react'
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var cData = {
    cName : 'CourseName',
    cDes : 'Course Description',
    price: 100000, //IN Satang-THB
    d : Date().getDate
}

export class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitPay = this.submitPay.bind(this);
    }

    render() {
        return (
            <div align = 'center'>
                <Label>Course Detail</Label>
                <p>Price/Order Pre-receipt
                    <Label color = 'primary'>{cData.d}</Label>
                </p>
                <Button onClick={this.submitPay} outline color='primary'>Pay</Button>

            </div>
        );
    }

    submitPay(){
        
    }
}
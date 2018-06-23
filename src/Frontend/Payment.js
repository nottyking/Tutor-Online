import React from 'react'
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter,Container,Row,Card,CardBody,CardImg } from 'reactstrap';
import {CreditCardForm} from './CreditCardForm'
import axios from 'axios';
import ipList from '../Config/ipConfig'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Todo Change path to charge omise  & use Prop instead of cData

var cData = {
    cID : '1',
    cName : 'Math for PAT1',
    cDes : 'Course Description',
    price: 155500, //IN Satang-THB
    d : Date().getDate
}

export class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitPay = this.submitPay.bind(this);
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    componentDidMount(){
    const {OmiseCard} =window;
    OmiseCard.configure({
        publicKey: 'pkey_test_5cbk0k6swgh9kw4fn6i',
        amount: cData.price //IN Satang-THB 0.01 ฿
      });

      OmiseCard.configureButton('#checkout-button', {
        frameLabel: 'Tutor Online',
        submitLabel: 'Pay',
        frameDescription: 'Enroll '+cData.cName,
        image:'http://icons.iconarchive.com/icons/martz90/circle/96/books-icon.png'
      });

      OmiseCard.attach();
    }
    render() {
        return (
                    <Form action="http://localhost:8888/payment/creditcard" method="POST">
                     <Input type="submit" value="Pay To Enroll" id="checkout-button" className="btn btn-primary" onChange={this.handleChange} />
                     <Input name='amount' id='amount' value={cData.price} style={{display:'none'}}/>
                     <Input name='courseid' id='courseID' value={cData.cID} style={{display:'none'}}/>
                     <Input name='loginToken' id='loginToken' value={cookies.get("loginToken")} style={{display:'none'}}/>
                    </Form>
        );
    }

    submitPay(){

    }
}

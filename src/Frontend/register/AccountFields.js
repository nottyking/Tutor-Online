import React from 'react';
import './register.css';
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class AccountFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Modal: false, ModalMessage: ''};
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.resetLabel = this.resetLabel.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.checkValidUsername = this.checkValidUsername.bind(this);
    }

    render() {
        return (
            <div>
                {/* REGISTER FORM */}
                <h1>REGISTER</h1>
                <Form className='Register-form'>
                    <FormGroup row>
                        <Label sm={1} >Username</Label>
                        <Col sm={{ size: 4, order: 4 }}>
                            <Input type='text' id='username' defaultValue={this.props.fieldValues.username} placeholder='Enter your Username' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 1 }}>E-mail</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='email' id='email' defaultValue={this.props.fieldValues.email} placeholder='Enter your email' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={1}>Password</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='password' id='password' defaultValue={this.props.fieldValues.password} placeholder='Enter your password' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={1}>Re-Password</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='password' id='rePassword' defaultValue={this.props.fieldValues.rePassword} placeholder='Enter password again' />
                        </Col>
                    </FormGroup>
                    <FormGroup align='center'>
                        <Button onClick={this.resetLabel}>Reset</Button> <t />
                        <Button onClick={this.saveAndContinue}>Save And Continue</Button>
                    </FormGroup>
                </Form>



                {/* HANDLE WARNING */}
                <Modal isOpen={this.state.Modal} toggle={this.modalToggle}>
                    <ModalHeader>WARNING</ModalHeader>
                    <ModalBody>
                        {this.state.ModalMessage}
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' onClick={this.modalToggle}>OK</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );

    }

    modalToggle() {
        this.setState({
            Modal: !this.state.Modal
        })
        document.getElementById('password').value = ''
        document.getElementById('rePassword').value = ''
    }

    saveAndContinue(event) {
        event.preventDefault();
        var data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            rePassword: document.getElementById('rePassword').value
        }

        //Check Username
        if(!this.checkValidUsername()){
            this.setState({ ModalMessage: 'Your username is not valid' })
            this.modalToggle();
        }
        //Chcek Password from database
        else if (data.password == '') {//Check Password & re-password
            this.setState({ ModalMessage: 'Please enter your password' })
            this.modalToggle();
        }
        else if (data.password != data.rePassword) {//Check Password & re-password
            this.setState({ ModalMessage: 'Your Password and Re-password is not match' })
            this.modalToggle();
            document.getElementById('password').value = ''
            document.getElementById('rePassword').value = ''
        }
        //Check Email
        //Check ...
        else {//Pass Every Condition
            this.props.saveValues(data)
            this.props.nextStep()
        }
    }

    checkValidUsername(){
        if(document.getElementById('username').value.length < 8 || document.getElementById('username').value.length > 20) return false;
        //check from database
        return true;
    }

    resetLabel() {
        document.getElementById('username').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('rePassword').value = ''
    }
}
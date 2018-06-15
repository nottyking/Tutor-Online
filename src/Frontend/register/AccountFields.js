import React from 'react';
import './register.css';
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class AccountFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = { passwordModal: false };
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.resetLabel = this.resetLabel.bind(this);
        this.passwordToggle = this.passwordToggle.bind(this);
    }

    render() {
        return (
            <div>
                {/* REGISTER FORM */}
                <h1>REGISTER</h1>
                <Form className='Register-form'>
                    <FormGroup row>
                        <Label sm={{ size: 1 }}>First Name</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='text' id='fName' defaultValue={this.props.fieldValues.fName} placeholder='Enter your first name' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={1} >Last Name</Label>
                        <Col sm={{ size: 4, order: 4 }}>
                            <Input type='text' id='lName' defaultValue={this.props.fieldValues.lName} placeholder='Enter your Surname' />
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
                <Modal isOpen={this.state.passwordModal} toggle={this.passwordToggle}>
                    <ModalHeader>WARNING</ModalHeader>
                    <ModalBody>
                        Your Password and Re-Password not match!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' onClick={this.passwordToggle}>OK</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );

    }

    passwordToggle() {
        this.setState({
            passwordModal: !this.state.passwordModal
        })
        console.log('Toggle');
    }

    saveAndContinue(event) {
        event.preventDefault();
        var data = {
            fName: document.getElementById('fName').value,
            lName: document.getElementById('lName').value,
            password: document.getElementById('password').value,
            rePassword: document.getElementById('rePassword').value
        }


        //Chcek ID from database
        if (data.password != data.rePassword || data.password == '') {//Check Password & re-password
            this.passwordToggle();
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

    resetLabel() {
        document.getElementById('fName').value = ''
        document.getElementById('lName').value = ''
        document.getElementById('password').value = ''
        document.getElementById('rePassword').value = ''
    }
}
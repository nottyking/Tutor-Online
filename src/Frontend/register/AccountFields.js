import React from 'react';
import './register.css';
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import ipList from '../../Config/ipConfig'

export class AccountFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Modal: false,
            ModalMessage: '',
            validUsername: false,
            validEmail: false,
            validPassword: false,
            validRePassword: false,
            defaultUsername: true,
            defaultEmail: true,
            defaultPassword: true,
            defaultRePassword: true
        };
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.resetLabel = this.resetLabel.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.checkValidUsername = this.checkValidUsername.bind(this);
        this.checkValidEmail = this.checkValidEmail.bind(this);
        this.checkValidPassword = this.checkValidPassword.bind(this);
        this.checkValidRePassword = this.checkValidRePassword.bind(this);
        this.checkDatabaseOnSubmit = this.checkDatabaseOnSubmit.bind(this);
    }

    render() {
        return (
            <div>
                {/* REGISTER FORM */}
                <h1>REGISTER</h1>

                <Form className='Register-form'>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 2, offset: 3 }} >Username</Label>
                        <Col sm={{ size: 4, order: 4 }}>
                            <Input type='text' id='username'
                                defaultValue={this.props.fieldValues.username} placeholder='Enter your Username'
                                valid={this.state.validUsername}
                                invalid={!this.state.validUsername && !this.state.defaultUsername}
                                onChange={this.checkValidUsername}
                            />
                            <FormText>Username must contain between 8-20 characters</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 2, offset: 3 }}>E-mail</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='email' id='email'
                                defaultValue={this.props.fieldValues.email} placeholder='Enter your email'
                                valid={this.state.validEmail}
                                invalid={!this.state.validEmail && !this.state.defaultEmail}
                                onChange={this.checkValidEmail}
                            />
                            <FormText>E-mail that you can confirm with this registration</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 2, offset: 3 }}>Password</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='password' id='password'
                                defaultValue={this.props.fieldValues.password} placeholder='Enter your password'
                                valid={this.state.validPassword}
                                invalid={!this.state.validPassword && !this.state.defaultPassword}
                                onChange={this.checkValidPassword}
                            />
                            <FormText>Password must contain between 8-12 characters</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 1, offset: 3 }}>Re-Password</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='password' id='rePassword'
                                defaultValue={this.props.fieldValues.rePassword} placeholder='Enter password again'
                                defaultValue={this.props.fieldValues.password} placeholder='Enter your password'
                                valid={this.state.validRePassword}
                                invalid={!this.state.validRePassword && !this.state.defaultRePassword}
                                onChange={this.checkValidRePassword}
                            />
                            <FormText>Confirm your password here</FormText>
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

    async saveAndContinue(event) {
        event.preventDefault();
        var data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            rePassword: document.getElementById('rePassword').value
        }

        //Check Username & Email with database & check valid format of username
        if (!(await this.checkDatabaseOnSubmit()) || !this.checkValidUsername()) {
            this.modalToggle();
        }
        //Chcek Password & Re-password and Reset if not valid
        else if (!this.checkValidPassword() || !this.checkValidRePassword()) {//Check Password & re-password
            this.modalToggle();
            document.getElementById('password').value = ''
            document.getElementById('rePassword').value = ''
        }
        //Check ...
        else {//Pass Every Condition
            this.props.saveValues(data)
            this.props.nextStep()
        }
    }

    //Checking field value in this form
    checkValidUsername() {
        if (this.state.defaultUsername) {
            this.setState({ defaultUsername: false });
        } else if (!this.state.defaultUsername && document.getElementById('username').value == '') {
            this.setState({ defaultUsername: true });
        }

        if (document.getElementById('username').value.length < 8 ||
            document.getElementById('username').value.length > 20) {
            this.setState({ validUsername: false, ModalMessage: 'Username must contain 8-20 characters' });
            return false;
        }
        else {
            this.setState({ validUsername: true });
            return true;
        }
    }

    checkValidEmail() {
        if (this.state.defaultEmail) {
            this.setState({ defaultEmail: false });
        } else if (!this.state.defaultEmail && document.getElementById('email').value == '') {
            this.setState({ defaultEmail: true });
        }

        if (!(/^[a-zA-Z0-9]+([._+-]+[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]*)*(\.[a-zA-Z0-9-]{2,3})+$/.test(document.getElementById('email').value))) {
            this.setState({ validEmail: false, ModalMessage: 'This not a E-mail format' })
            return false;
        }
        else {
            this.setState({ validEmail: true });
            return true;
        }
    }

    checkValidPassword() {
        if (this.state.defaultPassword) {
            this.setState({ defaultPassword: false });
        } else if (document.getElementById('password').value == '') {
            this.setState({ defaultPassword: true });
        }

        if (document.getElementById('password').value.length < 8 ||
            document.getElementById('password').value.length > 12) {
            this.setState({ validPassword: false, ModalMessage: 'Password must contain 8-12 characters' })
            return false;
        }
        else {
            this.setState({ validPassword: true });
            return true;
        }
    }

    checkValidRePassword() {
        if (this.state.defaultRePassword) {
            this.setState({ defaultRePassword: false });
        } else if (!this.state.defaultRePassword && document.getElementById('rePassword').value == '') {
            this.setState({ defaultRePassword: true });
        }

        if (this.checkValidPassword && document.getElementById('password').value != document.getElementById('rePassword').value) {//Check Password & re-password
            this.setState({ validRePassword: false, ModalMessage: 'Your Password and Re-password is not match' })
            return false;
        }
        else {
            this.setState({ validRePassword: true });
            return true;
        }
    }

    //This method for checking necessary field value with database
    async checkDatabaseOnSubmit() {
      console.log("!#!@#");
        var checkOnSubmit = (await axios.post(ipList.backend + "register/checkUsernameAndEmail",{
          username: document.getElementById('username').value, email: document.getElementById('email').value
        })).data
        console.log(checkOnSubmit);
        if (checkOnSubmit.isSameUsernameInDB.result) { //Check username in database
            console.log("Username is same");
            this.setState({ validUsername: false, ModalMessage: 'This username has been used' })
            return false;
        } else if (checkOnSubmit.isSameEmailInDB.result) { // Check Email in database
            console.log("Email is same");
            this.setState({ validEmail: false, ModalMessage: 'This E-mail has been used' })
            return false;
        }
        return true;
    }

    //For reset form value
    resetLabel() {
        this.setState({ defaultUsername: true, defaultEmail: true, defaultPassword: true, defaultRePassword: true })
        document.getElementById('username').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('rePassword').value = ''
    }
}

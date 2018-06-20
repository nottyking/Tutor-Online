import React from 'react';
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';
import ipList from '../Config/ipConfig';
import axios from 'axios';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModal: false }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModal: !this.state.isModal
        });
    }

    toDefaultLoginState() {
        this.setState({
            loginValid: false, defaultLoginState: true
        })
        this.toggleModal();
    }


    render() {
        return (
            <div align='right'>
                <Button onClick={this.toggleModal} color='success'>Log in</Button>

                <Modal isOpen={this.state.isModal}>
                    <ModalHeader className='Login_Header'>
                        <Label color='success'>LOG IN</Label>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label sm={{ size: 2, order: 2, offset: 1 }} >Account</Label>
                            <Col sm={{ size: 8, order: 4 }}>
                                <Input type='text' id='username'
                                    defaultValue={''} placeholder='Enter your Username or E-mail'
                                    invalid={!this.state.loginValid && !this.state.defaultLoginState}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, order: 2, offset: 1 }}>Password</Label>
                            <Col sm={{ size: 8, order: 2 }}>
                                <Input type='password' id='password'
                                    defaultValue={''} placeholder='Enter your password'
                                    invalid={!this.state.loginValid && !this.state.defaultLoginState}
                                />
                                <FormFeedback>{this.state.msg}</FormFeedback>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter className='Login_Footer'>
                        <Button onClick={this.toDefaultLoginState} color='danger'>Cancel</Button>
                        <Button onClick={this.login} color='success'>Login</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    login() {
        //this.toggleModal();
        var isLoginSuccess = this.checkLoginOnDatabase();
        if (isLoginSuccess.result) {//Check id/email/password
            this.props.login();
        } else {
            this.setState({ msg: isLoginSuccess.msg, loginValid: false, defaultLoginState: false })
        }
    }

    async checkLoginOnDatabase() {
        var isLoginSuccess = (await axios.post(ipList.backend + '/login/normal',{
          usernameOrEmail : document.getElementById('username') ,
          password : document.getElementById('password')
        })).data
        console.log(isLoginSuccess);
        console.log(isLoginSuccess.msg);
        return isLoginSuccess.result;
    }
}

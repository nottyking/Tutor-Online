import React from 'react';
import { Form, Row, Alert, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';
import ipList from '../Config/ipConfig';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const maxAge = 1*31*60*60 ;

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModal: false, msg: '', loginValid: false, defaultLoginState: true }
        this.toggleModal = this.toggleModal.bind(this);
        this.checkLoginOnDatabase = this.checkLoginOnDatabase.bind(this);
        this.login = this.login.bind(this);
        this.toDefaultLoginState = this.toDefaultLoginState.bind(this);
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
                        <hr></hr>

                        <FormGroup row align='center'>
                            <Col>
                                <Button block outline color='danger'>Google Login</Button>
                                <Button block outline color='primary'>Facebook Login</Button>
                            </Col>
                        </FormGroup>
                        <hr></hr>
                        <FormGroup row align='center'>
                            <Col>
                                <a href='./Register'>Register</a>
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

    async login() {
        //this.toggleModal();
        console.log("Login");
        var isLoginSuccess = await this.checkLoginOnDatabase();
        console.log("After send");
        if (isLoginSuccess.result) {//Check id/email/password
            var currentdate = new Date();
            cookies.set("loginToken",isLoginSuccess.loginToken,{maxAge: maxAge});
            this.props.login();
        } else {
            this.setState({ msg: isLoginSuccess.msg, loginValid: false, defaultLoginState: false })
        }
    }

    async checkLoginOnDatabase() {
        var isLoginSuccess = (await axios.post(ipList.backend + '/login/normal',{
          usernameOrEmail : document.getElementById('username').value ,
          password : document.getElementById('password').value
        })).data
        return isLoginSuccess;
    }
}

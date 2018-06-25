import React from 'react';
import { Card, Col, Container, Button, FormGroup, Label, Input, CardTitle, CardBody, CardFooter, CardText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';
import ipList from '../Config/ipConfig';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModal: false, msg: '', loginValid: false, defaultLoginState: true, redirect: false }
        this.checkLoginOnDatabase = this.checkLoginOnDatabase.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to='/' />);
        }
        else {
            return (
                <div>
                    <Container style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        marginBottom: 20,
                        marginTop: 20,
                        width: '60%'
                    }}>
                        <Card style={{
                            textAlign: 'center'
                        }}>
                            <CardBody>
                                <CardTitle>
                                    <Label color='success'>LOG IN</Label>
                                </CardTitle>
                                <CardText>
                                    <FormGroup row>
                                        <Label >Account</Label>
                                        <Col>
                                            <Input type='text' id='loginpage-username'
                                                defaultValue={''} placeholder='Enter your Username or E-mail'
                                                invalid={!this.state.loginValid && !this.state.defaultLoginState}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label>Password</Label>
                                        <Col>
                                            <Input type='password' id='loginpage-password'
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
                                </CardText>
                                <CardFooter className='Login_Footer'>
                                    <Button onClick={this.login} color='success'>Login</Button>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            );
        }
    }
    async login() {
        //this.toggleModal();
        console.log("Login");
        var isLoginSuccess = await this.checkLoginOnDatabase();
        console.log("After send");
        if (isLoginSuccess.result) {//Check id/email/password
            var currentdate = new Date();
            cookies.set("loginToken", isLoginSuccess.loginToken, { maxAge: maxAge });
            this.setState({ redirect: true})
        } else {
            this.setState({ msg: isLoginSuccess.msg, loginValid: false, defaultLoginState: false })
        }
    }

    async checkLoginOnDatabase() {
        var isLoginSuccess = (await axios.post(ipList.backend + '/login/normal', {
            usernameOrEmail: document.getElementById('loginpage-username').value,
            password: document.getElementById('loginpage-password').value
        })).data
        return isLoginSuccess;
    }
}

import React from 'react';
import { Form, Row, Alert, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';

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

    toDefaultLoginState(){
        this.setState({
            loginValid: false, defaultLoginState: true
        })
    }


    render() {
        return (
            <div align='right'>
                <Button onClick={this.toggleModal} color='success'>Log in</Button>
                
                {/* <For demo of login> */}
                <Modal isOpen={this.state.loginValid&&!this.state.defaultLoginState}>
                    <ModalHeader>{this.state.msg}</ModalHeader>
                    <ModalFooter className='Login_Footer'>
                        <Button onClick={this.toDefaultLoginState} color='primary'>OK</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={!this.state.loginValid&&!this.state.defaultLoginState}>
                    <ModalHeader>{this.state.msg}</ModalHeader>
                    <ModalFooter className='Login_Footer'>
                        <Button onClick={this.toDefaultLoginState} color='primary'>OK</Button>
                    </ModalFooter>
                </Modal>


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
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, order: 2, offset: 1 }}>Password</Label>
                            <Col sm={{ size: 8, order: 2 }}>
                                <Input type='password' id='password'
                                    defaultValue={''} placeholder='Enter your password'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row align='center'>
                            <Col>
                                <Button outline color='danger'>Google Login</Button>
                                <Label>&nbsp;&nbsp;</Label>
                                <Button outline color='primary'>Facebook Login</Button>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter className='Login_Footer'>
                        <Button onClick={this.toggleModal} color='danger'>Cancel</Button>
                        <Button onClick={this.login} color='success'>Login</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    login() {
        this.toggleModal();
        if (this.checkLoginOnDatabase()) {//Check id/email/password
            this.setState({ msg: "Success", loginValid: true, defaultLoginState: false })
        } else {
            this.setState({ msg: "Your Username or Password is Invalid", loginValid: false, defaultLoginState: false })
        }
    }

    checkLoginOnDatabase() {
        if (true) {
            return true;
        } else {
            return false;
        }
    }
}
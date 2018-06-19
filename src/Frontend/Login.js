import React from 'react';
import { Form, Row, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';

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
                        <Button onClick={this.toggleModal} color='success'>Login</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
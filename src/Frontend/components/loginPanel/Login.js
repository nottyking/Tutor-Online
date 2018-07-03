import React from 'react';
import { NavLink, Col, Button, FormGroup, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';
import { Link } from 'react-router-dom';
import { GuestActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { history } from '../../redux/helpers';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModal: false, msg: '', loginValid: false, defaultLoginState: true }
        this.toggleModal = this.toggleModal.bind(this);
        this.toDefaultLoginState = this.toDefaultLoginState.bind(this);
        this.loginHandle = this.loginHandle.bind(this);
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

    async loginHandle() {
        var check = await this.props.login(document.getElementById('login-username').value, document.getElementById('login-password').value)
        console.log('check::')
        if (check.type === "USER_LOGIN_SUCCESS") {
            this.toggleModal();
            history.go(0)
        } else {
            this.setState({ msg: '', loginValid: false, defaultLoginState: false })
        }
    }

    async facebookLoginHandle(){

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
                                <Input type='text' id='login-username'
                                    defaultValue={''} placeholder='Enter your Username or E-mail'
                                    invalid={!this.state.loginValid && !this.state.defaultLoginState}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, order: 2, offset: 1 }}>Password</Label>
                            <Col sm={{ size: 8, order: 2 }}>
                                <Input type='password' id='login-password'
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
                                <Button onClick={this.facebookLoginHandle} block outline color='primary'>Facebook Login</Button>
                            </Col>
                        </FormGroup>
                        <hr></hr>
                        <FormGroup row align='center'>
                            <Col>
                                <NavLink tag={Link} to={'/register'} exact onClick={this.toggleModal}>Register</NavLink>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter className='Login_Footer'>
                        <Button onClick={this.toDefaultLoginState} color='danger'>Cancel</Button>
                        <Button onClick={this.loginHandle} color='success' >Login</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({ authentication }) {
    const { isLoggingIn } = authentication;
    return { isLoggingIn };
}

function mapDispacthToProps(dispatch) {
    const login = GuestActions.login;
    return { login: (usernameEmail, password) => dispatch(login(usernameEmail, password)) };
}
export default connect(mapStateToProps, mapDispacthToProps)(Login);

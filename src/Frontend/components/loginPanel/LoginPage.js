import React from 'react';
import { Card, Col, Container, Button, FormGroup, Label, Input, CardTitle, CardBody, CardFooter, CardText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Login.css';
import { Redirect } from 'react-router';
import { GuestActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { history } from '../../redux/helpers';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModal: false, msg: '', loginValid: false, defaultLoginState: true }
        this.loginHandle = this.loginHandle.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    async loginHandle() {
        var check = await this.props.login(document.getElementById('loginpage-username').value, document.getElementById('loginpage-password').value)
        console.log('check::')
        console.log(check);
        if (check.type === "USER_LOGIN_SUCCESS") {
            history.push('/');
        } else {
            this.setState({ msg: '', loginValid: false, defaultLoginState: false })
        }
    }

    handleKeyPress(target) {
        if (target.charCode == 13) {
            this.loginHandle()
        }
    }

    render() {
        if (localStorage.getItem('user')) {
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
                        width: '500px'
                    }}>
                        <Card style={{
                            textAlign: 'center'
                        }}>
                            <CardBody>
                                <CardTitle>
                                    <Label style={{ fontSize: '150%' }} color='success'>LOG IN</Label>
                                </CardTitle>
                                <CardText>
                                    <FormGroup row>
                                        <Label style={{ fontSize: 'large' }}>&nbsp;&nbsp;Account&nbsp;&nbsp;</Label>
                                        <Col>
                                            <Input autoFocus type='text' id='loginpage-username'
                                                onKeyPress={this.handleKeyPress}
                                                defaultValue={''} placeholder='Enter your Username or E-mail'
                                                invalid={!this.state.loginValid && !this.state.defaultLoginState}
                                                />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label style={{ fontSize: 'large' }}>&nbsp;&nbsp;Password</Label>
                                        <Col>
                                            <Input type='password' id='loginpage-password'
                                                onKeyPress={this.handleKeyPress}
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
                                    <Button onClick={this.loginHandle} color='success'>Login</Button>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            );
        }
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
export default connect(mapStateToProps, mapDispacthToProps)(LoginPage);

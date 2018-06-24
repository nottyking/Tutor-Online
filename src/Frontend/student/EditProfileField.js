import React, { Component } from 'react'
import { Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
const axios = require('axios')
const ipList = require('../../Config/ipConfig')
const capsulation = require('../Capsulation/SendData')
export class EditProfileField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalMessage: '', isDefaultPassword: true, validPassword: false,
            isDefaultRePassword: true, validRePassword: false, Modal: false
        };
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.checkValidPassword = this.checkValidPassword.bind(this);
        this.checkValidRePassword = this.checkValidRePassword.bind(this);
        this.checkCurrentPassword = this.checkCurrentPassword.bind(this);
        this.saveToDatabase = this.saveToDatabase.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
    }

    saveToDatabase() {
        var data = {
            FirstName: document.getElementById('fName').value,
            LastName: document.getElementById('lName').value,
            ProfileImg: 'http://www.uv.mx/sin-humo/files/2014/06/Ponentes.png',
            Birthday: document.getElementById('birthDate').value,
            Address: document.getElementById('address').value,
            Gender: document.getElementById('gender').value,
            newPassword: document.getElementById('newPassword').value
        }
        axios.post(ipList.backend + "/student/editProfile", capsulation.sendData({
          password: data.newPassword, fname: data.FirstName, lname: data.LastName,
          address: data.Address, profileimg: data.ProfileImg, birthday: data.Birthday, gender: data.Gender
        }))
        return true;
    }

    async checkCurrentPassword() {
        var isPasswordCorrect = (await axios.post(ipList.backend + "/student/checkPassword",capsulation.sendData({
          password: document.getElementById('password').value
        }))).data
        return isPasswordCorrect
    }

    async saveAndContinue(event) {
        event.preventDefault(event);

        if (!await this.checkCurrentPassword()) {
            this.setState({ ModalMessage: 'your password is incorrect' });
            this.modalToggle();
        }
        else {//Pass Every Condition
            if (this.saveToDatabase()) {
                this.props.toNextStep();
            } else {
                this.setState({ ModalMessage: 'Error: Can\'t sent data to server' });
                this.modalToggle();
            }
        }
    }


    checkValidPassword() {
        if (this.state.isDefaultPassword) {
            this.setState({ isDefaultPassword: false });
        } else if (document.getElementById('newPassword').value == '') {
            this.setState({ isDefaultPassword: true });
        }

        if (document.getElementById('newPassword').value.length < 8 ||
            document.getElementById('newPassword').value.length > 12) {
            this.setState({ validPassword: false, ModalMessage: 'New password must contain 8-12 characters' })
            return false;
        }
        else {
            this.setState({ validPassword: true });
            return true;
        }
    }

    checkValidRePassword() {
        if (this.state.isDefaultRePassword) {
            this.setState({ isDefaultRePassword: false });
        } else if (document.getElementById('rePassword').value == '') {
            this.setState({ isDefaultRePassword: true });
        }

        if (this.checkValidPassword && document.getElementById('newPassword').value != document.getElementById('rePassword').value) {//Check Password & re-password
            this.setState({ validRePassword: false, ModalMessage: 'Your Password and Re-password is not match' })
            return false;
        }
        else {
            this.setState({ validRePassword: true });
            return true;
        }
    }

    modalToggle() {
        this.setState({ Modal: !this.state.Modal })
    }

    render() {
        return (
            <div>
                <Card style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                    padding: 10
                }}>

                    <br />
                    <CardImg
                        top
                        style={{ width: 100, textAlign: "center" }}
                        src={this.props.defaultValue.ProfileImg}
                        alt='Card image cap' />
                    <br />
                    <Input type="file" name="file" id="file" style={{ width: 220, textAlign: "center" }} />
                    <CardBody>
                        <CardText>
                            <Form>
                                <hr></hr>
                                <FormGroup row>
                                    <Label >Username</Label>
                                    <Input disabled type='text' id='username'
                                        defaultValue={this.props.defaultValue.Username} placeholder='Enter your Username'
                                    />
                                    <FormText>Couldn't change Username</FormText>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>E-mail</Label>
                                    <Input disabled type='email' id='email'
                                        defaultValue={this.props.defaultValue.Email} placeholder='Enter your email'
                                    />
                                    <FormText>Couldn't change E-mail</FormText>
                                </FormGroup>
                                <hr></hr>
                                <FormGroup row>
                                    <Table borderless>
                                        <thead>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><Input plaintext>Given Name</Input></td>
                                                <td>
                                                    <Input block type='text' id='fName'
                                                        defaultValue={this.props.defaultValue.FirstName} placeholder='Enter your given name'
                                                    />
                                                </td>
                                                <td><Input plaintext>Surname</Input></td>
                                                <td>
                                                    <Input block type='text' id='lName'
                                                        defaultValue={this.props.defaultValue.LastName} placeholder='Enter your surname'
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><Input plaintext>Birth Date</Input></td>
                                                <td>
                                                    <Input type="date" id="birthDate"
                                                        defaultValue={this.props.defaultValue.Birthday} placeholder="Enter Your birth date" />
                                                </td>
                                                <td><Input plaintext>Gender</Input></td>
                                                <td>

                                                    <Input type="select" name="gender" id="gender" defaultValue={this.props.defaultValue.Gender}>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </Input>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td><Input plaintext>Address</Input></td>
                                                <td><Input type='textarea' id='address' defaultValue={this.props.defaultValue.Address} /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </FormGroup>
                            </Form>
                            <hr></hr>
                            <CardTitle>
                                Comfirm Your Password
                            </CardTitle>
                            <Form>
                                <FormGroup row>
                                    <Label>New Password</Label>
                                    <Input type='password' id='newPassword'
                                        defaultValue={this.props.defaultValue.password} placeholder='Enter new password'
                                        valid={this.state.validPassword}
                                        invalid={!this.state.validPassword && !this.state.isDefaultPassword}
                                        onChange={this.checkValidPassword}
                                    />
                                    <FormText>Type here to change your password, New password must contain between 8-12 characters</FormText>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Re-Password</Label>
                                    <Input type='password' id='rePassword'
                                        defaultValue={this.props.defaultValue.rePassword} placeholder='Enter new password again'
                                        valid={this.state.validRePassword}
                                        invalid={!this.state.validRePassword && !this.state.isDefaultRePassword}
                                        onChange={this.checkValidRePassword}
                                    />
                                    <FormText>Confirm your new password here</FormText>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Current Password</Label>
                                    <Input type='password' id='password'
                                        defaultValue={this.props.defaultValue.password} placeholder='Enter your password'
                                    />
                                    <FormText>Type your current password to confirm this session</FormText>
                                </FormGroup>
                            </Form>
                        </CardText>

                        <Button color='danger' onClick={this.props.toPreviousStep}>Back</Button>&nbsp;&nbsp;
                        <Button color='success' onClick={this.saveAndContinue}>OK</Button>

                    </CardBody>
                </Card>


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
}

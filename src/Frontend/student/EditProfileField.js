import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'

export class EditProfileField extends React.Component {
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
                                                <td><Input type='textarea' /></td>
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
                                    <Input type='password' id='password'
                                        defaultValue={this.props.defaultValue.password} placeholder='Enter your password'
                                    />
                                    <FormText>Type your current password to confirm this session</FormText>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Current Password</Label>
                                    <Input type='password' id='password'
                                        defaultValue={this.props.defaultValue.password} placeholder='Enter your password'
                                    />
                                    <FormText>Type your current password to confirm this session</FormText>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Re: Current Password</Label>
                                    <Input type='password' id='rePassword'
                                        defaultValue={this.props.defaultValue.rePassword} placeholder='Enter password again'
                                    />
                                    <FormText>Confirm current your password here</FormText>
                                </FormGroup>
                            </Form>
                        </CardText>
                        <Button color='success' onClick={this.props.toProfilePage} defaultValue={this.props.defaultValue}>
                            OK
                  </Button>
                    </CardBody>
                </Card>

            </div>
        );
    }
}
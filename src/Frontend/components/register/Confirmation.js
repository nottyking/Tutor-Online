import React from 'react';
import './Register.css';
import { Form, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { userConstants } from './../../redux/constants/UserConstants';

export class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.backToPreviousPage = this.backToPreviousPage.bind(this);
    }

    render() {
        return (
            <div>
                <h1> This is Confirmation </h1>

                <Form className='Register-form'>
                    <FormGroup row >
                        <Label sm={{ size: 2, order: 1, offset: 3 }} >Username</Label>
                        <Col sm={{ size: 4, order: 4 }}>
                            <Input type='text' id='regCon-username' defaultValue={this.props.fieldValues.username} disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 1, offset: 3 }}>E-mail</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='email' id='regCon-email' defaultValue={this.props.fieldValues.email} disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 1, offset: 3 }}>Password</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='password' id='regCon.password' defaultValue={this.props.fieldValues.password} disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup align='center'>
                        <Button onClick={this.backToPreviousPage}>Back</Button> <t />
                        <Button onClick={this.saveAndContinue}>Save And Continue</Button>
                    </FormGroup>
                </Form>

            </div>
        );
    };

    saveAndContinue() {
        this.props.submitRegister();
        if(localStorage.getItem('user') === JSON.stringify('RegisterComplete')){
            console.log('Success to Register');
            this.props.nextStep();
        }
        else {
            console.log('Fail to Register');
            this.props.nextStep();
        }
    }

    backToPreviousPage(event) {
        event.preventDefault();
        var data = {
            username: document.getElementById('regCon-username').value,
            email: document.getElementById('regCon-email').value,
            password: '',
            rePassword: ''

        }

        this.props.saveValues(data)
        this.props.previousStep()
    }
}


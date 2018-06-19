import React from 'react';
import './register.css';
import { Form, Col, Button, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
                            <Input type='text' id='username' defaultValue={this.props.fieldValues.username} disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 1, offset: 3 }}>E-mail</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='email' id='email' defaultValue={this.props.fieldValues.email} disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{ size: 2, order: 1, offset: 3 }}>Password</Label>
                        <Col sm={{ size: 4, order: 2 }}>
                            <Input type='password' id='password' defaultValue={this.props.fieldValues.password} disabled />
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
        this.props.nextStep();
    }

    backToPreviousPage(event) {
        event.preventDefault();
        var data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: '',
            rePassword: ''

        }

        this.props.saveValues(data)
        this.props.previousStep()
    }
}
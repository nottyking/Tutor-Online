import React from 'react';
import './register.css';

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
                <label>First Name : </label>
                <input className='Register-label'
                    type='text'
                    ref='fName'
                    disabled
                    defaultValue={this.props.fieldValues.fName} />
                <br /><br />
                <label>Last Name : </label>
                <input className='Register-label'
                    type='text'
                    ref='lName'
                    disabled
                    defaultValue={this.props.fieldValues.lName} />
                <br /><br />
                <label>Password : </label>
                <input className='Register-label'
                    type='password'
                    ref='password'
                    disabled
                    defaultValue={this.props.fieldValues.password} />
                <br /><br />
                <button className='Register-label' onClick={this.backToPreviousPage}>Back</button> <t />
                <button className='Register-label' onClick={this.saveAndContinue}>Save And Continue</button>
            </div>
        );
    };

    saveAndContinue(event) {
        event.preventDefault();
        var data = {
            fName: this.refs.fName.value,
            lName: this.refs.lName.value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }

    backToPreviousPage(event) {
        event.preventDefault();
        var data = {
            fName: this.refs.fName.value,
            lName: this.refs.lName.value,
            password: '',
            rePassword: ''

        }

        this.props.saveValues(data)
        this.props.previousStep()
    }
}
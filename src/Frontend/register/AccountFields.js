import React from 'react';
import './register.css';

export class AccountFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reset : 1};
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.resetLabel = this.resetLabel.bind(this);
    }

    render() {
        return (
            <div>
                <h1>This is Register Page</h1>
                <label>First Name : </label>
                <input className='Register-label'
                    type='text'
                    ref='fName'
                    defaultValue={this.props.fieldValues.fName} />
                <br /><br />
                <label>Last Name : </label>
                <input className='Register-label'
                    type='text'
                    ref='lName'
                    defaultValue={this.props.fieldValues.lName} />
                <br /><br />
                <label>Password : </label>
                <input className='Register-label'
                    type='password'
                    ref='password'
                    defaultValue={this.props.fieldValues.password} />
                <br /><br />
                <label>Re-Password : </label>
                <input className='Register-label'
                    type='password'
                    ref='rePassword'
                    defaultValue={this.props.fieldValues.rePassword} />
                <br /><br />
                <button className='Register-label' onClick={this.resetLabel}>Reset</button> <t />
                <button className='Register-label' onClick={this.saveAndContinue}>Save And Continue</button>
            </div>
        );
    }

    saveAndContinue(event) {
        event.preventDefault();
        var data = {
            fName: this.refs.fName.value,
            lName: this.refs.lName.value,
            password: this.refs.password.value,
            rePassword: this.refs.rePassword.value
        }

        //Chcek ID from database
        if (data.password != data.rePassword) {//Check Password & re-password

        }
        //Check Email
        //Check ...

        this.props.saveValues(data)
        this.props.nextStep()
    }

    resetLabel() {
        this.refs.fName.value = ''
        this.refs.lName.value = ''
        this.refs.password.value =''
        this.refs.rePassword.value = ''
    }
}
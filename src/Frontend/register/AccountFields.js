import React from 'react';

export class AccountFields extends React.Component {

    constructor(props){
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.backToPreviousPage = this.backToPreviousPage.bind(this);
        this.resetLabel = this.resetLabel(this);
    }

    render() {
        return (
            <div>
                <h1>This is Register Page</h1>
                <label>First Name : </label>
                <input type='text'
                    ref='fName'
                    defaultValue={this.props.fieldValues.fName} />
                <br /><br />
                <label>Last Name : </label>
                <input type='text'
                    ref='lName'
                    defaultValue={this.props.fieldValues.lName} />
                <br /><br />
                <label>Password : </label>
                <input type='password'
                    ref='password'
                    defaultValue={this.props.fieldValues.password} />
                <br /><br />
                <label>Re-Password : </label>
                <input type='password'
                    ref='rePassword'
                    defaultValue={this.props.fieldValues.rePassword} />
                <br /><br />
                <button onClick={this.resetLabel}>Reset</button> <t />
                <button onClick={this.saveAndContinue}>Save And Continue</button>
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

        this.props.saveValues(data)
        this.props.nextStep()
    }

    backToPreviousPage(event) {
        event.preventDefault();
        var data = {
            fName: this.refs.fName.value,
            lName: this.refs.lName.value,
            password: this.refs.password.value,
            rePassword: this.refs.rePassword.value
        }

        this.props.saveValues(data)
        this.props.previousStep()
    }

    resetLabel() {
        this.props.previousStep()
    }
}
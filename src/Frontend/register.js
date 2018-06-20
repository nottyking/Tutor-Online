import React, { Component } from 'react';
import { AccountFields } from './register/AccountFields';
import { Confirmation } from './register/Confirmation';
import { Success } from './register/Success';
import './register/Register.css';

var fieldValues = {
  username: '',
  email: '',
  password: '',
  rePassword: '',
}

export class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { step: 1 };

    this.getInitialState = this.getInitialState.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
  }

  getInitialState() {
    return { step: 1 };
  }

  saveValues(field) {
    return (
      fieldValues = Object.assign({}, fieldValues, field)
    )
  }


  nextStep() {
    var newStep = (this.state.step + 1) > 3 ? 3 : (this.state.step + 1);

    this.setState({
      step: newStep
    })
  }

  previousStep() {
    var newStep = (this.state.step - 1) < 1 ? 1 : (this.state.step - 1);

    this.setState({
      step: newStep
    })
  }

  render() {
    switch (this.state.step) {
      case 1:
        return <AccountFields fieldValues={fieldValues}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          saveValues={this.saveValues} />;
      case 2:
        return <Confirmation fieldValues={fieldValues}
        nextStep={this.nextStep}
        previousStep={this.previousStep}
        saveValues={this.saveValues}/>;
      case 3:
        return <Success fieldValues={fieldValues}/>;
      default:
        return <h1>No state</h1>
    }
  }
}

export class Register extends React.Component {
  render() {
    return (
      <div className='App'>
        <header className='Register-header'>
          <RegisterForm />
        </header>
      </div>
    );
  }
};

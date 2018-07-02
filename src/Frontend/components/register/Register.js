import React from 'react';
import { connect } from 'react-redux';
import { AccountFields } from './AccountFields';
import { Confirmation } from './Confirmation';
import { Success } from './Success';
import { UserActions } from '../../redux/actions';
import './Register.css';

var fieldValues = {
  username: '',
  email: '',
  password: '',
  rePassword: '',
}

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { step: 1 };
    this.saveValues = this.saveValues.bind(this);
    this.initializeValue = this.initializeValue.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  saveValues(field) {
    return (
      fieldValues = Object.assign({}, fieldValues, field)
    )
  }

  initializeValue() {
    fieldValues.username = '';
    fieldValues.email = '';
    fieldValues.password = '';
    fieldValues.rePassword = '';
  }

  submitRegister() {
    this.props.register(fieldValues.username, fieldValues.email, fieldValues.password, 'user');
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
        console.log(this.props);
        return <AccountFields fieldValues={fieldValues}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          saveValues={this.saveValues} />;
      case 2:
        return <Confirmation fieldValues={fieldValues}
          submitRegister={this.submitRegister}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          saveValues={this.saveValues} />;
      case 3:
        return <Success fieldValues={fieldValues} initializeValue={this.initializeValue} />;
      default:
        return <h1>No state</h1>
    }
  }
}

function mapStateToProps({ registration }) {
  const { isRegistering } = registration;
  return { isRegistering };
}

function mapDispatchToProps(dispatch) {
  const register = UserActions.register;
  return { register: (username,email, password, userType) => dispatch(register(username, email, password, userType)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
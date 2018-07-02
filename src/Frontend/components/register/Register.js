import React from 'react';
import { connect } from 'react-redux';
import { AccountFields } from './AccountFields';
import { Confirmation } from './Confirmation';
import { RegisterSuccess } from './Success';
import { GuestActions } from '../../redux/actions';
import './Register.css';
import { RegisterFail } from './Fail';

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
    this.toFailPage = this.toFailPage.bind(this);
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

  async submitRegister() {
    var item = await this.props.register(fieldValues.username, fieldValues.email, fieldValues.password, 'user');
    console.log(item);
    if (item.type === "USER_REGISTER_SUCCESS") {
      console.log('Success to Register');
      this.nextStep();
    }
    else {
      console.log('Fail to Register');
      this.toFialPage();
    }
  }

  toFailPage() {
    this.setState({
      step: 4
    })
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
        return <RegisterSuccess initializeValue={this.initializeValue} />;
      case 4:
        return <RegisterFail initializeValue={this.initializeValue} />
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
  const register = GuestActions.register;
  return { register: (username, email, password, userType) => dispatch(register(username, email, password, userType)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
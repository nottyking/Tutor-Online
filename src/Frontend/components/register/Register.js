import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

export class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { step: 1 };
    this.saveValues = this.saveValues.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
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
          register={()=>{this.props.register}}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
          saveValues={this.saveValues} />;
      case 3:
        return <Success fieldValues={fieldValues} />;
      default:
        return <h1>No state</h1>
    }
  }
}

export class RegisterPage extends React.Component {
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

function mapStateToProps({ registration }) {
  const { isRegistering } = registration;
  return { isRegistering };
}

function mapDispatchToProps(dispatch) {
  const register = UserActions.register;
  return bindActionCreators({ register }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
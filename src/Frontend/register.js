import React, { Component } from 'react';

class RegisterForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {fNameValue: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({fNameValue: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.fNameValue);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <p>
            <input type="submit" value="Submit" />
            </p>
          </form>
        );
      }
}

export class Register extends React.Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1>This is register page</h1>
                    <RegisterForm />
                </header>
            </div>
        );
    }
};
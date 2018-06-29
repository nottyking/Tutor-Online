import React from 'react';
import RegisterForm from './Register';


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
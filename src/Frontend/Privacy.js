import React from 'react';

export class PrivacyForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        privacy
      </div>
    )
  }
}

export class Privacy extends React.Component {
  render() {
    return (
      <div className='App'>
        <header className='Register-header'>
          <PrivacyForm />
        </header>
      </div>
    );
  }
};

import React from 'react';
import { Form, Card } from 'reactstrap';

export class CreditCardForm extends React.Component {


  render() {
    return (
      <Card style={{ padding: 50 }}>
        <Form action='/checkout' method='post' id='checkout'>
          <div id='token_errors'></div>
          <Input type='hidden' name='omise_token' />
          <div>
            Name
            <br />
            <Input type='text' data-omise='holder_name' />
          </div>
          <div>
            Number
            <br />
            <Input type='text' data-omise='number' />
          </div>
          <div>
            Date
            <br />
            <Input type='text' data-omise='expiration_month' size='4' /> /
            <Input type='text' data-omise='expiration_year' size='8' />
          </div>
          <div>
            Security Code
            <br />
            <Input type='text' data-omise='security_code' size='8' />
          </div>
          <Input type='submit' id='create_token' />
        </Form>
      </Card>
    );
  }
}

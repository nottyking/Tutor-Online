import React from 'react';
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'

export class PaymentSuccess extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div align = 'center'>
                <h1>
                    Payment Success
                    </h1>
                <a href={"./"}>Click here to go back to Home Page</a>

            </div>
        );
    };
}

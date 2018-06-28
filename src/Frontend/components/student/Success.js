import React from 'react';
import ipList from '../../../Config/ipConfig'
import axios from 'axios'
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'

export class Success extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>
                    Success to change your profile
                    </h1>
                <a href={"./Student"}>Click here to go back to Profile Page</a>

            </div>
        );
    };
}

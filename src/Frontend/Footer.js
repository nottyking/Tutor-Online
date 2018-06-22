import React, { Component } from 'react'
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane, Label, Card } from 'reactstrap'
import { ContactUsTab } from './footer/ContactUsTab';
import { MenuTab} from './footer/MenuTab';

export class Footer extends React.Component {

    

    render() {
        return (
            <div>
                <Container fluid style={{ backgroundColor: '#CDC', paddingBottom: 5, paddingTop: 5, bottom: 0 }}>
                </Container>
                <Container fluid style={{ backgroundColor: '#333', color: '#FFF', paddingBottom: 20, paddingTop: 10, bottom: 0 }}>
                    <Row className="row justify-content-between">
                        <Col xs="3">
                            <MenuTab />
                        </Col>
                        <Col xs="auto">
                            <ContactUsTab />
                        </Col>
                    </Row>
                </Container>

                <Container fluid style={{ backgroundColor: '#000', color: '#FFF', paddingBottom: 10, paddingTop: 10, bottom: 0 }}>
                    <h6>© Playtorium Solutions</h6>
                </Container>

            </div>


        );
    }
}
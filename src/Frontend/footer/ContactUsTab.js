import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane, Label, Card } from 'reactstrap'
import classnames from 'classnames';

export class ContactUsTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contactTab: '1'
        };
        this.toggleContact = this.toggleContact.bind(this);
    }

    toggleContact(selectTab) {
        if (this.state.contactTab !== selectTab) {
            this.setState({ contactTab: selectTab });
        }
    }
    render() {
        return (
            <div>
                <Container fluid style={{ paddingTop: 10, width: '310px', justifyContent: 'right' }}>
                    <Label style={{ fontWeight: "bold" }}>CONTACT US</Label>
                    <hr color='#FFF' style={{
                        height: '3px',
                        margin: '0em'
                    }}></hr>
                    <Nav tabs style={{ paddingTop: 10 }}>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.contactTab === '1' })} onClick={() => { this.toggleContact('1') }}>Tel</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.contactTab === '2' })} onClick={() => { this.toggleContact('2') }}>E-mail</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.contactTab === '3' })} onClick={() => { this.toggleContact('3') }}>Opening Times</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.contactTab}>
                        <TabPane tabId='1'>
                            <Label>+66(0)2-821-7877</Label>
                        </TabPane>
                        <TabPane tabId='2'>
                            <Label>play@playtorium.co.th</Label>
                        </TabPane>
                        <TabPane tabId='3'>
                            <Label>9:00AM - 6:00PM</Label>
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
        );
    }
}
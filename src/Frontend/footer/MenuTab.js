import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Container, Nav, Navbar, NavItem, NavLink, Label, Card } from 'reactstrap'


export class MenuTab extends React.Component {
    render() {
        return (
            <div>
                <Container fluid style={{ paddingTop: 10 }}>
                    <Label style={{ fontWeight: "bold" }}>MENU</Label>
                    <hr color='#FFF' style={{
                        height: '3px',
                        margin: '0em'
                    }}></hr>
                    <Navbar dark expand="md">
                        <Nav navbar>
                            <NavItem>
                                <NavLink style={{ color: '#FFF' }} href={"./"}>HOME</NavLink>
                            </NavItem>
                            <Input plaintext>|</Input>
                            <NavItem>
                                <NavLink style={{ color: '#FFF' }} href={"./course"}>COURSE</NavLink>
                            </NavItem>
                            <Input plaintext>|</Input>
                            <NavItem>
                                <NavLink style={{ color: '#FFF' }} href={"./about_us"}>ABOUT&nbsp;US</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <hr color='#FFF' style={{
                        border: '1px',
                        display: 'block',
                        height: '1px',
                        margin: '0em'
                    }}></hr>
                </Container>

            </div >
        );
    }
}

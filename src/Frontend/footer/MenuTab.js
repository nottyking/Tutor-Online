import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Nav,Navbar, NavItem, NavLink, Label, Card } from 'reactstrap'


export class MenuTab extends React.Component {
    render() {
        return (
            <div>
                <Container fluid style={{ paddingTop: 10, width: '310px', justifyContent: 'right' }}>
                    <Label style={{ fontWeight: "bold" }}>MENU</Label>
                    <Navbar color="dark" dark expand="md">
                    <Nav navbar>
                        <NavItem>
                            <NavLink href={"./"}>HOME</NavLink>
                            <NavLink href={"./course"}>COURSE</NavLink>
                            <NavLink href={"./about_us"}>ABOUT US</NavLink>
                        </NavItem>
                    </Nav>
                    </Navbar>
                </Container>

            </div>
        );
    }
}

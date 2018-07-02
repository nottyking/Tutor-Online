import React from 'react';
import './NavBar.css';
import { Route, Link } from 'react-router-dom';
import { Logout } from '../loginPanel/Logout';
import Login from './../loginPanel/Login';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Label
} from 'reactstrap';

const pages = ['home', 'course', 'about us', 'Register'];
const loginPages = ['home', 'student', 'course', 'learning', 'about us'];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, };
        this.toggle = this.toggle.bind(this);
        this.createPage = this.createPage.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    createPage(contents) {
        const listPage = contents.map(page => {
            var link;
            switch (page) {
                case 'home':
                    link = '';
                    break;
                case 'about us':
                    link = "about_us";
                    break;
                default:
                    link = page;
                    break;
            }
            return (
                <NavItem>
                    <NavLink tag={Link} to={'/' + link} exact>{page.toUpperCase()}</NavLink>
                </NavItem>
            );
        }
        );
        return listPage;
    }

    render() {
        var actionButton
        var pageList

        if (!this.props.loginStatus) {
            pageList = this.createPage(pages);
            actionButton = <Login loginStatus={this.props.loginStatus}
                /*login={this.props.login}*/ />
        } else {
            pageList = this.createPage(loginPages);
            actionButton = <Logout loginStatus={this.props.loginStatus}
                logout={this.props.logout} />
        }

        return (
            < div >
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/" exact>Tutor-Online</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {pageList}
                        </Nav>
                        <Label>&nbsp;&nbsp;&nbsp;</Label>
                    </Collapse>
                    {actionButton}
                </Navbar>
            </div >
        );
    }
}

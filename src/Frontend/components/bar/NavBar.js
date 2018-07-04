import React from 'react';
import './NavBar.css';
import { Route, Link } from 'react-router-dom';
import Logout from '../loginPanel/Logout';
import Login from '../loginPanel/Login';

import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Label, Popover, PopoverBody
} from 'reactstrap';

const pages = ['home', 'about us', 'Register'];
const userPages = ['home', 'student', 'learning', 'about us'];
const adminPages = ['home', 'student', 'learning', 'about us', 'admin'];
const adminFunctionPage = ['manage User', 'manage Course'];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, popoverOpen: false };
        this.toggle = this.toggle.bind(this);
        this.createPage = this.createPage.bind(this);
        this.createAdminPage = this.createAdminPage.bind(this);
        this.togglePopover = this.togglePopover.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    togglePopover() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }


    //TO create navbar page in each user type
    createPage(contents) {
        const listPage = contents.map(page => {
            var link;
            if (page != 'admin') {
                switch (page) {
                    case 'home':
                        link = '';
                        break;
                    default:
                        link = page.replace(" ", "_");
                        break;
                }
                return (
                    <NavItem>
                        <NavLink tag={Link} to={'/' + link} exact>{page.toUpperCase()}</NavLink>
                    </NavItem>
                );
            } else {
                return this.createAdminPage(adminFunctionPage);
            }
        });
        return listPage;
    }

    //TO create dropdown navbar admin
    createAdminPage(content) {
        const adminListPage = content.map(page => {
            var link = page.replace(" ", "_");
            return (
                <NavLink tag={Link} to={'/admin_' + link} exact>{page.toUpperCase()}</NavLink>
            );
        });
        return (
            <div>
                <NavLink navbar id="adminPopover" onClick={this.togglePopover}>
                    ADMIN
                </NavLink>
                <Popover placement="bottom-start"
                    isOpen={this.state.popoverOpen}
                    target="adminPopover"
                    toggle={this.togglePopover}>
                    <PopoverBody>{adminListPage}</PopoverBody>
                </Popover>
            </div>
        );
    }

    render() {
        var actionButton;
        var pageList;
        const user = localStorage.getItem('user')

        if (!user) {
            //userType = "Guest"
            pageList = this.createPage(pages);
            actionButton = <Login loginStatus={this.props.loginStatus} />
        } else if (JSON.parse(user).role === 0) {
            //userType = "user"
            pageList = this.createPage(userPages);
            actionButton = <Logout loginStatus={this.props.loginStatus} />
        } else if (JSON.parse(user).role === 1) {
            //userType = "admin"
            pageList = this.createPage(adminPages);
            actionButton = <Logout loginStatus={this.props.loginStatus} />
        }

        return (
            < div >
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/" exact>Tutor-Online</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar >
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
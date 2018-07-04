import React from 'react';
import './NavBar.css';
import { Route, Link } from 'react-router-dom';
import Logout from '../loginPanel/Logout';
import Login from '../loginPanel/Login';

import AuthToken from './../router/AuthToken';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Label, Popover, PopoverBody } from 'reactstrap';

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
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
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
                    <div>
                        <NavItem>
                            <NavLink tag={Link} to={'/' + link} onClick={this.toggle} exact>{page.toUpperCase()}</NavLink>
                        </NavItem>
                    </div>
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
                <div>
                    <NavLink tag={Link} to={'/admin_' + link} onClick={this.togglePopover} exact>{page.toUpperCase()}</NavLink>
                </div>
            );
        });
        return (
            <div>
                <AuthToken msgFrom='Navbar: CreateAdminPage' />
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

    handleDocumentClick(e) {
        const container = this._element;
        if (e.target !== container && !container.contains(e.target) && this.state.isOpen == true) {
            this.toggle();
        }
    }

    render() {
        var actionButton;
        var pageList;
        const user = localStorage.getItem('user')

        if (!user) {
            //userType = "Guest"
            pageList = this.createPage(pages);
            actionButton = <Login />
        } else if (JSON.parse(user).role == 0) {
            console.log('user');
            //userType = "user"
            pageList = this.createPage(userPages);
            actionButton = <Logout />
        } else if (JSON.parse(user).role == 1) {
            console.log('admin');
            //userType = "admin"
            pageList = this.createPage(adminPages);
            actionButton = <Logout />
        } else {
            console.log('Nav error');
        }

        document.addEventListener('click', this.handleDocumentClick, true)

        return (
            <div ref={(c)=> (this._element = c)}>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/" exact>Tutor-Online</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <AuthToken msgFrom="Navbar: Render" />
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
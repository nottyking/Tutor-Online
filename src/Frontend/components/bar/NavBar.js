import React from 'react';
import './NavBar.css';
import { Route, Link } from 'react-router-dom';
import Logout from '../loginPanel/Logout';
import Login from '../loginPanel/Login';
import { securityControl } from '../../redux/helpers';
import AuthToken from './../router/AuthToken';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Label, Popover, PopoverBody } from 'reactstrap';

const pages = ['home', 'course', 'about us', 'Register'];
const userPages = ['home', 'student', 'course', 'about us'];
const adminPages = ['home', 'student', 'course', 'about us', 'admin'];
const adminFunctionPage = ['manage user', 'manage course', 'manage package', 'manage discount', 'manage firstpage'];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, popoverOpen: false };
        this.toggle = this.toggle.bind(this);
        this.isCollapseToggle = this.isCollapseToggle.bind(this);
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

    isCollapseToggle() {
        if (this.state.isOpen == true)
            this.toggle();
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
                            <NavLink tag={Link} to={'/' + link} onClick={this.isCollapseToggle} exact>{page.toUpperCase()}</NavLink>
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
        } else {
            var decryptedUser = securityControl.decryptWithSecretkey(user, "userKey");
            console.log(decryptedUser);

            if (decryptedUser.role == 0) {
                //userType = "user"
                pageList = this.createPage(userPages);
                actionButton = <Logout />
            } else if (decryptedUser.role == 1) {
                //userType = "admin"
                pageList = this.createPage(adminPages);
                actionButton = <Logout />
            } else {
                //userType = "unauthorize", Keep render non-user bar insted
                pageList = this.createPage(pages);
                actionButton = <Login />
            }
        }

        document.addEventListener('click', this.handleDocumentClick, true)

        return (
            <div ref={(c) => (this._element = c)} >
                <Navbar color="dark" dark expand="md" style={{ minHeight: '60px' }}>
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
import React from 'react';
import './NavBar.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './Register';
import { Content } from './Content';
import { ContactUs } from './Contact_us';
import { Course } from './Course';
import { Student } from './Student';
import { Learning } from './Learning';
import { Payment } from './Payment';
import { Login } from './Login';
import { Logout } from './Logout';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button, Label, Modal
} from 'reactstrap';


const pages = ['home', 'course', 'contact_us'];
const loginPages = ['home', 'student', 'course', 'learning', 'payment', 'contact_us'];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const pageList = pages.map(page => {
            const link = page === 'home' ? '' : page;
            return (
                <NavItem>
                    <NavLink href={"./" + link}>{page.toUpperCase()}</NavLink>
                </NavItem>
            )
        }
        );

        const LoginPageList = loginPages.map(page => {
            const link = page === 'home' ? '' : page;
            return (
                <NavItem>
                    <NavLink href={"./" + link}>{page.toUpperCase()}</NavLink>
                </NavItem>
            )
        }
        );

        if (this.props.loginStatus) {
            return (
                < div >
                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/">Tutor-Online</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {LoginPageList}
                            </Nav>
                            <Label>&nbsp;&nbsp;&nbsp;</Label>
                        </Collapse>

                        <Logout loginStatus={this.props.loginStatus}
                            logout={this.props.logout} />

                    </Navbar>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Content} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/contact_us" component={ContactUs} />
                            <Route exact path="/course" component={Course} />
                            <Route exact path="/student" component={Student} />
                            <Route exact path="/learning" component={Learning} />
                            <Route exact path='/payment' component={Payment} />

                            <Route component={Content} />
                        </Switch>
                    </BrowserRouter>
                </div >

            );
        } else {
            return (
                < div >
                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/">Tutor-Online</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {pageList}
                            </Nav>
                            <Label>&nbsp;&nbsp;&nbsp;</Label>
                        </Collapse>

                        <Login loginStatus={this.props.loginStatus}
                            login={this.props.login} />

                    </Navbar>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Content} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/contact_us" component={ContactUs} />
                            <Route exact path="/course" component={Course} />
                            <Route exact path="/student" component={Student} />
                            <Route exact path="/learning" component={Learning} />
                            <Route exact path='/Payment' component={Payment} />

                            <Route component={Content} />
                        </Switch>
                    </BrowserRouter>
                </div >

            );
        }
    }
}

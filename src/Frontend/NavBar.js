import React from 'react';
import './NavBar.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './Register';
import { Content } from './Content';
import { AboutUs } from './About_us';
import { CourseA } from './CourseA';
import { Student } from './StudentUser';
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
    Label
} from 'reactstrap';
import { LoginPage } from './LoginPage';
import { PaymentSuccess } from './payment/PaymentSuccess';


const pages = ['home', 'course', 'about us'];
const loginPages = ['home', 'student', 'course', 'learning', 'payment', 'about us'];

export class BrowserRouterManager extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Content} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/about_us" component={AboutUs} />
                        <Route exact path="/course" component={CourseA} />
                        <Route exact path="/course/:courseID" component={CourseA} />
                        <Route exact path="/student" component={Student} />
                        <Route exact path="/learning" component={Learning} />
                        <Route exact path='/payment' component={Payment} />
                        <Route exact path='/loginPage' component={LoginPage} />
                        <Route exact path='/paymentSuccess' component={PaymentSuccess} />
                        <Route component={Content} />
                    </Switch>
                </BrowserRouter>
            </div >
        );
    }
}

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
            var link = page;
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
                    <NavLink href={"/" + link}>{page.toUpperCase()}</NavLink>
                </NavItem>
            )
        }
        );

        const LoginPageList = loginPages.map(page => {
            var link = page;
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
                    <NavLink href={"/" + link}>{page.toUpperCase()}</NavLink>
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
                    <BrowserRouterManager />
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
                    <BrowserRouterManager />
                </div >

            );
        }
    }
}

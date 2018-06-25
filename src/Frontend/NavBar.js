import React from 'react';
import './NavBar.css';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { Register } from './Register';
import { Content } from './Content';
import { AboutUs } from './About_us';
import { CourseA } from './CourseA';
import { Student } from './StudentUser';
import { Learning } from './Learning';
import { Payment } from './Payment';
import { Login } from './Login';
import { Logout } from './Logout';
import { LoginPage } from './LoginPage';
import { PaymentSuccess } from './payment/PaymentSuccess';
import { Footer } from './Footer';

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

const pages = ['home', 'course', 'about us'];
const loginPages = ['home', 'student', 'course', 'learning', 'about us'];

export class BrowserRouterManager extends React.Component {
    render() {
        return (
            <div>
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
            </div >
        );
    }
}

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

<<<<<<< HEAD
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
=======
    createPage(contents) {
        const listPage = contents.map(page => {
            var link;
>>>>>>> 58eb24d660e2d77d6b1ef0570a3cc6221434c4bc
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
<<<<<<< HEAD
                    <NavLink href={"/" + link}>{page.toUpperCase()}</NavLink>
=======
                    <NavLink tag={Link} to={'/' + link} exact>{page.toUpperCase()}</NavLink>
>>>>>>> 58eb24d660e2d77d6b1ef0570a3cc6221434c4bc
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
                login={this.props.login} />
        } else {
            pageList = this.createPage(loginPages);
            actionButton = <Logout loginStatus={this.props.loginStatus}
                logout={this.props.logout} />
        }

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

                    {actionButton}

                </Navbar>
                <BrowserRouterManager />
                <Footer />
            </div >
        );
    }
}
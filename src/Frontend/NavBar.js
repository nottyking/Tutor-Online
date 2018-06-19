import React from 'react';
import './NavBar.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './Register';
import { Content } from './Content';
import { ContactUs } from './contact_us';
import { Course } from './course';
import { Student } from './student';
import { Learning } from './Learning';
import { Payment } from './payment';
import { Login } from './Login';

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


const pages = ['home', 'course', 'contact_us', 'student', 'learning', 'payment'];

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

                    <Login />

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

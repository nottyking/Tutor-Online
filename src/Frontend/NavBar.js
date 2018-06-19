import React from 'react';
import './NavBar.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './register';
import { Content } from './Content';
import { ContactUs } from './contact_us';
import { Course } from './Course';
import { Student } from './student';
import { Learning } from './Learning';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

const pages = ['home', 'course', 'register', 'contact_us', 'student','learning'];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
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
          <NavbarBrand href="/">Tutor-Onlinee</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {pageList}
            </Nav>
          </Collapse>
        </Navbar>
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Content} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact_us" component={ContactUs} />
            <Route exact path="/course" component={Course} />
            <Route exact path="/student" component ={Student}/>
            <Route exact path="/learning" component ={Learning}/>
            
            <Route component={Content} />
        </Switch>
    </BrowserRouter>
        </div >
        
    );
	}
}

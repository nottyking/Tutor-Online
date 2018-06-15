import React from 'react';
import './NavBar.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './register';
import {RegisterForm} from './register';
import { Content } from './Content';
import { ContactUs } from './contact_us';
import { Course } from './course';
import { Student } from './student';

const pages = ['home', 'course', 'register', 'contact_us', 'student'];

export default class NavBar extends React.Component {

	render() {
    const pageList = pages.map(page => {
        const link = page == 'home' ? '' : page;
        return (
            <td>
                <a href={"./" + link}>{page.toUpperCase()}</a>
                &#09;
                &nbsp;
            </td>
        )
    }
    );
    return (
        < div >
            <nav className = 'NavBar'><table align='center' className = 'TableBar'><tr>{pageList}</tr></table></nav>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Content} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/contact_us" component={ContactUs} />
                    <Route exact path="/course" component={Course} />
                    <Route exact path="/student" component ={Student}/>
                    <Route component={Content} />
                </Switch>
            </BrowserRouter>
        </div >
    );
	}
}

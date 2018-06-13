import React from 'react';
import './NavBar.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './register';
import { App } from './App';
import { ContactUs } from './contact_us';
import { Course } from './course';

const pages = ['home', 'course', 'register', 'contact_us'];

export class NavBar extends React.Component {

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
                        <Route exact path="/" component={App} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/contact_us" component={ContactUs} />
                        <Route exact path="/course" component={Course} />
                        <Route component={App} />
                    </Switch>
                </BrowserRouter>
            </div >
        );
    }
}
import React from 'react';
import Proptypes from 'prop-types'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

/* SubCourseProgressBar used in learning window like a sidebar to show where this clip is in the All of clips in the Course
Get prop Now(SCId of this video),Src:[{SCId(Sub Course Id), SCName, SCLink*May Be Not*)}]
*/

const pages = ['home', 'course', 'register', 'contact_us', 'student'];

export default class SubCourseProgressBar extends React.Component {
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
        const link = page == 'home' ? '' : page;
        return (
            <NavItem>
                <NavLink href={"./" + link}>{page.toUpperCase()}</NavLink>
            </NavItem>
        )
    }
    );
    return (
        < div >
        <Navbar color="light" light expand="md">
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
            <Route component={Content} />
        </Switch>
    </BrowserRouter>
        </div >
        
    );
	}
}

SubCourseProgressBar.propTypes = {
    now: PropTypes.numbers.isRequired
    src: PropTypes.arrayOf(PropTypes.shape({
        SCname : PropTypes.string.isRequired,
         Clink: PropTypes.string.isRequired,
    })).isRequired
}

SubCourseProgressBar.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa50฿!"},
        {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa60฿!"},
        {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa70฿!"}
    ]
};

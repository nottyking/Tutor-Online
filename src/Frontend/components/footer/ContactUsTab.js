import React from 'react'
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Label } from 'reactstrap'
import classnames from 'classnames';

export class ContactUsTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contactTab: '1'
        };
        this.toggleContact = this.toggleContact.bind(this);
    }

    toggleContact(selectTab) {
        if (this.state.contactTab !== selectTab) {
            this.setState({ contactTab: selectTab });
        }
    }
    render() {
        // var headerTap;
        // if (this.props.isMobile) {
        //     headerTap
        // } else {
        //     headerTap
        // }

        return (
            <div>
                <Container fluid style={{ paddingTop: 10, justifyContent: 'right' }}>
                    <div>
                        <Label style={{ fontWeight: "bold" }}>CONTACT US</Label>
                        <hr color='#FFF' style={{
                            height: '3px',
                            margin: '0em'
                        }}></hr>
                    </div>
                    <Nav tabs style={{ paddingTop: 10 }}>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.contactTab === '1' })} onClick={() => { this.toggleContact('1') }}>Tel</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.contactTab === '2' })} onClick={() => { this.toggleContact('2') }}>E-mail</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.contactTab === '3' })} onClick={() => { this.toggleContact('3') }}>Opening Times</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.contactTab} style={{ textAlign: 'center' }}>
                        <TabPane tabId='1'>
                            <Label>+66(0)2-821-7877</Label>
                        </TabPane>
                        <TabPane tabId='2'>
                            <Label>play@playtorium.co.th</Label>
                        </TabPane>
                        <TabPane tabId='3'>
                            <Label>Monday-Friday &nbsp;|&nbsp; 9:00AM - 6:00PM</Label>
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
        );
    }
}
import React from 'react'
import { Input, Container, Nav, Navbar, NavItem, NavLink, Label, Form, Row, Col } from 'reactstrap'


export class MenuTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = { onHover1: false, onHover2: false, onHover3: false }
        this.toggleHover1 = this.toggleHover1.bind(this);
        this.toggleHover2 = this.toggleHover2.bind(this);
        this.toggleHover3 = this.toggleHover3.bind(this);
    }

    toggleHover1() {
        this.setState({ onHover1: !this.state.onHover1 });
    }
    toggleHover2() {
        this.setState({ onHover2: !this.state.onHover2 });
    }
    toggleHover3() {
        this.setState({ onHover3: !this.state.onHover3 });
    }

    render() {
        var colorHover1, colorHover2, colorHover3;
        if (this.state.onHover1) {
            colorHover1 = { color: '#ABF', fontWeight: "bold" };
            colorHover2 = { color: '#FFF' };
            colorHover3 = { color: '#FFF' };
        } else if (this.state.onHover2) {
            colorHover1 = { color: '#FFF' };
            colorHover2 = { color: '#ABF', fontWeight: "bold" };
            colorHover3 = { color: '#FFF' };
        } else if (this.state.onHover3) {
            colorHover1 = { color: '#FFF' };
            colorHover2 = { color: '#FFF' };
            colorHover3 = { color: '#ABF', fontWeight: "bold" };
        } else {
            colorHover1 = { color: '#FFF' };
            colorHover2 = { color: '#FFF' };
            colorHover3 = { color: '#FFF' };
        }

        var lineStyle
        if (this.props.isMobile) {
            lineStyle = { fontWeight: "bold", minWidth: 250 }
        }
        else {
            lineStyle = { fontWeight: "bold" }
        }

        return (
            <div>
                <Container fluid style={{ paddingTop: 10 }}>
                    <Label style={{ fontWeight: "bold", paddingTop: 15 }} align='left'></Label>
                    <hr color='#FFF' style={{
                        height: '3px',
                        margin: '0em'
                    }}></hr>
                    <Form style={lineStyle}>
                        <Navbar dark expand="md">
                            <Nav navbar inline>
                                <Row inline className="justify-content-around">
                                    <Col>
                                        <NavLink style={colorHover1} onMouseEnter={this.toggleHover1} onMouseLeave={this.toggleHover1} href={"/"}>HOME</NavLink>
                                    </Col>
                                    <Col>
                                        <NavLink style={colorHover2} onMouseEnter={this.toggleHover2} onMouseLeave={this.toggleHover2} href={"/course"}>COURSE</NavLink>
                                    </Col>
                                    <Col>
                                        <NavLink style={colorHover3} onMouseEnter={this.toggleHover3} onMouseLeave={this.toggleHover3} href={"/about_us"}>ABOUT&nbsp;US</NavLink>
                                    </Col>
                                </Row>
                            </Nav>
                        </Navbar>
                    </Form>
                    <hr color='#FFF' style={{
                        border: '1px',
                        display: 'block',
                        height: '1px',
                        margin: '0em'
                    }}></hr>
                </Container>
            </div >
        );
    }
}

import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { ContactUsTab } from './ContactUsTab';
import { MenuTab } from './MenuTab';

export class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.switchMobile.bind(this));
        this.switchMobile();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.switchMobile.bind(this));
    }

    switchMobile() {
        this.setState({ isMobile: window.innerWidth < 640 });
    }

    render() {
        var rowJustity;
        if (this.state.isMobile) {
            rowJustity = "justify-content-around"
        } else {
            rowJustity = "justify-content-between"
        }

        return (
            <div style={{ height: '210px', background: '#000', textAlign: 'center' }}>
                <Container fluid style={{ background: 'linear-gradient(to bottom, #222, #999)', paddingBottom: 5, paddingTop: 5, bottom: 0 }}>
                </Container>
                <Container fluid style={{ backgroundColor: '#333', color: '#FFF', paddingBottom: 20, paddingTop: 10, bottom: 0 }}>
                    <Row className={rowJustity}>
                        <Col xs="auto" style={{ textAlign: 'center' }}>
                            <MenuTab isMobile={this.state.isMobile} />
                        </Col>
                        <Col xs="auto" style={{ textAlign: 'left' }}>
                            <ContactUsTab isMobile={this.state.isMobile} />
                        </Col>
                    </Row>
                </Container>

                <Container fluid style={{ backgroundColor: '#000', color: '#FFF', paddingBottom: 10, paddingTop: 10, bottom: 0, textAlign: 'center' }}>
                    <h6 style={{ color: '#FFF', textAlign: 'center' }}>© Playtorium Solutions</h6>
                </Container>

            </div>
        );
    }
}
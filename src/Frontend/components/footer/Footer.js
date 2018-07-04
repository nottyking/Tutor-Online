import React from 'react'
import { Row, Col, Container} from 'reactstrap'
import { ContactUsTab } from './ContactUsTab';
import { MenuTab} from './MenuTab';

export class Footer extends React.Component {

    

    render() {
        return (
            <div>
                <Container fluid style={{ background: 'linear-gradient(to bottom, #222, #999)', paddingBottom: 5, paddingTop: 5, bottom: 0 }}>
                </Container>
                <Container fluid style={{ backgroundColor: '#333', color: '#FFF', paddingBottom: 20, paddingTop: 10, bottom: 0 }}>
                    <Row className="row justify-content-between">
                        <Col xs="auto">
                            <MenuTab />
                        </Col>
                        <Col xs="auto">
                            <ContactUsTab />
                        </Col>
                    </Row>
                </Container>

                <Container fluid style={{ backgroundColor: '#000', color: '#FFF', paddingBottom: 10, paddingTop: 10, bottom: 0, textAlign: 'center'}}>
                    <h6>© Playtorium Solutions</h6>
                </Container>

            </div>


        );
    }
}
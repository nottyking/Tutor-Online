import React from 'react'
import { width, height } from 'window-size'
import { Container, Row, Col, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap'
import banner from './Image/apple-businesswoman-communication-6479.jpg'

export class ContactUs extends React.Component {
  render () {
    return (
      <div className='App'>
        <Container fluid style={{backgroundColor: '#222'}}>
          <Card inverse>
            <CardImg width='100%' height={height} src={banner} alt='banner' />
            <CardImgOverlay>
              <CardTitle>
                Contact Us
              </CardTitle>
              <CardText>
                Contact us.
              </CardText>
            </CardImgOverlay>
          </Card>
        </Container>
      </div>
    )
  }
}

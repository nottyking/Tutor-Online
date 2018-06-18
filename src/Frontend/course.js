import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card,CardBody,CardText,CardImg} from 'reactstrap'

/*
Used For Present each courses's information (price, instructor's name, syllabus, etc.)
prop : Cimg ( Course Banner) Cname Cid Cprice Cdescription Cs

*/

export class Course extends React.Component {

  render () {
    const item = {Cname: 'Math101', Cimage: 'https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-3.png',Clink: 'aaaaaa',Cdesc: 'aaaaaaaa50฿!'}
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>This is course page</h1>
        </header>
        <Container fluid>
          <img src={item.Cimage} width={700} alt='error' />
        </Container>
      </div>
    )
  }
}

Course.propTypes = {
  src: PropTypes.arrayOf(PropTypes.shape({
    Cname: PropTypes.string.isRequired,
    Cimage: PropTypes.string.isRequired,
    Clink: PropTypes.string.isRequired,
    Cdesc: PropTypes.string.isRequired
  })).isRequired
}

Course.defaultProps = {
  src: [
    {Cname: 'Math101', Cimage: 'https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-3.png',Clink: 'aaaaaa',Cdesc: 'aaaaaaaa50฿!'},
    {Cname: 'Math102', Cimage: 'https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-2.png',Clink: 'aaaaaa',Cdesc: 'aaaaaaaa60฿!'},
    {Cname: 'Math201', Cimage: 'https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-3.png',Clink: 'aaaaaa',Cdesc: 'aaaaaaaa70฿!'}
  ]
}

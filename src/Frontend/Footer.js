import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'reactstrap'

export class Footer extends React.Component{

    render(){
        return(
            <Container fluid style={{backgroundColor:'#333',color:'#FFF',marginTop:30,paddingBottom:20,paddingTop:10,bottom:0}}>
            <p> </p>
            <h6>This is just prototype</h6>
            <p>used for prototyping only</p>
            </Container>
        );
    }
}
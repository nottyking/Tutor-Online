import React from 'react'
import { Container} from 'reactstrap'
import banner from './Image/apple-businesswoman-communication-6479.jpg';
import { Parallax } from 'react-parallax';
import {CoursePresent} from './CoursePresent'
const insideStyles1 = {background: 'white', padding: 20, position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)'};
const insideStyles2 = {background: 'white', padding: 20, position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%,-50%)'};

export class AboutUs extends React.Component {
  render () {
    return (
      <div className='App'>
        <Container fluid style={{backgroundColor: '#222',padding:0}}>
        <Parallax bgImage={banner} blur={{min: -1,max:5}} strength={600} style={{overflow: 'visible'}}>
        <div style={{height: 800}}>
        <div style={insideStyles1}><h1>Tutor-Online</h1></div>
        <div style={insideStyles2}><h2>Lorem ipsum t amet, consectetur adipiscing elit.</h2>
        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non feugiat tortor nec, tincidunt dui. Proin nec euismod elit. Aenean quis nunc sit amet eros tincidunt molestie ut sit amet nisi. Nulla facilisi. Mauris nisl magna, posuere in libero eget, dictum condimentum eros. Morbi lacinia pharetra ex sit amet dapibus. Nullam et sodales purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur sed maximus urna. Vivamus et erat sit amet tortor lobortis interdum eget at nibh. Curabitur id pulvinar velit, ut porta sem. Integer sit amet lorem tortor. In gravida pulvinar tempor. Sed tempus porta lacus id gravida.</h6> </div>
        </div>
        
        </Parallax>
        <div style={{width: '80%' ,position:'relative',marginTop:'-170px', left: '10%',backgroundColor:'#FFF',padding:20,zIndex:'100'}}><h2>Our Courses</h2>
        <CoursePresent/>
        </div>
        </Container>
      </div>
    )
  }
}

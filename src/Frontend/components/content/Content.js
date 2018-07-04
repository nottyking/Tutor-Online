import React from 'react'
import { Redirect } from 'react-router'
import { Container } from 'reactstrap'
import banner from '../../Image/apple-businesswoman-communication-6479.jpg';
import { Parallax } from 'react-parallax';
import { CoursePresent } from '../course/CoursePresent'
import { Loading } from '../loading/Loading'
import AuthToken from './../router/AuthToken';
const insideStyles1 = { background: 'white', padding: 20, position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)' };
const insideStyles2 = { background: 'white', padding: 20, position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%,-50%)' };

const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
export class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      redirect: ""
    }
  }

  async componentWillMount() {
    console.log("ENTER CoursePresent Component");
    console.log(capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }));
    var courseInfo = (await axios.post(ipList.backend + "/home/queryInformation", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    console.log('courseInfo');
    if (courseInfo.redirect) {
      localStorage.removeItem('user')
      this.setState({
        redirect: courseInfo.redirect
      })
    }
    else {
      console.log(courseInfo);
      // courseInfo[17].thumbnail = require('./Image/Course/Thumbnail/Thumbnail21.jpg')
      for (var i = 0; i < courseInfo.length; i++) {
        // console.log(courseInfo[i].thumbnail);
        try {
          courseInfo[i].thumbnail = require('../../Image/Course/Thumbnail/Thumbnail' + courseInfo[i].courseid + '.jpg')
        } catch (err) {
          courseInfo[i].thumbnail = 'https://dummyimage.com/318x180/ffffff/000000&text=' + courseInfo[i].coursename
        }
        // console.log(courseInfo[i].thumbnail);
      }
      this.setState({
        isloaded: true,
        courseInfo: courseInfo
      })
    }
  }

  render() {

    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }

    if (this.state.isloaded)
      return (
        <div className='App'>
          <AuthToken msgFrom="content" />
          <Container fluid style={{ paddingBottom: 20 }}>
            <Parallax bgImage={banner} blur={{ min: -1, max: 5 }} strength={600} style={{ overflow: 'visible' }}>
              <div style={{ height: 800 }}>
                <div style={insideStyles1}><h1>Tutor-Online</h1></div>
                <div style={insideStyles2}><h2>Lorem ipsum t amet, consectetur adipiscing elit.</h2>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non feugiat tortor nec, tincidunt dui</h4> </div>
              </div>

            </Parallax>
            <div style={{ width: '80%', position: 'relative', marginTop: '-170px', left: '10%', backgroundColor: '#FFF', padding: 20, zIndex: '100' }}><h2>Our Courses</h2>
              <CoursePresent src={this.state.courseInfo} />
            </div>
          </Container>
        </div>
      );
    else {
      return (
        <div>
          <AuthToken msgFrom="Loading content" />
          <Loading />
        </div>
      );
    }
  }
}

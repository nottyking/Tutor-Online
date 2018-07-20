import React from 'react'
import { Redirect } from 'react-router'
import { Container, Badge } from 'reactstrap'
import { CoursePresent } from '../course/CoursePresent'
import { PackagePresent } from '../course/PackagePresent'
import { Loading } from '../loading/Loading'
import AuthToken from './../router/AuthToken';

const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
const Cookies = require('universal-cookie');
const cookies = new Cookies();
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

export class CoursePageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      isMobile: false,
      redirect: ""
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

  async componentWillMount() {
    console.log("ENTER CoursePresent Component");
    console.log(capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }));
    var info = (await axios.post(ipList.backend + "/home/queryInformation", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    var courseInfo = info.course;
    var packageInfo = info.package;
    console.log('packageInfo');
    console.log(packageInfo);
    if (courseInfo.redirect) {
      localStorage.removeItem('user')
      cookies.remove("loginToken", { path: '/' });
      this.setState({
        redirect: courseInfo.redirect
      })
    }
    else {
      console.log(courseInfo);
      // courseInfo[17].thumbnail = require('./Image/Course/Thumbnail/Thumbnail21.jpg')
      for (var i = 0; i < courseInfo.length; i++) {
        // console.log(courseInfo[i].thumbnail);
        courseInfo[i].description = htmlToReactParser.parse(courseInfo[i].description);
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
      if (this.state.isMobile || window.innerWidth < 780) {
        return (
          <div className='App'>
            <AuthToken msgFrom="content" />
            <Container fluid style={{ paddingBottom: 20 }}>
              <div style={{ width: '100%', position: 'relative', marginTop: '50px', left: '0%', backgroundColor: '#EEE', paddingTop: 40, zIndex: '100', paddingBottom: 40 }}>
              <h1><Badge color='info'>Our Package</Badge></h1>
                <br />
                <PackagePresent isMobile={this.state.isMobile} src={this.state.packageInfo} />
                <h1><Badge color='info'>Our Courses</Badge></h1>
                <br />
                <CoursePresent isMobile={this.state.isMobile} src={this.state.courseInfo} />
              </div>
            </Container>
          </div>
        );
      } else {
        return (
          <div className='App'>
            <AuthToken msgFrom="content" />
            <Container fluid style={{ paddingBottom: 20 }}>
              <div style={{ width: '80%', position: 'relative', marginTop: '50px', left: '10%', backgroundColor: '#EEE', paddingTop: 40, zIndex: '100', paddingBottom: 40 }}>
              <h1><Badge color='info'>Our Package</Badge></h1>
              <br />
              <PackagePresent isMobile={this.state.isMobile} src={this.state.packageInfo} />
                <h1><Badge color='info'>Our Courses</Badge></h1>
                <br />
                <CoursePresent isMobile={this.state.isMobile} src={this.state.courseInfo} />
              </div>
            </Container>
          </div>
        );
      }
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

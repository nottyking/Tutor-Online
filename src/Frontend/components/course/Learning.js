import React from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { SubCourseProgressBar } from './SubCourseProgressBar';
import { Row, Col, Container, Card, CardTitle, CardText } from 'reactstrap';
import { VideoPlayer } from './VideoPlayer';
import AuthToken from './../router/AuthToken';
import { Loading } from '../loading/Loading'
import { history } from '../../redux/helpers'

const universalCookie = require('universal-cookie');
const cookies = new universalCookie();
const io = require('socket.io-client');
const socket = io('http://localhost:4000');
const axios = require('axios')
const capsulation = require('../../capsulation/SendData')
const ipList = require('../../../Config/ipConfig')

// class for video page
// may be get course id from link
// this class might get these variables below \/ from database
// CourseName: PropTypes.string.isRequired,
// SubCourseID:PropTypes.string.isRequired,
//  SubCourseName:PropTypes.string.isRequired,
//  src: PropTypes.arrayOf(PropTypes.shape({
//    Cname: PropTypes.string.isRequired,
//    Cimage: PropTypes.string.isRequired,
//    Clink: PropTypes.string.isRequired,
//    Cdesc: PropTypes.string.isRequired})).isRequired}




export class Learning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeUser: true,
      isloaded: false,
      subcoursesInfo: [],
      now: 0,
      userid: 0,
      progress: '1',
    };
    this.boardcastToSameUser = this.boardcastToSameUser.bind(this)
  }

  async componentWillMount(){
    return this.getData();
  }

  async componentWillReceiveProps(){
    return this.getData();
  }

  async componentDidUpdate(){
    this.boardcastToSameUser()
  }

  async componentWillUnmount(){
    socket.close()
  }

  async getData() {
    console.log(this.props.match.params.courseID,this.props.match.params.subcourseID);
    var tempInfo = (await axios.post(ipList.backend + "/learning/queryInformation", capsulation.sendData({
      courseid: this.props.match.params.courseID
    }))).data;
    console.log(this.props.match.params.courseID,this.props.match.params.subcourseID);
    var tempprogress =(await axios.post(ipList.backend + "/learning/progress/query", capsulation.sendData({
      courseid: this.props.match.params.courseID, subcourseid:this.props.match.params.subcourseID
    }))).data;
    console.log("SENT FINISHED");
    console.log("Finish Query Progress");
    console.log(this.props.match.params.subcourseID);
    var temp = tempInfo.learningInformation;
    var tempnow = temp.findIndex(i => i.subcourseid == this.props.match.params.subcourseID);
    console.log(tempnow);
    console.log(temp.length);
    console.log("SETSTATE");
    await this.setState({subcoursesInfo:temp,isloaded:true,now:tempnow,progress:tempprogress.progress,userid:tempInfo.userid});
    console.log(this.state);
  }

  async boardcastToSameUser() {
    console.log("ENTER BOARDCAST");
    socket.on(this.state.userid, (courseid,subcourseid) => {
      console.log("ENTER ON",courseid,subcourseid);
      if(courseid && subcourseid && (courseid != this.props.match.params.courseID || subcourseid != this.props.match.params.subcourseID)){
        console.log(courseid,subcourseid,this.props.match.params.courseID,this.props.match.params.subcourseID);
        alert("Going to courseid: "+courseid+", subcourseid: "+subcourseid+'.')
        history.push('/learning/' + courseid + '/' + subcourseid)
      }
    });
    console.log("Finish socket on");
  }

  async sendProgress(progress) {
    var tempInfo = (await axios.post(ipList.backend + "/learning/progress/store", capsulation.sendData({
      courseid: this.props.match.params.courseID, subcourseid: this.props.match.params.subcourseID, progress: progress
    }))).data;
    console.log(tempInfo);
  }

  render() {
    const timeElapsed = '0m5s'
    console.log(this.props.match.params.courseID);
    console.log(this.props.match.params.subcourseID);
    console.log(this.state);
    console.log(this.state.subcoursesInfo);
    console.log(this.state.subcoursesInfo[this.state.now]);
    //console.log(this.state.subcoursesInfo[this.state.now].subcourseinfo);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    console.log(this.state.isloaded);
    if (this.state.isloaded) {
      return (
        <div className='App'>
          <AuthToken msgFrom="Learning" />
          <Container fluid>
            <Row>
              <Col xs='8'>
                <h3 style={{ textAlign: 'left', padding: 10, textDecoration: 'underline', color: '#FFF' }}>{this.state.subcoursesInfo[this.state.now].subcoursename}</h3>
                <VideoPlayer Vlink={this.state.subcoursesInfo[this.state.now].videolink} UserId={this.state.userid} CourseId={this.props.match.params.courseID} SubCourseId={this.props.match.params.subcourseID} Progress={this.state.progress} sendProgres={this.sendProgress} />
                <p></p>
                <Card body style={{ backgroundColor: '#EEE', padding: 10, marginTop: 10, marginBottom: 20 }}>
                  <CardTitle>
                    Course Description
              </CardTitle>
                  <CardText>
                    {this.state.subcoursesInfo[this.state.now].subcourseinfo}
                  </CardText>
                </Card>
              </Col>

              <br /><br />

              <Col xs='4'>
                <SubCourseProgressBar now={this.state.now} src={this.state.subcoursesInfo} courseid={this.props.match.params.courseID} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

Learning.propTypes = {
  CourseName: PropTypes.string.isRequired,
  SubCourseID: PropTypes.string.isRequired,
  SubCourseName: PropTypes.string.isRequired,
  src: PropTypes.arrayOf(PropTypes.shape({
    Cname: PropTypes.string.isRequired,
    Cimage: PropTypes.string.isRequired,
    Clink: PropTypes.string.isRequired,
    Cdesc: PropTypes.string.isRequired
  })).isRequired
}

/*<SubCourseProgressBar now={1}
src={[
  { SCname: "Math101", SCid: 1, SClink: "https://player.vimeo.com/video/205571281" },
  { SCname: "Math102", SCid: 2, SClink: "https://player.vimeo.com/video/110270314" },
  { SCname: "Math201", SCid: 3, SClink: "https://player.vimeo.com/video/205571281" },
  { SCname: "Math202", SCid: 4, SClink: "https://player.vimeo.com/video/110270314" },
  { SCname: "Math301", SCid: 5, SClink: "https://player.vimeo.com/video/205571281" },
  { SCname: "Math302", SCid: 6, SClink: "https://player.vimeo.com/video/110270314" },
  { SCname: "Math401", SCid: 7, SClink: "https://player.vimeo.com/video/205571281" },
  { SCname: "Math402", SCid: 8, SClink: "https://player.vimeo.com/video/110270314" },
  { SCname: "Math501", SCid: 9, SClink: "https://player.vimeo.com/video/205571281" }
]}
/>*/

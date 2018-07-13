import React from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { SubCourseProgressBar } from './SubCourseProgressBar';
import { Row, Col, Container, Card, CardTitle, CardText } from 'reactstrap';
import { VideoPlayer } from './VideoPlayer';
import AuthToken from './../router/AuthToken';
import { Loading } from '../loading/Loading'

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
      subcoursesInfo : [],
      now:0,
      userid : 0,
      progress: '1',
      redirect:'aaa'
    };
    this.boardcastToSameUser = this.boardcastToSameUser.bind(this)
    this.getData = this.getData.bind(this)
  }

  async componentWillMount(){
    await this.boardcastToSameUser()
    return this.getData();
  }

  async getData() {
    // var subcourseInfo = (await axios.post())
    console.log(this.props.match.params.courseID);
    var tempInfo = (await axios.post(ipList.backend + "/learning/queryInformation", capsulation.sendData({
      courseid: this.props.match.params.courseID
    }))).data;
    console.log(this.props.match.params.courseID,this.props.match.params.subcourseID);
    alert("SEND")
    var tempprogress =(await axios.post(ipList.backend + "/learning/progress/query", capsulation.sendData({
      courseid: this.props.match.params.courseID, subcourseid:this.props.match.params.subcourseID
    }))).data;
    console.log("Finish Query Progress");
    console.log(tempprogress);
    tempprogress = tempprogress.length <1 ? '0':tempprogress;
    console.log(this.props.match.params.subcourseID);
    var temp = tempInfo.learningInformation;
    var tempnow = temp.findIndex(i => i.subcourseid == this.props.match.params.subcourseID);
    console.log(tempnow);
    console.log(temp.length);
    console.log("SETSTATE");
    await this.setState({subcoursesInfo:temp,isloaded:true,now:tempnow,userid:tempInfo.userid,progress:tempprogress.progress});
    console.log(this.state);

  }

  boardcastToSameUser(){
    console.log("ENTER BOARDCAST");
    alert("ENTER BOARDCAST");
    const loginToken = localStorage.getItem('user');
    socket.on('event', async(courseid,subcourseid) => {
      console.log("ENTER ON",courseid,subcourseid);
      if(courseid && subcourseid && (courseid != this.props.match.params.courseID || subcourseid != this.props.match.params.subcourseID)){
        console.log(courseid,subcourseid,this.props.match.params.courseID,this.props.match.params.subcourseID);
        alert('/learning/' + courseid + '/' + subcourseid)
        // this.state.redirect = '/learning/' + courseid + '/' + subcourseid
        this.setState({
          redirect: '/learning/' + courseid + '/' + subcourseid
        })
      }
    });
    // await this.setState({
    //   redirect: '/learning/1/2'
    // })
    console.log("Finish socket on");
  }

  async sendProgress(progress){
    var tempInfo = (await axios.post(ipList.backend + "/learning/progress/store", capsulation.sendData({
      courseid: this.props.match.params.courseID, subcourseid:this.props.match.params.subcourseID, progress:progress
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

    console.log(this.state.isloaded);
    if (this.state.isloaded){
      if(this.state.redirect!='aaa'){
        alert(1111111);
        alert(this.state.redirect);
        return <Redirect to={this.state.redirect} />;
        // return <div/>
      }
      else{
        alert(2222222);
        alert(this.state.redirect);
        return (
          <div className='App'>
            <AuthToken msgFrom="Learning" />
            <Container fluid>
              <Row>
                <Col xs='8'>
                  <h3 style={{ textAlign: 'left', padding: 10, textDecoration: 'underline', color: '#FFF' }}>{this.state.subcoursesInfo[this.state.now].subcoursename}</h3>
                  <VideoPlayer Vlink={ this.state.subcoursesInfo[this.state.now].videolink} UserId={this.state.userid} CourseId={this.props.match.params.courseID} SubCourseId ={this.props.match.params.subcourseID} Progress={this.state.progress} sendProgres={this.sendProgress}/>
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
      }
    }
    else{
      alert(333333);
      alert(this.state.redirect);
      return <Loading/>;
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

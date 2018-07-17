import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const axios = require('axios')
const capsulation = require('../../capsulation/SendData')
const ipList = require('../../../Config/ipConfig')

/*
    use for play video and control (cookie of video progress)
    Prop -> Link to video, UserId , CourseId , SubCourseId

    Cookie -> use UserId + CourseId + SubCourseId as name
*/

//todo is to make cookies accross devices


const cookies = new Cookies();

export class VideoPlayer extends React.Component{

    constructor(props){
        super(props);
        this.videoRef = React.createRef;
        this.onUnload = this.onUnload.bind(this);
        // this.onPause = this.onPause.bind(this);
    }

    async sendProgress(progress){
        alert()
        var tempInfo = (await axios.post(ipList.backend + "/learning/progress/store", capsulation.sendData({
          courseid: this.props.CourseId, subcourseid:this.props.SubCourseId, progress:progress
        }))).data;
        console.log(tempInfo);
      }

    onUnload(event) { // the method that will be used for both add and remove event
        if(this.videoRef.getCurrentTime()!==null){
            this.sendProgress((this.videoRef.getCurrentTime()).toString() );
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
        // console.log(this.props.UserId +'-'+ this.props.CourseId +'-'+ this.props.SubCourseId);
        // console.log(cookies.get(this.props.UserId +'-'+ this.props.CourseId +'-'+ this.props.SubCourseId));
        console.log(this.props.Progress);
       // this.videoRef.seekTo(this.props.Progress);
     }

     componentDidUpdate(){
        this.videoRef.seekTo(this.props.Progress);
     }

     componentWillUpdate(){
        if(this.videoRef.getCurrentTime()!==null){
            this.sendProgress((this.videoRef.getCurrentTime()).toString() );
        }

     }

     componentWillUnmount() {
        console.log('unmount');
        window.removeEventListener("beforeunload", this.onUnload)
     }

     seek(){
         console.log('seek to '+this.props.Progress)
        this.videoRef.seekTo(this.props.Progress);
     }

    //  onPause = () => {
    //     console.log('onPause');
    //     cookies.set(this.props.UserId +'-'+ this.props.CourseId +'-'+ this.props.SubCourseId,(this.videoRef.getCurrentTime()).toString() );
    //     console.log(cookies.get(this.props.UserId +'-'+ this.props.CourseId +'-'+ this.props.SubCourseId));
    // }

    // onClick = () =>{
    //     this.videoRef.seekTo(cookies.get(this.props.UserId +'-'+ this.props.CourseId +'-'+ this.props.SubCourseId));
    // }

    onClick2 = () =>{
        if(this.videoRef.getCurrentTime()!==null){
            this.sendProgress((this.videoRef.getCurrentTime()).toString() );
        }
    }


    ref = videoRef => {
        this.videoRef = videoRef;
    }

    render(){
        return (
        <div>
        <ReactPlayer ref={this.ref} width='100%'
        className='react-player' url={this.props.Vlink} className='react-player' playing onPause={this.onPause} onUnload={this.onUnload}
        onStart={()=>{this.seek();}}/>
        </div>
        );
    }
}

VideoPlayer.propTypes = {
    Vlink : PropTypes.string.isRequired,
    UserId : PropTypes.string.isRequired,
    CourseId: PropTypes.string.isRequired,
    SubCourseId : PropTypes.string.isRequired,
    Progress : PropTypes.string.isRequired,
    sendProgress: PropTypes.func
}

import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

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
        // this.onPause = this.onPause.bind(this);
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
        console.log(cookies.get(this.props.UserId + this.props.CourseId + this.props.SubCourseId));
        this.videoRef.seekTo(cookies.get(this.props.UserId + this.props.CourseId + this.props.SubCourseId));
     }

     componentWillUnmount() {
        console.log('unmount');
        if(this.videoRef.getCurrentTime()!==null)
          cookies.set(this.props.UserId + this.props.CourseId + this.props.SubCourseId,(this.videoRef.getCurrentTime()).toString() );
     }

    // onPause = () => {
    //     console.log('onPause');
    //     cookies.set(this.props.UserId + this.props.CourseId + this.props.SubCourseId,(this.videoRef.getCurrentTime()).toString() );
    // }

    /* Used for Debug
    onClick = () =>{
        console.log('clicking real thing');
        this.videoRef.seekTo(cookies.get(this.props.UserId + this.props.CourseId + this.props.SubCourseId));
    }

    onClick1 = () =>{
        console.log('check');
        console.log(cookies.getAll());

    }
    */

    ref = videoRef => {
        this.videoRef = videoRef;
    }

    render(){
        return (
        <div>
        <ReactPlayer ref={this.ref} width='100%'
        className='react-player' url={this.props.Vlink} playing onPause={this.onPause} onUnload={this.onUnload}/>
        </div>
        );
    }
}

VideoPlayer.propTypes = {
    Vlink : PropTypes.string.isRequired,
    UserId : PropTypes.string.isRequired,
    CourseId: PropTypes.string.isRequired,
    SubCourseId : PropTypes.string.isRequired
}

VideoPlayer.defaultProps = {
    Vlink : 'https://player.vimeo.com/video/205571281',
    UserId : 'EX1',
    CourseId : 'EX1',
    SubCourseId : 'EX1'
};

import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { ButtonGroup, Button, Container,Media,Table } from 'reactstrap';
import Sidebar from 'react-sidebar';
import $ from 'jquery';
import './sidebar.css';
const ipList = require('../../../Config/ipConfig');

/* SubCourseProgressBar used in learning window like a sidebar to show where this clip is in the All of clips in the Course
Get prop Now(subcourseId of this video),Src:[{subcourseId(Sub Course Id), subcourseName, videolink*May Be Not*)}]
*/
var Medias;

export class SubCourseProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLoaded: false,
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        (async () => {
            console.log(await this.vimeoLoadingThumb('id'));
        })()

    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    async componentWillReceiveProps(){
        (async () => {
            console.log(await this.vimeoLoadingThumb('id'));
        })()

    }

    async componentWillMount() {
        const src = this.props.src;
        var allSubCourseComponent = []
        src.map((item, i) => {
            if(item.videolink.substring(item.videolink.indexOf('o/') + 2)!==-1){
            allSubCourseComponent.push(new Promise(async (resolve, reject) => {
                var video = await this.vimeoLoadingThumb(item.videolink.substring(item.videolink.indexOf('o/') + 2), i == src.length - 1);
                if (i == this.props.now) {
                    resolve(
                        <Button className='sidebarHover' href={ipList.frontend+'/learning/'+this.props.courseid+'/'+item.subcourseid} >
                        <tr>
                            <td style={{padding:'0px 0px 0px 0px'}}><img src={video} style={{top:0,left:0}} /></td>
                            <td className='sidevarHoverEl'><i class="fa">&#xf097;</i> <p>{item.subcoursename.toUpperCase()}</p></td>
                        </tr>
                        </Button>
                    )
                }
                else {
                    resolve(
                        <Button className='sidebarHover' href={ipList.frontend+'/learning/'+this.props.courseid+'/'+item.subcourseid} >
                        <tr className='sidevarHoverEl'>
                            <td style={{padding:'0px 0px 0px 0px'}} className='sidevarHoverEl'><img src={video} /></td>
                            <td className='sidevarHoverEl'><p>{item.subcoursename.toUpperCase() }</p></td>
                        </tr>
                        </Button>
                    )
                }
            }))
        }else{
            console.log('error from link :'+item.videolink);
        }
        });

        Promise.all(allSubCourseComponent).then((res) => {
            Medias = res
            this.setState({ isLoaded: true });
        }).catch((err) => {
            console.log("ERROR IN SUBCOURSEPROGRESSBAR");
        })

    }


    async vimeoLoadingThumb(id, end) {
        console.log(id);
        var a = await $.getJSON('http://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', { format: "json" }, function (data) {
            console.log(data[0].thumbnail_small);
        });
        console.log(a[0].thumbnail_small);
        if (end) {
            console.log('loaded');
            // this.setState({isLoaded:true});
        }
        return a[0].thumbnail_small;
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    state = { open: undefined }
    toggle = () => this.setState(state => ({ open: !state.open }))






    render() {
        console.log(this.props.src);
        var sidebarContent = (
            <Container fluid style={{ background: '#555',padding:'0px 0px 0px 0px'}}>
            <Button color='info' onClick={()=>{this.onSetSidebarOpen(false)}}><i class="fa fa-outdent" style={{ color: 'white' }} /></Button>
                <Table borderless>
                <tbody>
                {Medias}
                  </tbody>
                </Table>

            </Container>);
        var sidebarLoadingContent = (
            <Container fluid style={{ background: '#555' }}>
            <Button color='info' onClick={()=>{this.onSetSidebarOpen(false)}}><i class="fa fa-outdent" style={{ color: 'white' }} /></Button>
                <ButtonGroup vertical>
                </ButtonGroup>
            </Container>);
        const state = this.state.open === undefined ? 'peek' : this.state.open ? 'open' : 'close'
        const icon = this.state.open ? 'fold' : 'unfold'
        if (this.state.isLoaded) {
            console.log('render loaded')
            return (
                <Sidebar
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    pullRight={true}
                >
                    <Button color='info' onClick={this.onSetSidebarOpen}><i class="fa fa-outdent" style={{ color: 'white' }} /></Button>

                </Sidebar>

            );
        } else {
            return (
                <Sidebar sidebar={sidebarLoadingContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    pullRight={true}
                >
                    <i class="fa fa-outdent" onClick={this.onSetSidebarOpen} style={{ color: 'white' }} />

                </Sidebar>);

        }
    }
}

SubCourseProgressBar.propTypes = {
    now: PropTypes.number.isRequired,
    src: PropTypes.arrayOf(PropTypes.shape({
        subcoursename: PropTypes.string.isRequired,
        subcourseid: PropTypes.number.isRequired,
        videolink: PropTypes.string.isRequired,
    })).isRequired
}

SubCourseProgressBar.defaultProps = {
    now: 3,
    src: [
        { subcoursename: "Math101", subcourseid: 1, videolink: "https://player.vimeo.com/video/205571281" },
        { subcoursename: "Math102", subcourseid: 2, videolink: "https://player.vimeo.com/video/110270314" },
        { subcoursename: "Math201", subcourseid: 3, videolink: "https://player.vimeo.com/video/205571281" },
        { subcoursename: "Math202", subcourseid: 4, videolink: "https://player.vimeo.com/video/110270314" },
        { subcoursename: "Math301", subcourseid: 5, videolink: "https://player.vimeo.com/video/205571281" },
        { subcoursename: "Math302", subcourseid: 6, videolink: "https://player.vimeo.com/video/110270314" },
        { subcoursename: "Math401", subcourseid: 7, videolink: "https://player.vimeo.com/video/205571281" },
        { subcoursename: "Math402", subcourseid: 8, videolink: "https://player.vimeo.com/video/110270314" },
        { subcoursename: "Math501", subcourseid: 9, videolink: "https://player.vimeo.com/video/205571281" }
    ]
};

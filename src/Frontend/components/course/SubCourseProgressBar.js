import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { ButtonGroup, Button, Container,Media,Table } from 'reactstrap';
import Sidebar from 'react-sidebar';
import $ from 'jquery';
import './sidebar.css'

/* SubCourseProgressBar used in learning window like a sidebar to show where this clip is in the All of clips in the Course
Get prop Now(SCId of this video),Src:[{SCId(Sub Course Id), SCName, SCLink*May Be Not*)}]
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

    async componentWillMount() {
        const src = this.props.src;
        var allSubCourseComponent = []
        src.map((item, i) => {
            allSubCourseComponent.push(new Promise(async (resolve, reject) => {
                var video = await this.vimeoLoadingThumb(item.SClink.substring(item.SClink.indexOf('o/') + 2), i == src.length - 1);
                if (item.SCid === this.props.now) {
                    resolve(
                        <div className='sidebarHover' style={{display:'block',zIndex:100}}>
                        <tr>
                            <td style={{padding:'0px 0px 0px 0px'}}><img src={video} style={{top:0,left:0}} /></td>
                            <td className='sidevarHoverEl'><i class="fa">&#xf097;</i> {item.SCname.toUpperCase()}</td>
                        </tr>
                        </div>
                    )
                }
                else {
                    resolve(
                        <Button className='sidebarHover'>
                        <tr>
                            <td style={{padding:'0px 0px 0px 0px'}}><img src={video} /></td>
                            <td className='sidebarHoverEl'>{item.SCname.toUpperCase() }</td>
                        </tr>
                        </Button>
                    )
                }
            }))
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
        return a[0].thumbnail_medium;
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    state = { open: undefined }
    toggle = () => this.setState(state => ({ open: !state.open }))






    render() {
        var sidebarContent = (
            <Container fluid style={{ background: '#555',padding:'0px 0px 0px 0px'}}>
                <i class="fa fa-outdent" onClick={() => { this.onSetSidebarOpen(false) }} style={{ color: 'white' }} />
                <Table borderless>
                <tbody>
                {Medias}
                  </tbody>
                </Table>

            </Container>);
        var sidebarLoadingContent = (
            <Container fluid style={{ background: '#555' }}>
                <i class="fa fa-outdent" onClick={() => { this.onSetSidebarOpen(false) }} style={{ color: 'white' }} />
                <ButtonGroup vertical>
                </ButtonGroup>
            </Container>);
        const state = this.state.open === undefined ? 'peek' : this.state.open ? 'open' : 'close'
        const icon = this.state.open ? 'fold' : 'unfold'
        if (this.state.isLoaded) {

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
        SCname: PropTypes.string.isRequired,
        SCid: PropTypes.number.isRequired,
        SClink: PropTypes.string.isRequired,
    })).isRequired
}

SubCourseProgressBar.defaultProps = {
    now: 3,
    src: [
        { SCname: "Math101", SCid: 1, SClink: "https://player.vimeo.com/video/205571281" },
        { SCname: "Math102", SCid: 2, SClink: "https://player.vimeo.com/video/110270314" },
        { SCname: "Math201", SCid: 3, SClink: "https://player.vimeo.com/video/205571281" },
        { SCname: "Math202", SCid: 4, SClink: "https://player.vimeo.com/video/110270314" },
        { SCname: "Math301", SCid: 5, SClink: "https://player.vimeo.com/video/205571281" },
        { SCname: "Math302", SCid: 6, SClink: "https://player.vimeo.com/video/110270314" },
        { SCname: "Math401", SCid: 7, SClink: "https://player.vimeo.com/video/205571281" },
        { SCname: "Math402", SCid: 8, SClink: "https://player.vimeo.com/video/110270314" },
        { SCname: "Math501", SCid: 9, SClink: "https://player.vimeo.com/video/205571281" }
    ]
};

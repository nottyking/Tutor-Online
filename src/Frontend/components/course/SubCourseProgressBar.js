import React from 'react';
import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'reactstrap';
import $ from 'jquery';

/* SubCourseProgressBar used in learning window like a sidebar to show where this clip is in the All of clips in the Course
Get prop Now(SCId of this video),Src:[{SCId(Sub Course Id), SCName, SCLink*May Be Not*)}]
*/
var Buttons;

export class SubCourseProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLoaded: false
        };

        console.log(this.vimeoLoadingThumb('id'));

    }

    async componentWillMount(){
        const src = this.props.src;
        Buttons = src.map((item,i) => {
            if (item.SCid === this.props.now) {
                console.log(item.SClink.substring(item.SClink.indexOf('o/')+2));
                return (
                    <div color="warning" block>
                        <img src={this.vimeoLoadingThumb(item.SClink.substring(item.SClink.indexOf('o/')+2),i==src.length-1)}/>
                        <i class="fa">&#xf097;</i> {item.SCname.toUpperCase()}
                    </div>
                )
            }
            else {
                return (
                    <div outline color="warning" block>
                    <img src={this.vimeoLoadingThumb(item.SClink.substring(item.SClink.indexOf('o/')+2),i==src.length-1)}/>
                        {item.SCname.toUpperCase()}
                    </div>
                )
            }
        });
        this.setState({isLoaded:true});

    }

    async vimeoLoadingThumb(id,end) {
        console.log(id);
        var a = await $.getJSON('http://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', { format: "json" }, function (data) {
            console.log(data[0].thumbnail_medium);
        });
        console.log(a[0].thumbnail_medium);
        if(end){
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

    render() {
        if(this.state.isLoaded){
            console.log('progress bar render');

        return (
            < div style={{ 'padding-top': 20 }}>
                <ButtonGroup vertical>
                    {Buttons}
                </ButtonGroup>
            </div >

        );
    }else{
        return <div/>
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

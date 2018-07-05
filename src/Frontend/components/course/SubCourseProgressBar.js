import React from 'react';
import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'reactstrap';
import $ from 'jquery';

/* SubCourseProgressBar used in learning window like a sidebar to show where this clip is in the All of clips in the Course
Get prop Now(SCId of this video),Src:[{SCId(Sub Course Id), SCName, SCLink*May Be Not*)}]
*/


export class SubCourseProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    vimeoLoadingThumb(id) {
        var a;
        $.getJSON('http://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', { format: "json" }, function (data) {

            a=  data[0].thumbnail_large;
        });
        return a;
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const src = this.props.src;
        const Buttons = src.map(item => {
            if (item.SCid === this.props.now) {
                return (
                    <Button color="warning" block>
                        <img src={this.vimeoLoadingThumb(item.SClink.substring(item.SClink.indexOf('o/')+2))}/>
                        <i class="fa">&#xf097;</i> {item.SCname.toUpperCase()}
                    </Button>
                )
            }
            else {
                return (
                    <Button outline color="warning" block>
                        {item.SCname.toUpperCase()}
                    </Button>
                )
            }
        }

        );
        return (
            < div style={{ 'padding-top': 20 }}>
                <ButtonGroup vertical>
                    {Buttons}
                </ButtonGroup>
            </div >

        );
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
        { SCname: "Math101", SCid: 1, SClink: "aaaaaa" },
        { SCname: "Math102", SCid: 2, SClink: "aaaaaa" },
        { SCname: "Math201", SCid: 3, SClink: "aaaaaa" },
        { SCname: "Math202", SCid: 4, SClink: "aaaaaa" },
        { SCname: "Math301", SCid: 5, SClink: "aaaaaa" },
        { SCname: "Math302", SCid: 6, SClink: "aaaaaa" },
        { SCname: "Math401", SCid: 7, SClink: "aaaaaa" },
        { SCname: "Math402", SCid: 8, SClink: "aaaaaa" },
        { SCname: "Math501", SCid: 9, SClink: "aaaaaa" }
    ]
};

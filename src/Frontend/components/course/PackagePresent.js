import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Row, Col, Container, Badge
} from 'reactstrap';
import './CourseImg.css';
import folder_sticker from './../../Image/gift.png';
/*
CoursePresent Used For Present Courses in Main Window (or others page) by
get src [ List of {coursename(Coursename),thumbnail(Link To CourseThumbnailImage),courselink(Link to Course),description(Course Description)}]
present all courses that available
*/

//Todo add Link to Course

export class PackagePresent extends React.Component {
    //This is the course component in the first page
    render() {
        const src = this.props.src;
        console.log("Render in Packagepresent src:", src);
        var ListItems;
        if (this.props.isMobile || window.innerWidth < 780) {
            ListItems = src.map(
                (item, i) =>
                    <Col xs="auto">
                        <Card key={i} style={{ width: 140, marginTop: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', border: 'none' }}>
                            <Link to={'/package/'+item.packageid} style={{ color: 'black', textDecoration: 'none' }}>
                                <div className='change-ratio-mobile'>
                                    <CardImg className='cc' src={item.thumbnail} alt="Card image cap" />
                                </div>
                                <div className='description-course-mobile'>
                                    <CardBody className='description-course'>
                                        <CardText style={{ alignSelf: 'left' }}><Badge color='warning'>{item.packagename}</Badge><Badge color='info'>Package</Badge></CardText>
                                        <CardText>{item.description}</CardText>
                                    </CardBody>
                                </div>
                            </Link>
                        </Card>
                    </Col>
            );
        } else {
            ListItems = src.map(
                (item, i) =>
                    <Col xs="auto">
                        <Card key={i} style={{ width: 270, marginTop: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', border: 'none' }}>
                        <Link to={'/package/'+item.packageid} style={{ color: 'black', textDecoration: 'none' }}>
                            <div className='change-ratio'>
                                <CardImg className='cc' src={item.thumbnail} alt="Card image cap" />
                                <img className = 'folder_sticker' src ={folder_sticker}/>
                            </div>
                            <div className='description-course'>
                                <CardBody className='description-course'>
                                    <CardTitle><Badge color='warning'>{item.packagename}</Badge></CardTitle>
                                    <CardText>{item.description}</CardText>
                                </CardBody>
                            </div>
                            </Link>
                        </Card>
                    </Col>
            );

        }
        return (
            <Row className="justify-content-around">
                {ListItems}
            </Row>
        );
    }
}

/*PackagePresent.propType = {
    src: PropTypes.arrayOf(PropTypes.shape({
        packagename: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        //packagelink: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })).isRequired
}*/


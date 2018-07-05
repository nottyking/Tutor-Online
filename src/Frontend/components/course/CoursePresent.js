import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Row, Col, Container
} from 'reactstrap';
import './CourseImg.css';
/*
CoursePresent Used For Present Courses in Main Window (or others page) by
get src [ List of {coursename(Coursename),thumbnail(Link To CourseThumbnailImage),courselink(Link to Course),description(Course Description)}]
*/

//Todo add Link to Course

export class CoursePresent extends React.Component {

    render() {
        const src = this.props.src;
        console.log("Render in Coursepresent src:", src);
        const ListItems = src.map(
            (item, i) =>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Card key={i} style={{ width: 330, marginTop: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', border: 'none' }}>
                        <Link to={item.courselink} style={{ color: 'black', textDecoration: 'none' }}>
                            <div className='change-ratio'>
                                <CardImg className='cc' src={item.thumbnail} alt="Card image cap" />
                            </div>
                            <div className='description-course'>
                            <CardBody className = 'description-course'>
                                <CardTitle>{item.coursename}</CardTitle>
                                <CardText>{item.description}</CardText>
                            </CardBody>
                            </div>
                        </Link>
                    </Card>
                </Col>
        );

        return (
            <Container style={{ paddingBottom: 20, textAlign: 'center' }}>
                <Row>
                    {ListItems}
                </Row>
            </Container>
        );
    }
}

CoursePresent.propType = {
    src: PropTypes.arrayOf(PropTypes.shape({
        coursename: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        courselink: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })).isRequired
}



//Default Prop For Testing

CoursePresent.defaultProps = {
    src: [
        { coursename: "Math101", thumbnail: 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG', courselink: "/course", description: "aaaaaaaa" },
        { coursename: "Math102", thumbnail: 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG', courselink: "/course", description: "aaaaaaaa" },
        { coursename: "Math201", thumbnail: 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG', courselink: "/course", description: "aaaaaaaa" },
        { coursename: "Math202", thumbnail: 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG', courselink: "/course", description: "aaaaaaaa" },
        { coursename: "Math202", thumbnail: 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG', courselink: "/course", description: "aaaaaaaa" },
        { coursename: "Math202", thumbnail: 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG', courselink: "/course", description: "aaaaaaaa" }
    ]
};

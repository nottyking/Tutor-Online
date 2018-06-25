import React from 'react';
import PropTypes from 'prop-types'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Row, Col, Container
} from 'reactstrap';

/*
CoursePresent Used For Present Courses in Main Window (or others page) by
get src [ List of {courseName(Coursename),courseImage(Link To CourseThumbnailImage),courseLink(Link to Course),courseDesc(Course Description)}]
*/

//Todo add Link to Course

export class CoursePresent extends React.Component {
    render() {
        const src = this.props.src;
        const ListItems = src.map(
            (item, i) => <Col>
                <Card key={i} style={{ width: 332, marginTop: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',border:'none' }}>
                    <CardImg src={item.Cimage} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{item.Cname}</CardTitle>
                        <CardText>{item.Cdesc}</CardText>
                        <Button href={item.CLink}>Register</Button>
                    </CardBody>
                </Card>
            </Col>
        );

        return (
            <Container style={{ paddingBottom: 20 }}>
                <Row>
                    {ListItems}
                </Row>
            </Container>
        );
    }
}

CoursePresent.propType = {
    src: PropTypes.arrayOf(PropTypes.shape({
        courseName : PropTypes.string.isRequired,
        courseImage : PropTypes.string.isRequired,
         courseLink: PropTypes.string.isRequired,
         courseDesc: PropTypes.string.isRequired
    })).isRequired
}



//Default Prop For Testing

CoursePresent.defaultProps = {
    src: [
        {courseName : "Math101", courseImage : 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG',courseLink:"/course",courseDesc:"aaaaaaaa"},
        {courseName : "Math102", courseImage : 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG',courseLink:"/course",courseDesc:"aaaaaaaa"},
        {courseName : "Math201", courseImage : 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG',courseLink:"/course",courseDesc:"aaaaaaaa"},
        {courseName : "Math202", courseImage : 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG',courseLink:"/course",courseDesc:"aaaaaaaa"},
        {courseName : "Math202", courseImage : 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG',courseLink:"/course",courseDesc:"aaaaaaaa"},
        {courseName : "Math202", courseImage : 'https://dummyimage.com/318x180/AAAAAA/FFFFFF&text=DefaultIMG',courseLink:"/course",courseDesc:"aaaaaaaa"}
        ]
};

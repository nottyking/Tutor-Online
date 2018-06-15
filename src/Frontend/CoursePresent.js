import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col,Container } from 'reactstrap';

/*
CoursePresent Used For Present Courses in Main Window (or others page) by
get src [ List of {Cname(Coursename),Cimage(Link To CourseThumbnailImage),CLink(Link to Course),Cdesc(Course Description)}]
*/

//Todo add Link to Course

export class CoursePresent extends React.Component{
    render(){
    const src= this.props.src;
    const ListItems = src.map(
        (item,i)=><Col>
        <Card key={i} style={{width:332}}>
        <CardImg  src={item.Cimage} alt="Card image cap" />
        <CardBody>
          <CardTitle>{item.Cname}</CardTitle>
          <CardText>{item.Cdesc}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      </Col>
    );

    return (
        <Container>
        <Row>
        {ListItems}
        </Row>
        </Container>
    );
    }
}

CoursePresent.propType =  {
    src: PropTypes.arrayOf(PropTypes.shape({
        Cname : PropTypes.string.isRequired,
        Cimage : PropTypes.string.isRequired,
         Clink: PropTypes.string.isRequired,
         Cdesc: PropTypes.string.isRequired
    })).isRequired
}



//Default Prop For Testing

CoursePresent.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",CLink:"",Cdesc:"aaaaaaaa"},
        {Cname : "Math102", Cimage : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",CLink:"",Cdesc:"aaaaaaaa"},
        {Cname : "Math201", Cimage : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",CLink:"",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",CLink:"",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",CLink:"",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",CLink:"",Cdesc:"aaaaaaaa"}
        ]
};
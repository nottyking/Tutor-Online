import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

/*
CoursePresent Used For Present Courses in Main Window (or others page) by
get src [ List of {Cname(Coursename),Cimage(Link To CourseThumbnailImage),Cdesc(Course Description)}]
*/

const src= [
    {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
    {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
    {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
    {Cname : "Math202", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"}
];

export class CoursePresent extends React.Component{
//Todo(1) change Antd to React-Bootstrap  
    render(){
    //const ListItems = this.props.src.map(
    const ListItems = src.map(
        (item,i)=><Card key={i}>
        <CardImg top width="100%" src={item.Cimage} alt="Card image cap" />
        <CardBody>
          <CardTitle>{item.Cname}</CardTitle>
          <CardText>{item.Cdesc}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    );

    return (
        <div>
        {ListItems}
        </div>
    );
    }
}

CoursePresent.propType = {
    src: PropTypes.array.isRequired
};

CoursePresent.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"}
    ]
};
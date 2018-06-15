import React from 'react';
import {Card} from 'antd';
const {Meta} = Card

/*
CoursePresent Used For Present Courses in Main Window (or others page) by
get src [ List of {Cname(Coursename),Cimage(Link To CourseThumbnailImage),Cdesc(Course Description)}]
*/

export class CoursePresent extends React.Component{
//Todo(1) change Antd to React-Bootstrap
    render(){
    const ListItems = this.praops.src.map(
        (item)=><Card cover={<img alt="thumbnail" src={item.Cimage}/>}>
        <Meta title={item.Cname} description={item.Cdesc}/>
    />
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
    src: React.PropTypes.array.isRequired
};

CoursePresent.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"}
    ]
};

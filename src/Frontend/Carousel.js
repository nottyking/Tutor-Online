import React from 'react';
import {Card} from 'antd';
const {Meta} = Card

/*
Carousel Used as Slide Show in Main Window (or others page) by
get src [ List of {Cname(Coursename),Cimage(Link To CourseBannerImage),Clink(Link to Course Page),Cdesc(Course Description)}]
*/

export class Carousel extends React.Component{
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

Carousel.propType = {
    src: React.PropTypes.array.isRequired
};

Carousel.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa"},
        {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa"},
        {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa"}
    ]
};
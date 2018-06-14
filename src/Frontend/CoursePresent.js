import React from 'react';
import {Card} from 'antd';
const {Meta} = Card

export class CoursePresent extends React.Component{

    render(){
    const src = [
        {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"},
        {Cname : "Math202", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Cdesc:"aaaaaaaa"}
    ]; 
    const ListItems = src.map(
        (item)=><Card cover={<img alt="thumbnail" src={item.Cimage}/>}>
        <Meta title={item.Cname} description={item.description}/>
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
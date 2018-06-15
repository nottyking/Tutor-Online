// import React from 'react';
// import {Carousel} from 'react-bootstrap';
//
// /*
// Carousel Used as Slide Show in Main Window (or others page) by
// get src [ List of {Cname(Coursename),Cimage(Link To CourseBannerImage),Clink(Link to Course Page),Cdesc(Course Description)}]
// */
//
// export class Carousel extends React.Component{
// //Todo(1) change Antd to React-Bootstrap
//     render(){
//     const ListItems = this.props.src.map(
//         (item)=>
//         <Carousel.Item>
//         <img width={900} height={500} alt="900x500" src={item.Cimage} />
//         <Carousel.Caption>
//           <h3>{item.Cname}</h3>
//           <p>{item.Cdesc}</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     );
//
//     return (
//         <Carousel>
//         {ListItems}
//         </Carousel>
//     );
//     }
// }
//
// Carousel.propType = {
//     src: React.PropTypes.array.isRequired
// };
//
// Carousel.defaultProps = {
//     src: [
//         {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa50฿!"},
//         {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa60฿!"},
//         {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa70฿!"}
//     ]
// };

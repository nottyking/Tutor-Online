import React from 'react';
import PropTypes from 'prop-types'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Button
  } from 'reactstrap';

/*
Carousel Used as Slide Show in Main Window (or others page) by
get src [ List of {Cname(Coursename),Cimage(Link To CourseBannerImage),Clink(Link to Course Page),Cdesc(Course Description)}]
*/

//Todo(1) Do an Props propery 

const     items= [
    {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa50฿!"},
    {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa60฿!"},
    {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa70฿!"}
];
export class CourseCarousel extends React.Component{

constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {

    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.Cimage} width={700} alt="error" />
          <CarouselCaption captionText={item.Cdesc} captionHeader={item.Cname} />
        </CarouselItem>
      );
    });

    return (
    <div>
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </div>
    );
  }
    
}

Carousel.propTypes = {
    src: PropTypes.arrayOf(PropTypes.shape({
        Cname : PropTypes.string.isRequired,
         Cimage : PropTypes.string.isRequired,
         Clink: PropTypes.string.isRequired,
         Cdesc: PropTypes.string.isRequired
    })).isRequired
}

Carousel.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa50฿!"},
        {Cname : "Math102", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa60฿!"},
        {Cname : "Math201", Cimage : "http://executivelawncare.net/wp-content/themes/xtinguishers/img/video-sample.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa70฿!"}
    ]
};
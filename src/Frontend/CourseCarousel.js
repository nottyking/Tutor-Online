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

  import img1 from './Image/trianglify1.png';
  import img2 from './Image/trianglify2.png';

/*
Carousel Used as Slide Show in Main Window (or others page) by
get src [ List of {Cname(Coursename),Cimage(Link To CourseBannerImage),Clink(Link to Course Page),Cdesc(Course Description)}]
*/

//Todo(1) Add Link to Each of Slide

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
    const nextIndex = this.state.activeIndex === this.props.src.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.src.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {

    const { activeIndex } = this.state;
    const src = this.props.src;

    const slides = src.map((item) => {
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
        <CarouselIndicators items={src} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </div>
    );
  }
    
}

CourseCarousel.propTypes = {
    src: PropTypes.arrayOf(PropTypes.shape({
        Cname : PropTypes.string.isRequired,
         Cimage : PropTypes.string.isRequired,
         Clink: PropTypes.string.isRequired,
         Cdesc: PropTypes.string.isRequired
    })).isRequired
}

CourseCarousel.defaultProps = {
    src: [
        {Cname : "Math101", Cimage : "https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-3.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa50฿!"},
        {Cname : "Math102", Cimage : "https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-2.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa60฿!"},
        {Cname : "Math201", Cimage : "https://69qd1c5qn8u3iv3haytl10c1-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/trianglify-3.png",Clink:"aaaaaa",Cdesc:"aaaaaaaa70฿!"}
    ]
};
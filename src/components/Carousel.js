import React from 'react';

import './Carousel.css';


class CarouselItem extends React.Component {

  render() {
    return (
      <section>{this.props.children}</section>
    );
  }
}


class Carousel extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleTouchStart = (e) => (this._handleTouchStart(e));
    this.handleTouchEnd = (e) => (this._handleTouchEnd(e));
    this.handleTouchCancel = (e) => (this._handleTouchEnd(e));
    this.handleTouchMove = (e) => (this._handleTouchMove(e));
    this.handleCarousel = (e) => (this._handleCarousel(e));

    this._startingTimestamp = null;
    this._startingTouch = null;
    this.breakpoints = [0];

    this.state = {
      restingIndex: 0,
      scrollX: 0
    }
  }

  _handleCarousel(c) {
    this.calculateChildCoordinates(c);
  }

  calculateChildCoordinates(carousel) {
    let carouselRect = carousel.getBoundingClientRect();
    let children = carousel.children || [];
    let currentBreakpoint = -(carouselRect.width / 2);

    this.breakpoints = [];
    for (var ii = 0; ii < children.length; ii++) {
      let child = children[ii];
      let rect = child.getBoundingClientRect();
      this.breakpoints.push(currentBreakpoint + rect.width/2);
      currentBreakpoint += rect.width;
    }
    this.setState({
      restingIndex: Math.floor(this.breakpoints.length/2)
    });
  }

  closestBreakpoint(dx) {
    let closest = 0;
    this.breakpoints.forEach((b, index) => {
      let distance = Math.abs(dx - b);
      if (distance < Math.abs(dx - this.breakpoints[closest])) {
        closest = index;
      }
    });
    return closest;
  }

  _handleTouchStart(e) {
    this._startingTimestamp = new Date();
    this._startingTouch = e.nativeEvent.touches[0];
  }

  _handleTouchMove(e) {
    let start = this._startingTouch;
    let end = e.nativeEvent.touches[0];
    let diff = {
      dx: end.screenX - start.screenX,
      dy: end.screenY - start.screenY
    }
    e.preventDefault();
    this.setState({
      scrollX: diff.dx
    });
  }

  _handleTouchEnd(e) {
    this._startingTimestamp = null;
    this._startingTouch = null;
    let dx = this.state.scrollX + this.breakpoints[this.state.restingIndex];
    this.setState({
      restingIndex: this.closestBreakpoint(dx),
      scrollX: 0
    });
  }

  render() {
    let translateX = this.state.scrollX + this.breakpoints[this.state.restingIndex];
    let transformStyle = {
      transform: 'translateX(' + translateX + 'px)',
      transition: this._startingTouch ? undefined : 'transform 200ms ease-in-out'
    }
    return (
      <section
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchCancel={this.handleTouchCancel}
        onTouchEnd={this.handleTouchEnd}
        >
        <section
          className="carousel"
          style={transformStyle}
          ref={this.handleCarousel}
          >
          {
            this.props.children.map((c, index) => (
              <CarouselItem key={index}>{c}</CarouselItem>
            ))
          }
        </section>
      </section>
    );
  }
}

Carousel.defaultProps = {

}

export default Carousel;

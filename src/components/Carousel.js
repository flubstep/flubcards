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

    this._touches = [];
    this._breakpoints = [0];

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

    this._breakpoints = [];
    for (var ii = 0; ii < children.length; ii++) {
      let child = children[ii];
      let rect = child.getBoundingClientRect();
      this._breakpoints.push(-(currentBreakpoint + rect.width/2));
      currentBreakpoint += rect.width;
    }
    this.setState({
      restingIndex: Math.floor(this._breakpoints.length/2)
    });
  }

  closestBreakpoint(dx, correction = 0) {
    let closest = 0;
    this._breakpoints.forEach((b, index) => {
      let distance = Math.abs(dx - b);
      if (distance < Math.abs(dx - this._breakpoints[closest])) {
        closest = index;
      }
    });
    if (closest === this.state.restingIndex && correction) {
      closest += correction;
      closest = Math.min(this._breakpoints.length - 1, closest);
      closest = Math.max(0, closest);
    }
    return closest;
  }

  _handleTouchStart(e) {
    this._touches.push(e.nativeEvent.touches[0]);
  }

  _handleTouchMove(e) {
    e.preventDefault();
    let start = this._touches[0];
    let current = e.nativeEvent.touches[0];
    let diff = {
      dx: current.screenX - start.screenX,
      dy: current.screenY - start.screenY
    }
    this._touches.push(current);
    this.setState({
      scrollX: diff.dx
    });
  }

  _handleTouchEnd(e) {
    let n = this._touches.length;
    let correction = 0;
    if (n > 2) {
      let e1 = this._touches[n-1];
      let e0 = this._touches[n-2];
      let velocity = (e1.screenX - e0.screenX);
      if (velocity > 12) {
        correction = -1;
      } else if (velocity < -12) {
        correction = 1;
      }
    }
    let dx = this.state.scrollX + this._breakpoints[this.state.restingIndex];
    this._touches = [];
    this.setState({
      restingIndex: this.closestBreakpoint(dx, correction),
      scrollX: 0
    });
  }

  render() {
    let translateX = this.state.scrollX + this._breakpoints[this.state.restingIndex];
    let transformStyle = {
      transform: 'translateX(' + translateX + 'px)',
      transition: this._touches.length ? undefined : 'transform 200ms ease-in-out'
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
              <CarouselItem key={[index, this.state.restingIndex]}>
                {
                  React.cloneElement(c, { centered: index === this.state.restingIndex })
                }
              </CarouselItem>
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

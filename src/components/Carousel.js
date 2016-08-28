import React from 'react';

import './Carousel.css';


function touchCopy(t) {
  return {
    screenX: t.screenX,
    screenY: t.screenY
  }
}

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

    this._carousel = null;
    this._touches = [];
    this._breakpoints = [0];

    this.state = {
      restingIndex: 0,
      scrollX: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.children.length !== this._breakpoints.length) {
      this.calculateChildCoordinates(this._carousel);
    }
  }

  _handleCarousel(c) {
    this._carousel = c;
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
    this._touches = [touchCopy(e.nativeEvent.touches[0])];
  }

  _handleTouchMove(e) {
    e.preventDefault();
    let start = this._touches[0];
    let current = e.nativeEvent.touches[0];
    let diff = {
      dx: current.screenX - start.screenX,
      dy: current.screenY - start.screenY
    }
    this._touches.push(touchCopy(current));
    this.setState({
      scrollX: Math.abs(diff.dy) > Math.abs(diff.dx) ? 0 : diff.dx
    });
  }

  _handleTouchEnd(e) {
    let n = this._touches.length;
    let correction = 0;
    if (n > 2) {
      let e1 = this._touches[n-1];
      let e0 = this._touches[n-2];
      let dy = Math.abs(e1.screenY - this._touches[0].screenY);
      let velocityX = (e1.screenX - e0.screenX);
      if (dy > 50) {
        correction = 0;
      }
      else if (velocityX > 12) {
        correction = -1;
      } else if (velocityX < -12) {
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
    let scrollX = Math.abs(this.state.scrollX) < this.props.deadzone ? 0 : this.state.scrollX;
    let translateX = scrollX + this._breakpoints[this.state.restingIndex];
    let ceilX = this._breakpoints[0];
    let floorX = this._breakpoints[this._breakpoints.length - 1];

    if (translateX > ceilX) {
      translateX -= (translateX - ceilX) / 2;
    } else if (translateX < floorX) {
      translateX -= (translateX - floorX) / 2;
    }

    let transformStyle = {
      transform: 'translateX(' + translateX + 'px)',
      transition: this._touches.length ? undefined : 'transform 200ms ease-in-out'
    }
    return (
      <section className="carousel-container">
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
                <CarouselItem key={index}>
                  {
                    c ? React.cloneElement(c, { centered: index === this.state.restingIndex }) : c
                  }
                </CarouselItem>
              ))
            }
          </section>
        </section>
      </section>
    );
  }
}

Carousel.defaultProps = {
  deadzone: 20
}

export default Carousel;

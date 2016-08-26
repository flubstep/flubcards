import React from 'react';

import './Carousel.css';

class Carousel extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleTouchStart = (e) => (this._handleTouchStart(e));
    this.handleTouchEnd = (e) => (this._handleTouchEnd(e));
    this.handleTouchCancel = (e) => (this._handleTouchEnd(e));
    this.handleTouchMove = (e) => (this._handleTouchMove(e));
    this._startingTouch = null;
    this.state = {
      scrollX: 0
    }
  }

  _handleTouchStart(e) {
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
    this._startingTouch = null;
    this.setState({
      scrollX: 0
    });
  }

  render() {
    let transformStyle = {
      transform: 'translateX(' + this.state.scrollX + 'px)',
      transition: this._startingTouch ? undefined : 'transform 200ms ease-in-out'
    }
    this.props.children.forEach((child) => {
      console.log(child);
    });
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
          >
          {this.props.children}
        </section>
      </section>
    );
  }
}

Carousel.defaultProps = {

}

export default Carousel;

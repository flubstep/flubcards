import React from 'react';

import ShrinkGrowTransitionGroup from './ShrinkGrowTransitionGroup';
import './WhiteCard.css';

class WhiteCard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      bouncing: false,
      selected: false,
      dy: 0,
      show: true
    }
    this.toggleSelected = () => {
      if (this.props.centered) {
        this.setState({
          selected: !this.state.selected
        });
      }
    }
    this._startingTouch = null;
    this.onTouchStart = (e) => this._onTouchStart(e);
    this.onTouchMove = (e) => this._onTouchMove(e);
    this.onTouchEnd = (e) => this._onTouchEnd(e);
    this.onClick = (e) => this._onClick(e);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.centered && !this.props.centered) {
      this.setState({
        selected: false
      });
    }
    if (!prevProps.active && this.props.active) {
      this.setState({
        dy: 0
      });
    }
  }

  _onClick(e) {
    this.setState({ bouncing: true });
    setTimeout(() => this.setState({ bouncing: false }), 100);
  }

  _onTouchStart(e) {
    this._startingTouch = {
      screenX: e.nativeEvent.touches[0].screenX,
      screenY: e.nativeEvent.touches[0].screenY
    }
  }

  _onTouchMove(e) {
    let currentTouch = e.nativeEvent.touches[0];
    let dy = currentTouch.screenY - this._startingTouch.screenY;
    this.setState({ dy });
  }

  _onTouchEnd(e) {
    let shouldReset = this.props.onRelease({ dy: this.state.dy });
    if (shouldReset) {
      this._startingTouch = null;
      this.setState({ dy: 0 });
    }
  }

  render() {
    let cardClasses = 'white-card';
    if (this.state.selected) {
      cardClasses += ' selected';
    }
    if (this.state.bouncing) {
      cardClasses += ' bouncing';
    }
    if (!this.props.active) {
      cardClasses += ' disabled';
    }

    let touchHandlers = (this.props.centered && this.props.draggable) ? {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd
    } : {};

    let dy = Math.abs(this.state.dy) < this.props.deadzone ? 0 : this.state.dy;
    dy = dy > 0 ? (dy / this.props.weight) : dy;
    let containerStyle = {
      width: this.props.width,
      transform: this._startingTouch ? 'translateY(' + dy + 'px)' : null,
      transition: !this._startingTouch ? '100ms linear' : null
    }
    let transformStyle = {
      transformOrigin: '50% ' + dy + 'px'
    }

    return (
      <section className={'card-container'}>
        <ShrinkGrowTransitionGroup>
          {
            this.props.active ? (
              <section style={transformStyle}>
                <section
                  onClick={this.onClick}
                  style={containerStyle}
                  className={cardClasses}
                  {...touchHandlers}
                  >
                  {this.props.children}
                </section>
              </section>
            ) : null
          }
        </ShrinkGrowTransitionGroup>
      </section>
    );
  }
}

WhiteCard.defaultProps = {
  active: true,
  selected: false,
  centered: true,
  draggable: true,
  width: null,
  deadzone: 30,
  weight: 4,
  onRelease: () => true,
  onMove: () => {}
}

export default WhiteCard;

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CircleButton from './CircleButton';
import checkSvg from '../static/ic_done_black_24px.svg';

import './WhiteCard.css';

class WhiteCard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: false,
      dy: 0
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
    this.onTouchEnd = (e) => this._onTouchEnd(e)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.centered && !this.props.centered) {
      this.setState({
        selected: false
      });
    }
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
    this._startingTouch = null;
    this.setState({ dy: 0 });
  }

  render() {
    let cardClasses = 'white-card';
    if (this.state.selected) {
      cardClasses += ' selected';
    }

    let touchHandlers = this.props.centered ? {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd
    } : {};

    // onClick={this.toggleSelected}

    let containerStyle = {
      width: this.props.width,
      transform: 'translateY(' + this.state.dy + 'px)',
      transition: !this._startingTouch ? '100ms linear' : null
    }

    return (
      <section
        style={containerStyle}
        className={cardClasses}
        {...touchHandlers}
        >
        {this.props.children}
        <section className={"bottom flex-centered"}>
          <ReactCSSTransitionGroup
            transitionName="circle-button"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
            >
            {
              this.state.selected ? (
                <CircleButton icon={checkSvg} color={"#BDD07F"} />
              ) : null
            }
          </ReactCSSTransitionGroup>
        </section>
      </section>
    );
  }
}

WhiteCard.defaultProps = {
  selected: false,
  centered: true,
  width: null
}

export default WhiteCard;

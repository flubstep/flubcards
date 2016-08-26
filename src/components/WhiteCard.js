import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CircleButton from './CircleButton';
import checkSvg from '../static/ic_done_black_24px.svg';

import './WhiteCard.css';

class WhiteCard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: false
    }
    this.toggleSelected = () => {
      if (this.props.centered) {
        this.setState({
          selected: !this.state.selected
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.centered && !this.props.centered) {
      this.setState({
        selected: false
      });
    }
  }

  render() {
    let cardClasses = 'white-card';
    if (this.state.selected) {
      cardClasses += ' selected';
    }
    return (
      <section onClick={this.toggleSelected} className={cardClasses}>
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
  centered: true
}

export default WhiteCard;

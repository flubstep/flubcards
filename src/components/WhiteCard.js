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
      this.setState({
        selected: !this.state.selected
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
  selected: false
}

export default WhiteCard;

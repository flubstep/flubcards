import React from 'react';

import ShrinkGrowTransitionGroup from './ShrinkGrowTransitionGroup';
import CircleButton from './CircleButton';

import undoSvg from '../static/ic_undo_black_24px.svg';
import './BlackCard.css';

const BLANK = '________.'

class BlackCard extends React.Component {

  render() {
    let answer = this.props.answer ? this.props.answer : BLANK;
    let answerClass = this.props.answer ? 'answer-text' : null;
    let split = this.props.text.split('$ANSWER');
    let beforeText = split[0];
    let afterText = split[1];
    return (
      <section className={"black-card"}>
        <section>
         {beforeText}<span className={answerClass}>{answer}</span>{afterText}
        </section>
        <section className={"flex-centered"}>
          <ShrinkGrowTransitionGroup>
            {
              this.props.checked ? (
                <CircleButton onClick={this.props.onClick} icon={undoSvg} />
              ) : null
            }
          </ShrinkGrowTransitionGroup>
        </section>
      </section>
    );
  }
}

BlackCard.defaultProps = {
  text: "This black card is filling in for $ANSWER",
  answer: null,
  checked: false,
  onClick: () => {}
}

export default BlackCard;

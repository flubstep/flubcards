import React from 'react';
import { trimEnd } from 'lodash';

import './BlackCard.css';

const BLANK = '________'

class BlackCard extends React.Component {

  render() {
    let answer = this.props.answer ? this.props.answer : BLANK;
    let answerClass = this.props.answer ? 'answer-text' : null;
    let split = this.props.text.split('$ANSWER');
    let beforeText = split[0];
    let afterText = split[1];
    if (!afterText) {
      answerClass += ' newline';
    } else {
      answer = trimEnd(answer, '.');
    }
    return (
      <section className={"black-card-container"}>
        <section className={"black-card large" + (this.props.hover ? " hover" : "")}>
          <section>
           {beforeText}<span className={answerClass}>{answer}</span>{afterText}
          </section>
        </section>
      </section>
    );
  }
}

BlackCard.defaultProps = {
  text: "This black card is filling in for $ANSWER",
  answer: null,
  checked: false,
  hover: false,
  onClick: () => {}
}

export default BlackCard;

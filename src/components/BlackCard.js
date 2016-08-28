import React from 'react';

import ShrinkGrowTransitionGroup from './ShrinkGrowTransitionGroup';
import CircleButton from './CircleButton';

import svgCheck from '../static/ic_done_black_24px.svg';
import './BlackCard.css';

class BlackCard extends React.Component {

  render() {
    return (
      <section className={"black-card"}>
        {this.props.children}
        <section className={"flex-centered"}>
          <ShrinkGrowTransitionGroup>
            {
              this.props.checked ? (
                <CircleButton onClick={this.props.onClick} icon={svgCheck} />
              ) : null
            }
          </ShrinkGrowTransitionGroup>
        </section>
      </section>
    );
  }
}

BlackCard.defaultProps = {
  checked: false,
  onClick: () => {}
}

export default BlackCard;

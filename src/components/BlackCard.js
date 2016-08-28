import React from 'react';

import './BlackCard.css';
import ShrinkGrowTransitionGroup from './ShrinkGrowTransitionGroup';

class BlackCard extends React.Component {

  render() {
    return (
      <ShrinkGrowTransitionGroup>
        <section className={"black-card"}>
          {this.props.children}
        </section>
      </ShrinkGrowTransitionGroup>
    );
  }
}

export default BlackCard;

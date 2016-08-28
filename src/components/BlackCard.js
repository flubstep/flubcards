import React from 'react';

import ShrinkGrowTransitionGroup from './ShrinkGrowTransitionGroup';
import CircleButton from './CircleButton';

import undoSvg from '../static/ic_undo_black_24px.svg';
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
  checked: false,
  onClick: () => {}
}

export default BlackCard;

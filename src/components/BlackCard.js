import React from 'react';

import './BlackCard.css';

class BlackCard extends React.Component {

  render() {
    return (
      <section className={"black-card"}>
        {this.props.children}
      </section>
    );
  }
}

export default BlackCard;

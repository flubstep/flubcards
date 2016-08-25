import React from 'react';

import './CircleButton.css';

class CircleButton extends React.Component {

  render() {
    return (
      <section
        style={{
          opacity: this.props.opacity,
          backgroundColor: this.props.color
        }}
        className={"circle-button flex-centered"}
        >
        {
          this.props.icon ? (
            <img src={this.props.icon} />
          ) : null
        }
      </section>
    );
  }
}

CircleButton.defaultProps = {
  color: '#FFFFFF',
  opacity: 1.0
}

export default CircleButton;

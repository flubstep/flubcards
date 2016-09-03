import React from 'react';

import './CircleButton.css';

class CircleButton extends React.Component {

  render() {
    return (
      <section
        onClick={this.props.disabled ? null : this.props.onClick}
        style={{
          opacity: this.props.disabled ? 0.3 : 1.0,
          backgroundColor: this.props.color
        }}
        className={"circle-button flex-centered"}
        >
        {
          this.props.icon ? (
            <img role="presentation" src={this.props.icon} />
          ) : null
        }
      </section>
    );
  }
}

CircleButton.defaultProps = {
  disabled: false,
  color: '#FFFFFF',
  opacity: 1.0
}

export default CircleButton;

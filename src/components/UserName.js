import React from 'react';

import './UserName.css';
import personSvg from '../static/ic_person_black_24px.svg';

class UserName extends React.Component {

  render() {
    return (
      <section className={"username"}>
        <img role="presentation" src={personSvg} />
        {this.props.children}
      </section>
    );
  }
}

export default UserName;

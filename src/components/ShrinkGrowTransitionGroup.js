import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './ShrinkGrowTransitionGroup.css';

const ShrinkGrowTransitionGroup = (props) => (
  <ReactCSSTransitionGroup
    transitionName="shrink-grow"
    transitionAppearTimeout={200}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
    >
    {props.children}
  </ReactCSSTransitionGroup>
)

export default ShrinkGrowTransitionGroup;
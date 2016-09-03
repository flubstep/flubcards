import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator'

import './LoadingScreen.css';

const LoadingScreen = (props) => (
  <section className="loading-screen">
    <LoadingIndicator />
  </section>
);

export default LoadingScreen;
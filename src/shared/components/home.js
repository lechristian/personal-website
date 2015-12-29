/* ==========================================================================
 * ./src/shared/components/home.js
 *
 * Home Page
 * ========================================================================== */

import React, { Component } from 'react';
import requireImage from 'utils/requireImage';

class Home extends Component {
  render() {
    return (
      <div className="page page--home">
        <div className="logo">
          <img src={ requireImage('logo.png').toString() } />
        </div>
      </div>
    );
  }
}

export default Home;

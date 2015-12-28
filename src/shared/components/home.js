/* ==========================================================================
 * ./src/shared/components/home.js
 *
 * Home Page
 * ========================================================================== */

import React, { Component } from 'react';
import imageResolver from '../../../utils/imageResolver';

class Home extends Component {
  render() {
    let logo;
    if (process.env.BROWSER) {
      logo = require('../../../static/images/logo.png');
    } else {
      logo = imageResolver('logo.png');
    }

    return (
      <div className="page page--home">
        <div className="logo">
          <img src={ logo.toString() } />
        </div>
      </div>
    );
  }
}

export default Home;

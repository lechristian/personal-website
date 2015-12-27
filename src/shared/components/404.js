/* ==========================================================================
 * ./src/shared/components/404/index.js
 *
 * 404 Page
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';

class Error404 extends Component {
  render() {
    return (
      <div className="page page--404">
        <h1 className="page-title">404: Page not found</h1>
        <p><Link to="/home">Head back home</Link></p>
      </div>
    );
  }
}

export default Error404;

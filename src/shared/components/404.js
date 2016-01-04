/* ==========================================================================
 * ./src/shared/components/404.js
 *
 * 404 Page
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import { updateHelmetProps } from 'config/helmet';

class Error404 extends Component {
  render() {
    const helmetProps = updateHelmetProps(
      'http://christianle.com',
      '404 | Christian Le',
      'I think you tried to find a page that doesn\'t exist!'
    );

    return (
      <div>
        <Helmet { ...helmetProps } />
        <div className="page page--404">
          <h1 className="page-title">404: Page not found</h1>
          <p><Link to="/home">Head back home</Link></p>
        </div>
      </div>
    );
  }
}

export default Error404;

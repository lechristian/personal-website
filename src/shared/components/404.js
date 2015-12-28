/* ==========================================================================
 * ./src/shared/components/404.js
 *
 * 404 Page
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

class Error404 extends Component {
  render() {
    return (
      <DocumentTitle title="Christian Le | 404">
        <div className="page page--404">
          <h1 className="page-title">404: Page not found</h1>
          <p><Link to="/home">Head back home</Link></p>
        </div>
      </DocumentTitle>
    );
  }
}

export default Error404;

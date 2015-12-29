/* ==========================================================================
 * ./src/routes.js
 *
 * App routes
 * ========================================================================== */

import { Route } from 'react-router';
import React from 'react';

import App from 'src/shared/components/app';

import HomePage from 'src/shared/components/home';
import Error404 from 'src/shared/components/404';

export default (
  <Route name="app" path="/" component={ App }>
    <Route path="home" component={ HomePage } />
    <Route path="*" component={ Error404 } />
  </Route>
);

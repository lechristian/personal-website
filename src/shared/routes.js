/* ==========================================================================
 * ./src/routes.js
 *
 * App routes
 * ========================================================================== */

import { Route } from 'react-router';
import React from 'react';

import App from './components/app';

import HomePage from './components/home';
import Error404 from './components/404';

export default (
  <Route name="app" path="/" component={ App }>
    <Route path="home" component={ HomePage } />
    <Route path="*" component={ Error404 } />
  </Route>
);

/* ==========================================================================
 * ./src/shared/components/app.js
 *
 * React/Redux App
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import GoogleAnalytics from 'react-g-analytics';

import Navigation from 'src/shared/components/navigation';
import Home from 'src/shared/components/home';

import * as BlurbsActions from 'src/shared/actions/blurbs';

import { HelmetBaseConfig } from 'config/helmet';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { blurbs } = this.props;
    if (blurbs.length <= 0) {
      this.props.fetchBlurbs();
    }
  }

  componentDidUpdate() {
    this.refs.scrollingContainer.scrollTop = 0;
  }

  render() {
    return (
      <div>
        <Helmet { ...HelmetBaseConfig } />
        <div className="container">
          <div className="nav">
            <Navigation />
          </div>
          <div ref="scrollingContainer" className="content">
            { !this.props.children && <Home /> }
            { this.props.children }
          </div>
          <GoogleAnalytics id={ process.env.GA_ID } />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  blurbs: PropTypes.array,
  fetchBlurbs: PropTypes.func
};

App.need = [
  BlurbsActions.fetchBlurbs
];

function mapStateToProps(state) {
  return {
    blurbs: state.blurbs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BlurbsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

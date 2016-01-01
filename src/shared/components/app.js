/* ==========================================================================
 * ./src/shared/components/app.js
 *
 * React/Redux App
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import GoogleAnalytics from 'react-g-analytics';

import Navigation from 'src/shared/components/navigation';
import Home from 'src/shared/components/home';

import * as BlurbsActions from 'src/shared/actions/blurbs';

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

  render() {
    if (process.env.BROWSER) {
      console.log(process.env.GA_ID);
    }

    return (
      <DocumentTitle title="Christian Le">
        <div className="container">
          <div className="nav">
            <Navigation />
          </div>
          <div className="content">
            { !this.props.children && <Home /> }
            { this.props.children }
          </div>
          <GoogleAnalytics id={ process.env.GA_ID } />
        </div>
      </DocumentTitle>
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

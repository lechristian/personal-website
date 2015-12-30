/* ==========================================================================
 * ./src/shared/components/app.js
 *
 * React/Redux App
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Home from 'src/shared/components/home';
// import Terminal from 'src/shared/components/terminal'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { blurbs } = this.props;
    console.log(blurbs);

    return (
      <DocumentTitle title="Christian Le">
        <div className="container">
          <div className="nav">
          </div>
          <div className="content">
            { !this.props.children && <Home /> }
            { this.props.children }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  blurbs: PropTypes.array
};

function mapStateToProps(state) {
  return {
    blurbs: state.blurbs
  };
}

function mapDispatchToProps(dispatch) {
  dispatch.toString();
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

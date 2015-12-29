/* ==========================================================================
 * ./src/shared/components/app.js
 *
 * React/Redux App
 * ========================================================================== */

// import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
// import { Link } from 'react-router';
// import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Home from 'src/shared/components/home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { } = this.props;

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
  children: React.PropTypes.element
};

function mapStateToProps(state) {
  state.toString();
  return {};
}

function mapDispatchToProps(dispatch) {
  dispatch.toString();
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/* ==========================================================================
 * ./src/shared/components/app/index.js
 *
 * React/Redux App
 * ========================================================================== */

// import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
// import { Link } from 'react-router';
// import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { } = this.props;

    return (
      <div className="container">
        <div className="nav">

        </div>
        <div className="content">
          { !this.props.children && <Home /> }
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
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

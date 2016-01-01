/* ==========================================================================
 * ./src/shared/components/navigation.js
 *
 * Site Navigation
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SimpleNavigation from 'src/shared/components/nav/simple';
// import TerminalNavigation from 'src/shared/components/nav/terminal';

import * as NavigationActions from 'src/shared/actions/navigation';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Launch Terminal
  }

  render() {
    const { blurbs, navigation } = this.props;

    console.log(navigation);

    return (
      <SimpleNavigation blurbs={ blurbs } />
    );
  }
}

Navigation.propTypes = {
  blurbs: PropTypes.array,
  navigation: PropTypes.object
};

function mapStateToProps(state) {
  const { blurbs, navigation } = state;
  return {
    blurbs,
    navigation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NavigationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
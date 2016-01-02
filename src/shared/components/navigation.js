/* ==========================================================================
 * ./src/shared/components/navigation.js
 *
 * Site Navigation
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SimpleNavigation from 'src/shared/components/nav/simple';
import TerminalNavigation from 'src/shared/components/nav/terminal';

import * as NavigationActions from 'src/shared/actions/navigation';

const NAV_TOP = 'nav-top';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.toggleTerminal();
  }

  render() {
    const { blurbs, navigation } = this.props;
    const isTerm = navigation.terminal;

    return (
      <div className="navs-container">
        <SimpleNavigation
          blurbs={ blurbs }
          className={ !isTerm ? NAV_TOP : '' }
        />
        <TerminalNavigation
          blurbs={ blurbs }
          closeTerminal={ this.props.toggleTerminal }
          className={ isTerm ? NAV_TOP : '' }
          key="terminal"
        />
        <div
          className={ `launcher-icon ${ !isTerm ? NAV_TOP : '' }` }
          onClick={ this.props.toggleTerminal }
        >
          <div className="menu-bar"></div>
          <div className="greater">&gt;</div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  blurbs: PropTypes.array,
  navigation: PropTypes.object,
  toggleTerminal: PropTypes.func
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

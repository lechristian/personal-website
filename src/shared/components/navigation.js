/* ==========================================================================
 * ./src/shared/components/navigation.js
 *
 * Site Navigation
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        <ReactCSSTransitionGroup
          transitionName="terminal"
          transitionAppearTimeout={ 600 }
          transitionEnterTimeout={ 600 }
          transitionLeaveTimeout={ 600 }
          className={ `terminal-container ${ isTerm ? NAV_TOP : '' }` }
          component="div"
        >
          { isTerm ? (
            <TerminalNavigation
              blurbs={ blurbs }
              closeTerminal={ this.props.toggleTerminal }
              key="terminal"
            />
          ) : null }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="launcher"
          transitionAppearTimeout={ 600 }
          transitionEnterTimeout={ 600 }
          transitionLeaveTimeout={ 600 }
          className="launcher-container"
          component="div"
          onClick={ this.props.toggleTerminal }
        >
          { !isTerm && navigation.launcher ? (
            <div className="launcher-icon">
              <div className="menu-bar"></div>
              <div className="greater">&gt;</div>
            </div>
          ) : null }
        </ReactCSSTransitionGroup>
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

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

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.toggleTerminal();
  }

  render() {
    const { blurbs, navigation } = this.props;

    let navTop = 'navTop';
    let terminalNavigation = null;
    let launcherIcon = (
      <div className="launcher-icon">
        <div className="menu-bar"></div>
        <div className="greater">&gt;</div>
      </div>
    );

    if (navigation.terminal) {
      terminalNavigation = (
        <TerminalNavigation
          blurbs={ blurbs }
          closeTerminal={ this.props.toggleTerminal }
          key="terminal"
        />
      );

      launcherIcon = null;
      navTop = '';
    }


    return (
      <div className="nav-container">
        <ReactCSSTransitionGroup
          transitionName="terminal"
          transitionAppearTimeout={ 750 }
          transitionEnterTimeout={ 750 }
          transitionLeaveTimeout={ 750 }
          className="terminal-container"
          component="div"
        >
          { terminalNavigation }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="launcher"
          transitionAppearTimeout={ 750 }
          transitionEnterTimeout={ 750 }
          transitionLeaveTimeout={ 750 }
          className="launcher-container"
          component="div"
          onClick={ this.props.toggleTerminal }
        >
          { launcherIcon }
        </ReactCSSTransitionGroup>
        <SimpleNavigation className={ navTop } blurbs={ blurbs } />
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

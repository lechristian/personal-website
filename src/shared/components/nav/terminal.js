/* ==========================================================================
 * ./src/shared/components/nav/terminal.js
 *
 * Terminal Navigation
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
// import _ from 'lodash';

class TerminalNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="terminal-nav">
        <div className="terminal">
          <div className="menu-bar">
            <div className="close" onClick={ this.props.closeTerminal }></div>
          </div>
          <div className="command">

          </div>
        </div>
      </div>
    );
  }
}

TerminalNavigation.propTypes = {
  blurbs: PropTypes.array,
  closeTerminal: PropTypes.func
};

export default TerminalNavigation;

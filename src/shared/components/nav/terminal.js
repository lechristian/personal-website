/* ==========================================================================
 * ./src/shared/components/nav/terminal.js
 *
 * Terminal Navigation
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router';

import * as TerminalActions from 'src/shared/actions/terminal';

const STATIC_PROMPT = (
  <span className="prompt monospace">
    <span className="start color--accent">
      &loz;
    </span>
    <span className="color--primary">
      &rArr;
    </span>
  </span>
);

class TerminalNavigation extends Component {
  constructor(props) {
    super(props);
    this._focusCommandInput = this._focusCommandInput.bind(this);
  }

  componentDidMount() {
    this._focusCommandInput();
  }

  componentDidUpdate() {
    this._focusCommandInput();
  }

  _focusCommandInput() {
    this.refs.commandInput.focus();
  }

  render() {
    const { executed, timestamp, className } = this.props;

    const previousExecutions = _.map(executed, (e, index) => {
      return (
        <div key={ `previous-comment-${ index }` }>
          { STATIC_PROMPT }
          <span className="color--l-grey">{ e.command }</span>
        </div>
      );
    });

    return (
      <div className={ `terminal-nav ${ className }` }>
        <div className="terminal">
          <div className="menu-bar">
            <div className="close" onClick={ this.props.closeTerminal }></div>
          </div>
          <div className="shell" onClick={ this._focusCommandInput }>
            <div className="previous">
              { previousExecutions }
            </div>
            { STATIC_PROMPT }
            <input
              key={ timestamp }
              ref="commandInput"
              className="command monospace"
              onKeyDown={ this.props.executeCommand }
            />
          </div>
        </div>
      </div>
    );
  }
}

TerminalNavigation.propTypes = {
  className: PropTypes.string,
  closeTerminal: PropTypes.func,
  executeCommand: PropTypes.func,
  executed: PropTypes.array,
  timestamp: PropTypes.string
};

function mapStateToProps(state) {
  const { terminal } = state;
  return {
    executed: terminal.executed,
    timestamp: terminal.timestamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TerminalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalNavigation);

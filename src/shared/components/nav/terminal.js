/* ==========================================================================
 * ./src/shared/components/nav/terminal.js
 *
 * Terminal Navigation
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LsComponent from 'src/shared/components/nav/term/ls';

import * as TerminalActions from 'src/shared/actions/terminal';

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
    const { executed, timestamp, currentPath, className } = this.props;

    const previousExecutions = _.map(executed, (e, index) => {
      let responseStyling = e.response;
      if (e.command === 'ls' && _.isArray(e.response)) {
        responseStyling = (
          <LsComponent listings={ e.response } />
        );
      }

      return (
        <div className="previous--item" key={ `previous-comment-${ index }` }>
          <div className="command-line">
            <span className="prompt monospace">
              <span className="start color--accent">
                &loz;
              </span>
              <span className="start color--accent">
                { e.path.substring(1) }
              </span>
              <span className="color--primary">
                &rArr;
              </span>
            </span>
            <span className="color--l-grey">{ e.command }</span>
          </div>
          <div className="response">
            { responseStyling }
          </div>
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
            <div className="command-line">
              <span className="prompt monospace">
                <span className="start color--accent">
                  &loz;
                </span>
                <span className="start color--accent">
                  { currentPath.substring(1) }
                </span>
                <span className="color--primary">
                  &rArr;
                </span>
              </span>
              <input
                key={ timestamp }
                ref="commandInput"
                className="command monospace"
                onKeyDown={ this.props.executeCommand }
              />
          </div>
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
  timestamp: PropTypes.string,
  currentPath: PropTypes.string
};

function mapStateToProps(state) {
  const { terminal } = state;
  return {
    executed: terminal.executed,
    timestamp: terminal.timestamp,
    currentPath: terminal.path
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TerminalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalNavigation);

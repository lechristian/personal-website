/* ==========================================================================
 * ./src/shared/components/nav/terminal.js
 *
 * Terminal Navigation
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import PromptComponent from 'src/shared/components/nav/term/prompt';
import LsComponent from 'src/shared/components/nav/term/ls';

import * as TerminalActions from 'src/shared/actions/terminal';
TerminalActions.pushState = pushState;

class TerminalNavigation extends Component {
  constructor(props) {
    super(props);
    this._focusCommandInput = this._focusCommandInput.bind(this);
  }

  componentDidMount() {
    this._focusCommandInput();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.render;
  }

  componentDidUpdate() {
    const { redirect, deleteRedirect } = this.props;
    if (redirect) {
      this.props.pushState(null, redirect, '');
      deleteRedirect();
    }

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
            <PromptComponent promptPath={ e.path.substring(1) } />
            <span className="command--old color--l-grey">{ e.command }</span>
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
              <PromptComponent promptPath={ currentPath.substring(1) } />
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
  closeTerminal: PropTypes.func,
  executeCommand: PropTypes.func,
  pushState: PropTypes.func,
  deleteRedirect: PropTypes.func,
  className: PropTypes.string,
  currentPath: PropTypes.string,
  executed: PropTypes.array,
  redirect: PropTypes.string,
  timestamp: PropTypes.string,
  render: PropTypes.bool
};

function mapStateToProps(state) {
  const { terminal } = state;
  return {
    currentPath: terminal.path,
    executed: terminal.executed,
    redirect: terminal.redirect,
    timestamp: terminal.timestamp,
    render: terminal.render
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TerminalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalNavigation);

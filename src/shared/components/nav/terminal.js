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
import ReactMarkdown from 'react-markdown';

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

  componentDidUpdate() {
    const { terminal, deleteRedirect } = this.props;
    const { redirect, selector, prevSelector, executed, tab } = terminal;
    if (redirect) {
      this.props.pushState(null, redirect, '');
      deleteRedirect();
    }

    let inputValue = null;
    if (selector !== 0) {
      inputValue = executed[executed.length - selector].command;
    } else if (prevSelector !== 0) {
      inputValue = '';
    } else if (tab !== null || tab !== undefined || tab !== '') {
      inputValue = tab;
    }

    this._focusCommandInput({
      shouldUpdate: inputValue !== null,
      newInputValue: inputValue
    });
  }

  _focusCommandInput(data) {
    if (data && data.shouldUpdate) {
      this.refs.commandInput.value = data.newInputValue;
    }

    this.refs.commandInput.focus();
  }

  render() {
    const { terminal, className } = this.props;
    const { executed, timestamp, path } = terminal;

    const previousExecutions = _.map(executed, (e, index) => {
      let responseStyling = e.response;
      if (_.includes(e.command, 'ls') && _.isArray(e.response)) {
        responseStyling = (
          <LsComponent listings={ e.response } />
        );
      } else if (_.includes(e.command, 'cat')) {
        responseStyling = (
          <ReactMarkdown source={ e.response } />
        );
      }

      return (
        <div
          className="previous--item"
          key={ `no-select previous-comment-${ index }` }
        >
          <div className="command-line">
            <PromptComponent promptPath={ e.path.substring(1) } />
            <span className="no-select command--old color--l-grey">
              { e.command }
            </span>
          </div>
          <div className="no-select response">
            { responseStyling }
          </div>
        </div>
      );
    });

    return (
      <div className={ `no-select terminal-nav ${ className }` }>
        <div className="no-select terminal">
          <div className="no-select menu-bar">
            <div
              className="no-select close"
              onClick={ this.props.closeTerminal }
            ></div>
          </div>
          <div className="no-select shell" onClick={ this._focusCommandInput }>
            <div className="no-select previous">
              { previousExecutions }
            </div>
            <div className="no-select command-line">
              <PromptComponent promptPath={ path.substring(1) } />
              <input
                key={ timestamp }
                ref="commandInput"
                className="no-select command monospace"
                onKeyDown={ (evt) => {
                  if (evt.which === 9) {
                    evt.preventDefault();
                  }

                  this.props.executeCommand(evt, path);
                } }
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
  terminal: PropTypes.object,
  className: PropTypes.string,
  path: PropTypes.string,
  executed: PropTypes.array,
  redirect: PropTypes.string,
  timestamp: PropTypes.string,
  render: PropTypes.bool
};

function mapStateToProps(state) {
  const { terminal, navigation } = state;
  return {
    terminal,
    render: navigation.render
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TerminalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalNavigation);

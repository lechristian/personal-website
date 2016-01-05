/* ==========================================================================
 * ./src/shared/components/blurbs.js
 *
 * Blurbs List Page
 * ========================================================================== */

// import _ from 'lodash';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import requireImage from 'utils/requireImage';

import MessageSent from 'src/shared/components/sent';

import * as MessageActions from 'src/shared/actions/message';

import { updateHelmetProps } from 'config/helmet';

class Message extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.updateValue();
  }

  _handleSubmit(e, payload) {
    e.preventDefault();

    const { sendMessage, message } = this.props;
    sendMessage(message, payload);
  }

  render() {
    const { updateValue, sent, disable } = this.props;

    const helmetProps = updateHelmetProps(
      'http://christianle.com/message',
      'Message Me | Christian Le',
      'Send me a message! I\'ll get back as soon as I can.'
    );

    const formProps = {
      action: '/api/message',
      method: 'post',
      className: 'form form--message'
    };

    const textAreaProps = {
      id: 'message',
      name: 'message',
      rows: 5,
      onChange: updateValue
    };

    const submitProps = {
      className: `btn btn--submit ${ !disable ? 'ready' : '' }`,
      type: 'submit',
      value: 'Send'
    };

    const pageBody = !sent ? (
      <form {...formProps} onSubmit={ this._handleSubmit }>
        <div className="input-container">
          <input id="name" name="name" onChange={ updateValue } required />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-container">
          <input type="email" id="email" name="email" onChange={ updateValue } required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-container">
          <textarea { ...textAreaProps } required ></textarea>
          <label htmlFor="message">Message</label>
        </div>
        <div className="input-container">
          <input { ...submitProps } />
        </div>
      </form>
    ) : (
      <MessageSent />
    );

    return (
      <div className="page page--message">
        <Helmet { ...helmetProps } />
        <div className="image-wrapper">
          <img src={ requireImage('me.jpg').toString() } />
        </div>
        <h3 className="center">Send me a message!</h3>
        { pageBody }
        <div className="links">
          <div className="link">
            <a href="mailto:christian@outcomes.com" target="_blank">Email</a>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  sent: PropTypes.bool,
  disable: PropTypes.bool,
  updateValue: PropTypes.func,
  sendMessage: PropTypes.func,
  deleteRedirect: PropTypes.func,
  pushState: PropTypes.func,
  message: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    message: state.message.message,
    sent: state.message.sent,
    showEmail: state.showEmail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MessageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);

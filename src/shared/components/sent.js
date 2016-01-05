/* ==========================================================================
 * ./src/shared/components/sent.js
 *
 * Message Sent
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';

class MessageSent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message-sent">
        <h3 className="center">Message Sent!</h3>
        <h5 className="center light">I'll get back to you as soon as I can.</h5>
        <div className="nav-links">
          <Link to={'/blurbs'} className="inline">Blurbs</Link>
          <div className="inline">|</div>
          <Link to={'/photos'} className="inline">Photos</Link>
          <div className="inline">|</div>
          <Link to={'/'} className="inline">Home</Link>
        </div>
      </div>
    );
  }
}

export default MessageSent;

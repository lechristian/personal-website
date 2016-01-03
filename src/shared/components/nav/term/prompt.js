/* ==========================================================================
 * ./src/shared/components/nav/term/prompt.js
 *
 * Prompt component with the correct path displayed
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';

class PromptComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { promptPath } = this.props;

    return (
      <span className="prompt monospace">
        <span className="start color--accent">
          &loz;
        </span>
        <span className="start color--accent">
          { promptPath }
        </span>
        <span className="color--primary">
          &rArr;
        </span>
      </span>
    );
  }
}

PromptComponent.propTypes = {
  promptPath: PropTypes.string,
};

export default PromptComponent;

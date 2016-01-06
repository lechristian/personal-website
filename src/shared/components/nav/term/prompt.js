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
      <span className="no-select prompt monospace">
        <span className="no-select start color--accent">
          &loz;
        </span>
        <span className="no-select start color--accent">
          { promptPath }
        </span>
        <span className="no-select color--primary">
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

/* ==========================================================================
 * ./src/shared/components/nav/terminal.js
 *
 * Terminal Navigation
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class LsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listings } = this.props;

    const format = _.map(listings, (listing, index) => {
      const isFolder = listing[listing.length - 1] === '/';
      const name = isFolder
        ? listing.substring(1, listing.length - 1)
        : listing.substring(1);

      return (
        <div
          key={ `listing-${ index }` }
          className={ `option ${ isFolder ? 'folder' : '' }` }
        >
          <Link to={ `/${ name }` }>{ name }</Link>
        </div>
      );
    });

    return (
      <div className="ls">
        { format }
      </div>
    );
  }
}

LsComponent.propTypes = {
  listings: PropTypes.array,
};

export default LsComponent;

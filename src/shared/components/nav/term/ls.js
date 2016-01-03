/* ==========================================================================
 * ./src/shared/components/nav/term/ls.js
 *
 * Ls Component for listing out after running ls
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
      const link = isFolder
        ? listing.substring(1, listing.length - 1)
        : listing.substring(1);

      const name = listing.replace(/\/$/, '').split('/').pop();

      return (
        <div
          key={ `listing-${ index }` }
          className={ `option ${ isFolder ? 'folder' : '' }` }
        >
          <Link to={ `/${ link }` }>{ name }</Link>
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

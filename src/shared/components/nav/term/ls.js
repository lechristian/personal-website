/* ==========================================================================
 * ./src/shared/components/nav/term/ls.js
 *
 * Ls Component for listing out after running ls
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class LsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listings } = this.props;
    const parsed = _.map(listings, (listing) => {
      const isFolder = listing[listing.length - 1] === '/';
      const link = isFolder
        ? listing.substring(1, listing.length - 1)
        : listing.substring(1);

      let name = listing.replace(/\/$/, '').split('/').pop();
      if (isFolder) {
        name += '/';
      }

      return {
        isFolder,
        link,
        name
      };
    }).sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    const format = _.map(parsed, (listing, index) => {
      return (
        <div
          key={ `listing-${ index }` }
          className={ `option ${ listing.isFolder ? 'folder' : '' }` }
        >
          <Link to={ `/${ listing.link }` }>{ listing.name }</Link>
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

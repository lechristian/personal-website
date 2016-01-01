/* ==========================================================================
 * ./src/shared/components/nav/simple.js
 *
 * Simple Navigation
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class SimpleNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { blurbs, className } = this.props;

    const blurbLinks = _.map(blurbs, (blurb, index) => {
      const fileName = blurb.file.replace(/\.md$/, '');
      return (
        <li key={ `blurb-${ index }` }>
          <Link to={ `/blurb/${ fileName }` }>
            { blurb.title }
          </Link>
        </li>
      );
    });

    return (
      <div className={ `simple-nav ${ className }` }>
        <ul className="outer">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/photos">Photos</Link>
          </li>
          <li>
            <Link to="/blurbs">Blurbs</Link>
            <ul className="inner">
              { blurbLinks }
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

SimpleNavigation.propTypes = {
  blurbs: PropTypes.array,
  className: PropTypes.string
};

export default SimpleNavigation;

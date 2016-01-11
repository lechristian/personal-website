/* ==========================================================================
 * ./src/shared/components/nav/simple.js
 *
 * Simple Navigation
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

const mdExtRegex = /\.md$/;
const preNumRegex = /^[0-9]*/;

class SimpleNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { blurbs, className } = this.props;

    const blurbsReversed = [];
    _.forEach(blurbs, (blurb) => {
      const rowIndex = parseInt(blurb.file.match(preNumRegex), 10) - 1;
      blurbsReversed[rowIndex] = blurb;
    });
    blurbsReversed.reverse();

    let prevYear = 0;
    const blurbLinks = [];
    _.forEach(blurbsReversed, (blurb, index) => {
      const blurbFileName = blurb.file.replace(mdExtRegex, '');
      const blurbDate = moment(blurb.date, 'MM/DD/YYYY');

      if (prevYear !== blurbDate.year()) {
        prevYear = blurbDate.year();
        blurbLinks.push(
          <li key={ `blurbs-year-${ index }` } className="nav--blurbs-year">
            { blurbDate.year() }
          </li>
        );
      }

      blurbLinks.push(
        <li key={ `blurb-${ index }` } className="nav--blurbs">
          <Link to={ `/blurbs/${ blurbFileName }` } className="nav--blurb">
            <span className="date">
              { blurbDate.format('M/D: ') }
            </span>
            <span className="title">
              { blurb.title }
            </span>
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
          <li>
            <Link to="/message">Message</Link>
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

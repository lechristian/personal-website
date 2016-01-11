/* ==========================================================================
 * ./src/shared/components/blurbs.js
 *
 * Blurbs List Page
 * ========================================================================== */

import _ from 'lodash';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';

import { updateHelmetProps } from 'config/helmet';

const mdExtRegex = /\.md$/;
const preNumRegex = /^[0-9]*/;

class Blurbs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { blurbs } = this.props;

    const rows = [];
    _.forEach(blurbs, (blurb) => {
      const rowIndex = parseInt(blurb.file.match(preNumRegex), 10) - 1;
      const blurbFileName = blurb.file.replace(mdExtRegex, '');
      rows[rowIndex] = (
        <Link key={ rowIndex } to={ `blurbs/${ blurbFileName }` }>
          <div className="row">
            <h3 className="row--title bold">
              { blurb.title }
            </h3>
            <p className="row--desc">
              { blurb.description }
            </p>
            <p className="row--date light">
              { moment(blurb.date, 'MM/DD/YYYY').format('MMMM D, YYYY') }
            </p>
          </div>
        </Link>
      );
    });

    rows.reverse();

    const helmetProps = updateHelmetProps(
      'http://christianle.com/blurbs',
      'Blurbs | Christian Le',
      'A collection of blurbs about almost anything! I\'ll be using blurbs as a way to write tutorials, rants, and blogs.'
    );

    return (
      <div>
        <Helmet { ...helmetProps } />
        <div className="page page--blurbs">
          <h1 className="title center">
            Blurbs
          </h1>
          <div className="rows">
            { rows }
          </div>
          <div className="nav-links">
            <Link to={'/photos'} className="inline">Photos</Link>
            <div className="inline">|</div>
            <Link to={'/'} className="inline">Home</Link>
          </div>
        </div>
      </div>
    );
  }
}

Blurbs.propTypes = {
  blurbs: PropTypes.array
};

function mapStateToProps(state) {
  return {
    blurbs: state.blurbs
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Blurbs);

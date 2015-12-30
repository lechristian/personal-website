/* ==========================================================================
 * ./src/shared/components/blurbs.js
 *
 * Blurbs List Page
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const mdExt = /\.md$/;
const preNum = /^[0-9]*\-/;

class Blurbs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { blurbs } = this.props;

    const rows = [];
    _.forEach(blurbs, (blurb) => {
      const blurbFileName = blurb.file.replace(mdExt, '').replace(preNum, '');
      rows.push(
        <Link to={ `blurb/${ blurbFileName }` }>
          <div className="row--blurb">
            <div className="title">
              { blurb.title }
            </div>
            <div className="title">
              { blurb.description }
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className="page page--blurbs">
        { rows }
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

export default connect(mapStateToProps, {})(Blurbs);

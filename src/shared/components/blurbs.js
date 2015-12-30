/* ==========================================================================
 * ./src/shared/components/blurbs.js
 *
 * Blurbs List Page
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

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
          <div className="row">
            <h3 className="row--title bold">
              { blurb.title }
            </h3>
            <p className="row--desc">
              { blurb.description }
            </p>
          </div>
        </Link>
      );
    });

    return (
      <DocumentTitle title="Blurbs | Christian Le">
        <div className="page page--blurbs">
          <h1 className="title center">
            Blurbs
          </h1>
          <div className="rows">
            { rows }
          </div>
        </div>
      </DocumentTitle>
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

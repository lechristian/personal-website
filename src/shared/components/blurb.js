/* ==========================================================================
 * ./src/shared/components/blurb.js
 *
 * Specific Blurb Page
 * ========================================================================== */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import Error404 from 'src/shared/components/404';

import * as BlurbActions from 'src/shared/actions/blurb';

import { updateHelmetProps } from 'config/helmet';

class Blurb extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { markdown, fileName } = this.props;
    if (!markdown) {
      this.props.fetchBlurb(fileName);
    }
  }

  render() {
    const { markdown, url } = this.props;

    if (markdown && markdown.match(/^\<Not Found\>$/)) {
      return <Error404 />;
    } else if (!markdown) {
      const helmetProps = updateHelmetProps(
        url,
        'Blurb | Christian Le',
        'Blurb is loading...'
      );

      return (
        <div>
          <Helmet { ...helmetProps } />
          <div className="page page--blurb"></div>
        </div>
      );
    }

    const title = markdown.split('\n', 2)[0].substring(2);

    return (
      <div>
        <Helmet title={`${ title } | Christian Le`} />
        <div className="page page--blurb">
          <ReactMarkdown source={ markdown } />
          <div className="nav-links">
            <Link to={'/blurbs'} className="inline">Blurbs</Link>
            <div className="inline">|</div>
            <Link to={'/'} className="inline">Home</Link>
          </div>
        </div>
      </div>
    );
  }
}

Blurb.propTypes = {
  markdown: PropTypes.string,
  fileName: PropTypes.object,
  isFetching: PropTypes.bool,
  fetchBlurb: PropTypes.func,
  url: PropTypes.string
};

Blurb.need = [
  BlurbActions.fetchBlurb
];

function mapStateToProps(state) {
  const { blurb, router } = state;

  if (_.size(blurb.cache) > 0 && blurb.currentBlurb) {
    const cacheHit = blurb.cache[blurb.currentBlurb];
    return {
      url: router.location.pathname,
      isFetching: cacheHit.isFetching,
      markdown: cacheHit.markdown,
      fileName: cacheHit.params
    };
  } else if (blurb && router && blurb.cache[router.params.blurbId]) {
    const cacheHit = blurb.cache[router.params.blurbId];
    return {
      url: router.location.pathname,
      isFetching: cacheHit.isFetching,
      markdown: cacheHit.markdown,
      fileName: cacheHit.params
    };
  } else if (blurb && router && !blurb.cache[router.params.blurbId]) {
    return {
      url: router.location.pathname,
      isFetching: true,
      markdown: null,
      fileName: router.params
    };
  } else {
    return {
      url: router.location.pathname,
      isFetching: false,
      markdown: null,
      fileName: null
    };
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BlurbActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blurb);

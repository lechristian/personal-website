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

const WEBSITE_URL = 'http://christianle.com/blurbs';

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

  componentWillReceiveProps(nextProps) {
    const { router } = nextProps;
    const { fileName } = this.props;
    if (fileName && router.params.blurbId !== fileName.blurbId) {
      this.props.fetchBlurb(router.params);
    }
  }

  render() {
    const { markdown, url, summary } = this.props;

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
    const helmetProps = updateHelmetProps(
      url,
      `${ title } | Christian Le`,
      summary
    );

    return (
      <div>
        <Helmet { ...helmetProps } />
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
  fetchBlurb: PropTypes.func,
  isFetching: PropTypes.bool,
  router: PropTypes.object,
  blubr: PropTypes.object,
  fileName: PropTypes.object,
  markdown: PropTypes.string,
  summary: PropTypes.string,
  url: PropTypes.string
};

Blurb.need = [
  BlurbActions.fetchBlurb
];

function mapStateToProps(state) {
  const { blurb, router } = state;

  if (_.size(blurb.cache) > 0) {
    let blurbId;
    if (blurb.currentBlurb) {
      blurbId = blurb.currentBlurb;
    } else {
      blurbId = router.params.blurbId;
    }

    const cacheHit = blurb.cache[blurbId];
    if (cacheHit) {
      return {
        url: `${ WEBSITE_URL }/${ cacheHit.fileName.blurbId }`,
        isFetching: cacheHit.isFetching,
        markdown: cacheHit.markdown,
        fileName: cacheHit.fileName,
        summary: cacheHit.summary,
        router
      };
    }
  }

  return {
    isFetching: true,
    markdown: null,
    fileName: router.params,
    router
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BlurbActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blurb);

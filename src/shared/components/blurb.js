/* ==========================================================================
 * ./src/shared/components/blurb.js
 *
 * Specific Blurb Page
 * ========================================================================== */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import ReactMarkdown from 'react-markdown';
import * as BlurbActions from 'src/shared/actions/blurb';
import Error404 from 'src/shared/components/404';

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
    const next = nextProps.fileName;
    const curr = this.props.fileName;
    if (next.blurbId !== curr.blurbId) {
      this.props.fetchBlurb(next);
    }
  }

  render() {
    const { markdown } = this.props;

    if (!markdown) {
      return <Error404 />;
    }

    return (
      <DocumentTitle title="Blurb | Christian Le">
        <div className="page page--blurb">
          <ReactMarkdown source={ markdown } />
        </div>
      </DocumentTitle>
    );
  }
}

Blurb.propTypes = {
  markdown: PropTypes.string,
  fileName: PropTypes.object,
  isFetching: PropTypes.bool,
  fetchBlurb: PropTypes.func
};

Blurb.need = [
  BlurbActions.fetchBlurb
];

function mapStateToProps(state) {
  const { blurb, router } = state;
  const {
    isFetching,
    markdown,
    fileName
  } = blurb.cache[router.params.blurbId] || {
    isFetching: true,
    markdown: null,
    fileName: router.params
  };

  return {
    markdown,
    isFetching,
    fileName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BlurbActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blurb);

/* ==========================================================================
 * ./src/shared/components/photos.js
 *
 * Photos Page
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import requireImage from 'utils/requireImage';

import { updateHelmetProps } from 'config/helmet';

class Photos extends Component {
  render() {
    const photos = [];
    for (let i = 0; i < 5; i += 1) {
      photos.push(
        <div key={ `photo-${ i }` } className="photo--wrapper">
          <img src={ requireImage(`${ i }.jpg`).toString() } />
        </div>
      );
    }

    const helmetProps = updateHelmetProps(
      'http://christianle.com/photos',
      'Photos | Christian Le',
      'Here lies a small collection of photos I take.'
    );

    return (
      <div>
        <Helmet { ...helmetProps } />
        <div className="page page--photo">
          <h1 className="title center">
            Photos
          </h1>
          { photos }
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

export default Photos;

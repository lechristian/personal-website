/* ==========================================================================
 * ./src/shared/components/photos.js
 *
 * Photos Page
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';

import requireImage from 'utils/requireImage';

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

    return (
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
    );
  }
}

export default Photos;

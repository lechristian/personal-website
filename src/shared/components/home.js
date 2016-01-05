/* ==========================================================================
 * ./src/shared/components/home.js
 *
 * Home Page
 * ========================================================================== */

import React, { Component } from 'react';
import { Link } from 'react-router';

import requireImage from 'utils/requireImage';

class Home extends Component {
  render() {
    return (
      <div className="page page--home">
        <div className="logo">
          <img src={ requireImage('logo.png').toString() } />
        </div>
        <div className="margin-bottom-4">
          <p className="h2 margin-bottom-4">
            Hi there! I'm <b>Christian Le</b>,
          </p>
          <p className="h3 light lineheight-m">
            a <b>
              <a href="https://github.com/cle1994" target="_blank">
                software engineer
              </a>
            </b>
            &nbsp;born and raised in <b>
              <a href="https://goo.gl/Jpbpks" target="_blank">
                Southern California
              </a>
            </b> currently residing in the <b>
              <a href="https://goo.gl/knXZm4" target="_blank">
                Bay Area
              </a>
            </b> as a recent graduate from <b>
              <a href="http://www.berkeley.edu/" target="_blank">UC Berkeley</a>
            </b>. I co-founded and am currently working at <b>
              <a href="https://www.outcomes.com" target="_blank">
                Outcomes.com
              </a>
            </b>.
          </p>
        </div>
        <div className="margin-bottom-4">
          <p className="h4 light margin-bottom-2">
            Welcome to my website, a place that holds a small collection of my
            <b>
              <Link to={'/photos'}>
                &nbsp;photos
              </Link>
            </b>, a place where I can host my
            <b>
              <Link to={'/blurbs'}>
                &nbsp;rants and blurbs
              </Link>
            </b> about anything, a place that I use to practice my web
            development, and at the end of the day, a place about me.
            So a little about me...
          </p>
          <p className="h4 light margin-bottom-2">
            I spend my free time flying quadcopters, drinking boba/tea,
            catching up on TV shows, attemping to go on photo adventures, and
            contemplating when I'll next pick up my tennis racket.
          </p>
        </div>
        <div className="links">
          <div className="link">
            <a href="https://github.com/cle1994" target="_blank">GitHub</a>
          </div>
          <div className="link">
            <a href="https://www.linkedin.com/in/christianle94" target="_blank">LinkedIn</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

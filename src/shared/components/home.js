/* ==========================================================================
 * ./src/shared/components/home.js
 *
 * Home Page
 * ========================================================================== */

import React, { Component } from 'react';

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
              <a href="https://github.com/lechristian" target="_blank">
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
            </b>. I graduated from <b>
              <a href="http://www.berkeley.edu/" target="_blank">
                UC Berkeley
              </a>
            </b>, co-founded Outcomes.com, helped grow <b>
              <a href="https://yelp.com/reservations" target="_blank">
                Yelp Reservations
              </a>
            </b>, and now I work on the <b>
              <a href="https://squareup.com/business-debit-card" target="_blank">
                Square Card
              </a>
            </b>.
          </p>
        </div>
        <div className="margin-bottom-4">
          <p className="h4 light margin-bottom-2">
            You can find a small collection of my photos <b>
              <a href="https://thecle.me" target="_blank">
                here (thecle.me)
              </a>
            </b>.
          </p>
        </div>
        <div className="links">
          <div className="link">
            <a href="https://github.com/lechristian" target="_blank">GitHub</a>
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

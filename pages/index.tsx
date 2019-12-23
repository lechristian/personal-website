import React from 'react'
import Head from 'next/head'
import Shell from '../components/shell'

const Home = () => (
  <div>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>Christian Le | cle</title>

      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#e6e7e8" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#e6e7e8" />

      <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' rel='stylesheet' type='text/css' />
      <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,700' rel='stylesheet' type='text/css' />
      <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,300italic,400italic,600,600italic' rel='stylesheet' type='text/css' />
      <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro:400,300,500,700' rel='stylesheet' type='text/css' />
    </Head>

    <div className="home">
      <div className="logo">
        <img src="/cle.png" />
      </div>
      <div className="info">
        <p>
          <div className="h2">
            Hi there! I'm <b>Christian Le</b>,
          </div>
        </p>
        <p>
          <div className="h3">
            a <b>
              <a href="https://github.com/lechristian" target="_blank">
                software engineer
              </a>
            </b> born and raised in <b>
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
            </b>, co-founded <b>Outcomes.com</b>, helped grow <b>
              <a href="https://yelp.com/reservations" target="_blank">
                Yelp Reservations
              </a>
            </b>, and now work on the <b>
              <a href="https://squareup.com/business-debit-card" target="_blank">
                Square Card
              </a>
            </b>.
          </div>
        </p>
      </div>
      <div className="photos">
        <p>
          You can find a small collection of my photos at <b>
            <a href="https://thecle.me" target="_blank">
              thecle.me
            </a>
          </b>.
        </p>
      </div>
      <div className="footer">
        <div className="link">
          <a href="https://github.com/lechristian" target="_blank">GitHub</a>
        </div>
        <div className="link">
          <a href="https://www.linkedin.com/in/christianle94" target="_blank">LinkedIn</a>
        </div>
      </div>

      <Shell />
    </div>

    <style jsx global>{`
      html, body {
        background-color: #e6e7e8;
        color: #1f1f1f;
        font-family: "Source Sans Pro", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.25;
      }
      a {
        text-decoration: none;
        color: #1f1f1f;
      }
      a:hover {
        color: #55b4d6;
      }
    `}</style>

    <style jsx>{`
      .home {
        max-width: 720px;
        padding: 5%;
        margin: 0 auto;
      }

      .h2 {
        font-size: 32px;
      }

      .h3 {
        font-size: 24px;
        font-weight: 300;
      }

      .logo {
        text-align: center;
        max-width: 240px;
        margin: 0 auto;
      }

      .logo img {
        width: 100%;
      }

      .info {
        margin-top: 2.5rem;
        text-align: justify;
      }

      .photos {
        font-size: 18px;
        font-weight: 300;
      }

      .footer {
        text-align: center;
        margin-top: 2.5rem;
      }
      .footer .link {
        display: inline-block;
        margin: 0 12px;
      }
    `}</style>
  </div>
)

export default Home

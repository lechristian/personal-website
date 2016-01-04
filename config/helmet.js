/* ==========================================================================
 * ./config/helmet.js
 *
 * Helmet Config
 * ========================================================================== */

export function updateHelmetProps(url, title, description) {
  return {
    title,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        itemprop: 'description',
        content: description
      },
      // Twitter
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      },
      // Facebook
      {
        property: 'og:url',
        content: url
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
    ]
  };
}

export const HelmetBaseConfig = {
  title: 'Christian Le',
  meta: [
    {
      'charset': 'utf-8'
    },
    {
      'http-equiv': 'X-UA-Compatible',
      'content': 'IE=edge'
    },
    {
      'name': 'viewport',
      'content': 'width=device-width, initial-scale=1'
    },
    {
      name: 'description',
      content: 'Christian Le | Software Engineer and Photographer | GitHub: cle1994 | Berkeley Computer Science'
    },
    {
      name: 'author',
      content: 'Christian Le (cle1994)'
    },
    {
      itemprop: 'name',
      content: 'Christian Le (cle1994)'
    },
    {
      itemprop: 'description',
      content: 'Christian Le | Software Engineer and Photographer | GitHub: cle1994 | Berkeley Computer Science'
    },
    {
      itemprop: 'image',
      content: '/favicon/apple-icon-180x180.png'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:site',
      content: '@christianle94'
    },
    {
      name: 'twitter:title',
      content: 'Christian Le'
    },
    {
      name: 'twitter:description',
      content: 'Christian Le | Software Engineer and Photographer | GitHub: cle1994 | Berkeley Computer Science'
    },
    {
      name: 'twitter:image:src',
      content: '/favicon/apple-icon-180x180.png'
    },
    // Facebook/Open Graph
    {
      property: 'og:url',
      content: 'http://christianle.com'
    },
    {
      property: 'og:title',
      content: 'Christian Le'
    },
    {
      property: 'og:description',
      content: 'Christian Le | Software Engineer and Photographer | GitHub: cle1994 | Berkeley Computer Science'
    },
    {
      property: 'og:site_name',
      content: 'Christian Le'
    },
    {
      property: 'og:image',
      content: '/favicon/apple-icon-180x180.png'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    // MS Windows
    {
      name: 'msapplication-TileColor',
      content: '#ffffff'
    },
    {
      name: 'msapplication-TileImage',
      content: '/favicon/ms-icon-144x144.png'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    }
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      href: '/favicon/apple-icon-57x57.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      href: '/favicon/apple-icon-60x60.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      href: '/favicon/apple-icon-72x72.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/favicon/apple-icon-76x76.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      href: '/favicon/apple-icon-114x114.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      href: '/favicon/apple-icon-120x120.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      href: '/favicon/apple-icon-144x144.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      href: '/favicon/apple-icon-152x152.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-icon-180x180.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/favicon/android-icon-192x192.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      href: '/favicon/favicon-96x96.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Merriweather:400,300,700',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,300italic,400italic,600,600italic',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:400,300,500,700',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: '/static/style.css'
    }
  ]
};

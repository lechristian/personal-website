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
    }
  ]
};

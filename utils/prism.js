/* ==========================================================================
 * ./utils/prism.js
 *
 * Initialize prism with JSX and JSON support
 * ========================================================================== */

const prism = require('prismjs');

prism.languages.json = {
  'property': /".*?"(?=\s*:)/ig,
  'string': /"(?!:)(\\?[^"])*?"(?!:)/g,
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  'punctuation': /[{}[\]);,]/g,
  'operator': /:/g,
  'boolean': /\b(true|false)\b/gi,
  'null': /\bnull\b/gi,
};

prism.languages.jsonp = prism.languages.json;

function jsxPrism(prism) {
  let javascript = prism.util.clone(prism.languages.javascript);

  prism.languages.jsx = prism.languages.extend('markup', javascript);
  prism.languages.jsx.tag.pattern= /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;
  prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

  let jsxExpression = prism.util.clone(prism.languages.jsx);

  delete jsxExpression.punctuation

  jsxExpression = prism.languages.insertBefore('jsx', 'operator', {
    'punctuation': /=(?={)|[{}[\];(),.:]/
  }, {
    jsx: jsxExpression
  });

  prism.languages.insertBefore('inside', 'attr-value', {
  	'script': {
  		pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
  		inside: jsxExpression,
  		'alias': 'language-javascript'
  	}
  }, prism.languages.jsx.tag);

  return prism;
}

module.exports = jsxPrism(prism);

'use strict';

const {assign, camelCase, reduce} = require('lodash');

const camelizeKeys = (acc, value, key) => {
  const camelizedKey = camelCase(key);
  if (camelizedKey !== key) acc[camelizedKey] = value;
  return acc;
};

const camelizeDashedKeys = (acc, value, key) => {
  const camelizedKey = camelizeDashes(key);
  if (camelizedKey !== key) acc[camelizedKey] = value;
  return acc;
};

const camelizeOnlyKeys = (acc, value, key) => {
  const camelizedKey = camelCase(key);
  if (camelizedKey !== key) acc[camelizedKey] = value;
  else acc[key] = value;
  return acc;
};

const camelizeOnlyDashedKeys = (acc, value, key) => {
  const camelizedKey = camelizeDashes(key);
  if (camelizedKey !== key) acc[camelizedKey] = value;
  else acc[key] = value;
  return acc;
};

exports.camelizeDashes = camelizeDashes;
exports.transformTokens = transformTokens;

/**
 * @param  {string} str
 * @return {string}
 */
function camelizeDashes(str) {
  return str.replace(/-+(\w)/g, (m, letter) => letter.toUpperCase());
}

/**
 * @param  {object} tokens
 * @param  {object} transformOps
 * @param  {boolean|string} transformOps.camelCase 'dashes|dashesOnly|only'
 * @param  {boolean} transformOps.transformClassesToSelectors
 * @return {object}
 */
function transformTokens(tokens, {camelCase, transformClassesToSelectors}) {
  if (typeof tokens === 'object' && transformClassesToSelectors)
    Object.keys(tokens).forEach(key => tokens[key] = `.${tokens[key]}`);

  switch (camelCase) {
  case true:
    return reduce(tokens, camelizeKeys, assign({}, tokens));

  case 'dashes':
    return reduce(tokens, camelizeDashedKeys, assign({}, tokens));

  case 'dashesOnly':
    return reduce(tokens, camelizeOnlyDashedKeys, {});

  case 'only':
    return reduce(tokens, camelizeOnlyKeys, {});
  default:
    // do nothing
  }

  return tokens;
}

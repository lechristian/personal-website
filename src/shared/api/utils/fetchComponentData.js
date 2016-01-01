/* ==========================================================================
 * ./src/shared/api/fetchComponentData.js
 *
 * Grab component data and state before rendering server side.
 * ========================================================================== */

import Promise from 'bluebird';

export function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  const promises = needs.map((need) => {
    return dispatch(need(params));
  });

  return Promise.all(promises);
}

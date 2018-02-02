import resourceReducer from './resource-reducer';
import resourceRequestReducer from './request-reducer';
import actionTypes from './action-types';
import requestStatuses from './utils/request-statuses';
import setResourceMeta from './utils/set-resource-meta';
import upsertResources from './utils/upsert-resources';
import getStatus from './utils/get-status';
import getResources from './utils/get-resources';
import getList from './utils/get-list';
import warning from './utils/warning';

/* eslint-disable no-empty-function */
/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}
/* eslint-disable no-empty-function */

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === \'production\'. ' +
    'This means that you are running a slower development build of Redux Resource. ' +
    'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
    'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
    'to ensure you have the correct code for your production build.'
  );
}

export {
  resourceReducer,
  resourceRequestReducer,
  actionTypes,
  requestStatuses,
  setResourceMeta,
  upsertResources,
  getStatus,
  getResources,
  getList
};

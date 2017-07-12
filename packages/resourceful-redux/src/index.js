import resourceReducer from './resource-reducer';
import actionTypes from './action-types';
import requestStatuses from './utils/request-statuses';
import setResourceMeta from './utils/set-resource-meta';
import upsertResources from './utils/upsert-resources';
import getStatus from './utils/get-status';
import getResources from './utils/get-resources';
import warning from './utils/warning';

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === \'production\'. ' +
    'This means that you are running a slower development build of Resourceful Redux. ' +
    'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
    'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
    'to ensure you have the correct code for your production build.'
  );
}

export {
  resourceReducer,
  actionTypes,
  requestStatuses,
  setResourceMeta,
  upsertResources,
  getStatus,
  getResources
};

import xhr from 'xhr';
import * as actionCreators from './default-action-creators';

export default function(allowedCrudOperations) {
  const {create, readOne, readMany, update, del} = allowedCrudOperations;
  const actionCreators = {};

  if (create) {
    actionCreators.create = actionCreators.create;
  }

  if (readOne) {
    actionCreators.readOne = actionCreators.readOne;
  }

  if (readMany) {
    actionCreators.readMany = actionCreators.readMany;
  }

  if (update) {
    actionCreators.update = actionCreators.update;
  }

  if (del) {
    actionCreators.del = actionCreators.del;
  }

  return actionCreators;
}

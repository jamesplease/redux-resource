import * as actionCreators from './default-action-creators';

export default function(allowedCrudOperations) {
  const {create, readOne, readMany, update, del} = allowedCrudOperations;
  const actions = {};

  if (create) {
    actions.create = actionCreators.create;
  }

  if (readOne) {
    actions.readOne = actionCreators.readOne;
  }

  if (readMany) {
    actions.readMany = actionCreators.readMany;
  }

  if (update) {
    actions.update = actionCreators.update;
  }

  if (del) {
    actions.del = actionCreators.del;
  }

  return actions;
}

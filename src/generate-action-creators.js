import * as actionCreators from './default-action-creators';

export default function(supportedCrudActions) {
  const {create, readOne, readMany, update, del} = supportedCrudActions;
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

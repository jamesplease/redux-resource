import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: custom', function() {
  it('should handle `CUSTOM_TYPE`', () => {
    const result = simpleResource('hello', {
      actionReducers: [
        {
          actionType: 'CUSTOM_TYPE',
          reducer(state, action) {
            return {
              ...state,
              pizza: action.pizza
            };
          }
        }
      ]
    });

    const reduced = result.reducer(result.initialState, {
      type: 'CUSTOM_TYPE',
      pizza: 'delicious'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.NULL
      },
      pizza: 'delicious'
    });
  });
});

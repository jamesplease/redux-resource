import {resourceReducer, actionTypes} from '../../../src/resourceful-redux';

describe('reducer', function() {
  it('should handle a plug-in on a built-in type', () => {
    const reducer = resourceReducer('hellos', {
      plugins: [
        (state, action) => {
          if (action.type === actionTypes.READ_RESOURCES_SUCCEEDED) {
            return {
              ...state,
              pizza: 'yum'
            };
          }

          return state;
        }
      ]
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEEDED',
      resourceName: 'hellos',
      resources: [3]
    });

    expect(reduced).to.deep.equal({
      resources: {
        3: {id: 3}
      },
      meta: {
        3: {
          createStatus: 'NULL',
          readStatus: 'SUCCEEDED',
          updateStatus: 'NULL',
          deleteStatus: 'NULL'
        }
      },
      labels: {},
      pizza: 'yum'
    });
  });

  it('should handle a plug-in on a custom type', () => {
    const reducer = resourceReducer('hellos', {
      plugins: [
        (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: action.tastiness
            };
          }

          return state;
        }
      ]
    });

    const reduced = reducer(undefined, {
      type: 'SANDWICHES_ARE_GOOD',
      resourceName: 'hellos',
      tastiness: 'quite'
    });

    expect(reduced).to.deep.equal({
      resources: {},
      meta: {},
      labels: {},
      tastiness: 'quite'
    });
  });

  it('should handle multiple plug-ins on a custom type, from right to left', () => {
    const reducer = resourceReducer('hellos', {
      plugins: [
        (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: true
            };
          }

          return state;
        },
        (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: false
            };
          }

          return state;
        }
      ]
    });

    const reduced = reducer(undefined, {
      type: 'SANDWICHES_ARE_GOOD',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: {},
      meta: {},
      labels: {},
      tastiness: true
    });
  });
});

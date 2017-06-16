import {resourceReducer} from '../../../src';

describe('reducers: read:', function() {
  describe('READ_RESOURCES_SUCCESS:', () => {
    it('returns the right state without a label, without IDs', () => {
      const initialState = {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        labels: {
          pasta: {
            hungry: true
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          }
        }
      };

      const reducer = resourceReducer('hellos', {initialState});

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos'
      });

      expect(reduced).to.deep.equal(initialState);
    });

    // it('returns state with resource array, no label, default options', () => {
    //
    // });
  });
});

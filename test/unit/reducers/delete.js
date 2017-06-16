import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: delete', function() {
  describe('DELETE_RESOURCES_SUCCESS', () => {
    it('returns the right state without a label, without IDs', () => {
      const initialState = {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        labels: {},
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
        type: 'DELETE_RESOURCES_SUCCEED',
        resourceName: 'hellos'
      });

      expect(reduced).to.deep.equal(initialState);
    });

    it('returns the right state without a label, with IDs', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4},
          ],
          labels: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        resources: [3, {id: 4}]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
        ],
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: null,
          4: null
        }
      });
    });

    it('returns the right state with a label, with IDs', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4},
          ],
          labels: {
            oink: {
              hungry: true
            },
            italiano: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false
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
        }
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        requestLabel: 'italiano',
        resources: [
          3,
          {id: 4}
        ]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
        ],
        labels: {
          italiano: {
            status: requestStatuses.SUCCEEDED,
            ids: [1],
            hangry: false
          },
          oink: {
            hungry: true
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: null,
          4: null
        }
      });
    });

    it('returns the right state with a label, without IDs', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4},
          ],
          labels: {
            oink: {
              hungry: true
            },
            italiano: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false
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
        }
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        requestLabel: 'italiano',
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        labels: {
          italiano: {
            status: requestStatuses.SUCCEEDED,
            ids: [1, 3, 4],
            hangry: false
          },
          oink: {
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
      });
    });
  });
});

import {resourceReducer, requestStatuses} from '../../../src';

describe('updateList:', function() {
  describe('UPDATE_RESOURCE_LISTS:', () => {
    it('should warn and not change the lists when no list is provided', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {
            favorites: [1, 10]
          },
          requests: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              createStatus: requestStatuses.SUCCEEDED,
              selected: true
            }
          }
        },
        initialResourceMeta: {
          selected: false,
          createStatus: requestStatuses.PENDING
        }
      });

      const reduced = reducer(undefined, {
        type: 'UPDATE_RESOURCE_LISTS',
        resourceName: 'hellos',
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'}
        },
        lists: {
          favorites: [1, 10]
        },
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            createStatus: requestStatuses.SUCCEEDED,
            selected: true
          }
        }
      });

      expect(console.error.callCount).to.equal(1);
    });

    it('should not warn and should update existing lists while adding new ones', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {
            favorites: [1, 10]
          },
          requests: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              createStatus: requestStatuses.SUCCEEDED,
              selected: true
            }
          }
        },
        initialResourceMeta: {
          selected: false,
          createStatus: requestStatuses.PENDING
        }
      });

      const reduced = reducer(undefined, {
        type: 'UPDATE_RESOURCE_LISTS',
        resourceName: 'hellos',
        lists: {
          favorites: [1, 5, 10],
          new: [100, 101, 105]
        }
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'}
        },
        lists: {
          favorites: [1, 5, 10],
          new: [100, 101, 105]
        },
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            createStatus: requestStatuses.SUCCEEDED,
            selected: true
          }
        }
      });

      expect(console.error.callCount).to.equal(0);
    });
  });
});

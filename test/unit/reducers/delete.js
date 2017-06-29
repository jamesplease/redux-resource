import {resourceReducer, requestStatuses} from '../../../src/resourceful-redux';

describe('reducers: delete', function() {
  describe('DELETE_RESOURCES_SUCCEEDED', () => {
    it('returns the right state without a label, without IDs', () => {
      const initialState = {
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4},
        },
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceName: 'hellos'
      });

      expect(reduced).to.deep.equal(initialState);
    });

    it('returns the right state without a label, with IDs', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4},
          },
          labels: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            }
          }
        },
        initialResourceMeta: {
          selected: false
        }
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        resources: [3, {id: 4}]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: null,
          4: null
        },
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            selected: false,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.SUCCEEDED
          },
          4: {
            selected: false,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.SUCCEEDED
          }
        }
      });
    });

    it('returns the right state with a label, with IDs', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4},
          },
          labels: {
            oink: {
              hungry: true,
              ids: [10, 3]
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        label: 'italiano',
        resources: [
          3,
          {id: 4}
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: null,
          4: null
        },
        labels: {
          italiano: {
            status: requestStatuses.SUCCEEDED,
            ids: [1],
            hangry: false
          },
          oink: {
            ids: [10],
            hungry: true
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.SUCCEEDED
          },
          4: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.SUCCEEDED
          }
        }
      });
    });

    it('returns the right state with a label, without IDs', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4},
          },
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        label: 'italiano',
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4},
        },
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

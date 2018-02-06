import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: read:', function() {
  describe('READ_RESOURCES_PENDING:', () => {
    it('should warn and not set a badly configured request name', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
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
        type: 'READ_RESOURCES_PENDING',
        resourceName: 'hellos',
        request: true,
        resources: [4, 5]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'}
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.SUCCEEDED,
            readStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            selected: false,
            createStatus: requestStatuses.PENDING,
            readStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
      expect(console.error.callCount).to.equal(1);
    });

    it('should return the correct state without erroring when called correctly', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
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
        type: 'READ_RESOURCES_PENDING',
        resourceName: 'hellos',
        resources: [4, 5]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'}
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.SUCCEEDED,
            readStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            selected: false,
            createStatus: requestStatuses.PENDING,
            readStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
      expect(console.error.callCount).to.equal(0);
    });
  });

  describe('READ_RESOURCES_SUCCEEDED:', () => {
    it('warns when no resourceName is passed', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4},
        },
        lists: {},
        requests: {
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
        type: 'READ_RESOURCES_SUCCEEDED',
        resources: [1, 2]
      });

      expect(reduced).to.deep.equal(initialState);
      expect(console.error.callCount).to.equal(1);
    });

    it('warns when a resource _object_ is passed (not an array)', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4},
        },
        lists: {},
        requests: {
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
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        resources: {
          id: 20,
          firstName: 'sandwiches'
        }
      });

      expect(reduced).to.deep.equal(initialState);
      expect(console.error.callCount).to.equal(1);
    });

    it('warns and returns the right state without a request name, without IDs', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4},
        },
        lists: {},
        requests: {
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
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos'
      });

      expect(reduced).to.deep.equal(initialState);
      expect(console.error.callCount).to.equal(1);
    });

    it('returns state with resource array, no request name, default options', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
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
          selected: false
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.SUCCEEDED,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            selected: false,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
    });

    it('returns state with resource array, no request name, mergeResources: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        mergeResources: false,
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches'},
          5: {id: 5}
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
    });

    it('returns state with resource object, no request name, mergeMeta: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        mergeMeta: false,
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
    });

    it('warns when a badly formatted request name is passed in', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [4],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        request: {},
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {},
        requests: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4],
            status: requestStatuses.PENDING
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
      expect(console.error.callCount).to.equal(1);
    });

    it('warns when a badly formatted list is passed in', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [4],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        list: {},
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {},
        requests: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4],
            status: requestStatuses.PENDING
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
      expect(console.error.callCount).to.equal(1);
    });

    it('returns state with resource object and request, ensuring no request ID dupes', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [4],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        request: 'pasta',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {},
        requests: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4, 5],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns state with resource object, requests and lists, ensuring no request+list ID dupes', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {
            oinks: [1, 3],
            pasta: [4]
          },
          requests: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [4],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        request: 'pasta',
        list: 'pasta',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {
          oinks: [1, 3],
          pasta: [4, 5]
        },
        requests: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4, 5],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns state with resource object and request name, ensuring empty request name IDs works', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        request: 'pasta',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {},
        requests: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4, 5],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
    });

    it('returns state with resource object and list, ensuring nonexistent list works', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        list: 'pasta',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {
          pasta: [4, 5]
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
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
    });

    it('returns state with resource object and list, with mergeListIds: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {
            sandwiches: [1, 3],
            pasta: [100, 200]
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
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        list: 'pasta',
        mergeListIds: false,
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, name: 'sandwiches', lastName: 'camomile'},
          5: {id: 5}
        },
        lists: {
          sandwiches: [1, 3],
          pasta: [4, 5]
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
            selected: true,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          },
          5: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.IDLE,
          }
        }
      });
    });

    it('replaces list IDs with resource array and list, with mergeListIds: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {
            sandwiches: [1, 3],
            pasta: [100, 200]
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
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        list: 'pasta',
        mergeListIds: false,
        resources: []
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'},
        },
        lists: {
          sandwiches: [1, 3],
          pasta: []
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
            selected: true
          }
        }
      });
    });

    it('returns state without a resource array, with a request name', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          lists: {},
          requests: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [1],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos',
        request: 'pasta',
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'},
        },
        lists: {},
        requests: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
          }
        }
      });

      expect(console.error.callCount).to.equal(1);
    });
  });

  it('returns state without a resource array, with a list', () => {
    stub(console, 'error');
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'},
        },
        lists: {
          sandwiches: [1, 3],
          pasta: [1]
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
            selected: true
          }
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEEDED',
      resourceName: 'hellos',
      list: 'pasta',
    });

    expect(reduced).to.deep.equal({
      resources: {
        1: {id: 1},
        3: {id: 3},
        4: {id: 4, lastName: 'camomile'},
      },
      lists: {
        sandwiches: [1, 3],
        pasta: [1]
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
          selected: true,
        }
      }
    });

    expect(console.error.callCount).to.equal(1);
  });
});

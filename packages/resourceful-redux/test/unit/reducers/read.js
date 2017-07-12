import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: read:', function() {
  describe('READ_RESOURCES_PENDING:', () => {
    it('should warn and not set a badly configured label', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {},
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
        label: true,
        resources: [4, 5]
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'}
        },
        labels: {},
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
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            selected: false,
            createStatus: requestStatuses.PENDING,
            readStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
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
          labels: {},
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
        labels: {},
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
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            selected: false,
            createStatus: requestStatuses.PENDING,
            readStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
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

    it('warns and returns the right state without a label, without IDs', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4},
        },
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
        type: 'READ_RESOURCES_SUCCEEDED',
        resourceName: 'hellos'
      });

      expect(reduced).to.deep.equal(initialState);
      expect(console.error.callCount).to.equal(1);
    });

    it('returns state with resource array, no label, default options', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {},
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
        labels: {},
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
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            selected: false,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource array, no label, mergeResources: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {},
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
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource object, no label, mergeMeta: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {},
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
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('warns when a badly formatted label is passed in', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {
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
        label: {},
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
        labels: {
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
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
      expect(console.error.callCount).to.equal(1);
    });

    it('returns state with resource object and label, ensuring no label ID dupes', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {
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
        label: 'pasta',
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
        labels: {
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
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns state with resource object and label, ensuring empty label IDs works', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {
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
        label: 'pasta',
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
        labels: {
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
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource object and label, with mergeLabelIds: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [100, 200],
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
        label: 'pasta',
        mergeLabelIds: false,
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
        labels: {
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
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('replaces label IDs with resource array and label, with mergeLabelIds: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [100, 200],
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
        label: 'pasta',
        mergeLabelIds: false,
        resources: []
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'},
        },
        labels: {
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
            selected: true
          }
        }
      });
    });

    it('returns state without a resource array, with a label', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: {id: 1},
            3: {id: 3},
            4: {id: 4, lastName: 'camomile'},
          },
          labels: {
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
        label: 'pasta',
      });

      expect(reduced).to.deep.equal({
        resources: {
          1: {id: 1},
          3: {id: 3},
          4: {id: 4, lastName: 'camomile'},
        },
        labels: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [1],
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
});

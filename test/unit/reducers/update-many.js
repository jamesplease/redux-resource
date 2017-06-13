import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: updateMany', function() {
  it('should handle `UPDATE_MANY_RESOURCES`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_MANY_RESOURCES',
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.PENDING
        },
        4: {
          updateStatus: requestStatuses.PENDING
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_MANY_RESOURCES_FAIL',
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.FAILED
        },
        4: {
          updateStatus: requestStatuses.FAILED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_RESOURCES_RESET`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_MANY_RESOURCES_RESET',
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.NULL
        },
        4: {
          updateStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_MANY_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_MANY_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_RESOURCES_SUCCEED` with `replace: true`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_MANY_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      replace: true,
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });
});

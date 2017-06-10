import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: update', function() {
  it('should handle `UPDATE_RESOURCE`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCE',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
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

  it('should handle `UPDATE_RESOURCE_FAIL`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCE_FAIL',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
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

  it('should handle `UPDATE_RESOURCE_RESET`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCE_RESET',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
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

  it('should handle `UPDATE_RESOURCE_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3, last_name: 'please'},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      id: 3,
      resource: {
        id: 3,
        name: 'please'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3, name: 'please'},
        {id: 4},
      ],
      meta: {
        3: {
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

  it('should handle `UPDATE_RESOURCE_SUCCEED` with a custom `idAttribute`', () => {
    const reducer = resourceReducer('hellos', {
      idAttribute: 'movieId',
      initialState: {
        resources: [
          {movieId: 1},
          {movieId: 3, last_name: 'please'},
          {movieId: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      movieId: 3,
      resource: {
        movieId: 3,
        name: 'please'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 1},
        {movieId: 3, name: 'please'},
        {movieId: 4},
      ],
      meta: {
        3: {
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

  it('should handle `UPDATE_RESOURCE_SUCCEED` with `replace: false`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3, last_name: 'please'},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      id: 3,
      replace: false,
      resource: {
        id: 3,
        name: 'please'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3, name: 'please', last_name: 'please'},
        {id: 4},
      ],
      meta: {
        3: {
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

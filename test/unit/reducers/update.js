import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: update', function() {
  it('should handle `UPDATE_HELLO`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.PENDING
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_FAIL`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_FAIL',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.FAILED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_ABORT`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_ABORT',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.ABORTED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_RESET`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_RESET',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3, last_name: 'please'},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_SUCCEED',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_SUCCEED` with a custom `idAttribute`', () => {
    const result = simpleResource('hello', {
      idAttribute: 'movieId',
      initialState: {
        resources: [
          {movieId: 1},
          {movieId: 3, last_name: 'please'},
          {movieId: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_SUCCEED',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_SUCCEED` with `replace: false`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3, last_name: 'please'},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_SUCCEED',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });
});

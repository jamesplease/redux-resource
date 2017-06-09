import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: read', function() {
  it('should handle `READ_HELLO`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {
        3: {
          readXhrStatus: 'PENDING'
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `READ_HELLO_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO_FAIL',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {
        3: {
          readXhrStatus: 'FAILED'
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `READ_HELLO_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 3, hunger: false}
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO_SUCCEED',
      id: 3,
      resource: {
        id: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          id: 3,
          sandwiches: 'yum'
        }
      ],
      resourceMeta: {
        3: {
          readXhrStatus: 'SUCCEEDED'
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `READ_HELLO_SUCCEED` with `replace: false`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 3, hunger: false}
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO_SUCCEED',
      id: 3,
      replace: false,
      resource: {
        id: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          id: 3,
          sandwiches: 'yum',
          hunger: false
        }
      ],
      resourceMeta: {
        3: {
          readXhrStatus: 'SUCCEEDED'
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `READ_HELLO_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'whatPls'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO_SUCCEED',
      whatPls: 3,
      resource: {
        whatPls: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          whatPls: 3,
          sandwiches: 'yum'
        }
      ],
      resourceMeta: {
        3: {
          readXhrStatus: 'SUCCEEDED'
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `READ_HELLO_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO_ABORT',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {
        3: {
          readXhrStatus: 'NULL'
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `READ_HELLO_RESET`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_HELLO_RESET',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {
        3: {
          readXhrStatus: xhrStatuses.NULL
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

import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: readMany', function() {
  it('should handle `READ_MANY_HELLOS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_HELLOS'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.PENDING
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_HELLOS_FAIL'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.FAILED
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('catPerson', {
      initialState: {
        resources: [
          {id: 100, sandwiches: 'yummm'},
          {id: 23},
          {id: 55},
        ],
        resourceMeta: {
          23: 'sandwiches'
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_CAT_PERSONS_SUCCEED',
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ],
      resourceMeta: {
        2: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL,
        },
        100: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_SUCCEED` with `replace: false`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 100, sandwiches: 'yummm'},
          {id: 23},
          {id: 55},
        ],
        resourceMeta: {
          23: 'sandwiches'
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_HELLOS_SUCCEED',
      replace: false,
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 100, hungry: false, sandwiches: 'yummm'},
        {id: 23},
        {id: 55},
        {id: 2, hungry: true, pasta: 'yespls'},
      ],
      resourceMeta: {
        2: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL,
        },
        23: 'sandwiches',
        100: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'namePls'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_HELLOS_SUCCEED',
      resources: [
        {namePls: 2, hungry: true, pasta: 'yespls'},
        {namePls: 100, hungry: false},
      ],
      resourceMeta: {
        23: 'sandwiches'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {namePls: 2, hungry: true, pasta: 'yespls'},
        {namePls: 100, hungry: false},
      ],
      resourceMeta: {
        2: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL,
        },
        100: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_HELLOS_ABORT'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.ABORTED
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_RESET`', () => {
    const result = simpleResource('hello');

    // We set some value on `readXhrStatus` to check that this nulls it
    const resourceListMetaState = {
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: 'sandwiches'
      }
    };

    const reduced = result.reducer({
      ...result.initialState,
      ...resourceListMetaState
    }, {
      type: 'READ_MANY_HELLOS_RESET'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.NULL
      }
    });
  });
});

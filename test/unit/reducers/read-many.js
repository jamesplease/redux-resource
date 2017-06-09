import simpleResource, {requestStatuses} from '../../../src';

describe('reducers: readMany', function() {
  it('should handle `READ_MANY_HELLOS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'READ_MANY_HELLOS'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.PENDING
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
      meta: {},
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.FAILED
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
        meta: {
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
      meta: {
        2: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL,
        },
        100: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.SUCCEEDED
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
        meta: {
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
      meta: {
        2: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL,
        },
        23: 'sandwiches',
        100: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.SUCCEEDED
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
      meta: {
        23: 'sandwiches'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {namePls: 2, hungry: true, pasta: 'yespls'},
        {namePls: 100, hungry: false},
      ],
      meta: {
        2: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL,
        },
        100: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.SUCCEEDED
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
      meta: {},
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_MANY_HELLOS_RESET`', () => {
    const result = simpleResource('hello');

    // We set some value on `readXhrStatus` to check that this nulls it
    const listMetaState = {
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: 'sandwiches'
      }
    };

    const reduced = result.reducer({
      ...result.initialState,
      ...listMetaState
    }, {
      type: 'READ_MANY_HELLOS_RESET'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
      }
    });
  });
});

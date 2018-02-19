import reducerGenerator from '../../../src/utils/reducer-generator';
import { requestStatuses } from '../../../src';

describe('reducerGenerator:', function() {
  it('passing no IDs and no request', () => {
    stub(console, 'error');

    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {});

    expect(result).to.equal(state);
    expect(console.error.callCount).to.equal(1);
  });

  it('passing mixed resources array and no request key', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(
      state,
      {
        resources: [{ id: 1 }, { id: 5 }, 6],
      },
      {
        initialResourceMeta: {
          selected: false,
          readStatus: requestStatuses.PENDING,
        },
      }
    );

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.PENDING,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
          selected: false,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
        5: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.PENDING,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          selected: false,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.PENDING,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          selected: false,
          pastaStatus: requestStatuses.FAILED,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });

  it('passing resources and no request key', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
        5: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });

  it('passing no IDs, but passing a request key', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      request: 'italiano',
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          requestKey: 'italiano',
          requestName: 'italiano',
          sandwiches: true,
          status: requestStatuses.FAILED,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });

  it('passing IDs and passing a request key', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
      request: 'italiano',
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
        5: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          requestKey: 'italiano',
          requestName: 'italiano',
          sandwiches: true,
          status: requestStatuses.FAILED,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });

  it('passing IDs and passing a request key, but no request name', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
      requestKey: 'italiano',
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
        5: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          requestKey: 'italiano',
          sandwiches: true,
          status: requestStatuses.FAILED,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });

  it('passing IDs and passing a request key and request name', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
      requestKey: 'abc12345',
      requestName: 'someRequest',
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
        5: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        abc12345: {
          requestKey: 'abc12345',
          requestName: 'someRequest',
          status: requestStatuses.FAILED,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });

  it('passing IDs and passing a request key with `mergeMeta: false`', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING,
        },
        meep: {
          hungry: true,
        },
      },
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
      request: 'italiano',
      mergeMeta: false,
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING,
        },
        5: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.IDLE,
          pastaStatus: requestStatuses.FAILED,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      requests: {
        italiano: {
          requestKey: 'italiano',
          requestName: 'italiano',
          sandwiches: true,
          status: requestStatuses.FAILED,
        },
        meep: {
          hungry: true,
        },
      },
    });
  });
});

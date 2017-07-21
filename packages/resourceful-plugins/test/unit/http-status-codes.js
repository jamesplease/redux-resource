import {actionTypes} from 'resourceful-redux';
import httpStatusCodes from '../../src/http-status-codes';

describe('httpStatusCodes', function() {
  beforeEach(() => {
    stub(console, 'error');
  });

  it('should not change the status when the resource name does not match', () => {
    const reducer = httpStatusCodes('books');

    const state = {
      resources: {},
      meta: {},
      labels: {}
    };

    const action = {
      type: actionTypes.READ_RESOURCES_FAILED,
      resourceName: 'sandwiches',
      resources: [24],
      statusCode: 404
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should not change the status when the action type does not line up', () => {
    const reducer = httpStatusCodes('books');

    const state = {
      resources: {},
      meta: {},
      labels: {}
    };

    const action = {
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'books',
      resources: [24],
      statusCode: 0
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should set the status code on resource meta', () => {
    const reducer = httpStatusCodes('books');

    const state = {
      resources: {},
      meta: {},
      labels: {}
    };

    const action = {
      type: actionTypes.READ_RESOURCES_FAILED,
      resourceName: 'books',
      resources: [24],
      statusCode: 404
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      resources: {},
      meta: {
        24: {
          statusCode: 404
        }
      },
      labels: {}
    });
  });

  it('should set the status code on a label', () => {
    const reducer = httpStatusCodes('books');

    const state = {
      resources: {},
      meta: {},
      labels: {
        search: {
          ids: [20],
          statusCode: 0
        }
      }
    };

    const action = {
      type: actionTypes.READ_RESOURCES_FAILED,
      resourceName: 'books',
      label: 'search',
      statusCode: 404
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      resources: {},
      meta: {},
      labels: {
        search: {
          ids: [20],
          statusCode: 404
        }
      }
    });
  });

  it('should set the status code on a resource and a label', () => {
    const reducer = httpStatusCodes('books');

    const state = {
      resources: {},
      meta: {},
      labels: {
        search: {
          ids: [20],
          statusCode: 0
        }
      }
    };

    const action = {
      type: actionTypes.READ_RESOURCES_FAILED,
      resourceName: 'books',
      resources: [{
        id: 24
      }],
      label: 'search',
      statusCode: 404
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      resources: {},
      meta: {
        24: {
          statusCode: 404
        }
      },
      labels: {
        search: {
          ids: [20],
          statusCode: 404
        }
      }
    });
  });
});

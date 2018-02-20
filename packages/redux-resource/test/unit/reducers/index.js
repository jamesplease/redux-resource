import { resourceReducer } from '../../../src';

describe('reducer', function() {
  it('should be a function', () => {
    const reducer = resourceReducer('hellos');
    expect(reducer).to.be.a('function');
  });

  it('should handle an action type that does not exist', () => {
    stub(console, 'error');
    const reducer = resourceReducer('hellos');

    const state = {
      sandwiches: true,
      hungry: [],
    };

    const reduced = reducer(state, { type: 'does_not_exist' });
    expect(reduced).to.equal(state);
    expect(console.error.callCount).to.equal(0);
  });

  it('should warn when no resourceType is passed', () => {
    stub(console, 'error');
    resourceReducer();
    expect(console.error.callCount).to.equal(1);
  });

  it('should warn when a non-string resourceType is passed', () => {
    stub(console, 'error');
    resourceReducer({});
    expect(console.error.callCount).to.equal(1);
  });

  describe('reserved action types', () => {
    it('should warn with REQUEST_IDLE', () => {
      stub(console, 'error');
      const reducer = resourceReducer('books');
      expect(console.error.callCount).to.equal(0);

      reducer(
        {},
        {
          type: 'REQUEST_IDLE',
        }
      );
      expect(console.error.callCount).to.equal(1);
    });

    it('should warn with REQUEST_PENDING', () => {
      stub(console, 'error');
      const reducer = resourceReducer('books');
      expect(console.error.callCount).to.equal(0);

      reducer(
        {},
        {
          type: 'REQUEST_PENDING',
        }
      );
      expect(console.error.callCount).to.equal(1);
    });

    it('should warn with REQUEST_SUCCEEDED', () => {
      stub(console, 'error');
      const reducer = resourceReducer('books');
      expect(console.error.callCount).to.equal(0);

      reducer(
        {},
        {
          type: 'REQUEST_SUCCEEDED',
        }
      );
      expect(console.error.callCount).to.equal(1);
    });

    it('should warn with REQUEST_FAILED', () => {
      stub(console, 'error');
      const reducer = resourceReducer('books');
      expect(console.error.callCount).to.equal(0);

      reducer(
        {},
        {
          type: 'REQUEST_FAILED',
        }
      );
      expect(console.error.callCount).to.equal(1);
    });
  });
});

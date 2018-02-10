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
      hungry: []
    };

    const reduced = reducer(state, { type: 'does_not_exist' });
    expect(reduced).to.equal(state);
    expect(console.error.callCount).to.equal(0);
  });

  it('should warn when no resourceName is passed', () => {
    stub(console, 'error');
    resourceReducer();
    expect(console.error.callCount).to.equal(1);
  });

  it('should warn when a non-string resourceName is passed', () => {
    stub(console, 'error');
    resourceReducer({});
    expect(console.error.callCount).to.equal(1);
  });
});

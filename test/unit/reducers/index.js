import {resourceReducer} from '../../../src/resourceful-redux';

describe('reducer', function() {
  it('should be a function', () => {
    const reducer = resourceReducer('hellos');
    expect(reducer).to.be.a('function');
  });

  it('should handle an action type that does not exist', () => {
    const reducer = resourceReducer('hellos');

    const state = {
      sandwiches: true,
      hungry: []
    };

    const reduced = reducer(state, {type: 'does_not_exist'});
    expect(reduced).to.equal(state);
  });
});

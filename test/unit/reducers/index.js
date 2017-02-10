import simpleResource from '../../../src';

describe('reducer', function() {
  it('should be a function', () => {
    const result = simpleResource('hello');
    expect(result.reducer).to.be.a('function');
  });

  it('should handle an action type that does not exist', () => {
    const result = simpleResource('hello');

    const state = {
      sandwiches: true,
      hungry: []
    };

    const reduced = result.reducer(state, {type: 'does_not_exist'});
    expect(reduced).to.equal(state);
  });
});

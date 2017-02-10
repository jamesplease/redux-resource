import simpleResource from '../../../src';
const {xhrStatuses} = simpleResource;

describe('reducer', function() {
  it('should be a function', () => {
    const result = simpleResource('hello');
    expect(result.reducer).to.be.a('function');
  });
});

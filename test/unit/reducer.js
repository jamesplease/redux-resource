import reduxInconsistentApi from '../../src/redux-inconsistent-api';

describe('reducer', function() {
  it('should be a function', () => {
    const result = reduxInconsistentApi('hello');
    expect(result.reducer).to.be.a('function');
  });

  it('should manage CREATE', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {}
    });
  });
});

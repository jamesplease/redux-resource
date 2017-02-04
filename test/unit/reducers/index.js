import reduxInconsistentApi from '../../../src/redux-inconsistent-api';
const {resourceStatuses} = reduxInconsistentApi;

describe('reducer', function() {
  it('should be a function', () => {
    const result = reduxInconsistentApi('hello');
    expect(result.reducer).to.be.a('function');
  });
});

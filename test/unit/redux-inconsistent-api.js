import reduxInconsistentApi from '../../src/redux-inconsistent-api';

describe('reduxInconsistentApi', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(reduxInconsistentApi, 'greet');
      reduxInconsistentApi.greet();
    });

    it('should have been run once', () => {
      expect(reduxInconsistentApi.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(reduxInconsistentApi.greet).to.have.always.returned('hello');
    });
  });
});

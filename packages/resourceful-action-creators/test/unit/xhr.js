import {xhr} from '../../src';

describe('xhr', function() {
  it('should be a function', () => {
    expect(xhr).to.be.a('function');
  });
});

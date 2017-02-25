import {snakeCase} from '../../../src/utils';

describe('snakeCase', function() {
  it('should handle a single word', () => {
    expect(snakeCase('hello')).to.equal('hello');
  });

  it('should handle a camel cased word', () => {
    expect(snakeCase('helloThere')).to.equal('hello_there');
  });
});

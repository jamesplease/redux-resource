import {resourceRequestReducer} from '../../../src';

describe('reducer', function() {
  it('should warn when a bad plugin is initialized', () => {
    stub(console, 'error');

    resourceRequestReducer({
      plugins: [
        () => {
          // Intentionally blank
        }
      ]
    });

    expect(console.error.callCount).to.equal(1);
  });
});

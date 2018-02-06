import {requestStatuses} from '../../../src';

describe('requestStatuses', function() {
  it('should be an object', () => {
    expect(requestStatuses).to.be.an('object');
  });

  it('should have the right statuses', () => {
    expect(requestStatuses.PENDING).to.equal('PENDING');
    expect(requestStatuses.SUCCEEDED).to.equal('SUCCEEDED');
    expect(requestStatuses.FAILED).to.equal('FAILED');
    expect(requestStatuses.IDLE).to.equal('IDLE');
  });
});

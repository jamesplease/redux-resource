import _ from 'lodash';
import reduxInconsistentApi from '../../src/redux-inconsistent-api';

describe('actionTypes', function() {
  it('should be an object', () => {
    const result = reduxInconsistentApi('hello');
    expect(result.actionTypes).to.be.an('object');
  });

  describe('create', () => {
    const actionTypes = reduxInconsistentApi('hello').actionTypes;
    expect(actionTypes.CREATE_HELLO).to.equal('CREATE_HELLO');
    expect(actionTypes.CREATE_HELLO_SUCCESS).to.equal('CREATE_HELLO_SUCCESS');
    expect(actionTypes.CREATE_HELLO_FAILURE).to.equal('CREATE_HELLO_FAILURE');
    expect(actionTypes.CREATE_HELLO_ABORTED).to.equal('CREATE_HELLO_ABORTED');
    expect(actionTypes.CREATE_HELLO_RESET_RESOLUTION).to.equal('CREATE_HELLO_RESET_RESOLUTION');
  });

  describe('retrieveOne', () => {
    const actionTypes = reduxInconsistentApi('hello').actionTypes;
    expect(actionTypes.RETRIEVE_HELLO).to.equal('RETRIEVE_HELLO');
    expect(actionTypes.RETRIEVE_HELLO_SUCCESS).to.equal('RETRIEVE_HELLO_SUCCESS');
    expect(actionTypes.RETRIEVE_HELLO_FAILURE).to.equal('RETRIEVE_HELLO_FAILURE');
    expect(actionTypes.RETRIEVE_HELLO_ABORTED).to.equal('RETRIEVE_HELLO_ABORTED');
    expect(actionTypes.RETRIEVE_HELLO_RESET_RESOLUTION).to.equal('RETRIEVE_HELLO_RESET_RESOLUTION');
  });

  describe('retrieveMany', () => {
    const actionTypes = reduxInconsistentApi('hello').actionTypes;
    expect(actionTypes.RETRIEVE_HELLOS).to.equal('RETRIEVE_HELLOS');
    expect(actionTypes.RETRIEVE_HELLOS_SUCCESS).to.equal('RETRIEVE_HELLOS_SUCCESS');
    expect(actionTypes.RETRIEVE_HELLOS_FAILURE).to.equal('RETRIEVE_HELLOS_FAILURE');
    expect(actionTypes.RETRIEVE_HELLOS_ABORTED).to.equal('RETRIEVE_HELLOS_ABORTED');
    expect(actionTypes.RETRIEVE_HELLOS_RESET_RESOLUTION).to.equal('RETRIEVE_HELLOS_RESET_RESOLUTION');
  });

  describe('update', () => {
    const actionTypes = reduxInconsistentApi('hello').actionTypes;
    expect(actionTypes.UPDATE_HELLO).to.equal('UPDATE_HELLO');
    expect(actionTypes.UPDATE_HELLO_SUCCESS).to.equal('UPDATE_HELLO_SUCCESS');
    expect(actionTypes.UPDATE_HELLO_FAILURE).to.equal('UPDATE_HELLO_FAILURE');
    expect(actionTypes.UPDATE_HELLO_ABORTED).to.equal('UPDATE_HELLO_ABORTED');
    expect(actionTypes.UPDATE_HELLO_RESET_RESOLUTION).to.equal('UPDATE_HELLO_RESET_RESOLUTION');
  });

  describe('delete', () => {
    const actionTypes = reduxInconsistentApi('hello').actionTypes;
    expect(actionTypes.DELETE_HELLO).to.equal('DELETE_HELLO');
    expect(actionTypes.DELETE_HELLO_SUCCESS).to.equal('DELETE_HELLO_SUCCESS');
    expect(actionTypes.DELETE_HELLO_FAILURE).to.equal('DELETE_HELLO_FAILURE');
    expect(actionTypes.DELETE_HELLO_ABORTED).to.equal('DELETE_HELLO_ABORTED');
    expect(actionTypes.DELETE_HELLO_RESET_RESOLUTION).to.equal('DELETE_HELLO_RESET_RESOLUTION');
  });

  describe('only allowing readMany', () => {
    const actionTypes = reduxInconsistentApi('hello', {
      allowedOperations: {
        create: false,
        readMany: true,
        readOne: false,
        update: false,
        del: false
      }
    }).actionTypes;
    expect(_.size(actionTypes)).to.equal(5);
    expect(actionTypes.RETRIEVE_HELLOS).to.equal('RETRIEVE_HELLOS');
    expect(actionTypes.RETRIEVE_HELLOS_SUCCESS).to.equal('RETRIEVE_HELLOS_SUCCESS');
    expect(actionTypes.RETRIEVE_HELLOS_FAILURE).to.equal('RETRIEVE_HELLOS_FAILURE');
    expect(actionTypes.RETRIEVE_HELLOS_ABORTED).to.equal('RETRIEVE_HELLOS_ABORTED');
    expect(actionTypes.RETRIEVE_HELLOS_RESET_RESOLUTION).to.equal('RETRIEVE_HELLOS_RESET_RESOLUTION');
  });
});

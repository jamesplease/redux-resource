import _ from 'lodash';
import simpleResource from '../../src';

describe('actionTypes', function() {
  it('should be an object', () => {
    const result = simpleResource('hello');
    expect(result.actionTypes).to.be.an('object');
  });

  describe('create', () => {
    const actionTypes = simpleResource('hello').actionTypes;
    expect(actionTypes.CREATE_HELLO).to.equal('CREATE_HELLO');
    expect(actionTypes.CREATE_HELLO_SUCCEED).to.equal('CREATE_HELLO_SUCCEED');
    expect(actionTypes.CREATE_HELLO_FAIL).to.equal('CREATE_HELLO_FAIL');
    expect(actionTypes.CREATE_HELLO_ABORT).to.equal('CREATE_HELLO_ABORT');
    expect(actionTypes.CREATE_HELLO_RESET).to.equal('CREATE_HELLO_RESET');
  });

  describe('retrieveOne', () => {
    const actionTypes = simpleResource('hello').actionTypes;
    expect(actionTypes.RETRIEVE_HELLO).to.equal('RETRIEVE_HELLO');
    expect(actionTypes.RETRIEVE_HELLO_SUCCEED).to.equal('RETRIEVE_HELLO_SUCCEED');
    expect(actionTypes.RETRIEVE_HELLO_FAIL).to.equal('RETRIEVE_HELLO_FAIL');
    expect(actionTypes.RETRIEVE_HELLO_ABORT).to.equal('RETRIEVE_HELLO_ABORT');
    expect(actionTypes.RETRIEVE_HELLO_RESET).to.equal('RETRIEVE_HELLO_RESET');
  });

  describe('retrieveMany', () => {
    const actionTypes = simpleResource('hello').actionTypes;
    expect(actionTypes.RETRIEVE_HELLOS).to.equal('RETRIEVE_HELLOS');
    expect(actionTypes.RETRIEVE_HELLOS_SUCCEED).to.equal('RETRIEVE_HELLOS_SUCCEED');
    expect(actionTypes.RETRIEVE_HELLOS_FAIL).to.equal('RETRIEVE_HELLOS_FAIL');
    expect(actionTypes.RETRIEVE_HELLOS_ABORT).to.equal('RETRIEVE_HELLOS_ABORT');
    expect(actionTypes.RETRIEVE_HELLOS_RESET).to.equal('RETRIEVE_HELLOS_RESET');
  });

  describe('update', () => {
    const actionTypes = simpleResource('hello').actionTypes;
    expect(actionTypes.UPDATE_HELLO).to.equal('UPDATE_HELLO');
    expect(actionTypes.UPDATE_HELLO_SUCCEED).to.equal('UPDATE_HELLO_SUCCEED');
    expect(actionTypes.UPDATE_HELLO_FAIL).to.equal('UPDATE_HELLO_FAIL');
    expect(actionTypes.UPDATE_HELLO_ABORT).to.equal('UPDATE_HELLO_ABORT');
    expect(actionTypes.UPDATE_HELLO_RESET).to.equal('UPDATE_HELLO_RESET');
  });

  describe('delete', () => {
    const actionTypes = simpleResource('hello').actionTypes;
    expect(actionTypes.DELETE_HELLO).to.equal('DELETE_HELLO');
    expect(actionTypes.DELETE_HELLO_SUCCEED).to.equal('DELETE_HELLO_SUCCEED');
    expect(actionTypes.DELETE_HELLO_FAIL).to.equal('DELETE_HELLO_FAIL');
    expect(actionTypes.DELETE_HELLO_ABORT).to.equal('DELETE_HELLO_ABORT');
    expect(actionTypes.DELETE_HELLO_RESET).to.equal('DELETE_HELLO_RESET');
  });

  describe('only allowing readMany', () => {
    const actionTypes = simpleResource('hello', {
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
    expect(actionTypes.RETRIEVE_HELLOS_SUCCEED).to.equal('RETRIEVE_HELLOS_SUCCEED');
    expect(actionTypes.RETRIEVE_HELLOS_FAIL).to.equal('RETRIEVE_HELLOS_FAIL');
    expect(actionTypes.RETRIEVE_HELLOS_ABORT).to.equal('RETRIEVE_HELLOS_ABORT');
    expect(actionTypes.RETRIEVE_HELLOS_RESET).to.equal('RETRIEVE_HELLOS_RESET');
  });
});

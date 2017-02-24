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
    expect(actionTypes.READ_ONE_HELLO).to.equal('READ_ONE_HELLO');
    expect(actionTypes.READ_ONE_HELLO_SUCCEED).to.equal('READ_ONE_HELLO_SUCCEED');
    expect(actionTypes.READ_ONE_HELLO_FAIL).to.equal('READ_ONE_HELLO_FAIL');
    expect(actionTypes.READ_ONE_HELLO_ABORT).to.equal('READ_ONE_HELLO_ABORT');
    expect(actionTypes.READ_ONE_HELLO_RESET).to.equal('READ_ONE_HELLO_RESET');
  });

  describe('retrieveMany', () => {
    const actionTypes = simpleResource('hello').actionTypes;
    expect(actionTypes.READ_MANY_HELLOS).to.equal('READ_MANY_HELLOS');
    expect(actionTypes.READ_MANY_HELLOS_SUCCEED).to.equal('READ_MANY_HELLOS_SUCCEED');
    expect(actionTypes.READ_MANY_HELLOS_FAIL).to.equal('READ_MANY_HELLOS_FAIL');
    expect(actionTypes.READ_MANY_HELLOS_ABORT).to.equal('READ_MANY_HELLOS_ABORT');
    expect(actionTypes.READ_MANY_HELLOS_RESET).to.equal('READ_MANY_HELLOS_RESET');
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
      supportedActions: {
        create: false,
        readMany: true,
        readOne: false,
        update: false,
        del: false
      }
    }).actionTypes;
    expect(_.size(actionTypes)).to.equal(5);
    expect(actionTypes.READ_MANY_HELLOS).to.equal('READ_MANY_HELLOS');
    expect(actionTypes.READ_MANY_HELLOS_SUCCEED).to.equal('READ_MANY_HELLOS_SUCCEED');
    expect(actionTypes.READ_MANY_HELLOS_FAIL).to.equal('READ_MANY_HELLOS_FAIL');
    expect(actionTypes.READ_MANY_HELLOS_ABORT).to.equal('READ_MANY_HELLOS_ABORT');
    expect(actionTypes.READ_MANY_HELLOS_RESET).to.equal('READ_MANY_HELLOS_RESET');
  });

  describe('passing in various names', () => {
    const helloThereActionTypes = simpleResource('hello there').actionTypes;
    expect(helloThereActionTypes.READ_MANY_HELLO_THERES).to.equal('READ_MANY_HELLO_THERES');

    const bookCaseActionTypes = simpleResource('bookCase').actionTypes;
    expect(bookCaseActionTypes.READ_MANY_BOOK_CASES).to.equal('READ_MANY_BOOK_CASES');

    const jsonViewerActionTypes = simpleResource('JSONViewer').actionTypes;
    expect(jsonViewerActionTypes.READ_MANY_JSON_VIEWERS).to.equal('READ_MANY_JSON_VIEWERS');

    const catPersonActionTypes = simpleResource('cat-person', {pluralForm: 'cat-people'}).actionTypes;
    expect(catPersonActionTypes.READ_MANY_CAT_PEOPLE).to.equal('READ_MANY_CAT_PEOPLE');
  });
});

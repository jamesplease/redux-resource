import {actionTypes} from '../../src/resourceful-redux';

describe('actionTypes', function() {
  it('should be an object', () => {
    expect(actionTypes).to.be.an('object');
  });

  describe('create', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.CREATE_RESOURCES_PENDING).to.equal('CREATE_RESOURCES_PENDING');
      expect(actionTypes.CREATE_RESOURCES_SUCCEEDED).to.equal('CREATE_RESOURCES_SUCCEEDED');
      expect(actionTypes.CREATE_RESOURCES_FAILED).to.equal('CREATE_RESOURCES_FAILED');
      expect(actionTypes.CREATE_RESOURCES_NULL).to.equal('CREATE_RESOURCES_NULL');
    });
  });

  describe('read', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.READ_RESOURCES_PENDING).to.equal('READ_RESOURCES_PENDING');
      expect(actionTypes.READ_RESOURCES_SUCCEEDED).to.equal('READ_RESOURCES_SUCCEEDED');
      expect(actionTypes.READ_RESOURCES_FAILED).to.equal('READ_RESOURCES_FAILED');
      expect(actionTypes.READ_RESOURCES_NULL).to.equal('READ_RESOURCES_NULL');
    });
  });

  describe('update', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.UPDATE_RESOURCES_PENDING).to.equal('UPDATE_RESOURCES_PENDING');
      expect(actionTypes.UPDATE_RESOURCES_SUCCEEDED).to.equal('UPDATE_RESOURCES_SUCCEEDED');
      expect(actionTypes.UPDATE_RESOURCES_FAILED).to.equal('UPDATE_RESOURCES_FAILED');
      expect(actionTypes.UPDATE_RESOURCES_NULL).to.equal('UPDATE_RESOURCES_NULL');
    });
  });

  describe('delete', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.DELETE_RESOURCES_PENDING).to.equal('DELETE_RESOURCES_PENDING');
      expect(actionTypes.DELETE_RESOURCES_SUCCEEDED).to.equal('DELETE_RESOURCES_SUCCEEDED');
      expect(actionTypes.DELETE_RESOURCES_FAILED).to.equal('DELETE_RESOURCES_FAILED');
      expect(actionTypes.DELETE_RESOURCES_NULL).to.equal('DELETE_RESOURCES_NULL');
    });
  });
});

import {upsertResource} from '../../../src';

describe('upsertResource', function() {
  beforeEach(() => {
    this.resources = [
      {id: 1, first_name: 'james', last_name: 'please'},
      {id: 5, first_name: 'stephen', last_name: 'rjr'},
      {id: 7, first_name: 'shilpa', last_name: 'm'}
    ];
  });

  describe('replace: false', () => {
    it('should merge in new data with old', () => {
      const result = upsertResource({
        resources: this.resources,
        resource: {first_name: 'pizza'},
        id: 5,
        replace: false
      });

      expect(result).to.deep.equal([
        {id: 1, first_name: 'james', last_name: 'please'},
        {id: 5, first_name: 'pizza', last_name: 'rjr'},
        {id: 7, first_name: 'shilpa', last_name: 'm'}
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
      // The modified resource is shallow cloned
      expect(result[1]).to.not.equal(this.resources[1]);
      // Unrelated resources are unchanged
      expect(result[0]).to.equal(this.resources[0]);
      expect(result[2]).to.equal(this.resources[2]);
    });

    it('should append a brand new resource to the end of the list', () => {
      const result = upsertResource({
        resources: this.resources,
        resource: {id: 10, first_name: 'darlin'},
        id: 10,
        replace: false
      });

      expect(result).to.deep.equal([
        {id: 1, first_name: 'james', last_name: 'please'},
        {id: 5, first_name: 'stephen', last_name: 'rjr'},
        {id: 7, first_name: 'shilpa', last_name: 'm'},
        {id: 10, first_name: 'darlin'},
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
      // Unrelated resources are unchanged
      expect(result[0]).to.equal(this.resources[0]);
      expect(result[1]).to.equal(this.resources[1]);
      expect(result[2]).to.equal(this.resources[2]);
    });
  });

  describe('replace: true', () => {
    it('should replace the old data', () => {
      const result = upsertResource({
        resources: this.resources,
        resource: {id: 5, first_name: 'pizza'},
        id: 5,
        replace: true
      });

      expect(result).to.deep.equal([
        {id: 1, first_name: 'james', last_name: 'please'},
        {id: 5, first_name: 'pizza'},
        {id: 7, first_name: 'shilpa', last_name: 'm'}
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
      // The modified resource is shallow cloned
      expect(result[1]).to.not.equal(this.resources[1]);
      // Unrelated resources are unchanged
      expect(result[0]).to.equal(this.resources[0]);
      expect(result[2]).to.equal(this.resources[2]);
    });

    it('should append a brand new resource to the end of the list', () => {
      const result = upsertResource({
        resources: this.resources,
        resource: {id: 10, first_name: 'darlin'},
        id: 10,
        replace: true
      });

      expect(result).to.deep.equal([
        {id: 1, first_name: 'james', last_name: 'please'},
        {id: 5, first_name: 'stephen', last_name: 'rjr'},
        {id: 7, first_name: 'shilpa', last_name: 'm'},
        {id: 10, first_name: 'darlin'},
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
      // Unrelated resources are unchanged
      expect(result[0]).to.equal(this.resources[0]);
      expect(result[1]).to.equal(this.resources[1]);
      expect(result[2]).to.equal(this.resources[2]);
    });
  });
});

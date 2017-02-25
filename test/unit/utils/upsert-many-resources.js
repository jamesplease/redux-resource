import {upsertManyResources} from '../../../src';

describe('upsertManyResources', function() {
  beforeEach(() => {
    this.resources = [
      {personId: 1, first_name: 'james', last_name: 'please'},
      {personId: 5, first_name: 'stephen', last_name: 'rjr'},
      {personId: 7, first_name: 'shilpa', last_name: 'm'}
    ];
  });

  describe('replace: true', () => {
    it('should replace "unmatched" resources in the store, and the data for "matched" resources', () => {
      const result = upsertManyResources({
        resources: this.resources,
        newResources: [
          {personId: 1, first_name: 'oink'}
        ],
        idAttribute: 'personId',
        replace: true
      });

      expect(result).to.deep.equal([
        {personId: 1, first_name: 'oink'}
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
    });

    it('should add a brand new resource', () => {
      const result = upsertManyResources({
        resources: this.resources,
        newResources: [
          {personId: 10, first_name: 'oink'}
        ],
        idAttribute: 'personId',
        replace: true
      });

      expect(result).to.deep.equal([
        {personId: 10, first_name: 'oink'},
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
    });
  });

  describe('replace: false', () => {
    it('should keep "unmatched" resources in the store, and merge the data for "matched" resources', () => {
      const result = upsertManyResources({
        resources: this.resources,
        newResources: [
          {personId: 1, first_name: 'oink'}
        ],
        idAttribute: 'personId',
        replace: false
      });

      expect(result).to.deep.equal([
        {personId: 1, first_name: 'oink', last_name: 'please'},
        {personId: 5, first_name: 'stephen', last_name: 'rjr'},
        {personId: 7, first_name: 'shilpa', last_name: 'm'}
      ]);

      // Shallow clones the resources array
      expect(result).to.not.equal(this.resources);
      // The modified resource is shallow cloned
      expect(result[0]).to.not.equal(this.resources[0]);
      // Unrelated resources are unchanged
      expect(result[1]).to.equal(this.resources[1]);
      expect(result[2]).to.equal(this.resources[2]);
    });
  });

  it('should add a brand new resource', () => {
    const result = upsertManyResources({
      resources: this.resources,
      newResources: [
        {personId: 10, first_name: 'oink'}
      ],
      idAttribute: 'personId',
      replace: false
    });

    expect(result).to.deep.equal([
      {personId: 1, first_name: 'james', last_name: 'please'},
      {personId: 5, first_name: 'stephen', last_name: 'rjr'},
      {personId: 7, first_name: 'shilpa', last_name: 'm'},
      {personId: 10, first_name: 'oink'},
    ]);

    // Shallow clones the resources array
    expect(result).to.not.equal(this.resources);
    // Unrelated resources are unchanged
    expect(result[0]).to.equal(this.resources[0]);
    expect(result[1]).to.equal(this.resources[1]);
    expect(result[2]).to.equal(this.resources[2]);
  });
});

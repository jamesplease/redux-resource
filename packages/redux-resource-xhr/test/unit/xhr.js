import xhr, { __RewireAPI__ } from '../../src/xhr';
import qs from 'qs';

describe('xhr', function() {
  afterEach(() => {
    __RewireAPI__.__ResetDependency__('xhr');
  });

  it('should be a function', () => {
    expect(xhr).to.be.a('function');
  });

  it('should have the right keys', () => {
    this.xhrStub = stub();
    __RewireAPI__.__Rewire__('xhr', this.xhrStub);

    expect(xhr).to.have.keys(['get', 'put', 'post', 'patch', 'head', 'del']);
  });

  describe('xhr(url, options)', () => {
    it('should return a Promise that rejects when an error occurs', done => {
      const err = new Error('oops');
      this.xhrStub = stub().callsFake((options, cb) => {
        cb(err);
      });
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const result = xhr('https://www.google.com', { method: 'GET' });
      expect(result).to.be.a('Promise');

      result
        .then(() => done(new Error('This should not have been called')))
        .catch(error => {
          expect(error).to.equal(err);
          done();
        });
    });

    it('should return a Promise that resolves when there is no error', done => {
      const res = {};
      this.xhrStub = stub().callsFake((options, cb) => {
        cb(undefined, res);
      });
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const result = xhr('https://www.google.com', { method: 'GET' });
      expect(result).to.be.a('Promise');

      result
        .catch(() => done(new Error('This should not have been called')))
        .then(result => {
          expect(result).to.equal(res);
          done();
        });
    });
  });

  describe('xhr(url, options, cb)', () => {
    it('should call xhr with the correct args', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      xhr('https://www.google.com', { method: 'GET' }, cb);

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri: 'https://www.google.com',
          method: 'GET'
        },
        cb
      );
    });
  });

  describe('xhr(url, options, cb); custom query string serializer', () => {
    it('should call xhr with the correct args', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      const options = {
        method: 'GET',
        qs: { a: 'b', c: ['d', 'e=f'], f: [['g'], ['h']] },
        qsStringify: qs.stringify,
        qsStringifyOptions: { encodeValuesOnly: true }
      };
      xhr('https://www.google.com', options, cb);

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri:
            'https://www.google.com?a=b&c[0]=d&c[1]=e%3Df&f[0][0]=g&f[1][0]=h',
          method: 'GET',
          qs: { a: 'b', c: ['d', 'e=f'], f: [['g'], ['h']] },
          qsStringify: qs.stringify,
          qsStringifyOptions: { encodeValuesOnly: true }
        },
        cb
      );
    });
  });

  describe('xhr(url, cb)', () => {
    it('should call xhr with the correct args', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      xhr('https://www.google.com', cb);

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri: 'https://www.google.com'
        },
        cb
      );
    });
  });

  describe('cb(options, cb), with qs option', () => {
    it('should call xhr with the correct args', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      xhr(
        {
          url: 'https://www.google.com',
          method: 'GET',
          qs: {
            pasta: true
          }
        },
        cb
      );

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri: 'https://www.google.com?pasta=true',
          qs: {
            pasta: true
          },
          method: 'GET'
        },
        cb
      );
    });
  });

  describe('helper methods', () => {
    it('xhr.get(uri, options, cb)', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      xhr.get(
        'https://www.google.com',
        {
          qs: {
            pasta: true
          }
        },
        cb
      );

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri: 'https://www.google.com?pasta=true',
          qs: {
            pasta: true
          },
          method: 'GET'
        },
        cb
      );
    });

    it('xhr.get(uri, cb)', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      xhr.get('https://www.google.com', cb);

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri: 'https://www.google.com',
          method: 'GET'
        },
        cb
      );
    });

    it('xhr.get(options, cb)', () => {
      this.xhrStub = stub();
      __RewireAPI__.__Rewire__('xhr', this.xhrStub);

      const cb = stub();
      xhr.get({ uri: 'https://www.google.com' }, cb);

      expect(this.xhrStub).to.have.been.calledWith(
        {
          uri: 'https://www.google.com',
          method: 'GET'
        },
        cb
      );
    });
  });
});

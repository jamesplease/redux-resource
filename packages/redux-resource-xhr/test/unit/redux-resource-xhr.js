import {crudRequest, __RewireAPI__} from '../../src';

describe('Redux Resource XHR', function() {
  beforeEach(() => {
    this.dispatch = stub();
  });

  describe('crudRequest', () => {
    beforeEach(() => {
      stub(console, 'warn');
    });

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('xhr');
    });

    describe('warnings', () => {
      beforeEach(() => {
        this.xhrStub = stub();
        __RewireAPI__.__Rewire__('xhr', this.xhrStub);
      });

      it('should not warn when the minimum options are provided', () => {
        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
          },
          xhrOptions: {
            url: 'https://www.google.com'
          }
        });

        expect(console.warn.callCount).to.equal(0);
      });

      it('should warn when a url/uri is not provided', () => {
        crudRequest('update', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });

      it('should warn when a resourceName is not provided', () => {
        crudRequest('read', {
          dispatch: this.dispatch,
          xhrOptions: {
            url: 'https://www.google.com'
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });

      it('should warn when an invalid `crudAction` is provided', () => {
        crudRequest('apples', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello'
          },
          xhrOptions: {
            url: 'https://www.google.com'
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });

      it('should warn when a `crudAction` is not provided', () => {
        crudRequest(undefined, {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello'
          },
          xhrOptions: {
            url: 'https://www.google.com',
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });
    });

    describe('when the request is aborted', () => {
      it('should dispatch the correct actions', (done) => {
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb();

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [21, 42]
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'READ_RESOURCES_IDLE',
              resourceName: 'hello',
              statusCode: 0,
              res: undefined,
              resources: [21, 42]
            }]);

            done();
          });

          return {
            aborted: true
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [21, 42]
          },
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('when the request is aborted; passing onAborted', () => {
      it('should dispatch the correct actions', (done) => {
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb();

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(1);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [21, 42]
            }]);

            expect(this.onAbortedStub.callCount).to.equal(1);
            expect(this.onAbortedStub.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_IDLE',
              resourceName: 'hello',
              statusCode: 0,
              res: undefined,
              resources: [21, 42]
            }, undefined]);

            done();
          });

          return {
            aborted: true
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);
        this.onAbortedStub = stub();

        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [21, 42]
          },
          crudAction: 'read',
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          },
          onAborted: this.onAbortedStub
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, with a body; passing `onPending`', () => {
      it('should dispatch the correct actions', (done) => {
        const body = [
          {id: 21},
          {id: 42}
        ];

        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 200,
                body
              },
              body
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(1);

            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              statusCode: 200,
              res: {
                statusCode: 200,
                body
              },
              resources: [
                {id: 21},
                {id: 42}
              ]
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.onPendingStub = stub();

        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [21, 42]
          },
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          },
          onPending: this.onPendingStub
        });

        expect(this.xhrStub.callCount).to.equal(1);
        expect(this.onPendingStub.callCount).to.equal(1);
        expect(this.onPendingStub.args[0]).to.deep.equal([{
          type: 'READ_RESOURCES_PENDING',
          resourceName: 'hello',
          statusCode: 0,
          resources: [21, 42]
        }]);
      });
    });

    describe('success, with a body; passing `onSucceeded`', () => {
      it('should dispatch the correct actions', (done) => {
        const body = [
          {id: 21},
          {id: 42}
        ];

        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 200,
                body
              },
              body
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(1);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [21, 42]
            }]);

            expect(this.onSucceededStub.callCount).to.equal(1);
            expect(this.onSucceededStub.args[0]).to.deep.equal([
              {
                type: 'READ_RESOURCES_SUCCEEDED',
                resourceName: 'hello',
                statusCode: 200,
                res: {
                  statusCode: 200,
                  body
                },
                resources: [
                  {id: 21},
                  {id: 42}
                ]
              },
              {
                statusCode: 200,
                body
              },
              body
            ]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.onSucceededStub = stub();

        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [21, 42]
          },
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          },
          onSucceeded: this.onSucceededStub
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, with a body', () => {
      it('should dispatch the correct actions', (done) => {
        const body = [
          {id: 21},
          {id: 42}
        ];

        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 200,
                body
              },
              body
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [21, 42]
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'READ_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              statusCode: 200,
              res: {
                statusCode: 200,
                body
              },
              resources: [
                {id: 21},
                {id: 42}
              ]
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [21, 42]
          },
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, with a body + transformData fn', () => {
      it('should dispatch the correct actions', (done) => {
        const body = {
          data: [
            {id: 21},
            {id: 42}
          ]
        };

        const transformData = body => body.data;

        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 201,
                body
              },
              body
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [21, 42]
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'READ_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              statusCode: 201,
              res: {
                statusCode: 201,
                body
              },
              resources: [
                {id: 21},
                {id: 42}
              ]
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        crudRequest('read', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [21, 42]
          },
          transformData,
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, without a body', () => {
      it('should dispatch the correct actions', (done) => {
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 204
              }
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'DELETE'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'DELETE_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [1, 14],
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'DELETE_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              statusCode: 204,
              resources: [1, 14],
              res: {
                statusCode: 204
              },
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        crudRequest('delete', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [1, 14]
          },
          xhrOptions: {
            method: 'DELETE',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('when the request errors, without a status code', () => {
      it('should dispatch the correct actions', (done) => {
        const err = new Error('oops');
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(err);

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'DELETE'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'DELETE_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [1, 14],
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'DELETE_RESOURCES_FAILED',
              resourceName: 'hello',
              statusCode: 0,
              resources: [1, 14],
              err,
              res: undefined,
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        crudRequest('delete', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [1, 14]
          },
          xhrOptions: {
            method: 'DELETE',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('when the request errors, without a status code; passing onFailed', () => {
      it('should dispatch the correct actions', (done) => {
        const err = new Error('oops');
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(err);

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'DELETE'
            });

            expect(this.dispatch.callCount).to.equal(1);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'DELETE_RESOURCES_PENDING',
              resourceName: 'hello',
              statusCode: 0,
              resources: [1, 14],
            }]);

            expect(this.onFailedStub.callCount).to.equal(1);
            expect(this.onFailedStub.args[0]).to.deep.equal([{
              type: 'DELETE_RESOURCES_FAILED',
              resourceName: 'hello',
              statusCode: 0,
              resources: [1, 14],
              err,
              res: undefined,
            }, err, undefined]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);
        this.onFailedStub = stub();

        crudRequest('delete', {
          dispatch: this.dispatch,
          actionDefaults: {
            resourceName: 'hello',
            resources: [1, 14]
          },
          crudAction: 'delete',
          xhrOptions: {
            method: 'DELETE',
            url: 'https://www.google.com'
          },
          onFailed: this.onFailedStub
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });
  });
});

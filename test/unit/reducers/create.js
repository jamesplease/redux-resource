// import {resourceReducer, requestStatuses} from '../../../src';
//
// describe('reducers: create', function() {
//   it('should handle `CREATE_RESOURCES`', () => {
//     const reducer = resourceReducer('hellos');
//     const reduced = reducer(undefined, {
//       type: 'CREATE_RESOURCES',
//       resourceName: 'hellos',
//     });
//
//     expect(reduced).to.deep.equal({
//       resources: [],
//       meta: {},
//       labels: {},
//       listMeta: {
//         updateStatus: requestStatuses.NULL,
//         deleteStatus: requestStatuses.NULL,
//         createStatus: requestStatuses.PENDING,
//         readStatus: requestStatuses.NULL
//       }
//     });
//   });
//
//   it('should handle `CREATE_RESOURCES_FAIL`', () => {
//     const reducer = resourceReducer('hellos');
//     const reduced = reducer(undefined, {
//       type: 'CREATE_RESOURCES_FAIL',
//       resourceName: 'hellos',
//     });
//
//     expect(reduced).to.deep.equal({
//       resources: [],
//       meta: {},
//       labels: {},
//       listMeta: {
//         updateStatus: requestStatuses.NULL,
//         deleteStatus: requestStatuses.NULL,
//         createStatus: requestStatuses.FAILED,
//         readStatus: requestStatuses.NULL
//       }
//     });
//   });
//
//   it('should handle `CREATE_RESOURCES_NULL`', () => {
//     const reducer = resourceReducer('hellos');
//     const reduced = reducer(undefined, {
//       type: 'CREATE_RESOURCES_NULL',
//       resourceName: 'hellos',
//     });
//
//     expect(reduced).to.deep.equal({
//       resources: [],
//       meta: {},
//       labels: {},
//       listMeta: {
//         updateStatus: requestStatuses.NULL,
//         deleteStatus: requestStatuses.NULL,
//         createStatus: requestStatuses.NULL,
//         readStatus: requestStatuses.NULL
//       }
//     });
//   });
// });

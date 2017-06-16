// import {resourceReducer, requestStatuses} from '../../../src';
//
// describe('reducers: update', function() {
//   it('should handle `UPDATE_RESOURCES`', () => {
//     const reducer = resourceReducer('hellos', {
//       initialState: {
//         resources: [
//           {id: 1, hungry: null},
//           {id: 3, hungry: null},
//           {id: 4, hungry: null},
//         ]
//       }
//     });
//
//     const reduced = reducer(undefined, {
//       type: 'UPDATE_RESOURCES',
//       ids: [3, 4],
//       resourceName: 'hellos',
//       resources: [
//         {
//           id: 3,
//           hungry: true
//         },
//         {
//           id: 4,
//           hungry: false
//         }
//       ]
//     });
//
//     expect(reduced).to.deep.equal({
//       resources: [
//         {id: 1, hungry: null},
//         {id: 3, hungry: null},
//         {id: 4, hungry: null},
//       ],
//       meta: {
//         3: {
//           updateStatus: requestStatuses.PENDING
//         },
//         4: {
//           updateStatus: requestStatuses.PENDING
//         }
//       },
//       labels: {},
//       listMeta: {
//         readStatus: requestStatuses.NULL,
//         updateStatus: requestStatuses.NULL,
//         deleteStatus: requestStatuses.NULL,
//         createStatus: requestStatuses.NULL
//       }
//     });
//   });
//
//   it('should handle `UPDATE_RESOURCES_FAIL`', () => {
//     const reducer = resourceReducer('hellos', {
//       initialState: {
//         resources: [
//           {id: 1, hungry: null},
//           {id: 3, hungry: null},
//           {id: 4, hungry: null},
//         ]
//       }
//     });
//
//     const reduced = reducer(undefined, {
//       type: 'UPDATE_RESOURCES_FAIL',
//       ids: [3, 4],
//       resourceName: 'hellos',
//       resources: [
//         {
//           id: 3,
//           hungry: true
//         },
//         {
//           id: 4,
//           hungry: false
//         }
//       ]
//     });
//
//     expect(reduced).to.deep.equal({
//       resources: [
//         {id: 1, hungry: null},
//         {id: 3, hungry: null},
//         {id: 4, hungry: null},
//       ],
//       meta: {
//         3: {
//           updateStatus: requestStatuses.FAILED
//         },
//         4: {
//           updateStatus: requestStatuses.FAILED
//         }
//       },
//       labels: {},
//       listMeta: {
//         readStatus: requestStatuses.NULL,
//         updateStatus: requestStatuses.NULL,
//         deleteStatus: requestStatuses.NULL,
//         createStatus: requestStatuses.NULL
//       }
//     });
//   });
//
//   it('should handle `UPDATE_RESOURCES_NULL`', () => {
//     const reducer = resourceReducer('hellos', {
//       initialState: {
//         resources: [
//           {id: 1, hungry: null},
//           {id: 3, hungry: null},
//           {id: 4, hungry: null},
//         ]
//       }
//     });
//
//     const reduced = reducer(undefined, {
//       type: 'UPDATE_RESOURCES_NULL',
//       resourceName: 'hellos',
//       ids: [3, 4],
//       resources: [
//         {
//           id: 3,
//           hungry: true
//         },
//         {
//           id: 4,
//           hungry: false
//         }
//       ]
//     });
//
//     expect(reduced).to.deep.equal({
//       resources: [
//         {id: 1, hungry: null},
//         {id: 3, hungry: null},
//         {id: 4, hungry: null},
//       ],
//       meta: {
//         3: {
//           updateStatus: requestStatuses.NULL
//         },
//         4: {
//           updateStatus: requestStatuses.NULL
//         }
//       },
//       labels: {},
//       listMeta: {
//         readStatus: requestStatuses.NULL,
//         updateStatus: requestStatuses.NULL,
//         deleteStatus: requestStatuses.NULL,
//         createStatus: requestStatuses.NULL
//       }
//     });
//   });
//
//   describe('UPDATE_RESOURCES_SUCCEED:', () => {
//     it('IDs, no label, default options', () => {
//       const reducer = resourceReducer('hellos', {
//         initialState: {
//           resources: [
//             {id: 1, hungry: null},
//             {id: 3, hungry: null, name: 'sammy'},
//             {id: 4, hungry: null},
//           ],
//           labels: {}
//         }
//       });
//
//       const reduced = reducer(undefined, {
//         type: 'UPDATE_RESOURCES_SUCCEED',
//         ids: [3, 4],
//         resourceName: 'hellos',
//         resources: [
//           {
//             id: 3,
//             hungry: true
//           },
//           {
//             id: 4,
//             hungry: false
//           }
//         ]
//       });
//
//       expect(reduced).to.deep.equal({
//         resources: [
//           {id: 1, hungry: null},
//           {id: 3, hungry: true, name: 'sammy'},
//           {id: 4, hungry: false},
//         ],
//         meta: {
//           3: {
//             updateStatus: requestStatuses.SUCCEEDED
//           },
//           4: {
//             updateStatus: requestStatuses.SUCCEEDED
//           }
//         },
//         labels: {},
//         listMeta: {
//           readStatus: requestStatuses.NULL,
//           updateStatus: requestStatuses.NULL,
//           deleteStatus: requestStatuses.NULL,
//           createStatus: requestStatuses.NULL
//         }
//       });
//     });
//
//     it('IDs, no label, mergeResources: false', () => {
//       const reducer = resourceReducer('hellos', {
//         initialState: {
//           resources: [
//             {id: 1, hungry: null},
//             {id: 3, hungry: null, name: 'sammy'},
//             {id: 4, hungry: null},
//           ],
//           labels: {}
//         }
//       });
//
//       const reduced = reducer(undefined, {
//         type: 'UPDATE_RESOURCES_SUCCEED',
//         ids: [3, 4],
//         resourceName: 'hellos',
//         mergeResources: false,
//         resources: [
//           {
//             id: 3,
//             hungry: true
//           },
//           {
//             id: 4,
//             hungry: false
//           }
//         ]
//       });
//
//       expect(reduced).to.deep.equal({
//         resources: [
//           {id: 1, hungry: null},
//           {id: 3, hungry: true},
//           {id: 4, hungry: false},
//         ],
//         meta: {
//           3: {
//             updateStatus: requestStatuses.SUCCEEDED
//           },
//           4: {
//             updateStatus: requestStatuses.SUCCEEDED
//           }
//         },
//         labels: {},
//         listMeta: {
//           readStatus: requestStatuses.NULL,
//           updateStatus: requestStatuses.NULL,
//           deleteStatus: requestStatuses.NULL,
//           createStatus: requestStatuses.NULL
//         }
//       });
//     });
//
//     it('IDs, no label, mergeMeta: false', () => {
//       const reducer = resourceReducer('hellos', {
//         initialState: {
//           resources: [
//             {id: 1, hungry: null},
//             {id: 3, hungry: null, name: 'sammy'},
//             {id: 4, hungry: null},
//           ],
//           labels: {},
//           meta: {
//             3: {
//               hungry: true,
//               updateStatus: 'PENDING'
//             },
//             5: {
//               hungry: false
//             }
//           }
//         }
//       });
//
//       const reduced = reducer(undefined, {
//         type: 'UPDATE_RESOURCES_SUCCEED',
//         ids: [3, 4],
//         resourceName: 'hellos',
//         mergeMeta: false,
//         resources: [
//           {
//             id: 3,
//             hungry: true
//           },
//           {
//             id: 4,
//             hungry: false
//           }
//         ]
//       });
//
//       expect(reduced).to.deep.equal({
//         resources: [
//           {id: 1, hungry: null},
//           {id: 3, hungry: true, name: 'sammy'},
//           {id: 4, hungry: false},
//         ],
//         meta: {
//           3: {
//             updateStatus: requestStatuses.SUCCEEDED
//           },
//           4: {
//             updateStatus: requestStatuses.SUCCEEDED
//           },
//           5: {
//             hungry: false
//           }
//         },
//         labels: {},
//         listMeta: {
//           readStatus: requestStatuses.NULL,
//           updateStatus: requestStatuses.NULL,
//           deleteStatus: requestStatuses.NULL,
//           createStatus: requestStatuses.NULL
//         }
//       });
//     });
//   });
// });

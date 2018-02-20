import { actionTypes } from 'redux-resource';

export default function readBook(id) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceType: 'books',
      resources: [id],
    });

    // This timeout is to mimic network latency.
    setTimeout(function() {
      dispatch({
        type: actionTypes.READ_RESOURCES_SUCCEEDED,
        resourceType: 'books',
        resources: [
          {
            id,
            title: 'The Brilliance of the Moon',
            author: 'Lian Hearn',
            releaseYear: 2004,
          },
        ],
      });
    }, 2000);
  };
}

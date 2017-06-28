import { actionTypes } from 'resourceful-redux';

export default function readBook(id) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'books',
      resources: [id]
    });

    // This timeout is to mimic network latency.
    setTimeout(function() {
      dispatch({
        type: actionTypes.READ_RESOURCES_SUCCEEDED,
        resourceName: 'books',
        resources: [
          {
            id,
            title: 'The Brilliance of the Moon',
            author: 'Lian Hearn',
            releaseYear: 2004
          }
        ]
      });
    }, 2000);
  }
}

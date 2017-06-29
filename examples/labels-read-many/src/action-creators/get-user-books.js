import { actionTypes } from 'resourceful-redux';

// This action creator represents retrieving a user's books.
export default function getUserBooks() {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'books',
      label: 'userBooks'
    });

    // This timeout is to mimic network latency.
    setTimeout(function() {
      dispatch({
        type: actionTypes.READ_RESOURCES_SUCCEEDED,
        resourceName: 'books',
        label: 'userBooks',
        resources: [
          {
            id: 1,
            title: 'The Brilliance of the Moon',
            author: 'Lian Hearn',
            releaseYear: 2004
          },
          {
            id: 24,
            title: 'My Name is Red',
            author: 'Orhan Pamuk',
            releaseYear: 1998
          },
          {
            id: 25,
            title: 'Love in the Time of Cholera',
            author: 'Gabriel García Márquez',
            releaseYear: 1985
          }
        ]
      });
    }, 1800);
  }
}

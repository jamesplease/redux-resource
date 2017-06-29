import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStatus, getResources } from 'resourceful-redux';
import { slicePropType } from 'resourceful-redux/prop-types';

class BooksList extends Component {
  render() {
    const { state } = this.props;
    const searchStatus = getStatus(state, 'books.labels.userBooks.status', true);
    const latestStatus = getStatus(state, 'books.labels.latestBooks.status', true);
    const userBooks = getResources(state, 'books', 'userBooks');
    const latestBooks = getResources(state, 'books', 'latestBooks');

    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '350px', marginRight: '50px'}}>
          <h2>Your Books</h2>
          {searchStatus.pending && ('Loading your books...')}
          {searchStatus.succeeded && (
            <div>
              {userBooks.map(book => (
                <div key={book.id}>
                  <h3>{book.title}</h3>
                  <div>{book.author} - {book.releaseYear}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{width: '350px'}}>
          <h2>Recently Released</h2>
          {latestStatus.pending && ('Loading recently released books...')}
          {latestStatus.succeeded && (
            <div>
              {latestBooks.map(book => (
                <div key={book.id}>
                  <h3>{book.title}</h3>
                  <div>{book.author} - {book.releaseYear}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  componentWillMount() {
   const { getUserBooks, getLatestBooks } = this.props;
   getUserBooks();
   getLatestBooks();
  }
}

BooksList.propTypes = {
  getUserBooks: PropTypes.func.isRequired,
  getLatestBooks: PropTypes.func.isRequired,
  state: PropTypes.shape({
    books: slicePropType
  }).isRequired
};

export default BooksList;

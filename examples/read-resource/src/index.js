import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { resourceReducer } from 'resourceful-redux';
import Book from './components/Book';
import readBook from './action-creators/read-book';

const store = createStore(
  resourceReducer('books'),
  applyMiddleware(thunk)
);
const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  <Book
    bookId={24}
    state={store.getState()}
    readBook={() => store.dispatch(readBook(24))}
  />,
  rootEl
);

render();
store.subscribe(render);

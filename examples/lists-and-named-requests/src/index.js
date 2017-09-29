import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { resourceReducer } from 'resourceful-redux';
import BooksList from './components/BooksList';
import getUserBooks from './action-creators/get-user-books';
import getLatestBooks from './action-creators/get-latest-books';

const reducer = combineReducers({
  books: resourceReducer('books')
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  <BooksList
    state={store.getState()}
    getUserBooks={() => store.dispatch(getUserBooks())}
    getLatestBooks={() => store.dispatch(getLatestBooks())}
  />,
  rootEl
);

render();
store.subscribe(render);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App';
import noteReducer, {createNote, setNotes} from './reducers/noteReducer';
import filterReducer, {filterChange} from './reducers/filterReducer';

import noteService from './services/notes'

const store = configureStore({
  reducer: combineReducers({notes:noteReducer, filter:filterReducer}),
});

noteService.getAll().then(notes =>
  store.dispatch(setNotes(notes))
)

console.log(store.getState());


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

store.subscribe(() => console.log(store.getState()))
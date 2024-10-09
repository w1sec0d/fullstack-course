import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App';
import noteReducer, {createNote} from './reducers/noteReducer';
import filterReducer, {filterChange} from './reducers/filterReducer';

const store = configureStore({
  reducer: combineReducers({notes:noteReducer, filter:filterReducer}),
});

console.log(store.getState());


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
import App from './App'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './reducers/store'

import anecdoteService from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'

anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
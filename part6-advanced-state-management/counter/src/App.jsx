import { createStore } from 'redux'

const App = () => {
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      case 'ZERO':
        return 0
      default: // if none of the above matches, code comes here
        return state
    }
  }
  const store = createStore(counterReducer)

}

export default App

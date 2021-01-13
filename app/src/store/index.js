import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  boards: [],
  initboard: [],
  status: '',
  leaderboards: []
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "set-boards":
      return {...state, boards: action.payload}
    case "set-initboard":
      return {...state, initboard: action.payload}
    case "set-validate":
      return {...state, status: action.payload}
    case "set-leaderboards":
      return {...state, leaderboards: state.leaderboards.concat(action.payload)}
    default :
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
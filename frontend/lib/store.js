import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const InitialState = {
  userid: '',
  dateBegin: '',
  dateEnd: '',
}

export const actionTypes = {
  DATE: 'DATE',
  USER_ID: 'USER_ID',
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.DATE:
      return Object.assign({}, state, { dateBegin: action.dateBegin, dateEnd: action.dateEnd })
    case actionTypes.USER_ID:
      return Object.assign({}, state, { userid: action.userid })
    default:
      return state
  }
}

// ACTIONS
export const dateRange = (dateBegin = InitialState.dateBegin, dateEnd = InitialState.dateEnd) => dispatch => {
  return dispatch({ type: actionTypes.DATE, dateBegin, dateEnd })
}
export const UserId = (userid = InitialState.userid) => dispatch => {
  return dispatch({ type: actionTypes.USER_ID, userid })
}

export const initStore = () => {
  return createStore(
    reducer,
    InitialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
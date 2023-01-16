import { combineReducers } from 'redux'
import tokenReducer from '../reducers/tokenReducer'
import timerReducer from '../reducers/timerReducer'

const rootReducer = combineReducers({
  timerState: timerReducer,
  tokenState: tokenReducer,
})

export default rootReducer

import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";
import authReducer from './auth/reducers'

const rootReducers = combineReducers({
  auth: authReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(thunk)))

export default store;

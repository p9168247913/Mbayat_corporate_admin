import { legacy_createStore, compose, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { reducer as  tweetReducer} from "./tweetData/reducer.tweet"; 
import { reducer as userReducer } from "./userData/reducer.user"; 



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ tweet: tweetReducer, users: userReducer })

export const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
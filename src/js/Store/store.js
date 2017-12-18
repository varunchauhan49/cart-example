import { applyMiddleware, createStore } from "redux"

import promise from "redux-promise-middleware";
import thunk from "redux-thunk"
// import { createLogger } from "redux-logger";

import reducer from "../Reducers"

// const middleware = applyMiddleware(  promise(),  thunk,  createLogger() );
const middleware = applyMiddleware(  promise(),  thunk);

export default createStore(reducer, middleware)
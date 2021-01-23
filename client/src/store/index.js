import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//Redux set up
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed: true,
  });
  middlewares.push(logger);
  middlewares.push(reduxImmutableStateInvariant());
}

function configureStore(initialState) {

  //******COMMENT OUT FOR DEPLOYMENT*********//
  // const composeEnhancers =
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  //*****************************************//

  //*******COMMENT OUT FOR DEVELOPMENT********//
  // const middlewareEnhancer = applyMiddleware(...middlewares); // add support for Redux dev tools
  //*****************************************//

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
}

export default configureStore();
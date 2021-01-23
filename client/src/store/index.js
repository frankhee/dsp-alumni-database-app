import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//Redux set up
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed: true,
  });

  middleware.push(logger);
  middleware.push(reduxImmutableStateInvariant());
}

function configureStore(initialState) {

  //******COMMENT OUT FOR DEPLOYMENT*********//
  // const composeEnhancers =
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  //*****************************************//

  //*******COMMENT OUT FOR DEVELOPMENT********//
  const composeEnhancers = compose; // add support for Redux dev tools
  //*****************************************//

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
}

export default configureStore();
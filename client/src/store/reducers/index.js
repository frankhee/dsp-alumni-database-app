import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { alumniReducer } from './alumniReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  user: userReducer,
  alumni: alumniReducer,
  error: errorReducer
});

export default rootReducer;
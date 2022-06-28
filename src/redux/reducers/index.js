import { combineReducers } from 'redux';
import loginReducer from './reducer1';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;

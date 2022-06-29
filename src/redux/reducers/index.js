import { combineReducers } from 'redux';
import loginReducer from './reducer1';
import questionsReducer from './reducer2';

const rootReducer = combineReducers({
  login: loginReducer,
  trivia: questionsReducer,
});

export default rootReducer;

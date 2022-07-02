import { combineReducers } from 'redux';
import loginReducer from './reducer1';
import questionsReducer from './reducer2';
import settingsReducer from './reducer3';

const rootReducer = combineReducers({
  player: loginReducer,
  trivia: questionsReducer,
  settings: settingsReducer,
});

export default rootReducer;

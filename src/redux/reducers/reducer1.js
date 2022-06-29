import { SEND_USER_DATA,
  CHANGE_TOKEN, INVALID_TOKEN, ADD_SCORE, CLEAR_STORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imgURL: '',
  token: '',
};

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SEND_USER_DATA:
    return { ...state, ...payload };
  case CHANGE_TOKEN:
    return { ...state, ...payload };
  case INVALID_TOKEN:
    return { ...state, ...payload };
  case ADD_SCORE:
    return { ...state, score: state.score + payload, assertions: state.assertions + 1 };
  case CLEAR_STORE:
    return {
      ...INITIAL_STATE,
    };
  default: return { ...state };
  }
};

export default loginReducer;

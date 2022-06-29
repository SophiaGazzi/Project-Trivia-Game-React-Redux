import { SEND_USER_DATA, CHANGE_TOKEN, INVALID_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default: return { ...state };
  }
};

export default loginReducer;

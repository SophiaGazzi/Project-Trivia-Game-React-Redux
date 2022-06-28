import { SEND_USER_DATA, CHANGE_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  img: '',
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_DATA:
    return { ...state, img: action.imgURL };
  case CHANGE_TOKEN:
    return { ...state, token: action.token };
  default: return { ...state };
  }
};

export default loginReducer;

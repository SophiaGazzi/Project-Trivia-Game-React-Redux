import { NEW_QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: [],
  current_question: 0,
};

const questionsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case NEW_QUESTION:
    return { ...state, questions: payload };
  default: return state;
  }
};

export default questionsReducer;

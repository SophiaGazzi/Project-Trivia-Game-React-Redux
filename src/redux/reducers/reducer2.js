import { NEW_QUESTION, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: [],
  current_question: 0,
};

const questionsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case NEW_QUESTION:
    return { ...state, questions: payload };
  case NEXT_QUESTION:
    return { ...state, current_question: state.current_question + 1 };
  default: return state;
  }
};

export default questionsReducer;

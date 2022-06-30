import { GET_CATEGORIES, SET_GAME_CONFIG } from '../actions';

const INITIAL_STATE = {
  categories: [],
  category: null,
  quantity: '5',
  difficulty: null,
};

const settingsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CATEGORIES:
    return { ...state, categories: [...payload.categories] };
  case SET_GAME_CONFIG:
    return {
      ...state,
      category: payload.category,
      quantity: payload.quantity,
      difficulty: payload.difficulty,
    };
  default: return state;
  }
};

export default settingsReducer;

import md5 from 'crypto-js/md5';

export const SEND_USER_DATA = 'SEND_USER_DATA';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const NEW_QUESTION = 'NEW_QUESTION';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_PLAYER_IN_RANKING = 'ADD_PLAYER_IN_RANKING';
export const CLEAR_STORE = 'CLEAR_STORE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_GAME_CONFIG = 'SET_GAME_CONFIG';
// export const SET_DIFFICULTY = 'SET_DIFFICULTY';
// export const SET_NUMBERS_OF_QUESTIONS = 'SET_NUMBERS_OF_QUESTIONS';

export const setGameConfigAction = (difficulty, quantity, category) => ({
  type: SET_GAME_CONFIG,
  payload: {
    difficulty,
    quantity,
    category,
  },
});

// export const setNumberOfQuestionsAction = (numberOfQuestions) => ({
//   type: SET_NUMBERS_OF_QUESTIONS,
//   payload: {
//     numberOfQuestions,
//   },
// });

// export const setCategoryAction = (category) => ({
//   type: SET_CATEGORY,
//   payload: {
//     category,
//   },
// });

export const getCategoriesAction = (categories) => ({
  type: GET_CATEGORIES,
  payload: {
    categories,
  },
});

export const nextQuestion = {
  type: NEXT_QUESTION,
};

const tokenInvalido = {
  type: INVALID_TOKEN,
  payload: {
    token: 'INVALID',
  },
};

const sendUserDataAction = (imgURL) => ({
  type: SEND_USER_DATA,
  payload: {
    imgURL,
  },
});

const changeToken = (token, user) => ({
  type: CHANGE_TOKEN,
  payload: {
    token,
    ...user,
  },
});

const newQuestions = (questions) => ({
  type: NEW_QUESTION,
  payload: questions,
});

const selectURLToAPI = (token, dific, category, number) => {
  if (dific && category) return `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${dific}`;

  if (!dific && category) return `https://opentdb.com/api.php?amount=${number}&category=${category}`;

  if (dific && !category) return `https://opentdb.com/api.php?amount=${number}&difficulty=${dific}`;

  if (!dific && !category) return `https://opentdb.com/api.php?amount=${number}&token=${token}`;
};

// const URLSemNumber = (token, dific, category) => {
//   if (dific && category) return `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${dific}&token=${token}`;

//   if (dific && !category) return `https://opentdb.com/api.php?amount=5&difficulty=${dific}&token=${token}`;

//   if (!dific && category) return `https://opentdb.com/api.php?amount=5&category=${category}&token=${token}`;

//   return `https://opentdb.com/api.php?amount=5&token=${token}`;
// };

// const selectURLToAPI = (token, dific, category, number) => {
//   if (number) return URLComNumber(token, dific, category, number);

//   // if (!number) return URLSemNumber(token, dific, category);
// };

export const requireQuestions = (token, dific, category, number) => async (dispatch) => {
  const URL_FOR_QUESTIONS = selectURLToAPI(token, dific, category, number);
  console.log(URL_FOR_QUESTIONS);
  try {
    const response = await fetch(URL_FOR_QUESTIONS);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const NUMBER_INCORRETO = 3;
    if (jsonResponse.response_code === NUMBER_INCORRETO) {
      localStorage.setItem('token', 'INVALID');
      dispatch(tokenInvalido);
    } else {
      dispatch(newQuestions(jsonResponse.results));
    }
  } catch (error) {
    console.log(error);
  }
};

export const requireGravatar = (email) => async (dispatch) => {
  const hash = md5(email).toString();
  const URL = `https://www.gravatar.com/avatar/${hash}`;

  dispatch(sendUserDataAction(URL));
};

export const requireTokenPlayer = (objUser) => async (dispatch) => {
  const URL_API = 'https://opentdb.com/api_token.php?command=request';
  if (localStorage.getItem('token') !== null) {
    dispatch(changeToken(localStorage.getItem('token'), objUser));
  } else {
    try {
      const response = await fetch(URL_API);
      const jsonResponse = await response.json();
      dispatch(changeToken(jsonResponse.token, objUser));
      dispatch(requireQuestions(jsonResponse.token));
      localStorage.setItem('token', jsonResponse.token);
    } catch (error) {
      console.log(error);
    }
  }
};

export const addScore = (timer, dificuldade) => (dispatch) => {
  const ten = 10;
  const pontuation = ten + (timer * dificuldade);

  dispatch({
    type: ADD_SCORE,
    payload: pontuation,
  });
};

export const addPlayerInRanking = (name, picture, score) => () => {
  const arrayJogadores = JSON.parse(localStorage.getItem('ranking')) || [];
  const newJogador = { name, picture, score };
  arrayJogadores.push(newJogador);
  arrayJogadores.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(arrayJogadores));
};

export const clearStore = ({
  type: CLEAR_STORE,
});

export const getCategoriesThunk = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_category.php';
  try {
    const response = await fetch(URL);
    const responseJSON = await response.json();
    // console.log(responseJSON);
    dispatch(getCategoriesAction(responseJSON.trivia_categories));
  } catch (error) {
    console.log(error);
  }
};

import md5 from 'crypto-js/md5';

export const SEND_USER_DATA = 'SEND_USER_DATA';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const NEW_QUESTION = 'NEW_QUESTION';
export const INVALID_TOKEN = 'INVALID_TOKEN';

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

export const requireQuestions = (token) => async (dispatch) => {
  try {
    const URL_FOR_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
    console.log(token, 'token');
    const response = await fetch(URL_FOR_QUESTIONS);
    const jsonResponse = await response.json();
    const NUMBER_CORRETO = 0;
    if (jsonResponse.response_code !== NUMBER_CORRETO) {
      // const URL_API = 'https://opentdb.com/api_token.php?command=request';
      // const response = await fetch(URL_API);
      // const jsonResponse = await response.json();
      console.log(jsonResponse, 'aqui');
      // localStorage.clear();
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

  // const response = await fetch(URL);
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
      // console.log(jsonResponse);
      dispatch(changeToken(jsonResponse.token, objUser));
      dispatch(requireQuestions(jsonResponse.token));
      localStorage.setItem('token', jsonResponse.token);
    } catch (error) {
      console.log(error);
    }
  }
};

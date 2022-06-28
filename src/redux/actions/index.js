import md5 from 'crypto-js/md5';

export const SEND_USER_DATA = 'SEND_USER_DATA';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';

const sendUserDataAction = (imgURL, user) => ({
  type: SEND_USER_DATA,
  payload: {
    imgURL,
    ...user,
  },
});

const changeToken = (token) => ({
  type: CHANGE_TOKEN,
  payload: {
    token,
  },
});

export const requireGravatar = (email, objUser) => async (dispatch) => {
  const hash = md5(email).toString();
  console.log(hash);
  const URL = `https://www.gravatar.com/avatar/${hash}`;
  try {
    const response = await fetch(URL);
    dispatch(sendUserDataAction(response.url, objUser));
  } catch (error) {
    console.log(error);
  }
};

export const requireTokenPlayer = () => async (dispatch) => {
  const URL_API = 'https://opentdb.com/api_token.php?command=request';
  try {
    if (localStorage.getItem('token')) {
      dispatch(changeToken(localStorage.getItem('token')));
    } else {
      const response = await fetch(URL_API);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      dispatch(changeToken(jsonResponse.token));
      localStorage.setItem('token', jsonResponse.token);
    }
  } catch (error) {
    console.log(error);
  }
};

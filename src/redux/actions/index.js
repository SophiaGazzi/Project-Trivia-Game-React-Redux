import md5 from 'crypto-js/md5';

export const SEND_USER_DATA = 'SEND_USER_DATA';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';

export const sendUserDataAction = (imgURL) => ({
  type: SEND_USER_DATA,
  imgURL,
});

const changeToken = (token) => ({
  type: CHANGE_TOKEN,
  token,
});

export const requireGravatar = (email) => async (dispatch) => {
  const hash = md5(email).toString();
  const URL = `https://www.gravatar.com/avatar/${hash}`;
  try {
    const response = await fetch(URL);
    const jsonResponse = await response.json();
    dispatch(sendUserDataAction(jsonResponse));
  } catch (error) {
    console.log(error);
  }
};

export const requireTokenPlayer = () => async (dispatch) => {
  const URL_API = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(URL_API);
    const jsonResponse = await response.json();
    dispatch(changeToken(jsonResponse.token));
  } catch (error) {
    console.log(error);
  }
};

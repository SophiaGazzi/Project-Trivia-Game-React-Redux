import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  requireTokenPlayer,
  requireGravatar,
  requireQuestions,
} from '../redux/actions';
import trivia from '../trivia.png';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  btnDisabled: true,
};

class Login extends Component {
  state = INITIAL_STATE;

  componentDidUpdate() {
    const { questions, history } = this.props;
    console.log(questions, 'login');
    if (questions.length) {
      history.push('/game');
    }
  }

  changeDisabled = () => {
    const { name, gravatarEmail, btnDisabled } = this.state;
    if (name.length > 0 && gravatarEmail.length > 0 && btnDisabled) {
      this.setState({ btnDisabled: false });
    }
    if ((name.length === 0 || gravatarEmail.length === 0) && !btnDisabled) {
      this.setState({ btnDisabled: true });
    }
  };

  onHandleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => this.changeDisabled(),
    );
  };

  sendToConfigPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClick = async () => {
    const {
      getToken,
      getImage, getQuestions, category, quantity, difficulty } = this.props;
    const objUser = { ...this.state };
    delete objUser.btnDisabled;
    await getToken(objUser);
    const token = localStorage.getItem('token');
    await getQuestions(token, difficulty, category, quantity);
    await getImage(objUser.gravatarEmail);
    // console.log(questions, 'login');
  };

  render() {
    const { btnDisabled, name, gravatarEmail } = this.state;
    // const { questions } = this.props;

    return (
      <div className="login-page">
        <img src={ trivia } alt="logo" className="App-logo" />
        {/* {questions.length && <Redirect to="/game" />} */}
        <label htmlFor="name">
          <p>Nome:</p>
          <input
            className="form-control"
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ this.onHandleChange }
          />
        </label>
        <label htmlFor="email">
          <p>Email:</p>
          <input
            className="form-control"
            data-testid="input-gravatar-email"
            type="email"
            name="gravatarEmail"
            id="email"
            value={ gravatarEmail }
            onChange={ this.onHandleChange }
          />
        </label>
        <div className="buttons">
          <button
            className="btn btn-danger"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
          <button
            className="btn btn-primary"
            type="button"
            data-testid="btn-settings"
            onClick={ this.sendToConfigPage }
          >
            Configurar
          </button>
        </div>
        {/* <audio
          src="https://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"
          autoPlay
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio> */}
      </div>
    );
  }
}

const mapStateToProps = ({
  settings: { category, quantity, difficulty },
  trivia: { questions },
}) => ({
  category,
  quantity,
  difficulty,
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (user) => dispatch(requireTokenPlayer(user)),
  getImage: (email) => dispatch(requireGravatar(email)),
  getQuestions: (token, difficulty, category, quantity) => {
    dispatch(requireQuestions(token, difficulty, category, quantity));
  },
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  category: PropTypes.string,
  quantity: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Login.defaultProps = {
  category: null,
  difficulty: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

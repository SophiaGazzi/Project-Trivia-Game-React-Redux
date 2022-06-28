import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requireGravatar, requireTokenPlayer } from '../redux/actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  btnDisabled: true,
};

class Login extends Component {
  state = INITIAL_STATE;

  changeDisabled = () => {
    const { name, gravatarEmail } = this.state;
    if (name.length === 0 || gravatarEmail.length === 0) {
      this.setState({ btnDisabled: true });
    } else {
      this.setState({ btnDisabled: false });
    }
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.changeDisabled());
  }

  sendToConfigPage = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleClick = async () => {
    const { history, getToken, getImage } = this.props;
    const { gravatarEmail } = this.state;
    const objUser = { ...this.state };
    delete objUser.btnDisabled;
    await getToken();
    getImage(gravatarEmail, objUser);
    history.push('/game');
  }

  render() {
    const { btnDisabled, name, gravatarEmail } = this.state;

    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ this.onHandleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="gravatarEmail"
            id="email"
            value={ gravatarEmail }
            onChange={ this.onHandleChange }
          />
        </label>
        <button
          disabled={ btnDisabled }
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.sendToConfigPage }
        >
          Configurar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(requireTokenPlayer()),
  getImage: (email, objUser) => dispatch(requireGravatar(email, objUser)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  //  onHandleClick = () => {
  //     const { history } = this.props;
  //     history.push('/game');
  //  }

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
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {

// };

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null)(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requireGravatar } from '../redux/actions';

class Header extends Component {
  // state = {
  //   imagem: 'https://www.gravatar.com/avatar/2bd0222634c9b4aad22d41dc8a6bbf85',
  // }

  // async componentDidMount() {
  //   const { getImage, gravatarEmail } = this.props;
  //   const image = await getImage(gravatarEmail);
  //   this.setState({ imagem: image });
  // }

  render() {
    const { name, imgURL } = this.props;
    // const { imagem } = this.state;
    return (
      <div>
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <img
          data-testid="header-profile-picture"
          src={ imgURL }
          alt="img-avatar"
        />
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imgURL: state.login.imgURL,
  name: state.login.name,
  gravatarEmail: state.login.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  getImage: (gravatarEmail) => dispatch(requireGravatar(gravatarEmail)),
});

Header.propTypes = {
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
  // getImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
